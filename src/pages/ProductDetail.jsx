import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';
import { produtosDB } from '../data/produtos';

export function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Formata o nome pelo ID se não tiver no DB
    const idFormatado = id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Produto';

    const produto = produtosDB[id] || {
        ...produtosDB['premium-meia'],
        id,
        nome: `${idFormatado}`,
        sku: `SKU-${id.substring(0, 6).toUpperCase()}`
    };

    const [materialSelecionado, setMaterialSelecionado] = useState(produto.materiaisDisponiveis[0]);
    const [tamanhoId, setTamanhoId] = useState(produto.tamanhos[0].id);
    const [precoAtual, setPrecoAtual] = useState(produto.tamanhos[0].precos[materialSelecionado]);

    useEffect(() => {
        const tam = produto.tamanhos.find(t => t.id === tamanhoId);
        if (tam && tam.precos[materialSelecionado]) {
            setPrecoAtual(tam.precos[materialSelecionado]);
        }
    }, [materialSelecionado, tamanhoId, produto]);

    const { addToCart } = useContext(CartContext);
    const { isFavorite, addToFavorites } = useContext(FavoritesContext);

    const isFav = isFavorite(produto.id);

    const handleAddToCart = () => {
        const tamanhoSelecionado = produto.tamanhos.find(t => t.id === tamanhoId);

        const item = {
            id: produto.id,
            nome: produto.nome,
            sku: produto.sku,
            imagemPrincipal: produto.imagemPrincipal,
            material: materialSelecionado,
            tamanhoId: tamanhoId,
            tamanho: tamanhoSelecionado ? `${tamanhoSelecionado.tamanho} (${tamanhoSelecionado.medida})` : '',
            preco: precoAtual,
            quantidade: 1
        };

        addToCart(item);
    };

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '6rem 0 8rem 0' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* Breadcrumb da foto referencial */}
                <div style={{ marginBottom: '2rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Categoria: <Link to="/produtos" style={{ color: 'var(--dark-blue)', textDecoration: 'none' }}>Bandeiras Estados</Link>
                    </span>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* COLUNA ESQUERDA: Imagem Principal e Galeria */}
                    <div>
                        <div style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <img
                                src={produto.imagemPrincipal}
                                alt={produto.nome}
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <button style={{
                                backgroundColor: '#757575',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}>
                                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>⊕</span> Clique para ampliar imagem
                            </button>
                        </div>

                        {/* Miniaturas da Galeria */}
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            {produto.galeria.map((img, index) => (
                                <div key={index} style={{
                                    width: '70px',
                                    height: '50px',
                                    border: '1px solid var(--border-color)',
                                    padding: '2px',
                                    cursor: 'pointer'
                                }}>
                                    <img src={img} alt={`Miniatura ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                            {/* Botão ilustrativo vermelho "Play" semelhante ao da print */}
                            <div style={{
                                width: '70px',
                                height: '50px',
                                backgroundColor: '#f44336',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1.5rem'
                            }}>
                                ▶
                            </div>
                        </div>
                    </div>

                    {/* COLUNA DIREITA: Info e Compra */}
                    <div>
                        <h1 style={{ fontSize: '2rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', fontWeight: '700' }}>
                            {produto.nome}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingBottom: '0.2rem' }}>
                            SKU: {produto.sku}
                        </p>

                        {/* Marcação de Estrelas */}
                        <div style={{ display: 'flex', gap: '0.1rem', color: '#e0e0e0', marginBottom: '0.5rem' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={15} fill={i < produto.estrelas ? "#e0e0e0" : "none"} strokeWidth={0} />)}
                        </div>

                        <p style={{ color: 'var(--dark-blue)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Marca: <span style={{ fontWeight: '600', color: 'var(--dark-blue)' }}>{produto.marca}</span>
                        </p>

                        {/* Preço Dinâmico */}
                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '1rem', marginTop: '0.6rem', marginRight: '0.2rem', color: 'var(--dark-blue)', fontWeight: '700' }}>R$</span>
                            <span style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--dark-blue)' }}>{precoAtual}</span>
                        </div>

                        <p style={{ fontSize: '0.95rem', color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>
                            Selecione as opções abaixo
                        </p>

                        {/* Passo 1 - Material */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                <span style={{ backgroundColor: 'var(--dark-blue)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>1</span>
                                Selecione
                            </h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {produto.materiaisDisponiveis.map(mat => (
                                    <button
                                        key={mat}
                                        onClick={() => setMaterialSelecionado(mat)}
                                        style={{
                                            padding: '0.6rem 2.5rem',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'white',
                                            borderRadius: '2px',
                                            fontSize: '0.9rem',
                                            fontWeight: materialSelecionado === mat ? '700' : '400',
                                            color: materialSelecionado === mat ? 'var(--dark-blue)' : '#757575',
                                            cursor: 'pointer',
                                            boxShadow: materialSelecionado === mat ? 'inset 0 0 0 1px var(--dark-blue), 0 0 0 1px var(--dark-blue)' : 'none',
                                            transition: 'all 0.1s'
                                        }}
                                    >
                                        {mat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Passo 2 - Tamanho */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                <span style={{ backgroundColor: 'var(--dark-blue)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>2</span>
                                Selecione
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: '0.5rem' }}>
                                {produto.tamanhos.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTamanhoId(t.id)}
                                        style={{
                                            padding: '0.6rem 0.2rem',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'white',
                                            borderRadius: '2px',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            boxShadow: tamanhoId === t.id ? 'inset 0 0 0 1px var(--dark-blue), 0 0 0 1px var(--dark-blue)' : 'none',
                                            color: tamanhoId === t.id ? 'var(--dark-blue)' : '#757575',
                                            transition: 'all 0.1s'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.8rem', marginBottom: '0.2rem', fontWeight: tamanhoId === t.id ? '600' : '400' }}>{t.tamanho}</div>
                                        <div style={{ fontSize: '0.7rem' }}>{t.medida}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Passo 3 - Ação */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div
                                onClick={handleAddToCart}
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.7rem',
                                    flex: 1,
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = 0.9}
                                onMouseLeave={(e) => e.target.style.opacity = 1}
                            >
                                <span style={{ backgroundColor: 'white', color: 'var(--dark-blue)', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>3</span>
                                Adicionar ao Carrinho
                            </div>

                            <div
                                onClick={() => addToFavorites(produto)}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    padding: '1rem',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: isFav ? '#fef2f2' : 'white',
                                    borderColor: isFav ? '#fca5a5' : 'var(--border-color)',
                                    transition: 'all 0.2s',
                                    width: '56px',
                                    height: '56px'
                                }}
                                title={isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                            >
                                <Heart size={24} color={isFav ? '#ef4444' : '#9ca3af'} fill={isFav ? '#ef4444' : 'none'} style={{ transition: 'all 0.2s' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
