import './App.css'
import OrderTable, {OrderTableRow} from './components/Table/OrderTable';
import Button from './components/Button/Button';
import TextInput from './components/TextInput/TextInput';
import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import Loader from './components/Loader/Loader';

function App(): React.JSX.Element {
  const [orders, setOrders] = useState([] as OrderTableRow[]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    search();
  }, []);
  function refresh(): void {
    search(searchQuery);
  }
  function search(value?: string): void {
    if (!value?.length || value?.length >= 2) {
      setSearchQuery(value);
      setIsLoading(true);
      fetch('/api/orders' + (value?.length ? ('?' + new URLSearchParams({search: value}).toString()) : ''))
        .then((res) => res.json().then((json) => setOrders(json))
          .finally(() => setIsLoading(false)));
    }
  }

  return (
    <div className="flex flex-column">
      <div className="flex space-between">
        <h1>Orders</h1>
        <div className="flex flex-align-center">
          <Button title="Refresh" icon={faRefresh} onClick={refresh} />
        </div>
      </div>
      <div>
        <TextInput name="order_number" placeholder="Search by order number" onChange={(value: string) => search(value)} />
      </div>
      {isLoading && <Loader />}
      {!isLoading && <OrderTable data={orders}/>}
    </div>
  );
}

export default App;
