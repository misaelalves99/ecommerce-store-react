// src/pages/Product/DetailsProductPage.tsx

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/Product/ProductDetails";
import { Product } from "../../types/Product";
import { useProducts } from "@/hooks/useProducts";
import styles from "./ProductPage.module.css";

export default function DetailsProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts(); // Use o contexto real
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const found = products.find((p) => p.id === Number(id));
    setProduct(found ?? null);
  }, [id, products]);

  if (!product) {
    return (
      <div className={styles.title}>
        Produto não encontrado.
        <br />
        <Link to="/products" className={`${styles.btnPrimary} ${styles.btn}`}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ProductDetails product={product} />
      <Link
        to="/products"
        className={`${styles.btnPrimary} ${styles.btn}`}
        style={{ marginTop: "1rem", display: "inline-block" }}
      >
        Voltar
      </Link>
    </div>
  );
}
