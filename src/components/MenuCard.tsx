import React from 'react';
import type { MenuItem } from '../types/menu';

interface MenuCardProps {
  item: MenuItem;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onFavorite,
  isFavorite,
  onAddToCart,
}) => {
  return (
    <div className="bg-charcoal border border-gold border-opacity-10 rounded-xl overflow-hidden hover:border-gold hover:border-opacity-40 transition hover:-translate-y-0.5">
      {/* Imagem */}
      <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-yellow-900 to-yellow-950">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-2">
          {item.isVegan && (
            <span className="text-xs font-semibold tracking-widest text-gold bg-gold bg-opacity-12 px-2 py-1 rounded">
              Vegano
            </span>
          )}
          {item.isGlutenFree && (
            <span className="text-xs font-semibold tracking-widest text-gold bg-gold bg-opacity-12 px-2 py-1 rounded">
              Sem Glúten
            </span>
          )}
        </div>

        {/* Nome */}
        <h3 className="font-playfair text-lg font-bold text-cream mb-2 line-clamp-1">{item.name}</h3>

        {/* Descrição */}
        <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-gold">R$ {item.price.toFixed(2)}</div>
            <div className="text-xs text-muted">⏱️ {item.prepareTime}min</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onFavorite(item.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                isFavorite ? 'text-gold' : 'text-gold text-opacity-40 hover:text-opacity-100'
              }`}
            >
              ♥
            </button>
            <button
              onClick={() => onAddToCart(item)}
              className="w-8 h-8 border-1.5 border-gold bg-transparent text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
