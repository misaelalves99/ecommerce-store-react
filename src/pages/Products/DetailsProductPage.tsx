// src/pages/Product/DetailsProductPage.tsx

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/Product/ProductDetails';
import { Product } from '../../types/Product';
import { products as mockProducts } from '../../mocks/products';
import styles from './ProductPage.module.css';

export default function DetailsProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simula busca por id
    const found = mockProducts.find((p) => p.id === Number(id));
    setProduct(found ?? null);
  }, [id]);

  if (!product) {
    return (
      <div className={styles.title}>
        Produto não encontrado.
        <br />
        <Link to="/products" className={styles.btnPrimary}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={product} />
      <Link to="/products" className={styles.btnPrimary}>
        Voltar
      </Link>
    </div>
  );
}
