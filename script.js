// Stripe public key (replace with your actual publishable key from Stripe)
const stripe = Stripe('your-stripe-publishable-key');

// Select all buy buttons
const buyButtons = document.querySelectorAll('.buy-btn');

// Add event listener to each button
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = button.getAttribute('data-price');

        // Create a checkout session with the price from the product
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: price
            }),
        })
        .then(response => response.json())
        .then(session => {
            // Redirect to Stripe Checkout
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
