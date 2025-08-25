// src/pages/Brands/DeleteBrandPage.tsx

import { useNavigate, useParams } from "react-router-dom";
import { useBrands } from "@/hooks/useBrands";
import styles from "./DeleteBrandPage.module.css";

export default function DeleteBrandPage() {
  const { id } = useParams<{ id: string }>();
  const { brands, removeBrand } = useBrands();
  const navigate = useNavigate();

  const brand = brands.find((b) => b.id === Number(id));

  if (!brand) {
    return (
      <div className={styles.container}>
        <h2>Marca não encontrada</h2>
        <button onClick={() => navigate("/brands")} className={styles.btn}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    removeBrand(brand.id);
    navigate("/brands");
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Marca</h2>
      <p>Tem certeza que deseja excluir a marca <strong>{brand.name}</strong>?</p>
      <div className={styles.actions}>
        <button onClick={handleDelete} className={styles.btnDanger}>Excluir</button>
        <button onClick={() => navigate("/brands")} className={styles.btnSecondary}>Cancelar</button>
      </div>
    </div>
  );
}
