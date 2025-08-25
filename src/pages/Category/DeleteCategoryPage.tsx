// src/pages/Category/DeleteCategoryPage.tsx

import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';
import styles from './DeleteCategoryPage.module.css';

export default function DeleteCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { categories, removeCategory } = useCategories();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === Number(id));

  if (!category) {
    return (
      <div className={styles.container}>
        <h2>Categoria não encontrada</h2>
        <button onClick={() => navigate("/categories")} className={styles.btn}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    removeCategory(category.id);
    navigate("/categories");
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Categoria</h2>
      <p>Tem certeza que deseja excluir a categoria <strong>{category.name}</strong>?</p>
      <div className={styles.actions}>
        <button onClick={handleDelete} className={styles.btnDanger}>Excluir</button>
        <button onClick={() => navigate("/categories")} className={styles.btnSecondary}>Cancelar</button>
      </div>
    </div>
  );
}
