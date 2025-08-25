// src/pages/Products/DeleteProductPage.tsx

import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import styles from "./DeleteProductPage.module.css";

export default function DeleteProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products, removeProduct } = useProducts();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate("/products")} className={styles.btn}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    removeProduct(product.id);
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Produto</h2>
      <p>Tem certeza que deseja excluir o produto <strong>{product.name}</strong>?</p>
      <div className={styles.actions}>
        <button onClick={handleDelete} className={styles.btnDanger}>Excluir</button>
        <button onClick={() => navigate("/products")} className={styles.btnSecondary}>Cancelar</button>
      </div>
    </div>
  );
}
