import 'expo-dev-client';
import React, {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppNavigator} from './src/app';
import {configureDesignSystem} from './src/utils/designSystem';
import {hydrateStores, StoresProvider} from './src/stores';
import {initServices, ServicesProvider} from './src/services';

// import { StripeProvider } from '@stripe/stripe-react-native'; //NOTE: ts error, resolved below.
import {StripeProvider as _StripeProvider} from '@stripe/stripe-react-native';
import type {Props as StripeProviderProps} from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;
import {useConstants} from './src/utils/constants';

LogBox.ignoreLogs(['Require']);

export default (): JSX.Element => {
  const [ready, setReady] = useState(false);
  const {stripe} = useConstants();

  const startApp = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    await initServices();
    configureDesignSystem();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoresProvider>
        <StripeProvider
          publishableKey={stripe.publishableKey}
          merchantIdentifier="merchant.identifier"
        >
          <ServicesProvider>{ready ? <AppNavigator /> : null}</ServicesProvider>
        </StripeProvider>
      </StoresProvider>
    </GestureHandlerRootView>
  );
};

