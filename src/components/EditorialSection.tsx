/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EditorialSectionProps {
  onSelectCategory: (cat: string) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onSelectCategory }) => {
  const handleExplorePatisserie = () => {
    onSelectCategory('patisserie');
    const menuEl = document.getElementById('cardapio');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="patisserie" className="py-20 md:py-28 bg-[#F6EFE6] border-y border-[#EADBCC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Large Editorial Photography */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#E2D2C2]/50 to-transparent rounded-3xl blur-lg -z-10" />
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E0D2C4] aspect-[16/11]">
                <img
                  src="/src/assets/images/editorial_opera_cake_1790965966607.jpg"
                  alt="Bolo Ópera artesanal da Brioche Brasil"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#2C2420]/80 backdrop-blur-md rounded-xl p-3.5 text-white text-xs flex items-center justify-between">
                  <div>
                    <span className="font-serif text-sm font-medium block">Ópera Francês & Brasileiro</span>
                    <span className="text-white/80 text-[11px]">Individual (R$ 35) · 1kg a 2,5kg (R$ 328/kg)</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4A373] font-semibold">
                    Christophe Guillard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C5E3C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pâtisserie de Excelência</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2C2420] leading-[1.15] text-balance">
              Um momento especial em cada detalhe.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5C4A3E] leading-relaxed">
              <p>
                A confeitaria francesa na Brioche Brasil une técnicas clássicas a matérias-primas rigorosamente selecionadas.
              </p>
              
              <div className="bg-white/80 rounded-xl p-4 border border-[#E6DFD5] space-y-3 text-xs sm:text-sm">
                <div>
                  <strong className="text-[#2C2420] block font-serif text-sm">Ópera Francês:</strong>
                  <span className="text-[#6B5A4E]">
                    Bolo feito com camadas de biscuit Gioconde (farinha de amêndoas), creme de café e chocolate, unidas com um pouco de rum.
                  </span>
                </div>
                <div className="border-t border-[#EFEAE2] pt-2">
                  <strong className="text-[#2C2420] block font-serif text-sm">Ópera Brasileiro:</strong>
                  <span className="text-[#6B5A4E]">
                    Bolo feito com camadas de biscuit Gioconde (farinha de amêndoas), creme de cupuaçu e chocolate, unidas com um pouco de cachaça.
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#736052]">
                Além dos bolos Ópera, servimos Tarte Tatin de maçã caramelizada, Torta Bourdalou de pêra com amêndoas ao vinho, tortas de maçã verde e merengue italiano.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleExplorePatisserie}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2C2420] hover:bg-[#43352D] rounded-xl transition-all shadow-sm hover:shadow"
              >
                <span>Explorar Pâtisserie</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
