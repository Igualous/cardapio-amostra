import React from 'react';
import type { DishCategory } from '../types/menu';
import {
  Utensils,
  ChefHat,
  Leaf,
  Cake,
  Wine,
} from 'lucide-react';

const categoryConfig: Record<
  DishCategory,
  { label: string; icon: React.ReactNode }
> = {
  entradas: { label: 'Entradas', icon: <Utensils size={20} /> },
  principais: { label: 'Principais', icon: <ChefHat size={20} /> },
  acompanhamentos: { label: 'Acompanhamentos', icon: <Leaf size={20} /> },
  sobremesas: { label: 'Sobremesas', icon: <Cake size={20} /> },
  bebidas: { label: 'Bebidas', icon: <Wine size={20} /> },
};

interface CategoryFilterProps {
  activeCategory: DishCategory | null;
  onCategoryChange: (category: DishCategory | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories: DishCategory[] = [
    'entradas',
    'principais',
    'acompanhamentos',
    'sobremesas',
    'bebidas',
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {/* Botão "Todos" */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
          activeCategory === null
            ? 'bg-gold text-cream shadow-lg scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Utensils size={18} />
        Todos
      </button>

      {/* Botões de categorias */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            activeCategory === category
              ? 'bg-gold text-cream shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {categoryConfig[category].icon}
          {categoryConfig[category].label}
        </button>
      ))}
    </div>
  );
};
