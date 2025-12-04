import { apiGetAuth, apiPostAuth, apiPutAuth } from './apiClient';

export async function apiGetOrders() {
  return apiGetAuth('/api/admin/orders');
}