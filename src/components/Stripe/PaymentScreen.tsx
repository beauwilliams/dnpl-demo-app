import {CardField, useStripe} from '@stripe/stripe-react-native';
import {View} from 'react-native-ui-lib';
import {getNavigationTheme} from '@utils';
import {BButton} from '@components';
import {useServices} from '../../services';
//NOTE: Stripe does not support rgba so we must convert..
import rgbHex from 'rgb-hex';

function hello() {
  console.log('hello');
}

export function PaymentScreen() {
  const {confirmPayment} = useStripe();
  const {t} = useServices();

  return (
    <View flex bg-bgColor>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
          expiration: '12/24',
          cvc: '123',

        }}
        cardStyle={{
          backgroundColor: rgbHex(getNavigationTheme().colors.background),
          textColor: rgbHex(getNavigationTheme().colors.text),
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
      <BButton marginV-s1 label={t.do('section.navigation.button.paynow')} onPress={hello} />
    </View>
  );
}
