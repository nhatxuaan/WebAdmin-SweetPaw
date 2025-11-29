// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom'; // ← THÊM DÒNG NÀY

// import Popover from '@mui/material/Popover';
// import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuList from '@mui/material/MenuList';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

// import { Iconify } from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export type UserProps = {
//   // id: string;
//   // name: string;
//   // email: string;
//   // phoneNumber: string;
//   // address: string;
//   // totalSpent: number;
//   //isVerified: boolean;
//   _id: string;
//   HoTen: string;
//   Email: string;
//   SoDienThoai: string;
//   DiaChi: Array<any>;
//   totalSpent?: number;
// };

// type UserTableRowProps = {
//   row: UserProps;
//   selected: boolean;
//   onSelectRow: () => void;
// };

// export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  
//     const navigate = useNavigate(); // ← THÊM DÒNG NÀY


//   const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

//   const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
//     setOpenPopover(event.currentTarget);
//   }, []);

//   const handleClosePopover = useCallback(() => {
//     setOpenPopover(null);
//   }, []);

//     // Xử lý khi click chỉnh sửa khách hàng
//   const handleEditCustomer = useCallback((customerId: string) => {
//     navigate(`/sweetpaw/user/${customerId}/edit`);
//   }, [navigate]);

//     // Xử lý khi click xóa khách hàng
//   // Xử lý khi click xóa khách hàng
// // HÀM NÀY PHẢI NHẬN ID KHÁCH HÀNG CẦN XÓA
// const handleDeleteCustomer = useCallback(async (customerId: string) => { 


//     if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
//         try {

//             //  BƯỚC QUAN TRỌNG: GỌI API XÓA KHÁCH HÀNG
//             // Bạn cần truyền hàm setLoading từ component cha (UserView) xuống để dùng
//             // TẠM THỜI: Chỉ dùng API và điều hướng
            
//             console.log(`Đang xóa Khách hàng có ID: ${customerId}`);
//             // await api.delete(`/user/${customerId}`); // Dùng endpoint của USER
            
//             // Ví dụ delay để mô phỏng API call
//             await new Promise(resolve => setTimeout(resolve, 500)); 

//             alert('Khách hàng đã được xóa thành công!');
            
//             // Điều hướng về trang danh sách khách hàng (HOẶC TỐT HƠN: Làm mới danh sách)
//             navigate('/sweetpaw/user'); // Điều hướng về trang danh sách USER

//         } catch (error) {
//             console.error("Lỗi khi xóa khách hàng:", error);
//             alert('Có lỗi xảy ra khi xóa khách hàng. Vui lòng thử lại.');
//         } 
//         // KHÔNG CÓ finally { setLoading(false); } Ở ĐÂY
//     }
// }, [navigate]); //  Dependencies chỉ cần navigate

// // Lấy địa chỉ mặc định
//   const defaultAddress = row.DiaChi?.find(addr => addr.MacDinh) 
//     ? `${row.DiaChi.find(addr => addr.MacDinh).SoNha} ${row.DiaChi.find(addr => addr.MacDinh).TenDuong}, ${row.DiaChi.find(addr => addr.MacDinh).PhuongXa}, ${row.DiaChi.find(addr => addr.MacDinh).QuanHuyen}, ${row.DiaChi.find(addr => addr.MacDinh).ThanhPho}`
//     : "Chưa có";


//   return (
//     <>
//       <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
//         <TableCell padding="checkbox">
//           <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
//         </TableCell>

//         <TableCell component="th" scope="row">
//           {row.HoTen}
//         </TableCell>

//         <TableCell>{row.Email}</TableCell>

//         <TableCell>{row.SoDienThoai || "—"}</TableCell>

//         <TableCell sx={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//           {defaultAddress}
//         </TableCell>

//         <TableCell align="right">{row.totalSpent?.toLocaleString?.()}₫</TableCell>


//         <TableCell align="right">
//           <IconButton onClick={handleOpenPopover}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <Popover
//         open={!!openPopover}
//         anchorEl={openPopover}
//         onClose={handleClosePopover}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MenuList
//           disablePadding
//           sx={{
//             p: 0.5,
//             gap: 0.5,
//             width: 140,
//             display: 'flex',
//             flexDirection: 'column',
//             [`& .${menuItemClasses.root}`]: {
//               px: 1,
//               gap: 2,
//               borderRadius: 0.75,
//               [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
//             },
//           }}
//         >
//             <MenuItem
//             onClick={() => { // HÀM MŨI TÊN ĐỂ GỌI NHIỀU HÀM
//             handleClosePopover(); // 1. Đóng Popover trước
//             handleEditCustomer(row._id); // 2. Chuyển hướng đến trang sửa (truyền ID khách hàng)
//             }}
//             >
//             <Iconify icon="solar:pen-bold" />
//             Chỉnh sửa
//             </MenuItem>

//           <MenuItem 
//           onClick={() => {
//             handleClosePopover();
//             handleDeleteCustomer(row._id)
//           }}
//           sx={{ color: 'error.main' }}
//           >
//             <Iconify icon="solar:trash-bin-trash-bold" />
//             Xóa
//           </MenuItem>
//         </MenuList>
//       </Popover>
//     </>
//   );
// }

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

// ---------------------------------
// TYPE CUSTOMER (KHỚP 100% BACKEND)
// ---------------------------------
export interface UserProps {
  _id: string;
  HoTen: string;
  Email: string;
  SoDienThoai?: string;
  DiaChi?: Array<{
    TenDiaChi: string;
    SoNha: string;
    TenDuong: string;
    PhuongXa: string;
    QuanHuyen: string;
    ThanhPho: string;
    MacDinh: boolean;
  }>;
  totalSpent?: number;
}

interface UserTableRowProps {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
}

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const navigate = useNavigate();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleEditCustomer = useCallback(
    (customerId: string) => {
      navigate(`/sweetpaw/user/${customerId}/edit`);
    },
    [navigate]
  );

  const handleDeleteCustomer = useCallback(
    async (customerId: string) => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) return;

      try {
        console.log("Deleting...", customerId);
        await new Promise((resolve) => setTimeout(resolve, 300));
        alert("Đã xóa khách hàng!");
        navigate('/sweetpaw/user');
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },
    [navigate]
  );

  // -------------------------
  // TÍNH ĐỊA CHỈ MẶC ĐỊNH
  // -------------------------
  let defaultAddress = "Chưa có";

  if (row.DiaChi?.length) {
    const addr = row.DiaChi.find((a) => a.MacDinh) ?? row.DiaChi[0];

    if (addr) {
      defaultAddress = `${addr.SoNha} ${addr.TenDuong}, ${addr.PhuongXa}, ${addr.QuanHuyen}, ${addr.ThanhPho}`;
    }
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {row.HoTen}
        </TableCell>

        <TableCell>{row.Email}</TableCell>

        <TableCell>{row.SoDienThoai || "—"}</TableCell>

        <TableCell sx={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {defaultAddress}
        </TableCell>

        <TableCell align="right">
          {row.totalSpent ? row.totalSpent.toLocaleString() + "₫" : "—"}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleEditCustomer(row._id);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Chỉnh sửa
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleDeleteCustomer(row._id);
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Xóa
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
