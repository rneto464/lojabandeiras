import React, { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id); // Toggle off
            }
            return [...prev, product]; // Toggle on
        });
    };

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter(item => item.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(item => item.id === id);
    };

    const clearFavorites = () => setFavorites([]);

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;
