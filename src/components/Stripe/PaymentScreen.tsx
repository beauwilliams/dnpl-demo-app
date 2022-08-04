import {CardField, useStripe} from '@stripe/stripe-react-native';

export function PaymentScreen() {
  const {confirmPayment} = useStripe();

  return (
    <CardField
      postalCodeEnabled={true}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={cardDetails => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={focusedField => {
        console.log('focusField', focusedField);
      }}
    />
  );
}
