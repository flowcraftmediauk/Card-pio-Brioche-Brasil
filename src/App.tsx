/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BoulangerieSection } from './components/BoulangerieSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { MenuSection } from './components/MenuSection';
import { EditorialSection } from './components/EditorialSection';
import { SpecialsSection } from './components/SpecialsSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { EncomendaDrawer, type CartItem } from './components/EncomendaDrawer';
import { AuthModal } from './components/AuthModal';
import { FavoritesModal } from './components/FavoritesModal';
import { MENU_ITEMS, type MenuItem } from './data/menu';
import {
  auth,
  logout,
  subscribeFavorites,
  addFavorite,
  removeFavorite,
  type FavoriteItem,
} from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Listen for user favorites from Firestore when logged in
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const unsubscribe = subscribeFavorites(user.uid, (favs) => {
      setFavorites(favs);
    });
    return () => unsubscribe();
  }, [user]);

  const favoriteIds = new Set(favorites.map((f) => f.productId));

  // Toggle favorite
  const handleToggleFavorite = async (item: MenuItem) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (favoriteIds.has(item.id)) {
      try {
        await removeFavorite(user.uid, item.id);
      } catch (err) {
        console.error('Error removing favorite:', err);
      }
    } else {
      try {
        await addFavorite(user.uid, {
          id: item.id,
          name: item.name,
          category: item.categoryLabel,
          price: item.price,
        });
      } catch (err) {
        console.error('Error adding favorite:', err);
      }
    }
  };

  const handleRemoveFavoriteById = async (productId: string) => {
    if (!user) return;
    try {
      await removeFavorite(user.uid, productId);
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, variationLabel?: string) => {
    const cartItemId = `${item.id}_${variationLabel || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          quantity: 1,
          variationLabel,
        },
      ];
    });

    // Provide visual feedback
    setAddedItemIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2420]">
      {/* Sticky Header */}
      <Header
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={logout}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        orderItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenOrder={() => setIsOrderOpen(true)} />

        {/* Introduction / Boulangerie Section */}
        <BoulangerieSection />

        {/* Featured Products */}
        <FeaturedProducts
          products={MENU_ITEMS}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          addedItemIds={addedItemIds}
        />

        {/* Complete Menu Section */}
        <MenuSection
          items={MENU_ITEMS}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          addedItemIds={addedItemIds}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Large Editorial Feature Section */}
        <EditorialSection onSelectCategory={setSelectedCategory} />

        {/* Seasonal / Specials Section */}
        <SpecialsSection
          onAddToCart={handleAddToCart}
          addedItemIds={addedItemIds}
        />

        {/* Contact, Location & Opening Hours */}
        <ContactLocation onOpenOrder={() => setIsOrderOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <EncomendaDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        menuItems={MENU_ITEMS}
        onRemoveFavorite={handleRemoveFavoriteById}
        onAddToCart={handleAddToCart}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}
