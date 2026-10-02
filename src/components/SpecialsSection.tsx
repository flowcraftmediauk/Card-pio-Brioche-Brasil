/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, Plus, Check } from 'lucide-react';
import type { MenuItem } from '../data/menu';

interface SpecialsSectionProps {
  onAddToCart: (item: MenuItem) => void;
  addedItemIds: Set<string>;
}

export const SpecialsSection: React.FC<SpecialsSectionProps> = ({
  onAddToCart,
  addedItemIds,
}) => {
  const specials: MenuItem[] = [
    {
      id: 'mini-croissant',
      name: 'Mini Croissant',
      category: 'folhados',
      categoryLabel: 'Folhados / Viennoiserie',
      price: 'R$ 6',
      priceNumber: 6,
      isSeasonal: true,
      description: 'Versão em miniatura do clássico folhado artesanal francês, amanteigado e leve.',
    },
    {
      id: 'mini-croissants-recheado',
      name: 'Mini Croissants recheado',
      category: 'folhados',
      categoryLabel: 'Folhados / Viennoiserie',
      price: 'R$ 9',
      priceNumber: 9,
      isSeasonal: true,
      description: 'Mini croissants folhados com recheio especial preparado sazonalmente na boulangerie.',
    },
    {
      id: 'talmousse-esfiha-marroquina',
      name: 'Talmousse - Esfiha Marroquina (Niçoise)',
      category: 'salgados',
      categoryLabel: 'Salgados Especiais',
      price: 'R$ 38',
      priceNumber: 38,
      isSeasonal: true,
      description: 'Preparo sazonal: Niçoise com atum, aliche, batata, pimentões sem pele, tomate, ervilha e cenoura.',
    },
  ];

  return (
    <section id="especiais" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#8C5E3C] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Produção Sazonal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2420] tracking-tight mb-2">
            Especiais
          </h2>
          <p className="text-sm sm:text-base text-[#665447]">
            Sabores preparados sazonalmente na Brioche Brasil.
          </p>
        </div>

        {/* 3 Specials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specials.map((item) => {
            const isAdded = addedItemIds.has(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#FFFDFB] rounded-2xl border border-[#E8E0D5] p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#DCD4C9] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#EFE6DC] text-[#734A2E] px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Sazonal
                    </span>
                    <span className="font-sans text-base font-semibold text-[#8C5E3C] tabular-nums">
                      {item.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#2C2420] mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#665447] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2ECE3]">
                  <button
                    onClick={() => onAddToCart(item)}
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
                        <span>Incluir na Encomenda</span>
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
