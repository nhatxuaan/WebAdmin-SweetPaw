// src/sections/product/view/products-view.tsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // ← THÊM DÒNG NÀY

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'banhkem', label: 'Bánh kem' },
  { value: 'banhmi', label: 'Bánh mì' },
  { value: 'banhngot', label: 'Bánh ngọt' },
  { value: 'banhquy', label: 'Bánh quy' },
  { value: 'douong', label: 'Đồ uống' },
  { value: 'banhmini', label: 'Bánh mini' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below100', label: '<100k' },
  { value: '100below200', label: '100k - <200k' },
  { value: '200below300', label: '200k - <300k' },
  { value: '300below400', label: '300k - <400k' },
  { value: 'high400', label: '>400k' },
];

const defaultFilters = {
  price: '',
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

export function ProductsView() {
  const navigate = useNavigate(); 
  
  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  // Xử lý khi click vào sản phẩm
  const handleEditProduct = useCallback((productId: string) => {
    navigate(`/sweetpaw/products/${productId}/edit`);
  }, [navigate]);

  // Xử lý khi click "Thêm sản phẩm mới"
  const handleAddProduct = useCallback(() => {
    navigate('/sweetpaw/products/new/edit');
  }, [navigate]);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Sản phẩm
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddProduct} 
        >
          Thêm sản phẩm mới
        </Button>
      </Box>

      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap-reverse',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            my: 1,
            gap: 1,
            flexShrink: 0,
            display: 'flex',
          }}
        >
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
            }}
          />

          <ProductSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: 'priceDesc', label: 'Giá: Cao - Thấp' },
              { value: 'priceAsc', label: 'Giá: Thấp - Cao' },
            ]}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {_products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem 
              product={product}
              onEdit={handleEditProduct} // ← THÊM PROP NÀY
            />
          </Grid>
        ))}
      </Grid>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}