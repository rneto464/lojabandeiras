import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function Registration() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ backgroundColor: 'var(--surface-color)', minHeight: 'calc(100vh - 400px)', padding: '4rem 0' }}>
            <div className="container">
                <h1 style={{
                    color: 'var(--dark-blue)',
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 800
                }}>
                    Minha conta
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Para acessar informações detalhadas sobre seu cadastro e histórico de pedidos, informe seu e-mail e sua senha de cadastro.
                </p>

                <Link to="/cadastro" style={{ color: '#3182CE', fontSize: '0.9rem', display: 'inline-block', marginBottom: '3rem' }}>
                    Clique aqui caso ainda não tenha cadastro na loja.
                </Link>

                <div style={{
                    maxWidth: '500px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                color: '#B91C1C',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                Seu e-mail:
                            </label>
                            <input
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #CBD5E0',
                                    borderRadius: '4px',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                color: '#B91C1C',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                Senha:
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    style={{
                                        width: 'calc(100% - 40px)',
                                        padding: '0.75rem',
                                        border: '1px solid #CBD5E0',
                                        borderRadius: '4px 0 0 4px',
                                        borderRight: 'none',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--font-body)'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '40px',
                                        border: '1px solid #CBD5E0',
                                        borderLeft: 'none',
                                        borderRadius: '0 4px 4px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <a href="#" style={{
                                display: 'block',
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                marginTop: '0.75rem',
                                textDecoration: 'underline'
                            }}>
                                Esqueceu a senha? Preencha o e-mail e clique aqui
                            </a>
                        </div>

                        <button type="submit" className="btn-success" style={{ padding: '0.8rem 2.5rem', fontSize: '0.95rem' }}>
                            ENVIAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
