// src/components/Brand/BrandList.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Brand } from '../../types/Brand';
import { useBrands } from '../../hooks/useBrands';
import styles from './BrandList.module.css';

interface BrandListProps {
  brands: Brand[];
}

export default function BrandList({ brands }: BrandListProps) {
  const { removeBrand } = useBrands();
  const navigate = useNavigate();

  if (brands.length === 0) {
    return <p className={styles.empty}>Nenhuma marca cadastrada.</p>;
  }

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a marca "${name}"?`)) {
      removeBrand(id);
      navigate('/brands');
    }
  };

  return (
    <table className={`table table-striped ${styles.table}`}>
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
              <Link
                to={`/brands/${brand.id}`}
                className={`btn btn-primary btn-sm ${styles.btnDetalhes}`}
              >
                Detalhes
              </Link>{' '}
              <Link
                to={`/brands/edit/${brand.id}`}
                className={`btn btn-warning btn-sm ${styles.btnEditar}`}
              >
                Editar
              </Link>{' '}
              <button
                className={`btn btn-danger btn-sm ${styles.btnExcluir}`}
                onClick={() => handleDelete(brand.id, brand.name)}
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
