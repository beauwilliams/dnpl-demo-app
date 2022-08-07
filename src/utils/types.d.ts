interface IService {
  init: () => PVoid;
}
type Services = Record<string, IService>;

interface IStore {
  hydrate?: () => PVoid;
}
type Stores = Record<string, IStore>;

type PVoid = Promise<void>;
type AnyObj = Record<string, unknown>;
type PureFunc = () => void;

type DesignSystemColors = Record<string, string>;
type AppearanceMode = 'light' | 'dark';
type StatusBarStyle = 'light-content' | 'dark-content' | undefined;
type ThemeColors = {
  textColor: string;
  bgColor: string;
  bg2Color: string;
};
type CurrentAppearance = {
  value: AppearanceMode;
  system: boolean;
};

/* type Transaction = {
  id: number;
  transaction_id: string;
  created_at: number;
  paid_to: string;
  amount: number;
  currency: string
  payment_method: string
} */

interface Transaction {
  id: number;
  transaction_id: string;
  created_at: number;
  paid_to: string;
  amount: number;
  currency: string
  payment_method: string
}

type Language = 'en' | 'ru';

// SERVICES
type AppType = 'one_screen' | 'three_tabs';

// STORES
type UIAppearance = 'System' | 'Light' | 'Dark';
type UILanguage = 'System' | 'English' | 'Russian';

// SCREENS
// Props
type ExampleScreenProps = {
  value?: number;
};
type TransactionScreenProps = {
  transaction?: Transaction;
}

// Settings
type AppearanceAction = {
  name: UIAppearance;
};

type LanguageAction = {
  name: UILanguage;
};

// API
// Responses
type CounterGetResponse = {
  value: number;
};
type TransactionsGetResponse = {
  message: Transaction[];
  success: boolean;
}


