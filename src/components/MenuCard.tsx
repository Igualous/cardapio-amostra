import React, { useState } from 'react';
import type { MenuItem } from '../types/menu';
import { Heart, Clock, Flame } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Imagem */}
      <div
        className="relative h-48 overflow-hidden bg-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Badge de Favorito */}
        <button
          onClick={() => onFavorite(item.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-secondary hover:text-white transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-current text-accent' : ''}
            color={isFavorite ? '#EF4444' : '#1F2937'}
          />
        </button>

        {/* Badges de filtros */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isVegan && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Vegano
            </span>
          )}
          {item.isGlutenFree && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Sem Glúten
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome e Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1">{item.name}</h3>
          <div className="flex items-center gap-1 ml-2">
            <span className="text-yellow-500 font-semibold">{item.rating}</span>
            <span className="text-yellow-500">★</span>
            <span className="text-xs text-gray-500">({item.votes})</span>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        {/* Info de tempo e calorias */}
        <div className="flex gap-3 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{item.prepareTime}min</span>
          </div>
          {item.calories && (
            <div className="flex items-center gap-1">
              <Flame size={14} />
              <span>{item.calories}cal</span>
            </div>
          )}
        </div>

        {/* Preço e Botão */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-2xl font-bold text-secondary">
            R$ {item.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-primary hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
