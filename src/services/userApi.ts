import { apiGetAuth } from './apiClient';

export async function apiGetUsers() {
  return apiGetAuth('/api/admin/customers');
}
