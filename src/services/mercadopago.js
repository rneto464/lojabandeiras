import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';

/**
 * Initializes Mercado Pago SDK with the public key.
 */
export const initializeMercadoPago = () => {
  const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
  if (!publicKey) {
    console.warn('VITE_MERCADOPAGO_PUBLIC_KEY is not defined in the environment.');
    return;
  }
  
  initMercadoPago(publicKey, { locale: 'pt-BR' });
};

/**
 * Create a preference for checkout in your backend.
 * Expects the backend to return an ID for the Mercado Pago Wallet/Checkout.
 * @param {Object} paymentData Details of the payment or cart 
 * @returns {Promise<string>} preference ID
 */
export const createPreference = async (paymentData) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await axios.post(`${apiUrl}/api/create_preference`, paymentData);
    
    // The backend should respond with { id: 'preference_id_string' }
    return response.data.id;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};
