// src/services/apiClient.js

//export const API_URL = "https://sweetpaw-be.azurewebsites.net"; // domain backend

//http://localhost:3000/
export const API_URL = "http://localhost:3000"


// Hàm POST chung (không cần token)
export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
// Hàm GET có token (dành cho admin)
export async function apiGetAuth(path) {
  const token = localStorage.getItem("adminToken");
  console.log("Token lấy từ localStorage:", token);

  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API ${path} lỗi: ${res.status}`);
  }

  return res.json();
}
