// src/pages/Category/DeleteCategoryPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "../../types/Category";
import styles from "./DeleteCategoryPage.module.css";

export default function DeleteCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, deleteCategory } = useCategories();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const found = categories.find((c) => c.id === Number(id)) || null;
    setCategory(found);
  }, [id, categories]);

  if (!category) return <div className={styles.loading}>Carregando...</div>;

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) return;

    deleteCategory(category.id);
    navigate("/categories");
  };

  const handleCancel = () => navigate("/categories");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Categoria</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir a categoria <strong>{category.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
          Excluir
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
