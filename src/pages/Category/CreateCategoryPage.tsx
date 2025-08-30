// src/pages/Category/CreateCategoryPage.tsx

import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import { useCategories } from "../../hooks/useCategories";
import styles from "./CreateCategoryPage.module.css";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const { addCategory } = useCategories();

  const handleCreate = (data: { name: string; description: string }) => {
    addCategory(data);
    navigate("/categories");
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Categoria</h1>
      <CategoryForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
