/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Boulangerie', href: '#boulangerie' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Pâtisserie', href: '#patisserie' },
    { label: 'Especiais', href: '#especiais' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <footer className="bg-[#241C18] text-[#DCD4C9] border-t border-[#382C25] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#382C25]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight block">
              Brioche Brasil
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold block">
              Boulangerie · Christophe Guillard
            </span>
            <p className="text-xs sm:text-sm text-[#B8ACA0] leading-relaxed max-w-sm pt-2">
              Boulangerie e Pâtisserie artesanal francesa. Atendimento no local para escolha ou retirada de produtos e encomendas em Perdizes, São Paulo.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Navegação
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="md:col-span-4 space-y-3 text-xs sm:text-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Atendimento & Contato
            </span>
            <p className="text-white font-medium">
              Rua das Perdizes, 25 - Perdizes
            </p>
            <p>
              Telefone / WhatsApp:{' '}
              <a
                href="https://wa.me/5511981150834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A373] hover:underline"
              >
                (11) 98115-0834
              </a>
            </p>
            
            <div className="pt-2 text-xs space-y-1 text-[#B8ACA0]">
              <span className="text-white font-medium block">Horário de Funcionamento:</span>
              <p>Quinta e sexta: 9h às 16h</p>
              <p>Sábado: 8h às 15h</p>
              <p>Domingo: 8h às 14h</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-4">
          <p>© 2026 Brioche Brasil. Todos os direitos reservados.</p>
          <p>Boulangerie · Pâtisserie · Viennoiserie · Traiteur</p>
        </div>

      </div>
    </footer>
  );
};
