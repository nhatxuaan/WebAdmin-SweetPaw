import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------


export default function UserEditView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: customer } = useLocation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Fetch dữ liệu sản phẩm khi chỉnh sửa
  // useEffect(() => {
  //     setLoading(true);
  //     // TODO: Gọi API để lấy thông tin sản phẩm
  //     // const fetchProduct = async () => {
  //     //   const response = await fetch(`/api/products/${id}`);
  //     //   const data = await response.json();
  //     //   setFormData(data);
  //     // };
  //     // fetchProduct();

  //     // Mock data để demo
  //     setTimeout(() => {
  //       setFormData({
  //         name: `Ngô Nhật Xuân`,
  //         email: 'nhatxuaan@gmail.com',
  //         phoneNumber: '0348957446',
  //         address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
  //       });
  //       setLoading(false);
  //     }, 500);
  //   }, [id]);


  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.HoTen,
        email: customer.Email,
        phoneNumber: customer.SoDienThoai || "",
        address: customer.DiaChi?.[0]
          ? `${customer.DiaChi[0].SoNha} ${customer.DiaChi[0].TenDuong}, ${customer.DiaChi[0].PhuongXa}, ${customer.DiaChi[0].QuanHuyen}, ${customer.DiaChi[0].ThanhPho}`
          : ""
      });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Gọi API để lưu khách hàng
      console.log('Saving customer:', formData);
      
      console.log('Inserting:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Quay về trang danh sách
      navigate('/sweetpaw/user');
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <DashboardContent>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/sweetpaw/user')}
          sx={{ cursor: 'pointer' }}
        >
          Khách hàng
        </Link>
        <Typography color="text.primary">
          Thêm mới
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          Thêm mới thông tin khách hàng
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/sweetpaw/user')}
        >
          Quay lại
        </Button>
      </Stack>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Thông tin khách hàng */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Thông tin khách hàng
              </Typography>

              <Stack spacing={3}>
                {/* Tên khách hàng */}
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Họ tên khách hàng"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ tên khách hàng"
                />

                {/* Email */}
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                />

                {/* Số điện thoại */}
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                />

                {/* Địa chỉ */}
                 <TextField
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />

                {/* Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? 'Đang lưu...' : 'Tạo mới'}
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardContent>
  );
}

