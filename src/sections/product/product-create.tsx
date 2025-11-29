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

const CATEGORY_OPTIONS = [
  { value: 'banhkem', label: 'Bánh kem' },
  { value: 'banhmi', label: 'Bánh mì' },
  { value: 'banhngot', label: 'Bánh ngọt' },
  { value: 'banhquy', label: 'Bánh quy' },
  { value: 'douong', label: 'Đồ uống' },
  { value: 'banhmini', label: 'Bánh mini' },
];

export default function ProductEditView() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    costprice: '',
    sellingprice: '',
    category: 'banhkem',
    stock: '',
    description: '',
    coverUrl: '',
    //ratingAverage: '',
  });

  // Fetch dữ liệu sản phẩm khi chỉnh sửa
  useEffect(() => {
      setLoading(true);
      // TODO: Gọi API để lấy thông tin sản phẩm
      // const fetchProduct = async () => {
      //   const response = await fetch(`/api/products/${id}`);
      //   const data = await response.json();
      //   setFormData(data);
      // };
      // fetchProduct();

      // Mock data để demo
      setTimeout(() => {
        setFormData({
          name: `Bánh kem dâu tây`,
          costprice: '200000',
          sellingprice: '299000',
          category: 'banhkem',
          stock: '50',
          description: 'Bánh kem dâu tây',
          coverUrl: 'https://res.cloudinary.com/djyflat5m/image/upload/v1760620872/banh_kem_trai_tim_socola_sf6tw2.png',
        });
        setLoading(false);
      }, 500);
  }, [id]);

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
      // TODO: Gọi API để lưu sản phẩm
      console.log('Saving product:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Quay về trang danh sách
      navigate('/sweetpaw/products');
    } catch (error) {
      console.error('Error saving product:', error);
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
          onClick={() => navigate('/products')}
          sx={{ cursor: 'pointer' }}
        >
          Sản phẩm
        </Link>
        <Typography color="text.primary">
           Thêm mới
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
         Thêm sản phẩm mới
        </Typography>
        <Button
          variant="text"
          //startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => navigate('/sweetpaw/products')}
        >
          Quay lại
        </Button>
      </Stack>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Ảnh sản phẩm */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Hình ảnh
              </Typography>
              {formData.coverUrl && (
                <Box
                  component="img"
                  src={formData.coverUrl}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
              )}
              <TextField
                fullWidth
                name="coverUrl"
                label="URL hình ảnh"
                value={formData.coverUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Card>
          </Grid>

          

          {/* Thông tin sản phẩm */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Thông tin sản phẩm
              </Typography>

              <Stack spacing={3}>
                {/* Tên sản phẩm */}
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Tên sản phẩm"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                />

                {/* Giá vốn và giá bán */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="costprice"
                      label="Giá vốn (VNĐ)"
                      value={formData.costprice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="sellingprice"
                      label="Giá bán (VNĐ)"
                      value={formData.sellingprice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>

                {/* Danh mục và Số lượng */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      select
                      required
                      name="category"
                      label="Danh mục"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {CATEGORY_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                     <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="stock"
                      label="Số lượng"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>

                {/* Mô tả */}
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Mô tả sản phẩm"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                />

                {/* Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    //startIcon={loading ? <Iconify icon="eos-icons:loading" /> : null}
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

