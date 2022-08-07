import {stores} from '../../stores';

export class TransactionApi {
  get = async (): PVoid => {
    const {transactions} = stores;

    transactions.setLoading(true);

    try {
      const resp = await fetch('http://localhost:9000/api/transactions');
      const json: TransactionsGetResponse = await resp.json();

      console.log('hello');
      console.log(json.message);

      transactions.set(json.message[2]);
    } catch (e) {
      // console.log("hi");
      // console.log(e);
    }

    transactions.setLoading(false);
  };
}
