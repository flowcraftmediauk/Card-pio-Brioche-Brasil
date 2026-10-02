/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocFromServer,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot as mandated by skill
export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline. Check connectivity.');
    }
  }
}

// Run test on load
testConnection();

// Authentication helpers
export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // Sync profile
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(
      userDocRef,
      {
        userId: user.uid,
        displayName: user.displayName || 'Cliente',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

// Favorites management
export interface FavoriteItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  category: string;
  price: string;
  createdAt: string;
}

export async function addFavorite(
  userId: string,
  product: { id: string; name: string; category: string; price: string }
): Promise<void> {
  const path = `users/${userId}/favorites/${product.id}`;
  try {
    const favRef = doc(db, 'users', userId, 'favorites', product.id);
    await setDoc(favRef, {
      userId,
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeFavorite(userId: string, productId: string): Promise<void> {
  const path = `users/${userId}/favorites/${productId}`;
  try {
    const favRef = doc(db, 'users', userId, 'favorites', productId);
    await deleteDoc(favRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeFavorites(
  userId: string,
  onUpdate: (favorites: FavoriteItem[]) => void
): () => void {
  const path = `users/${userId}/favorites`;
  const favsCol = collection(db, 'users', userId, 'favorites');
  return onSnapshot(
    favsCol,
    (snapshot) => {
      const items: FavoriteItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FavoriteItem, 'id'>),
      }));
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Order inquiries / Encomendas
export interface OrderData {
  id?: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  pickupDate: string;
  pickupTime: string;
  itemsSummary: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export async function submitOrderRequest(order: Omit<OrderData, 'id' | 'createdAt'>): Promise<string> {
  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `orders/${orderId}`;
  try {
    const orderRef = doc(db, 'orders', orderId);
    const payload = {
      ...order,
      createdAt: new Date().toISOString(),
    };
    await setDoc(orderRef, payload);
    return orderId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
