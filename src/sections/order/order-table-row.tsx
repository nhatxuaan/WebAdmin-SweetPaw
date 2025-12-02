
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


export interface OrderProps {
  _id: string;
  HoTen: string;
  NgayDat: Date;
  TongTien: number;
  paymentMethod: string;
  deliveryStatus: string;
  paymentStatus: string;
}

interface OrderTableRowProps {
  row: OrderProps;
  selected: boolean;
  //Xem chi tiết đơn hàng
  onSelectRow: () => void;
  //Cập nhật đơn hàng (trạng thái giao hàng, trạng thái thanh toán)
  //onOpenEditModal: (order: OrderProps) => void;
}

export function OrderTableRow({ row, selected, onSelectRow }: OrderTableRowProps) {
const navigate = useNavigate();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleViewOrder = useCallback(
    (order: OrderProps) => {
      handleClosePopover();
      navigate(`/sweetpaw/order/${order._id}/view`, { state: order });
    },
    [navigate, handleClosePopover]
  );

  const handleUpdateOrder = useCallback(
    (order: OrderProps) => {
      handleClosePopover();
      navigate(`/sweetpaw/order/${order._id}/update`, { state: order });
    },
    [navigate, handleClosePopover]
  );

  // const handleEditDeliveryStatus = useCallback(
  //   (order: OrderProps) => {
  //     navigate(`/sweetpaw/order/${order._id}/editDeliveryStatus`, { state: order });
  //   },
  //   [navigate]
  // );

  // const handleEditPaymentStatus = useCallback(
  //   (order: OrderProps) => {
  //     navigate(`/sweetpaw/order/${order._id}/editPaymentStatus`, { state: order });
  //   },
  //   [navigate]
  // );
 
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell>{row.HoTen}</TableCell>
        <TableCell>{row.NgayDat.toLocaleDateString()}</TableCell>
        <TableCell align="right">
          {row.TongTien ? row.TongTien.toLocaleString() + "₫" : "—"}
        </TableCell>        
        <TableCell>{row.paymentMethod}</TableCell>
        <TableCell>{row.deliveryStatus}</TableCell>
        <TableCell>{row.paymentStatus}</TableCell>
        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
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
            width: 260,
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
              handleUpdateOrder(row);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Cập nhật trạng thái đơn hàng
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleViewOrder(row);
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Xem chi tiết đơn hàng
          </MenuItem>
        </MenuList>
      </Popover>
   
  </>
  )
} 
