// src/components/Category/CategoryList.tsx

import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
  onDelete?: (id: number) => void;
}

export default function CategoryList({ categories, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return <p className={styles.empty}>Nenhuma categoria cadastrada.</p>;
  }

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
              {/* Link para página de detalhes */}
              <Link
                to={`/categories/details/${category.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
              >
                Detalhes
              </Link>

              {/* Link para página de edição */}
              <Link
                to={`/categories/edit/${category.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Editar
              </Link>

              {/* Botão de exclusão */}
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() => onDelete?.(category.id)}
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
