/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const BoulangerieSection: React.FC = () => {
  const pillars = [
    {
      title: 'Viennoiserie & Folhados',
      desc: 'Massa folhada com dobras precisas e manteiga de qualidade. Croissants au beurre, recheados e pain au chocolat com chocolate nobre.',
    },
    {
      title: 'Pâtisserie Fina',
      desc: 'Doces clássicos franceses como Tarte Tatin caramelizada, Torta Bourdalou com pêra e amêndoas, e as edições Francês e Brasileiro do bolo Ópera.',
    },
    {
      title: 'Traiteur & Salgados',
      desc: 'Quiches especiais em formato individual ou por peso (1kg a 2,5kg), croque-monsieur gratinado e tortas para momentos especiais.',
    },
  ];

  return (
    <section id="boulangerie" className="py-16 md:py-24 bg-[#F5EFE6]/60 border-y border-[#ECE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C5E3C] mb-2">
            Pâtisserie · Viennoiserie · Traiteur
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#2C2420] tracking-tight mb-4">
            Boulangerie
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E] leading-relaxed">
            Sob a assinatura de Christophe Guillard, a Brioche Brasil oferece produtos elaborados artesanalmente com respeito aos processos da tradição francesa. Atendimento no local para escolha ou retirada de produtos e encomendas em Perdizes.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-[#FAF8F5] rounded-2xl p-7 sm:p-8 border border-[#E6DFD5] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-xs font-serif text-[#8C5E3C] font-semibold block mb-3">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2C2420] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#665447] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EFEAE2] flex items-center gap-2 text-xs font-medium text-[#8C5E3C]">
                <Check className="w-4 h-4 text-[#8C5E3C]" />
                <span>Preparo artesanal diário</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Service Information */}
        <div className="mt-12 bg-[#2C2420] text-[#FAF8F5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold">
              Atendimento em Perdizes
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-white">
              “Atendimento no local para escolha ou retirada de produtos e encomendas.”
            </h4>
            <p className="text-xs sm:text-sm text-[#DCD4C9]">
              Rua das Perdizes, 25 · Quinta a Domingo
            </p>
          </div>

          <a
            href="#cardapio"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#2C2420] bg-[#FAF8F5] hover:bg-[#EFEAE2] rounded-xl transition-colors shrink-0"
          >
            <span>Conheça o cardápio</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
