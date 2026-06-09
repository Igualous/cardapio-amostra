import { useState, useMemo } from 'react';
import type { MenuItem, DishCategory } from './types/menu';
import { mockMenuItems } from './data/mockMenu';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuCard } from './components/MenuCard';
import { Cart } from './components/Cart';
import './App.css'

interface CartItem extends MenuItem {
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DishCategory | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return mockMenuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = activeCategory === null || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        favoriteCount={favorites.size}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo ao nosso Cardápio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra uma seleção cuidadosa de pratos deliciosos preparados com
            ingredientes frescos e de qualidade premium.
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="mb-6 text-center text-gray-600">
          <p>
            Mostrando <span className="font-bold text-gray-800">{filteredItems.length}</span> de{' '}
            <span className="font-bold text-gray-800">{mockMenuItems.length}</span> pratos
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onFavorite={handleToggleFavorite}
                isFavorite={favorites.has(item.id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Nenhum prato encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar sua busca ou filtros para encontrar o que você procura.
            </p>
          </div>
        )}
      </main>

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            © 2026 Cardápio Virtual. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App
