/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#8C5E3C]">
              <span>Christophe Guillard</span>
              <span aria-hidden="true">·</span>
              <span>Boulangerie Artesanal</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C2420] leading-[1.12] text-balance">
              Sabores que começam com tradição.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4A3E] leading-relaxed max-w-xl font-normal">
              Uma experiência de boulangerie artesanal com sabores franceses e produtos preparados para momentos especiais.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#2C2420] rounded-xl hover:bg-[#43352D] transition-all shadow-sm hover:shadow active:scale-[0.99] text-center"
              >
                <span>Ver Cardápio</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenOrder}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#2C2420] bg-[#FAF8F5] border border-[#DCD4C9] rounded-xl hover:bg-[#EFEAE2] transition-all active:scale-[0.99]"
              >
                Fazer Encomenda
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-[#EFEAE2] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#6B5A4E]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#2C2420] block">Rua das Perdizes, 25</span>
                  <span>Perdizes, São Paulo</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#2C2420] block">Qui & Sex 9h-16h</span>
                  <span>Sáb 8h-15h · Dom 8h-14h</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Large Cinematic Photography */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Outer decorative soft glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#EAD9C8]/40 to-[#F2E8DC]/20 rounded-3xl blur-xl -z-10" />

              {/* Main image container */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD5] bg-[#EAE2D8] aspect-[16/10] sm:aspect-[16/11]">
                <img
                  src="/src/assets/images/hero_croissants_bakery_1790965917304.jpg"
                  alt="Croissants folhados dourados e brioche artesanal da Brioche Brasil"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle bottom gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating caption pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="font-serif text-sm sm:text-base font-medium block">
                      Folhados & Pâtisserie Francesa
                    </span>
                    <span className="text-white/80 text-[11px]">
                      Feitos artesanalmente por Christophe Guillard
                    </span>
                  </div>
                  <span className="text-[11px] bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/95">
                    Produção do Dia
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
