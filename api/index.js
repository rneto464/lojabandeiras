import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize Mercado Pago client with the Access Token
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'SUA_ACCESS_TOKEN_AQUI'
});

app.post('/api/create_preference', async (req, res) => {
    try {
        const { title, quantity, price, email, address } = req.body;

        // Create the preference data payload
        const preferenceData = {
            body: {
                items: [
                    {
                        title: title || 'Pedido Loja de Bandeiras',
                        quantity: Number(quantity) || 1,
                        unit_price: Number(price) || 0,
                        currency_id: 'BRL'
                    }
                ],
                payer: {
                    email: email || 'test_user@testuser.com'
                },
                back_urls: {
                    success: 'http://localhost:5173/sucesso', // Change in production
                    failure: 'http://localhost:5173/',
                    pending: 'http://localhost:5173/'
                }
                // auto_return: 'approved'
            }
        };

        const preference = new Preference(client);
        const result = await preference.create(preferenceData);

        // Send back the generated ID
        res.json({ id: result.id });
    } catch (error) {
        console.error('Error processing preference:', error);
        res.status(500).json({ error: 'Failed to create preference' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default app;
