// src/pages/Category/Index.tsx

import { Link } from 'react-router-dom';
import CategoryList from '../../components/Category/CategoryList';
import { useCategories } from '../../hooks/useCategories';
import styles from './CategoryPage.module.css';

export default function CategoryPage() {
  const { categories } = useCategories();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Categorias</h1>
        <Link to="/categories/create" className={`${styles.btn} ${styles.btnPrimary}`}>
          Adicionar Categoria
        </Link>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
