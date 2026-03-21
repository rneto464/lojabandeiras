import React, { useRef, useState, useContext, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Heart, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FavoritesContext from '../context/FavoritesContext';
import CartContext from '../context/CartContext';

export function Products() {
    const navigate = useNavigate();
    const location = useLocation();
    const carouselRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const categorias = [
        {
            id: 'premium-oxford',
            titulo: '1. Bandeiras Oficiais (Brasil e Estados)',
            descricao: 'Linha fabricada em Oxford 100% ou Cetim de seda, com leitura correta dos dois lados.',
            imagemBanner: '/images/bandeira-oficial-dobrada.png',
            itens: [
                { id: 'ofic-022', produto: 'Bandeira 0,22 x 0,33m', secao: 'OFICIAL DUPLA FACE', preco: '22,00', extra: '(Oxford)', imagem: '/images/Bandeira 0,22 x 0,33m.png' },
                { id: 'ofic-030', produto: 'Bandeira 0,30 x 0,40m', secao: 'OFICIAL DUPLA FACE', preco: '25,00', extra: '(Oxford)', imagem: '/images/Bandeira 0,30 x 0,40m.png' },
                { id: 'ofic-040', produto: 'Bandeira 0,40 x 0,60m', secao: 'OFICIAL DUPLA FACE', preco: '28,00', extra: '(Oxford)', imagem: '/images/Bandeira 0,40 x 0,60m.png' },
                { id: 'ofic-2panos', produto: 'Bandeira 2 Panos (0,90 x 1,28m)', secao: 'OFICIAL DUPLA FACE', preco: '96,00', extra: '(Oxford) / R$156 (Cetim)', imagem: '/images/Bandeira 2 Panos (0,90 x 1,28m).png' },
                { id: 'ofic-2meia', produto: 'Bandeira 2 1/2 Panos (1,12 x 1,60m)', secao: 'OFICIAL DUPLA FACE', preco: '112,00', extra: '(Oxford) / R$172 (Cetim)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-3panos', produto: 'Bandeira 3 Panos (1,35 x 1,92m)', secao: 'OFICIAL DUPLA FACE', preco: '156,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-4panos', produto: 'Bandeira 4 Panos (1,80 x 2,56m)', secao: 'OFICIAL DUPLA FACE', preco: '260,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-5panos', produto: 'Bandeira 5 Panos (2,25 x 3,25m)', secao: 'OFICIAL DUPLA FACE', preco: '420,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-6panos', produto: 'Bandeira 6 Panos (2,70 x 3,90m)', secao: 'OFICIAL DUPLA FACE', preco: '460,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-7panos', produto: 'Bandeira 7 Panos (3,15 x 4,55m)', secao: 'OFICIAL DUPLA FACE', preco: '540,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-8panos', produto: 'Bandeira 8 Panos (3,60 x 5,20m)', secao: 'OFICIAL DUPLA FACE', preco: '640,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-9panos', produto: 'Bandeira 9 Panos (4,05 x 5,85m)', secao: 'OFICIAL DUPLA FACE', preco: '1.100,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-10panos', produto: 'Bandeira 10 Panos (4,50 x 6,50m)', secao: 'OFICIAL DUPLA FACE', preco: '1.260,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-12panos', produto: 'Bandeira 12 Panos (5,40 x 7,80m)', secao: 'OFICIAL DUPLA FACE', preco: '1.390,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-13panos', produto: 'Bandeira 13 Panos (5,85 x 8,45m)', secao: 'OFICIAL DUPLA FACE', preco: '1.690,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-14panos', produto: 'Bandeira 14/20 Panos (6,30 x 9,10m)', secao: 'OFICIAL DUPLA FACE', preco: '2.060,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' },
                { id: 'ofic-16panos', produto: 'Bandeira 16 Panos (10,40 x 7,20m)', secao: 'OFICIAL DUPLA FACE', preco: '2.540,00', extra: '(Oxford)', imagem: '/images/bandeira-oficial-dobrada.png' }
            ]
        },
        {
            id: 'empresariais',
            titulo: '2. Bandeiras Empresariais, Municipais e Internacionais',
            descricao: 'Linha personalizada e institucional com aplicação Dupla Face Oficial.',
            imagemBanner: '/images/bandeira-empresarial-nova.png',
            itens: [
                { id: 'emp-2panos', produto: 'Bandeira 0,90 x 1,28m', secao: 'INSTITUCIONAL', preco: '126,00', extra: '(Oxford) / R$156 (Cetim)', imagem: '/images/bandeira-empresarial-nova.png' },
                { id: 'emp-2meia', produto: 'Bandeira 1,12 x 1,60m', secao: 'INSTITUCIONAL', preco: '146,00', extra: '(Oxford) / R$172 (Cetim)', imagem: '/images/bandeira-empresarial-nova.png' },
                { id: 'emp-3panos', produto: 'Bandeira 1,35 x 1,92m', secao: 'INSTITUCIONAL', preco: '162,00', extra: '(Oxford)', imagem: '/images/bandeira-empresarial-nova.png' },
                { id: 'emp-4panos', produto: 'Bandeira 1,80 x 2,56m', secao: 'INSTITUCIONAL', preco: '286,00', extra: '(Oxford)', imagem: '/images/bandeira-empresarial-nova.png' }
            ]
        },
        {
            id: 'bases-gala',
            titulo: '3. Bases de Gala para Mastros',
            descricao: 'Suportes de chão elegantes para gabinetes e eventos.',
            imagemBanner: '/images/base-madeira.png',
            itens: [
                { id: 'base-mad-2', produto: 'Base Madeira (Cromada) - 2 Furos', secao: 'BASES', preco: '240,00', extra: '20x12x22', imagem: '/images/base-madeira.png' },
                { id: 'base-mad-3', produto: 'Base Madeira (Cromada) - 3 Furos', secao: 'BASES', preco: '270,00', extra: '45x22x12', imagem: '/images/base-madeira.png' },
                { id: 'base-mad-4', produto: 'Base Madeira (Cromada) - 4 Furos', secao: 'BASES', preco: '340,00', extra: '50x22x15', imagem: '/images/base-madeira.png' },
                { id: 'base-mad-5', produto: 'Base Madeira (Cromada) - 5 Furos', secao: 'BASES', preco: '390,00', extra: '50x22x15', imagem: '/images/base-madeira.png' },
                { id: 'base-alu-1', produto: 'Base Alumínio (Redonda Cromada) - 1 Furo', secao: 'BASES', preco: '170,00', extra: '29x29', imagem: '/images/base-madeira.png' }
            ]
        },
        {
            id: 'mastros',
            titulo: '4. Mastros',
            descricao: 'Estruturas para sustentação e desfile.',
            imagemBanner: '/images/mastro-madeira.png',
            itens: [
                { id: 'mastro-2m', produto: 'Mastro Alumínio/Madeira (2 Metros) c/ Lança', secao: 'MASTROS', preco: '132,00', extra: 'Ideal p/ 0,90 x 1,30m', imagem: '/images/mastro-madeira.png' },
                { id: 'mastro-2-20m', produto: 'Mastro Alumínio 28mm (2,20 Metros) c/ Lança', secao: 'MASTROS', preco: '146,00', extra: 'Dividido em 2 partes', imagem: '/images/mastro-madeira.png' }
            ]
        },
        {
            id: 'acessorios',
            titulo: '5. Acessórios de Cerimonial',
            descricao: 'Itens complementares para uso cívico.',
            imagemBanner: '/images/roseta-nova.png',
            itens: [
                { id: 'roseta', produto: 'Roseta com Franjas (Cores oficiais)', secao: 'ACESSÓRIOS', preco: '90,00', extra: '0,70 x 11cm', imagem: '/images/roseta-nova.png' },
                { id: 'talabarte', produto: 'Talabarte em Tecido com Apoio p/ Mastro', secao: 'ACESSÓRIOS', preco: '125,00', extra: '0,90 x 11cm' }
            ]
        },
        {
            id: 'kits-mesa',
            titulo: '6. Kits de Mesa',
            descricao: 'Conjuntos em miniatura com suporte.',
            imagemBanner: '/images/kit-mesa.png',
            itens: [
                { id: 'kit-mesa-1', produto: 'Kit p/ Mesa c/ 1 Bandeira Dupla Face', secao: 'KITS', preco: '48,00', extra: 'Alumínio/Madeira 30cm', imagem: '/images/kit-mesa.png' },
                { id: 'kit-mesa-2', produto: 'Kit p/ Mesa c/ 2 Bandeiras Dupla Face', secao: 'KITS', preco: '72,00', extra: 'Alumínio/Madeira 30cm', imagem: '/images/kit-mesa.png' },
                { id: 'kit-mesa-3', produto: 'Kit p/ Mesa c/ 3 Bandeiras Dupla Face', secao: 'KITS', preco: '86,00', extra: 'Alumínio/Madeira 30cm', imagem: '/images/kit-mesa.png' }
            ]
        },
        {
            id: 'suportes',
            titulo: '7. Suportes de Fixação',
            descricao: 'Ferragens para instalação externa ou interna.',
            imagemBanner: '/images/suporte-parede.png',
            itens: [
                { id: 'suporte-parede', produto: 'Suporte de Bandeira de Parede (30x20cm)', secao: 'SUPORTES', preco: '90,00', extra: 'c/ parafusos 6mm e bucha', imagem: '/images/suporte-parede.png' }
            ]
        }
    ];

    // Componente Reutilizável de Card de Produto no estilo da imagem
    const ProductCard = ({ item }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isHeartHovered, setIsHeartHovered] = useState(false);
        const { isFavorite, addToFavorites } = useContext(FavoritesContext);
        const { addToCart } = useContext(CartContext);

        const isFav = isFavorite(item.id);

        return (
            <div
                onClick={() => navigate(`/produto/${item.id}`)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    height: '100%',
                    minWidth: '240px',
                    maxWidth: '280px',
                    transition: 'border-color 0.2s',
                    borderColor: isHovered ? 'var(--dark-blue)' : 'var(--border-color)'
                }}>

                {/* Ícone de Favorito */}
                <div
                    onMouseEnter={() => setIsHeartHovered(true)}
                    onMouseLeave={() => setIsHeartHovered(false)}
                    style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 5, cursor: 'pointer', padding: '5px' }}
                    onClick={(e) => { e.stopPropagation(); addToFavorites(item); }}
                >
                    <Heart size={20} color={isFav || isHeartHovered ? '#ef4444' : '#9ca3af'} fill={isFav || isHeartHovered ? '#ef4444' : 'none'} style={{ transition: 'all 0.2s' }} />
                </div>

                {/* Imagem Placeholder */}
                <div style={{ padding: '2rem 1rem 1rem 1rem', display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                    <img
                        src={item.imagem || '/images/bandeira-oficial-dobrada.png'}
                        alt={item.produto}
                        style={{ width: '100%', height: '160px', objectFit: 'contain' }}
                    />
                </div>

                {/* Conteúdo do Card */}
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        seção {item.secao}
                    </span>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--dark-blue)', marginBottom: '1.5rem', lineHeight: 1.3, fontWeight: '700', minHeight: '2.6em' }}>
                        {item.produto}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                        <div>
                            <span style={{ fontSize: '0.65rem', color: '#6b7280', display: 'block', marginBottom: '-0.2rem' }}>A partir de</span>
                            <div style={{ color: 'var(--dark-blue)', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '0.7rem', marginTop: '0.2rem', marginRight: '0.1rem' }}>R$</span>
                                {item.preco.split(',')[0]}
                                <span style={{ fontSize: '0.8rem', marginTop: '0.1rem' }}>,{item.preco.split(',')[1]}</span>
                            </div>
                            <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>{item.extra}</span>
                        </div>

                        <button
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                addToCart({
                                    id: item.id,
                                    nome: item.produto,
                                    preco: item.preco,
                                    material: 'Padrão', // mock initial data required by cart
                                    tamanhoId: 'default',
                                    quantidade: 1,
                                    imagem: item.imagem || '/images/bandeira-oficial-dobrada.png'
                                }); 
                            }}
                            style={{
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                padding: '0.4rem 0.6rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                backgroundColor: isHovered ? 'var(--dark-blue)' : 'white',
                                color: isHovered ? 'white' : 'var(--dark-blue)',
                                borderColor: isHovered ? 'var(--dark-blue)' : 'var(--border-color)'
                            }}>
                            <ShoppingCart size={16} />
                            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Comprar</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Componente Sub-Carousel para cada categoria
    const ProductCarousel = ({ items }) => {
        const catCarouselRef = useRef(null);

        const scroll = (direction) => {
            if (catCarouselRef.current) {
                const scrollAmount = 300; // Largura do card + gap
                catCarouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
            }
        };

        const showArrows = items.length > 3;

        return (
            <div style={{ position: 'relative', margin: '0 -0.5rem' }}>
                {showArrows && (
                    <button
                        onClick={() => scroll('left')}
                        className="carousel-arrow"
                        style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#6b7280' }}>
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div
                    ref={catCarouselRef}
                    className="hide-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        padding: '1rem 0.5rem 2rem 0.5rem',
                    }}
                >
                    {items.map((item, idx) => (
                        <div key={idx} style={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <button
                        onClick={() => scroll('right')}
                        className="carousel-arrow"
                        style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#6b7280' }}>
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
        );
    };

    const CategoryBanner = ({ cat, onClick }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    flex: '0 0 auto',
                    width: '280px',
                    height: '140px',
                    scrollSnapAlign: 'start',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.05)',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
                }}
            >
                {/* Imagem de fundo que aparece ao focar/passar o mouse com zoom suave */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${cat.imagemBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: isHovered ? 1 : 0,
                    filter: 'brightness(0.4)',
                    zIndex: 1,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transform: isHovered ? 'scale(1)' : 'scale(1.1)'
                }} />

                <h3 style={{
                    position: 'relative',
                    zIndex: 2,
                    color: isHovered ? 'white' : '#8b7355',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    padding: '0 1.5rem',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    textShadow: isHovered ? '2px 2px 4px rgba(0,0,0,0.8)' : '1px 1px 0px rgba(255,255,255,1), 1px 1px 3px rgba(0,0,0,0.1)'
                }}>
                    {cat.titulo.replace(/^[0-9]\.\s/, '').split(' (')[0]}
                </h3>
            </div>
        );
    };

    const scrollCatBanners = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 296; // 280px width + 16px (1rem) gap
            carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollToCategory = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            {/* HERO SECTION estilo Tabela 2025 / Seção Brasil */}
            <section style={{
                position: 'relative',
                height: '50vh',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: 'var(--dark-blue)',
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'url("/images/banner_produtos.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 80%',
                    opacity: 0.4,
                    zIndex: 1
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'left', width: '100%' }}>
                    <span style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: '300', opacity: 0.9 }}>Seção</span>
                    <h1 style={{ fontSize: '5rem', color: 'white', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0', lineHeight: 1 }}>Catálogo 2025</h1>
                    <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>Bandeiras Oficiais, Bases, Mastros e Mais</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '600px', margin: 0 }}>
                        Produtos categorizados a partir dos novos catálogos de fábrica consolidados. Tudo o que você precisa com qualidade garantida.
                    </p>
                </div>
            </section>

            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>

                {/* --- Carousel de Banners Principais de Categorias --- */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-body)', margin: 0 }}>Navegue pelas <span style={{ fontWeight: 'bold' }}>Categorias</span></h2>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.4rem 0.8rem', width: '100%', maxWidth: '300px', backgroundColor: 'white' }}>
                            <Search size={18} color="#9ca3af" style={{ marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Pesquisar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#374151' }}
                            />
                        </div>
                    </div>
                    {searchTerm ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                            {categorias.flatMap(c => c.itens).filter(item => item.produto.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                                categorias.flatMap(c => c.itens).filter(item => item.produto.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                                    <div key={idx} style={{ height: '360px', display: 'flex', justifyContent: 'center' }}><ProductCard item={item} /></div>
                                ))
                            ) : (
                                <p style={{ color: '#6b7280', fontSize: '1.1rem', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0' }}>Nenhum produto encontrado para "{searchTerm}".</p>
                            )}
                        </div>
                    ) : (
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => scrollCatBanners('left')}
                            className="carousel-arrow"
                            style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <ChevronLeft size={24} color="var(--dark-blue)" />
                        </button>

                        <button
                            onClick={() => scrollCatBanners('right')}
                            className="carousel-arrow"
                            style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <ChevronRight size={24} color="var(--dark-blue)" />
                        </button>

                        <div
                            ref={carouselRef}
                            style={{ display: 'flex', gap: '1rem', overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            className="hide-scrollbar"
                        >
                            {categorias.map((cat, index) => (
                                <CategoryBanner
                                    key={index}
                                    cat={cat}
                                    onClick={() => scrollToCategory(cat.id)}
                                />
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                {!searchTerm && (
                <>
                {/* Estilo embutido p/ hide-scrollbar */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}} />

                {/* --- Listagem das Categorias e Carrosseis de Produtos --- */}

                {/* Categoria 1 */}
                <div id={categorias[0].id} style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)', fontWeight: 'bold', margin: 0 }}>
                            {categorias[0].titulo.replace(/^[0-9]\.\s/, '')}
                        </h2>
                    </div>
                    <ProductCarousel items={categorias[0].itens} />
                </div>

                {/* Promotional Full Width Banner */}
                <div style={{ marginBottom: '5rem', backgroundColor: 'var(--dark-blue)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("/images/banner_produtos.png")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)' }}></div>
                    <h2 style={{ color: 'var(--primary-yellow)', fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>Bandeira do Brasil</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px', position: 'relative', zIndex: 2 }}>
                        {[
                            { title: 'Modelo Bordada', img: '/images/modelo_bordado.png' },
                            { title: 'Modelo Estampada', img: '/images/modeloestampada.png' },
                            { title: 'Modelo Cetim', img: '/images/bandeiracetim.png' }
                        ].map((promo, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{promo.title}</h3>
                                <p style={{ color: '#9ca3af', fontSize: '0.7rem', marginBottom: '1rem' }}>(Clique para mais detalhes)</p>
                                <div style={{ border: '2px solid rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', padding: '0.5rem' }}>
                                    <img src={promo.img} alt={promo.title} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '2px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Renderizar o resto das categorias */}
                {categorias.slice(1).map((categoria) => (
                    <div key={categoria.id} id={categoria.id} style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)', fontWeight: 'bold', margin: 0 }}>
                                {categoria.titulo.replace(/^[0-9]\.\s/, '')}
                            </h2>
                        </div>
                        <ProductCarousel items={categoria.itens} />
                    </div>
                ))}
                </>
                )}
            </div>
        </div>
    );
}
