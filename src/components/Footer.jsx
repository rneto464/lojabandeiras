import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--dark-blue)', color: 'var(--text-light)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>

                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                            <line x1="4" y1="22" x2="4" y2="15" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-light)' }}>
                            BandeirasJA
                        </span>
                    </div>
                    <p style={{ color: '#A0AEC0', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        Sua loja especializada em bandeiras de todos os tipos.<br />
                        Qualidade e variedade para todas as ocasiões.
                    </p>
                </div>

                <div style={{ flex: '1 1 200px' }}>
                    <h4 style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Categorias</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link to="/produtos#premium-oxford" style={{ color: '#A0AEC0', fontSize: '0.9rem', transition: 'color 0.2s' }}>Bandeiras Oficiais (Premium)</Link></li>
                        <li><Link to="/produtos#luxo-cetim" style={{ color: '#A0AEC0', fontSize: '0.9rem', transition: 'color 0.2s' }}>Bandeiras Luxo Cetim</Link></li>
                        <li><Link to="/produtos#bases-pedestais" style={{ color: '#A0AEC0', fontSize: '0.9rem', transition: 'color 0.2s' }}>Bases e Pedestais</Link></li>
                        <li><Link to="/produtos#mastros-acessorios" style={{ color: '#A0AEC0', fontSize: '0.9rem', transition: 'color 0.2s' }}>Mastros e Acessórios</Link></li>
                        <li><Link to="/produtos#kits-promocionais" style={{ color: '#A0AEC0', fontSize: '0.9rem', transition: 'color 0.2s' }}>Kits de Mesa e Brindes</Link></li>
                    </ul>
                </div>

                <div style={{ flex: '1 1 200px' }}>
                    <h4 style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contato</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li style={{ color: '#A0AEC0', fontSize: '0.9rem' }}>WhatsApp: <a href="https://wa.me/559884759642" target="_blank" rel="noopener noreferrer" style={{ color: '#A0AEC0', textDecoration: 'none' }}>(98) 8475-9642</a></li>
                        <li style={{ color: '#A0AEC0', fontSize: '0.9rem' }}>contato@bandeirasdomundo.com.br</li>
                        <li style={{ color: '#A0AEC0', fontSize: '0.9rem' }}>Entrega para todo o Brasil</li>
                    </ul>
                </div>

            </div>

            <div className="container" style={{ borderTop: '1px solid var(--dark-blue-light)', paddingTop: '2rem', textAlign: 'center', color: '#718096', fontSize: '0.85rem' }}>
                <p>&copy; 2026 BandeirasJA. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
