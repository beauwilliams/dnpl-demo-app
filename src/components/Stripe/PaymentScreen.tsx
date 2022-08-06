import {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
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
}

export function PaymentScreen() {
  const {t} = useServices();
  const {confirmPayment} = useStripe();

  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmation = async () => {
    setLoading(true);
    await fetch('http://localhost:9000/api/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(async res => {
        console.log('intent', res);
        setKey((res as {clientSecret: string}).clientSecret);
        if (res.clientSecret) {
          const {paymentIntent, error} = await confirmPayment(res.clientSecret, {
            type: 'Card',
            billingDetails: {
              email: 'demo@dnpl.com',
            },
          });

          if (!error) {
            const amount = (paymentIntent?.amount || 0) / 100;
            Alert.alert(
              'Success',
              `Payment for ${amount.toLocaleString('en-AU', {
                style: 'currency',
                currency: 'AUD',
              })} was received`,
            );
            setLoading(false);
          } else {
            Alert.alert('Error', error.message);
            setLoading(false);
          }
        } else {
          Alert.alert('Error', 'No client key received from backend');
          setLoading(false);
        }
      })
      .catch(e => Alert.alert(e.message));
  };
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
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
            <View padding-s8>
              <ActivityIndicator animating={loading}></ActivityIndicator>
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}
