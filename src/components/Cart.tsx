import React from 'react';
import type { MenuItem } from '../types/menu';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-sm bg-charcoal shadow-2xl z-50 flex flex-col border-l border-gold border-opacity-15">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold border-opacity-15">
          <h2 className="text-lg font-bold text-cream">🛒 Seu Pedido</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-gold transition text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              <div className="text-4xl mb-4">🛒</div>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-dark bg-opacity-50 rounded-lg border border-gold border-opacity-10 hover:border-opacity-25 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.backgroundColor = '#3d2d15';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-cream line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gold mb-2">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                        className="px-2 py-0.5 text-xs border border-gold border-opacity-30 text-muted hover:text-gold rounded transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-cream">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-0.5 text-xs border border-gold border-opacity-30 text-muted hover:text-gold rounded transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto text-muted hover:text-gold transition text-lg leading-none"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gold border-opacity-15 p-6 space-y-4">
          <div className="flex justify-between items-center text-base">
            <span className="text-warm">Total:</span>
            <span className="text-2xl font-bold text-gold">R$ {total.toFixed(2)}</span>
          </div>
          <a
            href="https://wa.me/"
            className="block w-full bg-gold text-dark hover:bg-gold-lt text-center font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            Fazer Pedido via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};
