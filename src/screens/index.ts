import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {Transactions} from './transactions';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';
import {PaymentScreen} from '@components';

// Describe your screens here
export type Tabs = 'Main' | 'WIP' | 'Settings' | 'Transactions';
export type Modal = 'ExampleModal' | 'PaymentModal';
export type Screen = 'Main' | 'Example' | 'Settings' | 'Payment' | 'Transactions';

export type ModalProps = {
  ExampleModal: undefined;
  PaymentModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Settings: undefined;
  Payment: undefined;
  Transactions: TransactionScreenProps;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Transactions: {
    name: 'Transactions',
    component: Transactions,
    options: () => ({
    title: 'Transactions',
    ...screenDefaultOptions(),
    }),
  },
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'DNPL Demo',
      ...screenDefaultOptions(),
    }),
  },
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      title: 'Example',
      ...screenDefaultOptions(),
    }),
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      title: 'Settings',
      ...screenDefaultOptions(),
    }),
  },
  Payment: {
    name: 'Payment',
    component: PaymentScreen,
    options: () => ({
      title: 'Payment',
      ...screenDefaultOptions(),
    }),
  },
};
const HomeStack = () => genStackNavigator([screens.Main, screens.Transactions,screens.Example]);
const ExampleStack = () => genStackNavigator([screens.Example]);
const TransactionsStack = () => genStackNavigator([screens.Transactions]);
const SettingsStack = () => genStackNavigator([screens.Settings]);
const ExampleModalStack = () => genStackNavigator([screens.Main, screens.Example]);
const PaymentModalStack = () => genStackNavigator([screens.Payment]);

// Tabs
const tabs: TabScreenLayouts = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
      ...tabBarDefaultOptions('MainNavigator'),
    }),
  },
  WIP: {
    name: 'ExampleNavigator',
    component: ExampleStack,
    options: () => ({
      title: 'WIP',
      ...tabBarDefaultOptions('ExampleNavigator'),
    }),
  },
  Transactions: {
    name: 'TransactionsNavigator',
    component: TransactionsStack,
    options: () => ({
      title: 'Transactions',
      ...tabBarDefaultOptions('TransactionsNavigator'),
    }),
  },

  Settings: {
    name: 'SettingsNavigator',
    component: SettingsStack,
    options: () => ({
      title: 'Settings',
      ...tabBarDefaultOptions('SettingsNavigator'),
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.Transactions,tabs.WIP, tabs.Settings]);

// Modals
const modals: ModalScreenLayouts = {
  ExampleModal: {
    name: 'ExampleModal',
    component: ExampleModalStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
  PaymentModal: {
    name: 'PaymentModal',
    component: PaymentModalStack,
    options: () => ({
      title: 'PaymentModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ExampleModal, modals.PaymentModal]);
