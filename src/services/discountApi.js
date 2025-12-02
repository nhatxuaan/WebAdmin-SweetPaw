import { apiGetAuth, apiPostAuth, apiPutAuth } from './apiClient';

export function apiGetDiscounts() {
  return apiGetAuth("/api/discounts");
}