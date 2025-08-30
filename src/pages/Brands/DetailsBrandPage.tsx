// src/pages/Brands/DetailsBrandPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BrandDetails from "../../components/Brands/BrandDetails";
import { Brand } from "../../types/Brand";
import { brands as mockBrands } from "../../mocks/brands";
import styles from "./DetailsBrandPage.module.css";

const DetailsBrandPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (id) {
      const foundBrand = mockBrands.find((b) => b.id === Number(id));
      if (foundBrand) {
        setBrand(foundBrand);
      } else {
        alert("Marca não encontrada.");
        navigate("/brands");
      }
    }
  }, [id, navigate]);

  if (!brand) {
    return <p className={styles.loading}>Carregando detalhes da marca...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Excluir Marca</h1>
      <BrandDetails brand={brand} />
      <div className={styles.actions}>
        <Link to="/brands" className={`btn btn-secondary ${styles.btn}`}>
          Voltar
        </Link>
        <Link to={`/brands/edit/${brand.id}`} className={`btn btn-warning ${styles.btn}`}>
          Editar
        </Link>
      </div>
    </div>
  );
};

export default DetailsBrandPage;
