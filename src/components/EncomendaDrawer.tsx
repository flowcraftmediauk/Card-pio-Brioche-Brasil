/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import type { MenuItem } from '../data/menu';
import type { User } from 'firebase/auth';
import { submitOrderRequest } from '../firebase';

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  variationLabel?: string;
  notes?: string;
}

interface EncomendaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  user: User | null;
  onOpenAuth: () => void;
}

export const EncomendaDrawer: React.FC<EncomendaDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  onOpenAuth,
}) => {
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupDay, setPickupDay] = useState('Quinta-feira');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate total for items with fixed numeric prices
  const calculatedTotal = cart.reduce((acc, ci) => {
    if (ci.item.priceNumber) {
      return acc + ci.item.priceNumber * ci.quantity;
    }
    return acc;
  }, 0);

  const hasWeightItems = cart.some((ci) => !ci.item.priceNumber || ci.item.price.includes('/kg'));

  const generateWhatsAppMessage = () => {
    let msg = `*PEDIDO DE ENCOMENDA - BRIOCHE BRASIL*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Cliente:* ${customerName || 'Não informado'}\n`;
    if (customerPhone) msg += `*Telefone:* ${customerPhone}\n`;
    msg += `*Previsão de Retirada:* ${pickupDay} às ${pickupTime}\n`;
    msg += `*Local de Retirada:* Rua das Perdizes, 25 - Perdizes\n\n`;
    msg += `*ITENS DO PEDIDO:*\n`;

    cart.forEach((ci, idx) => {
      const varInfo = ci.variationLabel ? ` (${ci.variationLabel})` : '';
      msg += `${idx + 1}. ${ci.quantity}x ${ci.item.name}${varInfo} - ${ci.item.price}\n`;
    });

    if (calculatedTotal > 0) {
      msg += `\n*Total estimado (itens tabelados):* R$ ${calculatedTotal.toFixed(2).replace('.', ',')}\n`;
      if (hasWeightItems) {
        msg += `_(Itens por peso serão conferidos e pesados no preparo)_\n`;
      }
    }

    if (notes.trim()) {
      msg += `\n*Observações:* ${notes.trim()}\n`;
    }

    msg += `\n_Mensagem gerada pelo site Brioche Brasil_`;
    return encodeURIComponent(msg);
  };

  const handleSendOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      // If user is logged in, persist to Firestore
      if (user) {
        const itemsSummary = cart
          .map((ci) => `${ci.quantity}x ${ci.item.name}${ci.variationLabel ? ` (${ci.variationLabel})` : ''} [${ci.item.price}]`)
          .join(', ');

        await submitOrderRequest({
          userId: user.uid,
          customerName: customerName.trim() || user.displayName || 'Cliente',
          customerPhone: customerPhone.trim() || 'WhatsApp',
          pickupDate: pickupDay,
          pickupTime: pickupTime,
          itemsSummary: itemsSummary,
          notes: notes.trim(),
          status: 'pending',
        });
      }

      setSubmittedSuccess(true);

      // Open WhatsApp with complete formatted text
      const waUrl = `https://wa.me/5511981150834?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
    } catch (error) {
      console.error('Erro ao registrar encomenda:', error);
      // Fallback open WhatsApp directly
      const waUrl = `https://wa.me/5511981150834?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E6DFD5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C5E3C]" />
            <h2 className="font-serif text-xl font-medium text-[#2C2420]">
              Minha Encomenda
            </h2>
            <span className="text-xs text-[#8C7A6B] bg-[#F2ECE3] px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} itens
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7A6B] hover:text-[#2C2420] rounded-lg hover:bg-[#F2ECE3] transition-colors"
            aria-label="Fechar gaveta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submittedSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#2C2420]">
                Pedido Preparado!
              </h3>
              <p className="text-xs sm:text-sm text-[#665447] max-w-xs mx-auto">
                Sua encomenda foi enviada para o WhatsApp da Brioche Brasil (11) 98115-0834 para confirmação da equipe.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#2C2420] rounded-xl hover:bg-[#43352D]"
                >
                  Concluir & Fechar
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#DCD4C9] mx-auto stroke-[1.25]" />
              <p className="font-serif text-lg text-[#2C2420]">
                Sua lista de encomenda está vazia
              </p>
              <p className="text-xs text-[#8C7A6B] max-w-xs mx-auto">
                Navegue pelo cardápio e clique em “Adicionar à Encomenda” para preparar seus itens.
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-[#8C5E3C] border border-[#DCD4C9] rounded-lg hover:bg-white"
                >
                  Explorar cardápio
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                  <span>Itens selecionados</span>
                  <button
                    onClick={onClearCart}
                    className="hover:text-red-700 transition-colors"
                  >
                    Esvaziar
                  </button>
                </div>

                {cart.map((ci) => (
                  <div
                    key={ci.id}
                    className="bg-white p-3.5 rounded-xl border border-[#EAE2D7] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-medium text-[#2C2420] truncate">
                        {ci.item.name}
                      </p>
                      {ci.variationLabel && (
                        <p className="text-[11px] text-[#8C7A6B]">
                          {ci.variationLabel}
                        </p>
                      )}
                      <p className="text-xs font-medium text-[#8C5E3C] tabular-nums mt-0.5">
                        {ci.item.price}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#DCD4C9] rounded-lg overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(ci.id, -1)}
                          className="p-1 hover:bg-[#EFEAE2] text-[#2C2420]"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#2C2420] tabular-nums">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(ci.id, 1)}
                          className="p-1 hover:bg-[#EFEAE2] text-[#2C2420]"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(ci.id)}
                        className="p-1.5 text-[#B8ACA0] hover:text-red-600 rounded"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup Information Form */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE2D7] space-y-3.5 text-xs">
                <span className="font-semibold text-xs text-[#2C2420] block">
                  Dados para Retirada no Local
                </span>

                <div>
                  <label className="block text-[11px] text-[#6B5A4E] mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full px-3 py-2 border border-[#DCD4C9] rounded-lg text-xs text-[#2C2420] focus:ring-1 focus:ring-[#8C5E3C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B5A4E] mb-1">
                    WhatsApp para contato *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 border border-[#DCD4C9] rounded-lg text-xs text-[#2C2420] focus:ring-1 focus:ring-[#8C5E3C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#6B5A4E] mb-1">
                      Dia da Retirada *
                    </label>
                    <select
                      value={pickupDay}
                      onChange={(e) => setPickupDay(e.target.value)}
                      className="w-full px-2 py-2 border border-[#DCD4C9] rounded-lg text-xs text-[#2C2420] bg-white focus:outline-none"
                    >
                      <option value="Quinta-feira (9h-16h)">Quinta-feira (9h-16h)</option>
                      <option value="Sexta-feira (9h-16h)">Sexta-feira (9h-16h)</option>
                      <option value="Sábado (8h-15h)">Sábado (8h-15h)</option>
                      <option value="Domingo (8h-14h)">Domingo (8h-14h)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6B5A4E] mb-1">
                      Horário Estimado
                    </label>
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="Ex: 10:30"
                      className="w-full px-3 py-2 border border-[#DCD4C9] rounded-lg text-xs text-[#2C2420] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6B5A4E] mb-1">
                    Observações ou instruções especiais
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Sem nozes no brownie, fatiar o pão de forma..."
                    className="w-full px-3 py-2 border border-[#DCD4C9] rounded-lg text-xs text-[#2C2420] focus:outline-none"
                  />
                </div>

                {/* Local notice */}
                <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFEAE2] text-[11px] text-[#6B5A4E]">
                  📍 <strong>Retirada:</strong> Rua das Perdizes, 25 - Perdizes. Pagamento realizado diretamente na retirada do pedido.
                </div>
              </div>

              {!user && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                  <span>Deseja salvar sua encomenda no seu perfil?</span>
                  <button
                    onClick={onOpenAuth}
                    className="underline font-semibold hover:text-amber-950 ml-2"
                  >
                    Entrar
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && !submittedSuccess && (
          <div className="p-6 border-t border-[#E6DFD5] bg-white space-y-3">
            {calculatedTotal > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B5A4E]">Subtotal tabelado:</span>
                <span className="font-semibold text-base text-[#2C2420] tabular-nums">
                  R$ {calculatedTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}

            <button
              onClick={handleSendOrder}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#2C2420] hover:bg-[#43352D] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4 text-[#D4A373]" />
              <span>
                {isSubmitting ? 'Preparando pedido...' : 'Enviar Encomenda via WhatsApp'}
              </span>
            </button>

            <p className="text-[11px] text-center text-[#8C7A6B]">
              Seu pedido será direcionado diretamente para o WhatsApp oficial <strong>(11) 98115-0834</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
