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
  const isNewProduct = id === 'new';

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
    if (!isNewProduct) {
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
    }
  }, [id, isNewProduct]);

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

  // Thêm vào trong ProductEditView.tsx
const handleDeleteProduct = useCallback(async () => {
    if (!id || isNewProduct) return; // Bảo vệ: Không xóa nếu không có ID hoặc đang ở chế độ tạo mới

    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        try {
            setLoading(true);
            // BƯỚC QUAN TRỌNG: GỌI API XÓA
            // await api.delete(`/products/${id}`); 
            
            // Ví dụ delay để mô phỏng API call
            await new Promise(resolve => setTimeout(resolve, 500)); 

            alert('Sản phẩm đã được xóa thành công!');
            
            // Điều hướng về trang danh sách sản phẩm
            navigate('/sweetpaw/products'); 

        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    }
}, [id, navigate, setLoading]); // Đảm bảo các dependencies cần thiết

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
          {isNewProduct ? 'Thêm mới' : 'Chỉnh sửa'}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          {isNewProduct ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
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
                  {/* Chỉ xuất hiện nút xóa ở màn hình sửa sản phẩm */}
                {!isNewProduct && (
                        <Button
                            variant="outlined"
                            color="error" // Màu đỏ, tượng trưng cho hành động nguy hiểm
                            onClick={handleDeleteProduct} 
                            disabled={loading}
                            sx={{ mr: 'auto' }} // Đẩy nút này về phía trái
                        >
                            Xóa sản phẩm
                        </Button>
                    )}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    //startIcon={loading ? <Iconify icon="eos-icons:loading" /> : null}
                  >
                    {loading ? 'Đang lưu...' : isNewProduct ? 'Tạo mới' : 'Lưu thay đổi'}
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

// src/pages/product-edit.tsx

// src/sections/product/view/product-edit-view.tsx

// import { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';

// import { DashboardContent } from 'src/layouts/dashboard';
// // ... các import khác

// // Dữ liệu cố định
// const CATEGORY_OPTIONS = [
//   { value: 'banhkem', label: 'Bánh kem' },
//   { value: 'banhmi', label: 'Bánh mì' },
//   { value: 'banhngot', label: 'Bánh ngọt' },
//   { value: 'banhquy', label: 'Bánh quy' },
//   { value: 'douong', label: 'Đồ uống' },
//   { value: 'banhmini', label: 'Bánh mini' },
// ];

// export function ProductEditView() { // Component View chính
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   // LOGIC: Xác định chế độ
//   const isNewProduct = useMemo(() => id === 'new', [id]); 

//   // LOGIC: State
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     costprice: '',
//     sellingprice: '',
//     category: 'banhkem',
//     stock: '',
//     description: '',
//     coverUrl: '',
//   });

//   // LOGIC: Fetch dữ liệu sản phẩm
//   useEffect(() => {
//     if (!isNewProduct) {
//       setLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         setFormData({
//           name: `Bánh kem dâu tây - ID: ${id}`,
//           costprice: '200000',
//           sellingprice: '299000',
//           category: 'banhkem',
//           stock: '50',
//           description: `Mô tả bánh kem dâu tây (ID: ${id})`,
//           coverUrl: '/assets/images/product/product_1.webp',
//         });
//         setLoading(false);
//       }, 500);
//     }
//   }, [id, isNewProduct]);

//   // LOGIC: Xử lý thay đổi input
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
//     const name = e.target.name || '';
//     const value = e.target.value;
    
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // LOGIC: Xử lý Submit Form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       navigate('/products');
//     } catch (error) {
//       console.error('Error saving product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // LOGIC: Xử lý khi nhấn nút Hủy/Quay lại
//   const handleCancel = () => {
//     navigate('/products');
//   };

//   // ----------------------------------------------------------------------
//   // GIAO DIỆN (UI)
//   // ----------------------------------------------------------------------

//   return (
//     <DashboardContent>
//       {/* Breadcrumb */}
//       <Breadcrumbs sx={{ mb: 3 }}>
//         <Link
//           underline="hover"
//           color="inherit"
//           onClick={handleCancel}
//           sx={{ cursor: 'pointer' }}
//         >
//           Sản phẩm
//         </Link>
//         <Typography color="text.primary">
//           {isNewProduct ? 'Thêm mới' : 'Chỉnh sửa'}
//         </Typography>
//       </Breadcrumbs>

//       {/* Header */}
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">
//           {isNewProduct ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
//         </Typography>
//         <Button
//           variant="text"
//           onClick={handleCancel}
//         >
//           Quay lại
//         </Button>
//       </Stack>

//       {/* Form */}
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           {/* Ảnh sản phẩm */}
//           <Grid item xs={12} md={4}>
//              {/* ... (phần giao diện ảnh) ... */}
//              <Card sx={{ p: 3 }}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Hình ảnh
//               </Typography>
//               {formData.coverUrl && (
//                 <Box
//                   component="img"
//                   src={formData.coverUrl}
//                   alt="Preview"
//                   sx={{
//                     width: '100%',
//                     height: 300,
//                     objectFit: 'cover',
//                     borderRadius: 1,
//                     mb: 2,
//                   }}
//                 />
//               )}
//               <TextField
//                 fullWidth
//                 name="coverUrl"
//                 label="URL hình ảnh"
//                 value={formData.coverUrl}
//                 onChange={handleChange}
//                 placeholder="https://example.com/image.jpg"
//               />
//             </Card>
//           </Grid>

//           {/* Thông tin sản phẩm */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ p: 3 }}>
//               <Typography variant="h6" sx={{ mb: 3 }}>
//                 Thông tin sản phẩm
//               </Typography>

//               <Stack spacing={3}>
//                 {/* Tên sản phẩm, Giá, Danh mục, Mô tả */}
//                 <TextField
//                   fullWidth
//                   required
//                   name="name"
//                   label="Tên sản phẩm"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Nhập tên sản phẩm"
//                 />

//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       required
//                       type="number"
//                       name="costprice"
//                       label="Giá vốn (VNĐ)"
//                       value={formData.costprice}
//                       onChange={handleChange}
//                       placeholder="0"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       required
//                       type="number"
//                       name="sellingprice"
//                       label="Giá bán (VNĐ)"
//                       value={formData.sellingprice}
//                       onChange={handleChange}
//                       placeholder="0"
//                     />
//                   </Grid>
//                 </Grid>

//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       select
//                       required
//                       name="category"
//                       label="Danh mục"
//                       value={formData.category}
//                       onChange={handleChange}
//                     >
//                       {CATEGORY_OPTIONS.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       required
//                       type="number"
//                       name="stock"
//                       label="Số lượng"
//                       value={formData.stock}
//                       onChange={handleChange}
//                       placeholder="0"
//                     />
//                   </Grid>
//                 </Grid>

//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   name="description"
//                   label="Mô tả sản phẩm"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Nhập mô tả chi tiết về sản phẩm..."
//                 />

//                 {/* Buttons */}
//                 <Stack direction="row" spacing={2} justifyContent="flex-end">
//                   <Button
//                     variant="outlined"
//                     color="inherit"
//                     onClick={handleCancel}
//                     disabled={loading}
//                   >
//                     Hủy
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={loading}
//                   >
//                     {loading ? 'Đang lưu...' : isNewProduct ? 'Tạo mới' : 'Lưu thay đổi'}
//                   </Button>
//                 </Stack>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </form>
//     </DashboardContent>
//   );
// }