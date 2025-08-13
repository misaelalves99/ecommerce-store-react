// src/pages/Home/HomePage.tsx

import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={`container text-center mt-5 ${styles.container}`}>
      <h1 className={`mb-4 ${styles.title}`}>Bem-vindo ao Painel Administrativo</h1>

      <div className="row justify-content-center">
        <div className="col-md-3 mb-3">
          <button
            className={`btn btn-outline-primary btn-lg w-100 ${styles.btn}`}
            onClick={() => navigate("/brands")}
          >
            Gerenciar Marcas
          </button>
        </div>
        <div className="col-md-3 mb-3">
          <button
            className={`btn btn-outline-success btn-lg w-100 ${styles.btn}`}
            onClick={() => navigate("/categories")}
          >
            Gerenciar Categorias
          </button>
        </div>
        <div className="col-md-3 mb-3">
          <button
            className={`btn btn-outline-dark btn-lg w-100 ${styles.btn}`}
            onClick={() => navigate("/products")}
          >
            Gerenciar Produtos
          </button>
        </div>
      </div>
    </div>
  );
}
