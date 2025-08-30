// src/pages/Category/Index.tsx

import { Link, useNavigate } from "react-router-dom";
import CategoryList from "../../components/Category/CategoryList";
import { useCategories } from "../../hooks/useCategories";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    navigate(`/categories/delete/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Categorias</h1>
        <Link to="/categories/create" className={`${styles.btn} ${styles.btnPrimary}`}>
          Adicionar Categoria
        </Link>
      </div>

      <CategoryList categories={categories} onDelete={handleDelete} />
    </div>
  );
}
