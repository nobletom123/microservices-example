import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders')
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    }

    findTimeLeft();
    setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timeLeft);
    }
  }, [])

  if(timeLeft < 0) {
    return <div>Order expired</div>
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51H0V3MD3no6p2pOdSvJX7MdHS3EKBJUkLNK0Tnn6JC7eiUJgY3YZ7LDaopsmLAPJ12zSOgwXjJG1wbIdkc1WjhvY00J21gTXw4"
        amount={order.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
}

export default OrderShow;
