import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { AuthContext } from '../../Providers/AuthProviders';
const CheckoutForm = ({ closeModal, spot }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  console.log(clientSecret);
  useEffect(() => {
    if (spot?.price && spot.price > 1) {
      getClientSecret({ price: spot.price });
    }
  }, [spot]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axios.post('http://localhost:5000/create-payment-intent', price);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error('[error]', error);
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });


    if (confirmError) {
      console.error(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        ...spot,
        bookingId: spot._id,
        transactionId: paymentIntent.id,
      };
      delete paymentInfo._id;

      try {
        await axios.post('http://localhost:5000/booking', paymentInfo);
        console.log(paymentInfo);
        // Update room status logic here (if needed)

        await axios.patch(`http://localhost:5000/spot/status/${spot?._id}`, {status : true});
        closeModal();
        toast.success('spot booked successfully')
       
      } catch (error) {
        console.error("Error saving payment info:", error);
        setCardError('Failed to save payment information. Please try again.');
      }
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
                <hr className='mt-8 ' />

        <div className='flex mt-2 justify-around'>
          <button
            disabled={!stripe || !clientSecret || processing}
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
          {spot.price}  Pay
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-20 mt-4'>{cardError}</p>}
    </>
  );
};

CheckoutForm.propTypes = {
  spot: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CheckoutForm;
