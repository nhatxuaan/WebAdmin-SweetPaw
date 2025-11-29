import { apiGetAuth } from "./apiClient";

export async function apiGetProducts() {
  return apiGetAuth("/api/admin/products");
}
