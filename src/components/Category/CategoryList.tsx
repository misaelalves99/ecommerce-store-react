// src/components/Category/CategoryList.tsx

import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
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
              <Link to={`/categories/${category.id}`} className={`${styles.btn} ${styles.btnInfo}`}>
                Detalhes
              </Link>
              <Link to={`/categories/edit/${category.id}`} className={`${styles.btn} ${styles.btnWarning}`}>
                Editar
              </Link>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() => alert(`Excluir categoria ${category.name}`)}
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
