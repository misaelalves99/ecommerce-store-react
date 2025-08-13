// src/components/Product/ProductList.tsx

import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';
import { Product } from '../../types/Product';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <table className={`table table-striped table-hover shadow-sm ${styles.table}`}>
      <thead className="table-dark">
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
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.sku}</td>
            <td>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td>{product.stock}</td>
            <td>{product.category?.name ?? '-'}</td>
            <td>{product.brand?.name ?? '-'}</td>
            <td>
              <span className={`badge ${product.isActive ? 'bg-success' : 'bg-secondary'}`}>
                {product.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td>
              <Link to={`/products/${product.id}`} className={`btn btn-info btn-sm me-1 ${styles.btn}`}>
                Detalhes
              </Link>
              <Link to={`/products/edit/${product.id}`} className={`btn btn-warning btn-sm me-1 ${styles.btn}`}>
                Editar
              </Link>
              <Link to={`/products/delete/${product.id}`} className={`btn btn-danger btn-sm ${styles.btn}`}>
                Excluir
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
