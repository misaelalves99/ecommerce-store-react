// src/components/Product/ProductList.tsx

// src/components/Product/ProductList.tsx

import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductList.module.css';

interface Props {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetails: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onEdit, onDelete, onDetails }) => {
  if (!products.length) {
    return <div className={styles.empty}>Nenhum produto encontrado</div>;
  }

  return (
    <table className={`${styles.table} ${styles.ProductList}`}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>SKU</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Categoria</th>
          <th>Marca</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.name}</td>
            <td>{prod.sku}</td>
            <td>R$ {prod.price.toFixed(2)}</td>
            <td>{prod.stock}</td>
            <td>{prod.category?.name ?? prod.categoryId}</td>
            <td>{prod.brand?.name ?? prod.brandId}</td>
            <td>
              <span className={prod.isActive ? styles.badgeSuccess : styles.badgeSecondary}>
                {prod.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td>
              <button className={`${styles.btn} ${styles.btnInfo}`} onClick={() => onDetails(prod.id)}>
                Detalhes
              </button>
              <button className={`${styles.btn} ${styles.btnWarning}`} onClick={() => onEdit(prod.id)}>
                Editar
              </button>
              <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => onDelete(prod.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
