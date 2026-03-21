import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [toastMessage, setToastMessage] = useState(null);

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Função para adicionar item ao carrinho
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Verifica se o item com mesma variação (tamanho/material/id) já existe
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id &&
                    item.material === product.material &&
                    item.tamanhoId === product.tamanhoId
            );

            if (existingItemIndex > -1) {
                // Se já existe, atualiza apenas a quantidade
                const newItems = [...prevItems];
                const updatedItem = { ...newItems[existingItemIndex] };
                updatedItem.quantidade += (product.quantidade || 1);
                newItems[existingItemIndex] = updatedItem;
                return newItems;
            }

            // Se não existe, adiciona como novo item
            return [...prevItems, { ...product, quantidade: product.quantidade || 1 }];
        });

        // Mostrar Toast Notification
        setToastMessage(`${product.nome || 'Produto'} adicionado ao carrinho!`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Função para atualizar quantidade de um item
    const updateQuantity = (index, delta) => {
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            const updatedItem = { ...newItems[index] };
            const newQuantity = updatedItem.quantidade + delta;

            if (newQuantity > 0) {
                updatedItem.quantidade = newQuantity;
                newItems[index] = updatedItem;
                return newItems;
            } else {
                return prevItems.filter((_, i) => i !== index);
            }
        });
    };

    // Função para remover item
    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    // Função para limpar carrinho
    const clearCart = () => setCartItems([]);

    // Calcula Totais
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

    const cartTotal = cartItems.reduce((acc, item) => {
        const precoNumerico = Number(item.preco.replace(/\./g, '').replace(',', '.'));
        return acc + (precoNumerico * item.quantidade);
    }, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
            {/* Toast Notification */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'var(--success-green)',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    animation: 'slideUpToast 0.3s ease-out forwards',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '500'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        color: 'var(--success-green)',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        ✓
                    </div>
                    {toastMessage}
                </div>
            )}
        </CartContext.Provider>
    );
}

// Em vez de exportar "useCart" no mesmo arquivo do Componente CartProvider, 
// o Vite Fast Refresh prefere que exportemos só o context, ou coloquemos o hook default.
// Para resolver rápido sem mudar muitos arquivos, podemos exportar só o CartContext
// e criar o hook no Header/onde precisar, mas pra manter o useCart:
// export const useCart = () => useContext(CartContext); (removido daqui para evitar o crarsh)

export default CartContext;
