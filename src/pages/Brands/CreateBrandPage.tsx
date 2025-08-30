// src/pages/Brands/CreateBrandPage.tsx

import { useNavigate } from "react-router-dom";
import BrandForm from "../../components/Brands/BrandForm";
import { useBrands } from "../../hooks/useBrands";
import styles from "./CreateBrandPage.module.css";

export default function CreateBrandPage() {
  const navigate = useNavigate();
  const { addBrand } = useBrands();

  const handleCreate = (name: string) => {
    addBrand({ name });
    navigate("/brands");
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Marca</h1>
      <BrandForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
