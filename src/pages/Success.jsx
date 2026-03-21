import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export function Success() {
    const [searchParams] = useSearchParams();
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        // Clear the cart
        clearCart();

        const status = searchParams.get('status');
        const paymentId = searchParams.get('payment_id');

        // Se o status for approved ou se não tiver status (apenas para teste direto)
        if (status === 'approved' || !status) {
            const lastOrderText = localStorage.getItem('bandeiras_last_order');
            if (lastOrderText) {
                try {
                    const order = JSON.parse(lastOrderText);
                    
                    let message = `*NOVO PEDIDO APROVADO!* (ID: ${paymentId || 'Teste'})\n\n`;
                    message += `*Cliente:* ${order.nome}\n`;
                    message += `*E-mail:* ${order.email}\n`;
                    message += `*Endereço:* ${order.endereco}\n\n`;
                    message += `*Itens do Pedido:*\n`;
                    order.cartItems.forEach(item => {
                        message += `- ${item.quantidade}x ${item.nome} (${item.material} / ${item.tamanho}) - R$ ${item.preco}\n`;
                    });
                    message += `\n*TOTAL:* R$ ${order.cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

                    const phone = '559884759642'; // Número do WhatsApp da Loja
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

                    setRedirecting(true);
                    
                    // Redirect after a short delay so the user sees the success message
                    setTimeout(() => {
                        window.location.href = whatsappUrl;
                    }, 2500);

                } catch (e) {
                    console.error("Error parsing order", e);
                }
            }
        }
    }, [searchParams, clearCart]);

    return (
        <div style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ backgroundColor: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <CheckCircle2 size={40} color="white" />
                    </div>
                    <h2 style={{ color: 'var(--dark-blue)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Pagamento Aprovado!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Seu pedido foi processado com sucesso. Estamos te redirecionando para enviar os dados para a nossa equipe!</p>
                    
                    {redirecting ? (
                        <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '500' }}>
                            <MessageCircle size={20} /> Redirecionando para o WhatsApp...
                        </div>
                    ) : (
                        <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '0.8rem 2rem', border: 'none', cursor: 'pointer' }}>
                            Voltar para a Loja
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
