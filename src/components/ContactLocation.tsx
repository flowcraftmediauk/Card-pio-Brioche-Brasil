/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Calendar, ShoppingBag } from 'lucide-react';

interface ContactLocationProps {
  onOpenOrder: () => void;
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ onOpenOrder }) => {
  const address = 'Rua das Perdizes, 25 - Perdizes, São Paulo';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Rua das Perdizes, 25 - Perdizes, São Paulo'
  )}`;
  const whatsappUrl = 'https://wa.me/5511981150834?text=Ol%C3%A1%2C+gostaria+de+informa%C3%A7%C3%B5es+sobre+os+produtos+e+encomendas+da+Brioche+Brasil.';

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#F5EFE6]/70 border-t border-[#E8DEC\-C] border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Banner */}
        <div className="bg-[#2C2420] text-[#FAF8F5] rounded-3xl p-8 sm:p-12 md:p-16 mb-16 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8C5E3C]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold">
              Boulangerie & Pâtisserie Artesanal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Seu próximo momento especial começa aqui.
            </h2>
            <p className="text-sm sm:text-base text-[#DCD4C9] max-w-xl mx-auto font-normal">
              Atendimento no local para escolha ou retirada de produtos e encomendas. Faça seu pedido antecipado ou venha nos visitar em Perdizes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenOrder}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-[#2C2420] bg-[#FAF8F5] hover:bg-[#EFEAE2] rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Fazer Encomenda</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#43352D] hover:bg-[#57443A] border border-[#6E594C] rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#D4A373]" />
                <span>Entrar em contato</span>
              </a>
            </div>
          </div>
        </div>

        {/* Location & Opening Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Endereço & Contato */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C5E3C] font-semibold block mb-1">
                  Localização
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#2C2420]">
                  Brioche Brasil
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-0.5">Boulangerie · Christophe Guillard</p>
              </div>

              <div className="space-y-4 text-sm text-[#5C4A3E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8C5E3C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C2420] block">Endereço</strong>
                    <span>Rua das Perdizes, 25 - Perdizes</span>
                    <span className="block text-xs text-[#8C7A6B]">São Paulo - SP</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#8C5E3C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C2420] block">Telefone & WhatsApp</strong>
                    <a
                      href="tel:11981150834"
                      className="hover:underline text-[#2C2420] font-medium"
                    >
                      (11) 98115-0834
                    </a>
                  </div>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-[#EAE2D7] text-xs leading-relaxed text-[#6B5A4E]">
                  “Atendimento no local para escolha ou retirada de produtos e encomendas.”
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEAE2] flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#2C2420] bg-white border border-[#DCD4C9] rounded-xl hover:bg-[#F2ECE3] transition-colors"
              >
                <span>Ver localização</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C7A6B]" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2C2420] hover:bg-[#43352D] rounded-xl transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>WhatsApp: (11) 98115-0834</span>
              </a>
            </div>
          </div>

          {/* Card 2: Horário de Funcionamento */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8C5E3C] font-semibold block mb-1">
                  Atendimento
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#2C2420]">
                  Horário de Funcionamento
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-0.5">Dias de atendimento presencial e retirada</p>
              </div>

              {/* Weekly schedule list from PDF */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EAE2D7]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#8C5E3C]" />
                    <span className="text-sm font-medium text-[#2C2420]">Quinta e sexta</span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C4A3E] bg-[#F5EFE6] px-2.5 py-1 rounded-md">
                    9h às 16h
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EAE2D7]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#8C5E3C]" />
                    <span className="text-sm font-medium text-[#2C2420]">Sábado</span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C4A3E] bg-[#F5EFE6] px-2.5 py-1 rounded-md">
                    8h às 15h
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EAE2D7]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#8C5E3C]" />
                    <span className="text-sm font-medium text-[#2C2420]">Domingo</span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C4A3E] bg-[#F5EFE6] px-2.5 py-1 rounded-md">
                    8h às 14h
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-dashed border-[#DCD4C9] text-xs text-[#8C7A6B]">
                  <span>Segunda a Quarta:</span>
                  <span className="font-medium">Fechado para produção interna</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEAE2] text-xs text-[#6B5A4E]">
              <p>
                <strong>Dica para encomendas:</strong> Para tortas grandes e quiches por quilo com antecedência garantida, recomendamos o pedido com pelo menos 24 a 48h de antecedência.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
