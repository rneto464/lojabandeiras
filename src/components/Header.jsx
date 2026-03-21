import React, { useState, useRef, useEffect, useContext } from 'react';
import { ShoppingCart, LogOut, Package, Trash2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // Fechar carrinho e favoritos ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setIsFavoritesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Formata moeda
  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <header style={{ backgroundColor: 'var(--surface-color)', padding: '1rem 0', position: 'relative', zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--dark-blue)', margin: 0 }}>
            BandeirasJA
          </span>
        </Link>

        <nav>
          <ul style={{ display: 'flex', gap: '2rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Início</Link></li>
            <li><Link to="/produtos" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Produtos</Link></li>
            <li><Link to="/sobre" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sobre</Link></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Falsos Dropdown: Favoritos */}
          <div ref={favoritesRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setIsFavoritesOpen(!isFavoritesOpen); setIsCartOpen(false); }}
              style={{
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                borderRadius: '6px',
                backgroundColor: isFavoritesOpen ? 'var(--bg-color)' : 'var(--surface-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
                position: 'relative'
              }}
            >
              <Heart size={20} color="var(--dark-blue)" fill={favorites.length > 0 ? '#ef4444' : 'none'} stroke={favorites.length > 0 ? '#ef4444' : 'currentColor'} />
              {favorites.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--primary-yellow)',
                  color: 'var(--dark-blue)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '50%',
                  width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Dropdown de Favoritos */}
            {isFavoritesOpen && (
              <div style={{
                position: 'absolute', top: '120%', right: '0', width: '300px', backgroundColor: 'var(--surface-color)',
                borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)',
                overflow: 'hidden', animation: 'slideDown 0.2s ease-out forwards'
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-color)' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)' }}>Meus Favoritos</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{favorites.length} itens</span>
                </div>

                {favorites.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                    <Heart size={40} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Nenhum favorito selecionado.</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '1rem' }}>
                    {favorites.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: index !== favorites.length - 1 ? '1rem' : '0', paddingBottom: index !== favorites.length - 1 ? '1rem' : '0', borderBottom: index !== favorites.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                        <img src={item.imagemPrincipal || 'https://images.unsplash.com/photo-1526682847805-721837c3f83b?w=200&auto=format&fit=crop&q=60'} alt={item.produto} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                        <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => { setIsFavoritesOpen(false); navigate(`/produto/${item.id}`); }}>
                          <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', color: 'var(--dark-blue)' }}>{item.produto || item.nome}</h4>
                          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--dark-blue)' }}>R$ {item.preco}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); removeFromFavorites(item.id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem', height: 'fit-content' }} title="Remover dos favoritos">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div ref={cartRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setIsCartOpen(!isCartOpen); setIsFavoritesOpen(false); }}
              style={{
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                borderRadius: '6px',
                backgroundColor: isCartOpen ? 'var(--bg-color)' : 'var(--surface-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
                position: 'relative'
              }}
            >
              <ShoppingCart size={20} color="var(--dark-blue)" />
              {/* Badge de quantidade com número do context */}
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'var(--primary-yellow)',
                  color: 'var(--dark-blue)',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dropdown do Carrinho */}
            {isCartOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: '0',
                width: '360px',
                backgroundColor: 'var(--surface-color)',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                animation: 'slideDown 0.2s ease-out forwards'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-color)'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)' }}>Meu Carrinho</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cartCount} itens</span>
                </div>

                {cartItems.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                    <Package size={40} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Seu carrinho está vazio
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                      <button
                        onClick={() => { setIsCartOpen(false); navigate('/produtos'); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-yellow)',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          textDecoration: 'underline'
                        }}
                      >
                        Continuar comprando
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '1rem' }}>
                      {cartItems.map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          gap: '1rem',
                          marginBottom: index !== cartItems.length - 1 ? '1rem' : '0',
                          paddingBottom: index !== cartItems.length - 1 ? '1rem' : '0',
                          borderBottom: index !== cartItems.length - 1 ? '1px solid var(--border-color)' : 'none'
                        }}>
                          <img
                            src={item.image || item.imagemPrincipal || 'https://images.unsplash.com/photo-1526682847805-721837c3f83b?w=200&auto=format&fit=crop&q=60'}
                            alt={item.nome || item.produto}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                          />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '0.9rem', color: 'var(--dark-blue)' }}>{item.nome || item.produto}</h4>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                              {item.material} {item.tamanho && `| ${item.tamanho}`}
                            </p>

                            {/* Controles de Quantidade */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                              }}>
                                <button
                                  onClick={() => updateQuantity(index, -1)}
                                  style={{ background: 'var(--surface-color)', border: 'none', padding: '0.1rem 0.4rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1rem', transition: 'background-color 0.2s' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--surface-color)'}
                                >-</button>
                                <span style={{ padding: '0 0.5rem', fontSize: '0.8rem', color: 'var(--dark-blue)', minWidth: '20px', textAlign: 'center' }}>
                                  {item.quantidade}
                                </span>
                                <button
                                  onClick={() => updateQuantity(index, 1)}
                                  style={{ background: 'var(--surface-color)', border: 'none', padding: '0.1rem 0.4rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1rem', transition: 'background-color 0.2s' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--surface-color)'}
                                >+</button>
                              </div>
                            </div>

                            <div style={{ fontWeight: '600', color: 'var(--dark-blue)', marginTop: '0.3rem', fontSize: '0.9rem' }}>
                              R$ {item.preco}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem', height: 'fit-content' }}
                            title="Remover"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: '500', color: 'var(--dark-blue)' }}>Total:</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)', fontSize: '1.1rem' }}>{formatPrice(cartTotal)}</span>
                      </div>
                      <button
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.75rem' }}
                        onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                      >
                        Finalizar Compra
                      </button>
                      <button
                        onClick={() => { setIsCartOpen(false); navigate('/produtos'); }}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          marginTop: '0.5rem',
                          background: 'none',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--surface-color)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        Adicionar mais produtos
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
