const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Route for creating checkout session
app.post('/create-checkout-session', async (req, res) => {
    const price = req.body.price; // Get product price

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Product Purchase',
                    },
                    unit_amount: price, // Price in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html',
        cancel_url: 'http://localhost:3000/cancel.html',
    });

    res.json({ id: session.id });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
