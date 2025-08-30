// src/pages/Brand/DeleteBrandPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBrands } from "@/hooks/useBrands";
import { Brand } from "../../types/Brand";
import styles from "./DeleteBrandPage.module.css";

export default function DeleteBrandPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { brands, deleteBrand } = useBrands();
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const found = brands.find((b) => b.id === Number(id)) || null;
    setBrand(found);
  }, [id, brands]);

  if (!brand) return <div className={styles.loading}>Carregando...</div>;

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a marca "${brand.name}"?`)) return;

    deleteBrand?.(brand.id); // chama a função do contexto
    navigate("/brands");
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Marca</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir a marca <strong>{brand.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
          Excluir
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
