/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import type { MenuItem } from '../data/menu';

interface FeaturedProductsProps {
  products: MenuItem[];
  favoriteIds: Set<string>;
  onToggleFavorite: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
  addedItemIds: Set<string>;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  addedItemIds,
}) => {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5E3C] block mb-2">
              Destaques da Casa
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2420] tracking-tight">
              Escolhas especiais
            </h2>
            <p className="text-sm sm:text-base text-[#665447] mt-2">
              Descubra alguns dos sabores da Brioche Brasil.
            </p>
          </div>

          <a
            href="#cardapio"
            className="text-xs sm:text-sm font-semibold text-[#8C5E3C] hover:text-[#2C2420] inline-flex items-center gap-1 transition-colors self-start md:self-auto"
          >
            <span>Ver todo o cardápio</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* 3-card product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => {
            const isFav = favoriteIds.has(product.id);
            const isAdded = addedItemIds.has(product.id);

            return (
              <div
                key={product.id}
                className="group bg-[#FFFDFB] rounded-2xl border border-[#EBE4D9] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EAE2D8] text-[#8C7A6B]">
                      <span className="font-serif text-lg">{product.name}</span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                      isFav
                        ? 'bg-white text-red-600 shadow-sm'
                        : 'bg-white/80 text-[#5C4A3E] hover:bg-white hover:text-red-500'
                    }`}
                    aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    title={isFav ? 'Favoritado' : 'Favoritar'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-current' : 'stroke-[2]'}`}
                    />
                  </button>

                  {/* Category tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#2C2420]/80 backdrop-blur-sm text-[#FAF8F5] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-medium text-[#2C2420]">
                        {product.name}
                      </h3>
                      <span className="font-sans text-base font-semibold text-[#8C5E3C] whitespace-nowrap tabular-nums">
                        {product.price}
                      </span>
                    </div>

                    {product.description && (
                      <p className="text-xs sm:text-sm text-[#665447] leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {product.variations && (
                      <div className="mt-3 text-[11px] text-[#8C7A6B] space-y-0.5 border-t border-[#F2ECE3] pt-2">
                        {product.variations.map((v) => (
                          <div key={v.label} className="flex justify-between">
                            <span>{v.label}:</span>
                            <span className="font-medium text-[#2C2420]">{v.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-[#43352D] text-white'
                        : 'bg-[#FAF8F5] hover:bg-[#2C2420] text-[#2C2420] hover:text-white border border-[#DCD4C9]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>Adicionado à Encomenda</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar à Encomenda</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
