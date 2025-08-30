// src/pages/Products/DeleteProductPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/Product";
import styles from "./DeleteProductPage.module.css";

export default function DeleteProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts(); // deleteProduct sempre definido
  const [product, setProduct] = useState<Product | null>(null);

  // Buscar o produto pelo ID
  useEffect(() => {
    const found = products.find((p) => p.id === Number(id)) || null;
    setProduct(found);
  }, [id, products]);

  if (!product) return <div className={styles.loading}>Carregando...</div>;

  // Função de exclusão
  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) return;

    deleteProduct(product.id); // Chama função do contexto
    navigate("/products");      // Redireciona para lista
  };

  // Cancelar exclusão
  const handleCancel = () => navigate("/products");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Produto</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir o produto <strong>{product.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          onClick={handleDelete}
        >
          Excluir
        </button>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
