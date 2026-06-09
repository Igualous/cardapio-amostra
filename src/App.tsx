import { useState, useMemo } from 'react';
import type { MenuItem, DishCategory } from './types/menu';
import { mockMenuItems } from './data/mockMenu';
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
  const categories = Array.from(new Set(mockMenuItems.map(item => item.category)));

  return (
    <div className="bg-dark min-h-screen text-warm">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden" style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,147,42,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 80% 80%, rgba(200,147,42,0.08) 0%, transparent 60%)
        `,
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(200,147,42,0.04) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(200,147,42,0.04) 60px)
          `,
        }}></div>

        <div className="relative z-10">
          <p className="inline-block text-xs font-semibold tracking-widest text-gold border border-gold px-4 py-2 rounded-full mb-6">
            Cardápio Digital
          </p>
          <h1 className="font-playfair text-6xl lg:text-7xl font-black text-cream mb-4 leading-tight">
            Nosso<br /><span className="italic text-gold">Cardápio</span>
          </h1>
          <p className="text-muted text-base lg:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Descubra uma seleção cuidadosa de pratos deliciosos preparados com ingredientes frescos e de qualidade premium.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => {
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-7 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-lt transition">
              Ver Cardápio
            </button>
            <a href="https://wa.me/" className="px-7 py-3 border border-gold border-opacity-40 text-warm hover:border-gold hover:text-gold transition rounded-lg">
              📲 Fazer Pedido
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-muted text-xs tracking-widest animate-bounce">
          <span>↓</span>
          <span>Explorar</span>
        </div>
      </section>

      {/* INFO STRIP */}
      <div className="bg-charcoal border-t border-b border-gold border-opacity-15 flex justify-center flex-wrap">
        <div className="flex-1 min-w-max flex items-center gap-3 px-8 py-5 border-r border-gold border-opacity-10 last:border-r-0">
          <span className="text-2xl">🕐</span>
          <div className="text-sm">
            <strong className="block text-cream">Seg – Dom</strong>
            <span className="text-muted">11h às 23h</span>
          </div>
        </div>
        <div className="flex-1 min-w-max flex items-center gap-3 px-8 py-5 border-r border-gold border-opacity-10 last:border-r-0">
          <span className="text-2xl">🛵</span>
          <div className="text-sm">
            <strong className="block text-cream">Delivery</strong>
            <span className="text-muted">30–50 min • frete grátis acima de R$ 50</span>
          </div>
        </div>
        <div className="flex-1 min-w-max flex items-center gap-3 px-8 py-5 border-r border-gold border-opacity-10 last:border-r-0">
          <span className="text-2xl">📍</span>
          <div className="text-sm">
            <strong className="block text-cream">Local</strong>
            <span className="text-muted">Retirada no local</span>
          </div>
        </div>
        <div className="flex-1 min-w-max flex items-center gap-3 px-8 py-5 border-r border-gold border-opacity-10 last:border-r-0">
          <span className="text-2xl">💳</span>
          <div className="text-sm">
            <strong className="block text-cream">Aceitamos</strong>
            <span className="text-muted">Pix, cartão e dinheiro</span>
          </div>
        </div>
      </div>

      {/* NAV TABS */}
      <nav id="menu" className="sticky top-0 z-10 bg-dark bg-opacity-92 backdrop-blur border-b border-gold border-opacity-15 flex justify-center gap-1 px-4 py-3 overflow-x-auto">
        <button onClick={() => setActiveCategory(null)} className={`px-5 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
          activeCategory === null ? 'bg-gold bg-opacity-20 text-gold' : 'text-warm hover:text-gold'
        }`}>
          Todos
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat as DishCategory)} className={`px-5 py-2 rounded-md text-sm font-medium transition whitespace-nowrap capitalize ${
            activeCategory === cat ? 'bg-gold bg-opacity-20 text-white' : 'te xt-warm hover:text-gold'
          }`}>
            {cat}
          </button>
        ))}
      </nav>

      {/* SEARCH */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou descrição..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-3 bg-charcoal border border-gold border-opacity-20 rounded-lg text-warm placeholder-muted focus:outline-none focus:border-gold focus:border-opacity-40 transition"
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {filteredItems.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-cream mb-2">Nenhum prato encontrado</h3>
            <p className="text-muted">Tente ajustar sua busca ou filtros para encontrar o que você procura.</p>
          </div>
        )}
      </main>

      {/* CART BUBBLE */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-gold text-dark px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-gold-lt transition flex items-center gap-2 z-50"
        >
          🛒 Ver pedido <span className="bg-dark text-gold rounded-full w-6 h-6 flex items-center justify-center text-xs">{cartCount}</span>
        </button>
      )}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* FOOTER */}
      <footer className="bg-charcoal border-t border-gold border-opacity-8 text-center py-12 px-4 text-muted text-sm">
        <p className="font-playfair text-lg text-gold mb-2">Cardápio Digital</p>
        <p>© 2026</p>
      </footer>
    </div>
  );
}

export default App
