// src/components/Category/CategoryList.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Category } from '../../types/Category';
import { useCategories } from '../../hooks/useCategories';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { removeCategory } = useCategories();
  const navigate = useNavigate();

  if (categories.length === 0) {
    return <p className={styles.empty}>Nenhuma categoria cadastrada.</p>;
  }

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
      removeCategory(id);
      navigate('/categories');
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              <Link
                to={`/categories/${category.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
              >
                Detalhes
              </Link>{' '}
              <Link
                to={`/categories/edit/${category.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Editar
              </Link>{' '}
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() => handleDelete(category.id, category.name)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
