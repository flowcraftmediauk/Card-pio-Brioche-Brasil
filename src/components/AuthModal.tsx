/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { loginWithGoogle } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('Não foi possível concluir o login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-sm bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6DFD5] z-10 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#8C7A6B] hover:text-[#2C2420] rounded-full hover:bg-[#F2ECE3] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <span className="font-serif text-2xl font-semibold text-[#2C2420] block">
            Brioche Brasil
          </span>
          <span className="text-xs uppercase tracking-widest text-[#8C5E3C] font-semibold block">
            Boulangerie & Pâtisserie
          </span>
          <p className="text-xs text-[#6B5A4E] pt-2">
            Acesse para sincronizar seus produtos favoritos e agilizar pedidos de encomenda.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-2.5 mb-6 text-xs text-[#5C4A3E] bg-white p-3.5 rounded-xl border border-[#EAE2D7]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8C5E3C] shrink-0" />
            <span>Guarde seus folhados e doces prediletos</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8C5E3C] shrink-0" />
            <span>Monte e salve suas listas de encomenda</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C5E3C] shrink-0" />
            <span>Acesso seguro com sua Conta Google</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 text-center">
            {errorMsg}
          </div>
        )}

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 bg-white hover:bg-[#F5EFE6] border border-[#DCD4C9] rounded-xl text-xs sm:text-sm font-semibold text-[#2C2420] transition-all flex items-center justify-center gap-3 shadow-xs active:scale-98 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{loading ? 'Conectando...' : 'Continuar com o Google'}</span>
        </button>

        <p className="text-[11px] text-center text-[#8C7A6B] mt-4">
          Ambiente autêntico Brioche Brasil · Perdizes, SP
        </p>

      </div>
    </div>
  );
};
