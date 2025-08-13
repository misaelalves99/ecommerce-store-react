// src/pages/Brand/Index.tsx

import { Link } from 'react-router-dom';
import BrandList from '../../components/Brands/BrandList';
import { useBrands } from '@/hooks/useBrands';
import styles from './BrandPage.module.css';

export default function BrandsPage() {
  const { brands } = useBrands();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Marcas</h1>
        <Link to="/brands/create" className={styles.btn}>
          Adicionar Marca
        </Link>
      </div>

      <BrandList brands={brands} />
    </div>
  );
}
