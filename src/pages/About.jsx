import React from 'react';
import { Target, Users, ShieldCheck, Heart } from 'lucide-react';

export function About() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section style={{
                backgroundColor: 'var(--dark-blue)',
                color: 'var(--text-light)',
                padding: '5rem 0',
                textAlign: 'center',
                borderBottom: '4px solid var(--primary-yellow)'
            }}>
                <div className="container">
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-yellow)' }}>
                        Sobre NÓS
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#E2E8F0', lineHeight: 1.6 }}>
                        Especialistas em conectar pessoas às suas raízes, paixões e origens através de bandeiras de alta qualidade.
                    </p>
                </div>
            </section>

            {/* Nossa História */}
            <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        <div style={{ maxWidth: '800px', textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--dark-blue)', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                                Nossa História
                                <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', backgroundColor: 'var(--primary-yellow)', borderRadius: '2px' }}></div>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Fundada em 2015, a <strong>BandeirasJA</strong> nasceu da paixão por vexilologia (o estudo das bandeiras) e o desejo de oferecer ao público brasileiro um acesso fácil a símbolos nacionais, estaduais e decorativos de alta qualidade, que até então eram difíceis de encontrar com um bom acabamento.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                O que começou como um pequeno negócio familiar em uma garagem, rapidamente se transformou na principal loja online de bandeiras do Brasil. Hoje, nos orgulhamos de ter milhares de clientes satisfeitos, desde colecionadores apaixonados até grandes empresas e instituições governamentais.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossos Valores */}
            <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--dark-blue)', marginBottom: '3rem', textAlign: 'center' }}>
                        Nossos Valores
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {/* Valor 1 */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            padding: '2.5rem 2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '64px', height: '64px', backgroundColor: '#EBF4FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#3182CE' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Qualidade Premium</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Selecionamos os melhores tecidos e tintas para garantir durabilidade e cores vibrantes em cada produto.</p>
                        </div>

                        {/* Valor 2 */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            padding: '2.5rem 2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '64px', height: '64px', backgroundColor: '#FEFCBF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#D69E2E' }}>
                                <Heart size={32} color="var(--primary-yellow)" style={{ stroke: 'var(--dark-blue)' }} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Paixão pelo que Fazemos</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Amamos vexilologia e tratamos cada bandeira não apenas como um pedaço de tecido, mas como um símbolo de identidade.</p>
                        </div>

                        {/* Valor 3 */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            padding: '2.5rem 2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '64px', height: '64px', backgroundColor: '#E6FFFA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#319795' }}>
                                <Users size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Foco no Cliente</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Nosso atendimento é voltado para entender sua necessidade e entregar a solução perfeita com agilidade e transparência.</p>
                        </div>

                        {/* Valor 4 */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            padding: '2.5rem 2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '64px', height: '64px', backgroundColor: '#E9D8FD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#805AD5' }}>
                                <Target size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Sustentabilidade</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Buscamos fornecedores com práticas responsáveis e reduzimos o desperdício em nossa cadeia de produção e envio.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-color)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--dark-blue)', marginBottom: '1rem' }}>
                        Pronto para encontrar a sua bandeira?
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Explore nosso catálogo completo com mais de 500 modelos em estoque.
                    </p>
                    <a href="/produtos" className="btn-primary" style={{ display: 'inline-block', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '8px', textDecoration: 'none' }}>
                        Ver Todos os Produtos
                    </a>
                </div>
            </section>

        </div>
    );
}
