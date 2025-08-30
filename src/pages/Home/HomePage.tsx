// src/pages/Home/HomePage.tsx

import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={`title ${styles.title}`}>Bem-vindo ao Painel Administrativo</h1>

      <div className={styles.buttonsRow}>
        <button
          className={`${styles.btn} ${styles.btnDark}`}
          onClick={() => navigate("/products")}
        >
          Gerenciar Produtos
        </button>
        <button
          className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={() => navigate("/categories")}
        >
          Gerenciar Categorias
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => navigate("/brands")}
        >
          Gerenciar Marcas
        </button>
      </div>

      <p className={styles.description}>
        Use os botões acima para gerenciar marcas, categorias e produtos de forma rápida e segura.
      </p>
    </div>
  );
}
