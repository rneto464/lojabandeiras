import React, { useState, useContext } from 'react';
import { PackageOpen, ArrowDown, ChevronLeft, ChevronRight, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

export function Home() {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [material, setMaterial] = useState('Oxford');
    const [tamanhoId, setTamanhoId] = useState('o4'); // Default para 2 panos oxford
    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

    const [destaqueIndex, setDestaqueIndex] = useState(0);

    const destaques = [
        { id: 'kit-desfile', produto: 'Kit para Desfile: Mastro, Bandeira e Talabarte com Boldriê', secao: 'KITS COMPLETOS', preco: '1.450,00', extra: 'em até 10x sem juros', imagem: '/images/kitparadisfile.jpg' },
        { id: 'kit-fachada', produto: 'Kit Fachada com 3,10m de altura', secao: 'KITS EXTERNOS', preco: '890,00', extra: 'em até 6x sem juros', imagem: '/images/Kit Fachada com 3,10m de altura.jpeg', desconto: '10% OFF NO PIX' },
        { id: 'bandeiras-mundo', produto: 'Bandeiras de todos os países do mundo', secao: 'INTERNACIONAIS', preco: '76,00', extra: 'A partir de', imagem: '/images/Bandeirasdetodosospaísesdomundo.jpeg' },
        { id: 'rosetas-talabartes', produto: 'Rosetas e Talabartes personalizáveis', secao: 'ACESSÓRIOS', preco: '45,00', extra: 'À vista', imagem: '/images/roseta.png' },
        { id: 'mastro-aluminio', produto: 'Mastro em Alumínio 2,18m Diâmetro 28mm', secao: 'MASTROS', preco: '135,00', extra: 'ou em até 4x sem juros', desconto: '5% de DESCONTO no PIX', imagem: 'https://images.unsplash.com/photo-1625805541571-705a41142511?w=500&auto=format&fit=crop&q=60' },
        { id: 'canopla-aluminio', produto: 'Canopla de alumínio p/ base de madeira', secao: 'BASES', preco: '89,00', extra: 'ou em até 2x sem juros', imagem: 'https://images.unsplash.com/photo-1588169970908-1f1f7caab3c7?w=500&auto=format&fit=crop&q=60' },
    ];

    const bandeiraOficial = {
        'Oxford': [
            { id: 'o1', tamanho: '0.22m x 0.33m', medida: 'Oficial', preco: '22,00', parcelas: null, valorParcela: null },
            { id: 'o2', tamanho: '0.30m x 0.40m', medida: 'Oficial', preco: '25,00', parcelas: null, valorParcela: null },
            { id: 'o3', tamanho: '0.40m x 0.60m', medida: 'Oficial', preco: '28,00', parcelas: null, valorParcela: null },
            { id: 'o4', tamanho: '0.90m x 1.28m', medida: '2 Panos', preco: '96,00', parcelas: 2, valorParcela: '48,00' },
            { id: 'o5', tamanho: '1.12m x 1.60m', medida: '2 1/2 Panos', preco: '112,00', parcelas: 2, valorParcela: '56,00' },
            { id: 'o6', tamanho: '1.35m x 1.92m', medida: '3 Panos', preco: '156,00', parcelas: 3, valorParcela: '52,00' },
            { id: 'o7', tamanho: '1.80m x 2.56m', medida: '4 Panos', preco: '260,00', parcelas: 5, valorParcela: '52,00' },
            { id: 'o8', tamanho: '2.25m x 3.25m', medida: '5 Panos', preco: '420,00', parcelas: 6, valorParcela: '70,00' },
            { id: 'o9', tamanho: '2.70m x 3.90m', medida: '6 Panos', preco: '460,00', parcelas: 6, valorParcela: '76,66' },
            { id: 'o10', tamanho: '3.15m x 4.55m', medida: '7 Panos', preco: '540,00', parcelas: 6, valorParcela: '90,00' },
            { id: 'o11', tamanho: '3.60m x 5.20m', medida: '8 Panos', preco: '640,00', parcelas: 6, valorParcela: '106,66' },
            { id: 'o12', tamanho: '4.05m x 5.85m', medida: '9 Panos', preco: '1.100,00', parcelas: 10, valorParcela: '110,00' },
            { id: 'o13', tamanho: '4.50m x 6.50m', medida: '10 Panos', preco: '1.260,00', parcelas: 10, valorParcela: '126,00' },
            { id: 'o14', tamanho: '5.40m x 7.80m', medida: '12 Panos', preco: '1.390,00', parcelas: 10, valorParcela: '139,00' },
            { id: 'o15', tamanho: '5.85m x 8.45m', medida: '13 Panos', preco: '1.690,00', parcelas: 10, valorParcela: '169,00' },
            { id: 'o16', tamanho: '6.30m x 9.10m', medida: '14 / 20 Panos', preco: '2.060,00', parcelas: 10, valorParcela: '206,00' },
            { id: 'o17', tamanho: '10.40m x 7.20m', medida: '16 Panos', preco: '2.540,00', parcelas: 10, valorParcela: '254,00' },
        ],
        'Cetim': [
            { id: 'c1', tamanho: '0.90m x 1.28m', medida: '2 Panos', preco: '156,00', parcelas: 3, valorParcela: '52,00' },
            { id: 'c2', tamanho: '1.12m x 1.60m', medida: '2 1/2 Panos', preco: '172,00', parcelas: 3, valorParcela: '57,33' },
        ]
    };

    const tamanhosAtuais = bandeiraOficial[material];
    const produtoSelecionado = tamanhosAtuais.find(p => p.id === tamanhoId) || tamanhosAtuais[0];

    const handleMaterialChange = (novoMaterial) => {
        setMaterial(novoMaterial);
        // Ao mudar de material, selecionamos o tamanho equivalente (ou o primeiro da lista)
        const novoTamanhoDefault = bandeiraOficial[novoMaterial][0].id;
        setTamanhoId(novoTamanhoDefault);
    };

    const handleAddToCartFromCard = (e, item) => {
        e.stopPropagation(); // Evita navegar para a página do produto (se o card for clicável no futuro)
        
        const productToAdd = {
            id: item.id || `destaque-${Math.random().toString(36).substr(2, 9)}`,
            nome: item.produto,
            preco: item.preco,
            quantidade: 1,
            imagem: item.imagem || 'https://images.unsplash.com/photo-1526682847805-721837c3f83b?w=400&auto=format&fit=crop&q=60',
            material: 'Padrão',
            medida: item.extra || 'Padrão',
            tipo: item.secao || 'Destaque'
        };

        addToCart(productToAdd);




    };

    const handleAddToCart = () => {
        const item = {
            id: 'bnd-ofic-01',
            nome: 'Bandeira Oficial',
            sku: 'BND-OFIC-01',
            imagemPrincipal: '/images/Captura de tela 2026-03-05 192431.png',
            material: material,
            tamanhoId: produtoSelecionado.id,
            tamanho: `${produtoSelecionado.tamanho} (${produtoSelecionado.medida})`,
            preco: produtoSelecionado.preco,
            quantidade: 1
        };

        addToCart(item);
        navigate('/checkout');
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(300px, 40vw, 500px)', // Responsivo: mínimo 300px, máximo 500px
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                textAlign: 'center',
                paddingBottom: '3rem',
                backgroundImage: 'url("/images/banner_principal.png")',
                backgroundColor: '#2d6ab4ff', // Cor de fundo clara caso a imagem demore a carregar
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 3, padding: '0 2rem' }}>
                    <button
                        className="btn-primary"
                        style={{ fontSize: '1.2rem', padding: '1rem 2.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
                        onClick={() => navigate('/produtos')}
                    >
                        Ver Mais Produtos
                        <ArrowDown size={20} style={{ marginLeft: '8px' }} />
                    </button>
                </div>

                {/* Decorative gradient overlay at bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '150px',
                    background: 'linear-gradient(to bottom, rgba(248, 249, 250, 0) 0%, rgba(248, 249, 250, 1) 100%)',
                    zIndex: 2
                }} />
            </section>

            {/* Category Mini Banners Section */}
            <section style={{ padding: '2rem 0', backgroundColor: 'var(--bg-color)', zIndex: 5, position: 'relative', marginTop: '-2rem' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1rem'
                    }}>
                        {/* 1. Wind Banner */}
                        <div
                            onClick={() => navigate('/produtos')}
                            style={{
                                cursor: 'pointer',
                                height: '200px',
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                color: 'var(--dark-blue)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                            }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', lineHeight: '1.1', zIndex: 2, color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                                WIND<br />BANNER
                            </h3>
                            {/* Imagem de Wind Banner */}
                            <img src="/images/windbanner.png" alt="Wind Banner" style={{ position: 'absolute', right: '-20px', top: 0, height: '100%' }} />
                        </div>

                        {/* 2. Bandeiras de Mesa */}
                        <div
                            onClick={() => navigate('/produtos')}
                            style={{
                                cursor: 'pointer',
                                height: '200px',
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                color: 'var(--dark-blue)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                            }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', lineHeight: '1.1', zIndex: 2, textAlign: 'right', color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                                BANDEIRAS<br />DE MESA
                            </h3>
                            {/* Imagem de Bandeiras de Mesa */}
                            <img src="/images/bandeirasdemesa.png" alt="Bandeiras de Mesa" style={{ position: 'absolute', left: 0, bottom: '-20px', height: '120%' }} />
                        </div>

                        {/* 3. Kits de Bandeiras */}
                        <div
                            onClick={() => navigate('/produtos')}
                            style={{
                                cursor: 'pointer',
                                height: '200px',
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                color: 'var(--dark-blue)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                            }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', lineHeight: '1.2', zIndex: 2, textAlign: 'right', color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                                KITS DE<br />1, 2 OU 3<br />BANDEIRAS!
                            </h3>
                            {/* Imagem de Kits */}
                            <img src="/images/kitc3 .png" alt="Kits de Bandeiras" style={{ position: 'absolute', left: '-20px', bottom: '-40px', height: '150%' }} />
                        </div>

                        {/* 4. SUA MARCA AQUI / Orçamento */}
                        <div
                            onClick={() => {
                                const section = document.getElementById('produtos');
                                if (section) {
                                    const offsetTop = section.getBoundingClientRect().top + window.scrollY;
                                    window.scrollTo({ top: offsetTop - 80, behavior: 'smooth' });
                                }
                            }}
                            style={{
                                cursor: 'pointer',
                                height: '200px',
                                backgroundColor: '#4a6b8c', // Azul meio acinzentado do céu na referênca
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {/* Imagem de Fundo Completa */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundImage: 'url("/images/bandeiraatletica.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'brightness(0.6)',
                                zIndex: 1
                            }}></div>

                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', zIndex: 2, textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', marginBottom: '1rem', letterSpacing: '1px', color: '#ffffff' }}>
                                SUA MARCA<br />AQUI
                            </h3>
                            <span style={{ zIndex: 2, fontSize: '0.9rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', textAlign: 'center', position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
                                PERSONALIZE<br />DO SEU JEITO!
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Carousel Section */}
            <section style={{ padding: '5rem 0 2rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)', margin: 0 }}>Produtos em Destaque</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
                                Selecionados especialmente para você
                            </p>
                        </div>

                        {/* Controles do Carrossel */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setDestaqueIndex(Math.max(0, destaqueIndex - 1))}
                                disabled={destaqueIndex === 0}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    backgroundColor: destaqueIndex === 0 ? 'var(--bg-color)' : 'white',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: destaqueIndex === 0 ? 'not-allowed' : 'pointer',
                                    color: destaqueIndex === 0 ? '#ccc' : 'var(--dark-blue)',
                                    transition: 'all 0.2s',
                                    boxShadow: destaqueIndex === 0 ? 'none' : '0 2px 5px rgba(0,0,0,0.05)'
                                }}>
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setDestaqueIndex(Math.min(destaques.length - 4, destaqueIndex + 1))}
                                disabled={destaqueIndex >= destaques.length - 4}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    backgroundColor: destaqueIndex >= destaques.length - 4 ? 'var(--bg-color)' : 'white',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: destaqueIndex >= destaques.length - 4 ? 'not-allowed' : 'pointer',
                                    color: destaqueIndex >= destaques.length - 4 ? '#ccc' : 'var(--dark-blue)',
                                    transition: 'all 0.2s',
                                    boxShadow: destaqueIndex >= destaques.length - 4 ? 'none' : '0 2px 5px rgba(0,0,0,0.05)'
                                }}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div style={{ overflow: 'hidden', padding: '0.5rem' }}>
                        <div style={{
                            display: 'flex',
                            gap: '2rem',
                            transition: 'transform 0.4s ease-out',
                            transform: `translateX(calc(-${destaqueIndex * 25}% - ${destaqueIndex * 0.5}rem))`
                        }}>
                            {destaques.map((item, i) => (
                                <div key={`dest-${i}`} style={{ flex: '0 0 calc(25% - 1.5rem)', minWidth: 0, maxWidth: 'calc(25% - 1.5rem)' }}>
                                    <div
                                        onClick={() => {
                                            navigate(`/produto/${item.id}`);
                                        }}
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border-color)',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            cursor: 'pointer',
                                            height: '100%',
                                            ':hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                                            }
                                        }}>
                                        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', backgroundColor: '#fdfdfd', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                                            <img
                                                src={item.imagem || 'https://images.unsplash.com/photo-1526682847805-721837c3f83b?w=400&auto=format&fit=crop&q=60'}
                                                alt={item.produto}
                                                style={{ width: '100%', height: '180px', objectFit: 'contain' }}
                                            />
                                            {item.desconto && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    right: '10px',
                                                    backgroundColor: '#dc2626',
                                                    color: 'white',
                                                    padding: '0.4rem',
                                                    borderRadius: '50%',
                                                    width: '60px',
                                                    height: '60px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.55rem',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    lineHeight: 1.1
                                                }}>
                                                    {item.desconto}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                                                Seção: {item.secao}
                                            </span>
                                            <h3 style={{ fontSize: '1.1rem', color: 'var(--dark-blue)', marginBottom: 'auto', lineHeight: 1.3, fontWeight: '600' }}>
                                                {item.produto}
                                            </h3>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>A partir de</span>
                                                    <div style={{ color: 'var(--dark-blue)', fontWeight: '700', fontSize: '1.4rem' }}>
                                                        R$ {item.preco}
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.extra}</span>
                                                </div>

                                                <button 
                                                    onClick={(e) => handleAddToCartFromCard(e, item)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: 'var(--dark-blue)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.2s',
                                                    }}
                                                >
                                                    <ShoppingCart size={22} style={{ marginBottom: '0.2rem' }} />
                                                    <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>Adicionar<br />ao Carrinho</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="produtos" style={{ padding: '5rem 0 8rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <div style={{ marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 1rem',
                            backgroundColor: 'rgba(235, 178, 22, 0.1)',
                            color: 'var(--primary-yellow)',
                            borderRadius: '20px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            marginBottom: '1rem'
                        }}>Categoria: Bandeiras Oficiais</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)' }}>Faça seu Orçamento</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(300px, 450px) 1fr',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* Imagem do Produto */}
                        <div>
                            <div style={{
                                backgroundColor: 'var(--surface-color)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                padding: '2rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img
                                    src="/images/bandeira-brasil.jpeg"
                                    alt="Bandeira Oficial"
                                    style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '4px' }}
                                />
                            </div>
                        </div>

                        {/* Opções de Compra - NEW 2-COLUMN LAYOUT */}
                        <div style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(250px, 1fr) minmax(300px, 1.5fr)',
                                gap: '2rem',
                                alignItems: 'start'
                            }}>
                                {/* Left Column: Product Info */}
                                <div style={{ height: '100%' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>Bandeira Oficial</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>SKU: BND-OFIC-01</p>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--dark-blue)' }}>
                                            <span style={{ fontSize: '1.5rem', marginRight: '0.25rem' }}>R$</span>
                                            {produtoSelecionado.preco}
                                        </div>
                                        {produtoSelecionado.parcelas && (
                                            <div style={{ color: '#16a34a', fontWeight: '600' }}>
                                                ou em até {produtoSelecionado.parcelas}x de R$ {produtoSelecionado.valorParcela} sem juros
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Selections and Buy Button */}
                                <div>
                                    {/* Passo 1: Material */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ backgroundColor: 'var(--dark-blue)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
                                            Selecione o Material
                                        </h4>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            {['Oxford', 'Cetim'].map(mat => (
                                                <button
                                                    key={mat}
                                                    onClick={() => handleMaterialChange(mat)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        border: material === mat ? '2px solid var(--primary-yellow)' : '1px solid var(--border-color)',
                                                        backgroundColor: material === mat ? 'rgba(235, 178, 22, 0.05)' : 'white',
                                                        borderRadius: '8px',
                                                        fontWeight: '600',
                                                        color: material === mat ? 'var(--dark-blue)' : 'var(--text-secondary)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {mat}
                                                </button>
                                            ))}
                                        </div>
                                        {/* Optional helper text below material - made smaller to save space */}
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                            {material === 'Oxford' ? 'Oxford: Uso externo/interno (Dupla face).' : 'Cetim: Brilho sofisticado para solenidades.'}
                                        </p>
                                    </div>

                                    {/* Passo 2: Tamanho */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ backgroundColor: 'var(--dark-blue)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
                                            Selecione o Tamanho
                                        </h4>

                                        {/* Tamanho Selecionado (Preview) */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <button
                                                onClick={() => setIsSizeModalOpen(true)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid var(--dark-blue)',
                                                    backgroundColor: 'var(--dark-blue)',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <span style={{ fontWeight: '600', color: 'white', fontSize: '1.1rem' }}>
                                                    {produtoSelecionado.tamanho}
                                                </span>
                                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.15rem' }}>
                                                    {produtoSelecionado.medida}
                                                </span>
                                            </button>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setIsSizeModalOpen(true)}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                backgroundColor: 'transparent',
                                                border: '1px dashed var(--dark-blue)',
                                                color: 'var(--dark-blue)',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontSize: '0.9rem'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.backgroundColor = 'rgba(21, 50, 91, 0.05)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            Alterar Tamanho / Ver Todos
                                        </button>
                                    </div>

                                    {/* Passo 3: Comprar */}
                                    <div style={{ paddingTop: '1rem' }}>
                                        <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={handleAddToCart}>
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </section>

            {/* Sizes Modal */}
            {isSizeModalOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem',
                        backdropFilter: 'blur(3px)'
                    }}
                    onClick={() => setIsSizeModalOpen(false)}
                >
                    <div 
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            width: '100%',
                            maxWidth: '700px',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-blue)', margin: 0 }}>Selecione o Tamanho ({material})</h3>
                            <button 
                                onClick={() => setIsSizeModalOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            {(() => {
                                const mesaMao = tamanhosAtuais.filter(t => ['o1', 'o2', 'o3'].includes(t.id));
                                const padrao = tamanhosAtuais.filter(t => ['o4', 'o5', 'o6', 'o7', 'c1', 'c2'].includes(t.id));
                                const gigante = tamanhosAtuais.filter(t => !['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'c1', 'c2'].includes(t.id));

                                const renderModalGroup = (title, items) => {
                                    if (items.length === 0) return null;
                                    return (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h5 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{title}</h5>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                                                {items.map(t => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => {
                                                            setTamanhoId(t.id);
                                                            setIsSizeModalOpen(false);
                                                        }}
                                                        style={{
                                                            padding: '0.75rem',
                                                            border: tamanhoId === t.id ? '2px solid var(--dark-blue)' : '1px solid var(--border-color)',
                                                            backgroundColor: tamanhoId === t.id ? 'var(--dark-blue)' : 'white',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            minHeight: '80px',
                                                            boxShadow: tamanhoId === t.id ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (tamanhoId !== t.id) {
                                                                e.currentTarget.style.borderColor = 'var(--text-secondary)';
                                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                            }
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (tamanhoId !== t.id) {
                                                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                                                e.currentTarget.style.backgroundColor = 'white';
                                                            }
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: '600', color: tamanhoId === t.id ? 'white' : 'var(--dark-blue)', fontSize: '1rem' }}>
                                                            {t.tamanho}
                                                        </span>
                                                        <span style={{ fontSize: '0.8rem', color: tamanhoId === t.id ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)', marginTop: '0.25rem', textAlign: 'center' }}>
                                                            {t.medida}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                };

                                return (
                                    <>
                                        {renderModalGroup('Linha Mesa/Mão (0.22m a 0.60m)', mesaMao)}
                                        {renderModalGroup('Linha Padrão / Mastros Menores (2 a 4 Panos)', padrao)}
                                        {renderModalGroup('Linha Gigante (5 a 16 Panos)', gigante)}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {/* Notification when adding directly from card */}
            {false && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#16a34a', // Verde sucesso
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontWeight: '600',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <ShoppingCart size={20} />
                    Produto adicionado ao carrinho!
                </div>
            )}

        </div>
    );
}
