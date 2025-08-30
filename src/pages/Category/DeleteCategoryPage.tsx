// src/pages/Category/DeleteCategoryPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/Category";
import CategoryDetails from "../../components/Category/CategoryDetails";
import styles from "./DetailsCategoryPage.module.css";

export default function DetailsCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const found = categories.find((c) => c.id === Number(id)) || null;
    setCategory(found);
  }, [id, categories]);

  if (!category) return <div className={styles.loading}>Carregando...</div>;

  const handleBack = () => navigate("/categories");

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Detalhes da Categoria</h1>
      <CategoryDetails category={category} />
      <button className={styles.btn} onClick={handleBack}>
        Voltar
      </button>
    </div>
  );
}
