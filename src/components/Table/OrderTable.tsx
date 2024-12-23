import './OrderTable.css';
import {format} from 'date-fns';

export interface OrderTableRow {
  orderNumber: string;
  dueDate: string;
  createdAt: string;
  total: number;
  status: 'PAID' | 'UNPAID';
}
interface OrderTableProps {
  data: Array<OrderTableRow>;
}
function OrderTable(props: OrderTableProps): React.JSX.Element {
  function formatDate(date: string, withTime?: boolean): string {
    return format(new Date(date), 'LLL dd, yyyy' + (withTime ? ' hh:mm' : ''));
  }
  function formatPrice(price: number): string {
    return '€' + new Intl.NumberFormat('en-EE').format(price);
  }
  function getStatusClass(date: string, status: string): string {
    return status === 'PAID' ? 'status-paid' : ( new Date().getTime() < new Date(date).getTime() ? 'status-pending' : 'status-unpaid');
  }
  const renderRows: React.JSX.Element[] = props.data.map((item: OrderTableRow, idx: number) => (
    <tr key={idx}>
      <td>{item.orderNumber}</td>
      <td>{formatDate(item.createdAt, true)}</td>
      <td>{formatDate(item.dueDate)}</td>
      <td className="align-right">{formatPrice(item.total)}</td>
      <td className={'bold align-right ' + getStatusClass(item.dueDate, item.status)}>{item.status}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
      <tr>
        <th>Order #</th>
        <th>Created at</th>
        <th>Due date</th>
        <th className="align-right">Total</th>
        <th className="align-right">Status</th>
      </tr>
      </thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
}
export default OrderTable;
