import {http, HttpResponse} from 'msw';
import orders from './orders.json';

export const handlers = [
  http.get('/api/orders', ({request}) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search');
    const orderData = orders.filter(entry => !searchQuery?.length || entry.orderNumber.toUpperCase().includes(searchQuery.toUpperCase()));
    return HttpResponse.json(orderData);
  })
]
