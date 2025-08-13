// src/pages/Products/Index.tsx

import { Link } from "react-router-dom";
import ProductList from "../../components/Product/ProductList";
import { useProducts } from "@/hooks/useProducts";
import styles from "./ProductPage.module.css";

export default function ProductsPage() {
  const { products } = useProducts();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Produtos</h1>
        <Link to="/products/create" className={`${styles.btn} ${styles.btnPrimary}`}>
          Adicionar Produto
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}
