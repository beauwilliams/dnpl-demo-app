import {CounterApi} from './counter';
import {TransactionApi} from './transactions';

export class Api implements IService {
  private inited = false;

  counter: CounterApi;
  transactions: TransactionApi;

  constructor() {
    this.counter = new CounterApi();
    this.transactions = new TransactionApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
