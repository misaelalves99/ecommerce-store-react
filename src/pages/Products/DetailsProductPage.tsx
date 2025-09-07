// src/pages/Products/DetailsProductPage.tsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/Product/ProductDetails';
import { Product } from '../../types/Product';
import { useProducts } from '@/hooks/useProducts';
import styles from './DetailsProductPage.module.css';

export default function DetailsProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find((p) => p.id === Number(id));
      if (found) {
        setProduct(found);
      } else {
        alert('Produto não encontrado.');
        navigate('/products');
      }
    }
  }, [id, products, navigate]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        Produto não encontrado.
        <button className={styles.btnPrimary} onClick={() => navigate('/products')}>
          Voltar
        </button>
      </div>
    );
  }

  const handleEdit = () => navigate(`/products/edit/${product.id}`);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Produto</h1>
      <ProductDetails product={product} />
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={() => navigate('/products')}>
          Voltar
        </button>
        <button className={styles.btnSecondary} onClick={handleEdit}>
          Editar
        </button>
      </div>
    </div>
  );
}
