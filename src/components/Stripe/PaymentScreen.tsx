import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {Incubator, Toast, Text, PanningProvider, View} from 'react-native-ui-lib';
import {Section, BButton} from '@components';
import {useServices} from '../../services';
import {Alert} from 'react-native';
//NOTE: Stripe does not support rgba so we must convert..
import rgbHex from 'rgb-hex';
import {Colors, ViewProps} from 'react-native-ui-lib';

function hello() {
  console.log('hello');
  return (
    <Incubator.Dialog visible={true} onDismiss={() => console.log('dismissed')}>
      {<Text text60>Error</Text>}
    </Incubator.Dialog>
  );
}

export function PaymentScreen() {
  const {t} = useServices();
  const {confirmPayment} = useStripe();

  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch('http://localhost:9000/api/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey((res as {clientSecret: string}).clientSecret);
      })
      .catch(e => Alert.alert(e.message));
  }, []);

  const handleConfirmation = async () => {
    console.log('confirming');
    console.log(visible);

    if (key) {
      const {paymentIntent, error} = await confirmPayment(key, {
        type: 'Card',
        billingDetails: {
          email: 'demo@dnpl.com',
        },
      });

      if (!error) {
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
      } else {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'No key');
    }
  };
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Incubator.Dialog visible={false} onDismiss={() => console.log('dismissed')}>
          {<Text text60>Error</Text>}
        </Incubator.Dialog>
        <View padding-s8>
          <Section title={t.do('payment.title')}>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
                expiration: '12/24',
                cvc: '123',
              }}
              cardStyle={{
                backgroundColor: Colors.backgroundColor,
                textColor: rgbHex(Colors.textColor),
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
            <BButton
              marginV-s1
              label={t.do('section.navigation.button.paynow')}
              onPress={handleConfirmation}
            />
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}
