/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Heart, Plus, Check, Clock, Calendar } from 'lucide-react';
import { MENU_CATEGORIES, type MenuItem } from '../data/menu';

interface MenuSectionProps {
  items: MenuItem[];
  favoriteIds: Set<string>;
  onToggleFavorite: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, variationLabel?: string) => void;
  addedItemIds: Set<string>;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  addedItemIds,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.options &&
          item.options.some((opt) =>
            opt.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5E3C] block mb-2">
            Cardápio Brioche Brasil 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#2C2420] tracking-tight mb-3">
            Nosso Cardápio
          </h2>
          <p className="text-sm sm:text-base text-[#665447]">
            Receitas artesanais francesas preparadas com rigor e sensibilidade. Escolha seus itens para consumo no local ou encomenda prévia.
          </p>
        </div>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="space-y-6 mb-12">
          
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar croissant, quiche, tarte, ópera..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DCD4C9] rounded-xl text-sm text-[#2C2420] placeholder-[#8C7A6B] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#2C2420]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#2C2420] text-white shadow-sm'
                      : 'bg-white text-[#5C4A3E] border border-[#E6DFD5] hover:bg-[#F2ECE3] hover:text-[#2C2420]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E6DFD5] p-12 text-center max-w-lg mx-auto">
            <p className="font-serif text-lg text-[#2C2420] mb-2">Nenhum produto encontrado</p>
            <p className="text-xs text-[#8C7A6B] mb-4">
              Tente buscar por outro termo ou selecione uma categoria diferente.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#8C5E3C] border border-[#DCD4C9] rounded-lg hover:bg-[#FAF8F5]"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isFav = favoriteIds.has(item.id);
              const isAdded = addedItemIds.has(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#EAE2D7] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#DCD4C9] transition-all"
                >
                  <div>
                    {/* Header Row: Category kicker & Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#8C5E3C] font-semibold">
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.isSeasonal && (
                          <span className="text-[10px] font-medium bg-[#EFE6DC] text-[#734A2E] px-2 py-0.5 rounded">
                            Sazonal
                          </span>
                        )}
                        {item.isOrderOnly && (
                          <span className="text-[10px] font-medium bg-[#F5ECE8] text-[#8C3A27] px-2 py-0.5 rounded">
                            Somente encomenda
                          </span>
                        )}
                        <button
                          onClick={() => onToggleFavorite(item)}
                          className={`p-1 rounded-full transition-colors ${
                            isFav ? 'text-red-600' : 'text-[#8C7A6B] hover:text-red-500'
                          }`}
                          aria-label={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Price */}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg font-medium text-[#2C2420]">
                        {item.name}
                      </h3>
                      <span className="font-sans text-base font-semibold text-[#2C2420] tabular-nums whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs text-[#665447] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    )}

                    {/* Options list */}
                    {item.options && (
                      <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFEAE2] mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5E3C] block mb-1">
                          Opções de recheio / sabor:
                        </span>
                        <div className="text-xs text-[#5C4A3E] flex flex-wrap gap-x-2 gap-y-1">
                          {item.options.map((opt, i) => (
                            <span key={opt}>
                              {opt}
                              {i < item.options!.length - 1 ? ' ·' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Variations list */}
                    {item.variations && (
                      <div className="space-y-1.5 border-t border-[#F2ECE3] pt-2.5 mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6B] block">
                          Formatos & Porções:
                        </span>
                        {item.variations.map((v) => (
                          <div
                            key={v.label}
                            className="flex items-center justify-between text-xs text-[#5C4A3E]"
                          >
                            <span>{v.label}</span>
                            <span className="font-medium text-[#2C2420] tabular-nums">{v.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add to order button */}
                  <div className="pt-3 border-t border-[#F2ECE3]">
                    <button
                      onClick={() => onAddToCart(item)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
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
        )}

        {/* Note on orders */}
        <div className="mt-12 text-center text-xs text-[#8C7A6B] max-w-xl mx-auto">
          <p>
            * Tortas e quiches por peso (1kg a 2,5kg) e itens com a indicação <strong>Somente encomenda</strong> devem ser solicitados previamente pelo telefone ou WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
};
