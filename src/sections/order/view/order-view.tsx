import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, ChangeEvent, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { apiGetAuth } from 'src/services/apiClient';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { OrderTableRow } from '../order-table-row';
import { OrderTableHead } from '../order-table-head';
import { TableEmptyRows } from '../table-empty-rows';
//import { OrderTableToolbar } from '../order-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// DEFINE ORDER TYPE
interface Order {
  _id: string;
  HoTen: string;
  NgayDat: Date;
  TongTien: number;
  paymentMethod: string;
  deliveryStatus: string;
  paymentStatus: string;
}

export function OrderView() {
  const navigate = useNavigate();
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  //Dữ liệu giả tạm thời để xem cái giao diện 
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: 'TEST',
      HoTen: 'Ngô Nhật Xuân',
      NgayDat: new Date ('2/12/2025'),
      TongTien: 50000,
      paymentMethod: 'Tiền mặt',
      deliveryStatus: 'Đang chuẩn bị',
      paymentStatus: 'Đã thanh toán',
    },

  ]);
  const dataFiltered = orders;
  const notFound = !dataFiltered.length && !!filterName;

  //  GET DATA FROM BACKEND
  // useEffect(() => {
  //   async function fetchCustomers() {
  //     try {
  //       const data = await apiGetAuth('/api/admin/customers');
  //       console.log('Customers API:', data);
  //       setCustomers(data);
  //     } catch (err) {
  //       console.error('Load customers failed:', err);
  //     }
  //   }

  //   fetchCustomers();
  // }, []);

  // // FILTER DATA
  // const dataFiltered = applyFilter({
  //   inputData: customers,
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  // const handleAddCustomer = useCallback(() => {
  //   navigate('/sweetpaw/user/new/edit');
  // }, [navigate]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Đơn hàng
        </Typography>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={orders.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                headLabel={[
                  { id: '_id', label: 'Mã đơn hàng' },
                  { id: 'HoTen', label: 'Họ tên khách' },
                  { id: 'NgayDat', label: 'Ngày đặt' },
                  { id: 'TongTien', label: 'Tổng Tiền', align: 'right'},
                  { id: 'paymentMethod', label: 'Phương thức thanh toán' },
                  { id: 'deliveryStatus', label: 'Trạng thái giao hàng' },
                  { id: 'paymentStatus', label: 'Trạng thái thanh toán'},
                  { id: '', width: 60 },
                ]}
              />

               <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <OrderTableRow
                      key={row._id}
                      row={row}
                      selected={table.selected.includes(row._id)}
                      onSelectRow={() => table.onSelectRow(row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, orders.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody> 
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={orders.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}


// TABLE HOOK

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('HoTen'); // default sort
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );


  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];
      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => setPage(0), []);

  const onChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const onChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}
