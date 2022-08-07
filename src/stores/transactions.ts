import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';



export class TransactionStore implements IStore {
  transaction:Transaction = {
    id: 0,
    transaction_id: '',
    created_at: 0,
    paid_to: '',
    amount: 0,
    currency: '',
    payment_method: ''
  }
  reset = (): void => {
    this.transaction.id = 0;
    this.transaction.transaction_id = '';
    this.transaction.created_at = 0;
    this.transaction.paid_to = '';
    this.transaction.amount = 0;
    this.transaction.currency = '';
    this.transaction.payment_method = '';
  };
  set = (v: Transaction): void => {
    this.transaction.id = v.id;
    this.transaction.transaction_id = v.transaction_id;
    this.transaction.created_at = v.created_at;
    this.transaction.paid_to = v.paid_to;
    this.transaction.amount = v.amount;
    this.transaction.currency = v.currency;
    this.transaction.payment_method = v.payment_method;
  };

  loading = false;
  setLoading = (v: boolean): void => {
    this.loading = v;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: TransactionStore.name,
      properties: ['transaction'],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
