import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod', paymentMethod);
            // サーバーにPaymentMethodを送信してサブスクを作成
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Subscribe
            </button>
        </form>
    );
}

export default CheckoutForm;
