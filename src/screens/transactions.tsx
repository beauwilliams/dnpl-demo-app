
import React, {useCallback, useEffect} from 'react';
import {Alert, ScrollView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { divide } from 'mathjs'

import {ScreenProps} from '.';
import {useServices} from '../services';
import {useStores} from '../stores';
// import { useStores } from '../stores';
// import { useConstants } from '../utils/constants';

import {Section} from '../components/section';
import {randomNum} from '../utils/help';
import {Reanimated2} from '../components/reanimated2';
import {BButton} from '../components/button';

type Props = NativeStackScreenProps<ScreenProps, 'Transactions'>;

export const Transactions: React.FC<Props> = observer(({route}) => {
    const {nav, t, api} = useServices();
    const {transactions, ui} = useStores();

  const start = useCallback(async () => {
    try {
      await api.transactions.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data');
    }
  }, [api.transactions]);

  useEffect(() => {
    start();
  }, []);


  const created_at = new Date(transactions.transaction.created_at*1000);
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
          <Section title={t.do('transactions.title')}>
            {!transactions ? null : (
              <>
              <Text textColor text50R>
                Database ID: {transactions.transaction.id}
              </Text>
              <Text textColor text50R>
                Stripe Transaction ID: {transactions.transaction.transaction_id}
              </Text>
              <Text textColor text50R>
                Created At: {`${created_at.getHours()} : ${created_at.getMinutes()} : ${created_at.getSeconds()}`}
              </Text>
              <Text textColor text50R>
                Paid To: {transactions.transaction.paid_to}
              </Text>
              <Text textColor text50R>
                  Amount: {divide(transactions.transaction.amount,100).toLocaleString('en-AU', {
                    style: 'currency',
                    currency: 'AUD',
                  })}
              </Text>
              <Text textColor text50R>
                Currency: {transactions.transaction.currency}
              </Text>
                </>
            )}

            <View left>
            </View>

            {/*}<View left marginT-s4>*/}
        <View padding-s4>
              <BButton
                marginV-s10
                label={t.do('section.navigation.button.back')}
                onPress={nav.pop}
              />
        </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
});
