import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'; // Đã loại bỏ useCallback, useMemo không dùng
import { useParams, useNavigate } from 'react-router-dom';

// Thêm các import cần thiết cho Table
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';
// import { apiUpdateOrder, apiDeleteOrder } from 'src/services/orderApi';

// ----------------------------------------------------------------------

const PAYMENT_METHOD_OPTIONS = [
  { value: 'Tiền mặt', label: 'Tiền mặt' },
  { value: 'Chuyển khoản', label: 'Chuyển khoản' },
];

const DELIVERY_STATUS_OPTIONS = [
  { value: 'Đang xử lí', label: 'Đang xử lí' },
  { value: 'Đang giao hàng', label: 'Đang giao hàng' },
  { value: 'Đã giao thành công', label: 'Đã giao thành công' },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Chưa thanh toán' },
  { value: 'SUCCESS', label: 'Đã thanh toán thành công' },
];
const mockOrderItems = [
    { name: 'Bánh kem mocha trái cây', quantity: 1, price: 400000 },
    { name: 'Cà phê mocha', quantity: 1, price: 55000 },
    { name: 'Bánh mocha cổ điển', quantity: 2, price: 50000 },
];

const mockTotals = {
    shipping: 30000,
    discount: 20000,
    finalTotal: 555000,
};
// Hàm định dạng tiền tệ
const formatCurrency = (amount: number | string) => {
    // Đảm bảo amount là số và định dạng sang tiền tệ Việt Nam
    const numberAmount = Number(amount);
    if (isNaN(numberAmount)) return amount; // Trả về nguyên gốc nếu không phải số
    return numberAmount.toLocaleString('vi-VN');
};

// Hàm định dạng ngày tháng
const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString.toString();
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch {
        return dateString.toString();
    }
};

export default function OrdertDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: order } = useLocation() as { state: any };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    HoTen: '',
    NgayDat: '', 
    TongTien: '',
    paymentMethod: '',
    deliveryStatus: '',
    paymentStatus: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        _id: order._id || '',
        HoTen: order.HoTen || '',
        NgayDat: formatDate(order.NgayDat),
        TongTien: order.TongTien ? order.TongTien.toString() : '',
        paymentMethod: order.paymentMethod || PAYMENT_METHOD_OPTIONS[0].value,
        deliveryStatus: order.deliveryStatus || DELIVERY_STATUS_OPTIONS[0].value,
        paymentStatus: order.paymentStatus || PAYMENT_STATUS_OPTIONS[0].value,
      });
    }
  }, [order]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Bạn có thể thêm hàm handleUpdate tại đây

  return (
    <DashboardContent>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/sweetpaw/order')}
          sx={{ cursor: 'pointer' }}
        >
          Đơn hàng
        </Link>
        <Typography color="text.primary">
          Xem chi tiết đơn hàng
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          Xem chi tiết đơn hàng
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/sweetpaw/order')}
        >
          Quay lại
        </Button>
      </Stack>

      {/* Form */}
      {/* Wrapper Grid Container */}
      <form>
        <Grid container spacing={3} justifyContent="center">
          {/* Cột chính chứa Card */}
          <Grid size={{xs: 12, md: 12}}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Chi tiết đơn hàng
              </Typography>

              <Stack spacing={3}>
                <Grid container spacing={3}>
                  
                  {/*Tên khách hàng */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      required
                      name="HoTen"
                      label="Họ tên khách hàng"
                      value={formData.HoTen}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                   {/*Phương thức thanh toán */}
                 <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      select
                      required
                      name="paymentMethod"
                      label="Phương thức thanh toán"
                      value={formData.paymentMethod}
                      InputProps={{ readOnly: true }}
                    >
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Mã đơn hàng */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      required
                      name="_id"
                      label="Mã đơn hàng"
                      value={formData._id}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                   {/* Trạng thái giao hàng */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      select
                      required
                      name="deliveryStatus"
                      label="Trạng thái giao hàng"
                      value={formData.deliveryStatus}
                      InputProps={{ readOnly: true }}
                    >
                      {DELIVERY_STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  {/* Tổng tiền */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      required
                      name="TongTien"
                      label="Tổng tiền (VNĐ)"
                      value={formData.TongTien}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  {/* Trạng thái thanh toán */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      select
                      required
                      name="paymentStatus"
                      label="Trạng thái thanh toán"
                      value={formData.paymentStatus}
                      InputProps={{ readOnly: true }}
                    >
                      {PAYMENT_STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Ngày đặt */}
                  <Grid size={{xs: 12, md: 6}}>
                    <TextField
                      fullWidth
                      required
                      name="NgayDat"
                      label="Ngày đặt"
                      value={formData.NgayDat}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  {/* Nút CẬP NHẬT
                  <Grid size={{xs: 12, md: 6}}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        // onClick={handleUpdate}
                      >
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </Button>
                    </Stack>
                  </Grid> */}
                </Grid>
              </Stack>
            </Card>
          </Grid>  
              {/* KHỐI 2: DANH SÁCH SẢN PHẨM (Dạng 12 cột, nằm bên dưới Khối 1) */}
        <Grid size= {{xs:12, md:12}}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Danh sách sản phẩm
                </Typography>
                
                {/* Bảng sản phẩm */}
                <TableContainer>
                    <Table size="small" sx={{ minWidth: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="right">Giá bán</TableCell>
                                <TableCell align="right">Thành tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockOrderItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                    <TableCell align="right">{formatCurrency(item.quantity * item.price)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Tổng kết đơn hàng (width 280px) */}
                <Stack spacing={1} alignItems="flex-end" sx={{ mt: 3, pr: 2 }}>
                    <Stack direction="row" justifyContent="space-between" width={280}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Phí vận chuyển</Typography>
                        <Typography variant="body2">{formatCurrency(mockTotals.shipping)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" width={280}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Giảm giá</Typography>
                        <Typography variant="body2" color="error">- {formatCurrency(mockTotals.discount)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" width={280} sx={{ pt: 1, borderTop: '1px dashed grey' }}>
                        <Typography variant="subtitle1">Tổng tiền</Typography>
                        <Typography variant="subtitle1" color="primary">{formatCurrency(mockTotals.finalTotal)}</Typography>
                    </Stack>
                </Stack>
            </Card>
          </Grid>    
        </Grid>
      </form>
    </DashboardContent>
  );
}