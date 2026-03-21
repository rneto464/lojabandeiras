import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Wallet } from '@mercadopago/sdk-react';
import { createPreference } from '../services/mercadopago';

export function Checkout() {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [preferenceId, setPreferenceId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatPrice = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
                        <div style={{ backgroundColor: 'var(--bg-color)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <ArrowLeft size={36} color="var(--dark-blue)" />
                        </div>
                        <h2 style={{ color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Carrinho Vazio</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Você não tem itens no carrinho para finalizar a compra.</p>
                        <Link to="/produtos" className="btn-primary" style={{ padding: '0.8rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
                            Voltar para Loja
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleFinalize = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const nome = formData.get('nome');
        const endereco = formData.get('endereco');
        const cep = formData.get('cep');

        setIsLoading(true);

        try {
            const paymentData = {
                title: 'Pedido Especial Bandeiras Já',
                quantity: 1,
                price: cartTotal,
                email: email || 'comprador@email.com',
                address: `${endereco} - ${cep}`
            };

            const id = await createPreference(paymentData);
            if (id) {
                setPreferenceId(id);
                // Save order context for the Success page to build the WhatsApp message
                localStorage.setItem('bandeiras_last_order', JSON.stringify({
                    nome,
                    email,
                    endereco: `${endereco} - ${cep}`,
                    cartItems,
                    cartTotal
                }));
            }
        } catch (error) {
            alert('Não foi possível gerar o pagamento no momento. Tente de novo.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '4rem 0 8rem 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Voltar
                    </button>
                    <h1 style={{ fontSize: '2rem', color: 'var(--dark-blue)', fontFamily: 'var(--font-heading)', margin: 0 }}>Finalizar Compra</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) minmax(300px, 1fr)', gap: '2rem', alignItems: 'start' }}>

                    {/* Formulário de Check-out */}
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--dark-blue)' }}>Dados de Entrega</h3>

                        <form id="checkout-form" onSubmit={handleFinalize}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Nome Completo *</label>
                                    <input type="text" name="nome" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} placeholder="Seu nome" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>CPF / CNPJ *</label>
                                    <input type="text" name="cpf" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} placeholder="000.000.000-00" />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>E-mail *</label>
                                <input type="email" name="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} placeholder="seu@email.com" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>CEP *</label>
                                    <input type="text" name="cep" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} placeholder="00000-000" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Endereço Completo *</label>
                                    <input type="text" name="endereco" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} placeholder="Rua, Número, Bairro" />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Resumo do Pedido */}
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            Resumo do Pedido
                            <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Itens'}</span>
                        </h3>

                        <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                            {cartItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                        <img src={item.image || item.imagemPrincipal || '/images/bandeira-oficial-dobrada.png'} alt={item.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--dark-blue)', marginBottom: '0.2rem' }}>{item.nome}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.material} - {item.tamanho}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Qtd: {item.quantidade}</span>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--dark-blue)' }}>R$ {item.preco}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <span>Frete</span>
                                <span style={{ color: '#10b981', fontWeight: '500' }}>Grátis</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--dark-blue)', fontWeight: '700', fontSize: '1.2rem' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--primary-yellow)', fontSize: '1.4rem' }}>{formatPrice(cartTotal)}</span>
                            </div>
                        </div>

                        {preferenceId ? (
                            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                <h4 style={{ color: 'var(--dark-blue)', marginBottom: '1rem' }}>Conclua o Pagamento pelo Mercado Pago</h4>
                                <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'security_safety' } }} />
                            </div>
                        ) : (
                            <button
                                type="submit"
                                form="checkout-form"
                                className="btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Gerando Pagamento...' : <><ShieldCheck size={20} /> Concluir Pedido Seguramente</>}
                            </button>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', color: '#10b981', fontSize: '0.8rem' }}>
                            <CheckCircle2 size={16} /> Compra 100% segura e criptografada
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
