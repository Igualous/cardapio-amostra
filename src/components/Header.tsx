import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoriteCount,
  onCartClick,
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">🍽️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cardápio</h1>
            <p className="text-xs text-gray-600">Cardápio Virtual</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-4">
          {/* Favoritos */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="text-red-500" size={24} fill="currentColor" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Carrinho */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="text-secondary" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
