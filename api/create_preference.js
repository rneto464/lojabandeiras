import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
        console.error('MERCADOPAGO_ACCESS_TOKEN not configured');
        return res.status(500).json({ error: 'Payment service not configured' });
    }

    try {
        const { title, quantity, price, email, address } = req.body;

        const client = new MercadoPagoConfig({ accessToken });

        // Detecta se existe a variável ou mapeia a origin padrão da Vercel
        const origin = req.headers.origin || 'https://bandeirasja.vercel.app';
        const frontendUrl = process.env.FRONTEND_URL || origin;

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
                    email: email || 'cliente@email.com'
                },
                payment_methods: {
                    excluded_payment_types: [],
                    installments: 1
                },
                back_urls: {
                    success: `${frontendUrl}/sucesso`,
                    failure: `${frontendUrl}/`,
                    pending: `${frontendUrl}/`
                },
                auto_return: 'approved'
            }
        };

        const preference = new Preference(client);
        const result = await preference.create(preferenceData);

        return res.status(200).json({ id: result.id });
    } catch (error) {
        console.error('Error creating preference:', error);
        return res.status(500).json({ error: 'Failed to create preference', details: error.message });
    }
}
