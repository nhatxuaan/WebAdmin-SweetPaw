import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Discount } from 'src/model/discount';

import { Iconify } from 'src/components/iconify';




// export interface DiscountProps {
//   _id: string;
//   HoTen: string;
//   Email: string;
//   SoDienThoai?: string;
//   DiaChi?: Array<{
//     TenDiaChi: string;
//     SoNha: string;
//     TenDuong: string;
//     PhuongXa: string;
//     QuanHuyen: string;
//     ThanhPho: string;
//     MacDinh: boolean;
//   }>;
//   totalSpent?: number;
// }

// interface DiscountTableRowProps {
//   row: DiscountProps;
//   selected: boolean;
//   onSelectRow: () => void;
// }

interface DiscountTableRowProps {
  row: Discount;
  selected: boolean;
  onSelectRow: () => void;
}

export function DiscountTableRow({ row, selected, onSelectRow }: DiscountTableRowProps) {
  const navigate = useNavigate();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // const handleEditCustomer = useCallback(
  //   (customerId: string) => {
  //     navigate(`/sweetpaw/user/${customerId}/edit`);
  //   },
  //   [navigate]
  // );

//   const handleEditDiscount = useCallback(
//     (discount: DiscountProps) => {
//       navigate(`/sweetpaw/discount/${discount._id}/edit`, { state: discount });
//     },
//     [navigate]
//   );

  const handleEditDiscount = useCallback(() => {
    navigate(`/sweetpaw/discount/${row._id}/edit`, { state: row });
  }, [navigate, row]);

  const handleDeleteDiscount = useCallback(
    async () => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này không?')) return;

      try {
        //console.log("Deleting...", discountId);
        await new Promise((resolve) => setTimeout(resolve, 300));
        alert("Đã xóa khuyến mãi!");
        navigate('/sweetpaw/discount');
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },
    [navigate]
  );



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {row.code}
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.type}</TableCell>

        <TableCell> {row.value + "₫"} </TableCell>
        <TableCell>{row.quantity} </TableCell>
        <TableCell>{row.startDate} </TableCell>
        <TableCell>{row.endDate} </TableCell>
        <TableCell align="right"> 
            {row.isActive ? (
            <span style={{ color: "#22c55e", fontWeight: 600 }}>Hoạt động</span>
            ) : (
                <span style={{ color: "#ef4444", fontWeight: 600 }}>Ngừng</span>
            )} 
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
              //handleEditCustomer(row._id);
              //handleEditDiscount(row);
              handleEditDiscount();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Chỉnh sửa
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
             // handleDeleteDiscount(row._id);
              handleDeleteDiscount();
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
