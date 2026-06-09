import React from 'react';
import type { MenuItem } from '../types/menu';
import { ShoppingCart, X } from 'lucide-react';

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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-secondary" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Seu Pedido</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart size={48} className="mb-4 opacity-50" />
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span className="text-secondary">R$ {total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-secondary hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
};
