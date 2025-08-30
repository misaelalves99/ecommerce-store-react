// src/components/Brand/BrandList.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Brand } from '../../types/Brand';
import styles from './BrandList.module.css';

interface BrandListProps {
  brands: Brand[];
  onDelete?: (id: number) => void;
}

export default function BrandList({ brands, onDelete }: BrandListProps) {
  const navigate = useNavigate();

  if (!brands.length) {
    return <div className={styles.empty}>Nenhuma marca cadastrada.</div>;
  }

  return (
    <table className={`${styles.table} ${styles.BrandList}`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.id}</td>
            <td>{brand.name}</td>
            <td>
              {/* Link para página de detalhes */}
              <Link
                to={`/brands/details/${brand.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
              >
                Detalhes
              </Link>

              {/* Link para página de edição */}
              <Link
                to={`/brands/edit/${brand.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Editar
              </Link>

              {/* Botão de exclusão */}
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() => onDelete?.(brand.id) || navigate(`/brands/delete/${brand.id}`)}
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
