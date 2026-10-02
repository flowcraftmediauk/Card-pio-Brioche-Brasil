/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Menu as MenuIcon, X, LogOut, CheckCircle2 } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  user: FirebaseUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  orderItemsCount: number;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  favoritesCount,
  onOpenFavorites,
  orderItemsCount,
  onOpenOrder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Boulangerie', href: '#boulangerie' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Pâtisserie', href: '#patisserie' },
    { label: 'Especiais', href: '#especiais' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E6DFD5]'
          : 'bg-[#FAF8F5] border-b border-[#EFEAE2]'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-[#2C2420] text-[#EFEAE2] text-[11px] sm:text-xs tracking-wide py-1.5 px-4 text-center">
        <span>Perdizes, São Paulo · Atendimento no local e encomendas: </span>
        <a
          href="https://wa.me/5511981150834"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-[#D4A373] ml-1 transition-colors"
        >
          (11) 98115-0834
        </a>
      </div>

      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Brand title (single text element wordmark) */}
        <a
          href="#inicio"
          className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2420] rounded"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2C2420] transition-colors group-hover:text-[#8C5E3C]">
            Brioche Brasil
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C5E3C] font-medium -mt-1">
            Boulangerie · Pâtisserie
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5C4A3E]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#2C2420] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8C5E3C] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 text-[#5C4A3E] hover:text-[#2C2420] hover:bg-[#EFEAE2]/60 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#2C2420]"
            aria-label="Ver produtos favoritos"
            title="Favoritos"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8C5E3C] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Encomenda / Cart Button */}
          <button
            onClick={onOpenOrder}
            className="relative p-2.5 text-[#5C4A3E] hover:text-[#2C2420] hover:bg-[#EFEAE2]/60 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#2C2420]"
            aria-label="Ver lista de encomenda"
            title="Minha Encomenda"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {orderItemsCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#2C2420] text-[#FAF8F5] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {orderItemsCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-[#DCD4C9] hover:bg-[#EFEAE2]/60 transition-colors focus-visible:ring-2 focus-visible:ring-[#2C2420]"
                aria-label="Menu do usuário"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuário'}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-[#DCD4C9]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#8C5E3C] text-white text-xs flex items-center justify-center font-medium">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-medium text-[#2C2420] max-w-[80px] truncate">
                  {user.displayName?.split(' ')[0] || 'Conta'}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E6DFD5] py-2 z-50 text-left animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-[#F0EAE1]">
                    <p className="text-xs text-[#8C7A6B]">Conectado como</p>
                    <p className="text-sm font-semibold text-[#2C2420] truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenFavorites();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#5C4A3E] hover:bg-[#FAF8F5] flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-[#8C5E3C]" />
                    Meus Favoritos ({favoritesCount})
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenOrder();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#5C4A3E] hover:bg-[#FAF8F5] flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#8C5E3C]" />
                    Minha Encomenda ({orderItemsCount})
                  </button>
                  <div className="border-t border-[#F0EAE1] mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-700 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5C4A3E] hover:text-[#2C2420] border border-[#DCD4C9] rounded-lg hover:bg-[#EFEAE2]/60 transition-colors whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}

          {/* Primary CTA */}
          <a
            href="#cardapio"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-[#2C2420] rounded-lg hover:bg-[#43352D] transition-colors whitespace-nowrap shadow-sm"
          >
            Ver Cardápio
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5C4A3E] hover:text-[#2C2420] hover:bg-[#EFEAE2]/60 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E6DFD5] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2C2420] hover:text-[#8C5E3C] py-1 border-b border-[#EFEAE2]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#2C2420] rounded-lg hover:bg-[#43352D]"
            >
              Ver Cardápio Completo
            </a>
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-sm font-medium text-[#2C2420] border border-[#DCD4C9] rounded-lg hover:bg-[#EFEAE2]"
              >
                Entrar com Google
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full py-2.5 text-sm font-medium text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
              >
                Sair ({user.displayName?.split(' ')[0]})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
