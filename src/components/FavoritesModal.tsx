/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { MenuItem } from '../data/menu';
import type { FavoriteItem } from '../firebase';
import type { User } from 'firebase/auth';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  menuItems: MenuItem[];
  onRemoveFavorite: (productId: string) => void;
  onAddToCart: (item: MenuItem) => void;
  user: User | null;
  onOpenAuth: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  menuItems,
  onRemoveFavorite,
  onAddToCart,
  user,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6DFD5] z-10 animate-in fade-in zoom-in-95 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6DFD5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <h2 className="font-serif text-xl font-medium text-[#2C2420]">
              Meus Favoritos
            </h2>
            <span className="text-xs text-[#8C7A6B] bg-[#F2ECE3] px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7A6B] hover:text-[#2C2420] rounded-full hover:bg-[#F2ECE3] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-3">
          {!user ? (
            <div className="text-center py-10 space-y-3">
              <Heart className="w-10 h-10 text-[#DCD4C9] mx-auto stroke-[1.5]" />
              <p className="font-serif text-lg text-[#2C2420]">
                Faça login para salvar seus favoritos
              </p>
              <p className="text-xs text-[#8C7A6B] max-w-xs mx-auto">
                Conecte-se com sua Conta Google para sincronizar suas escolhas prediletas em qualquer dispositivo.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2C2420] hover:bg-[#43352D] rounded-xl transition-all"
                >
                  Entrar com o Google
                </button>
              </div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Heart className="w-10 h-10 text-[#DCD4C9] mx-auto stroke-[1.5]" />
              <p className="font-serif text-base text-[#2C2420]">
                Nenhum favorito salvo ainda
              </p>
              <p className="text-xs text-[#8C7A6B]">
                Clique no coração ao lado de qualquer item do cardápio para adicioná-lo aqui.
              </p>
            </div>
          ) : (
            favorites.map((fav) => {
              const matchedMenuItem = menuItems.find((m) => m.id === fav.productId);

              return (
                <div
                  key={fav.productId}
                  className="bg-white p-3.5 rounded-xl border border-[#EAE2D7] flex items-center justify-between gap-3 shadow-xs hover:border-[#DCD4C9] transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C5E3C] font-semibold block">
                      {fav.category}
                    </span>
                    <p className="font-serif text-sm font-medium text-[#2C2420] truncate">
                      {fav.productName}
                    </p>
                    <p className="text-xs font-semibold text-[#8C5E3C] tabular-nums">
                      {fav.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {matchedMenuItem && (
                      <button
                        onClick={() => {
                          onAddToCart(matchedMenuItem);
                        }}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#FAF8F5] hover:bg-[#2C2420] text-[#2C2420] hover:text-white border border-[#DCD4C9] flex items-center gap-1 transition-all"
                        title="Adicionar à encomenda"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Encomendar</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRemoveFavorite(fav.productId)}
                      className="p-1.5 text-[#B8ACA0] hover:text-red-600 rounded"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
