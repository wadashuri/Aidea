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
    
        if (!error) {
            // CSRFトークンを取得
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch('/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに追加
                },
                body: JSON.stringify({ payment_method: paymentMethod.id }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('サーバーでエラーが発生しました');
            }
        } else {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-500">
                登録する
            </button>
        </form>
    );
}

export default CheckoutForm;
