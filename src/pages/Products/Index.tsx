// src/pages/Products/Index.tsx

import { Link, useNavigate } from "react-router-dom";
import ProductList from "../../components/Product/ProductList";
import { useProducts } from "@/hooks/useProducts";
import styles from "./ProductPage.module.css";

export default function ProductsPage() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Redireciona para editar
  const handleEdit = (id: number) => {
    navigate(`/products/edit/${id}`);
  };

  // Redireciona para página de exclusão
  const handleDelete = (id: number) => {
    navigate(`/products/delete/${id}`);
  };

  // Redireciona para detalhes
  const handleDetails = (id: number) => {
    navigate(`/products/details/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Produtos</h1>
        <Link to="/products/create" className={`${styles.btn} ${styles.btnPrimary}`}>
          Adicionar Produto
        </Link>
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />
    </div>
  );
}
