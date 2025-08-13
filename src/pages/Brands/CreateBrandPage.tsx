// src/pages/Brands/CreateBrandPage.tsx

import { useNavigate } from "react-router-dom";
import BrandForm from "../../components/Brands/BrandForm";
import { useBrands } from "../../hooks/useBrands";

export default function CreateBrandPage() {
  const navigate = useNavigate();
  const { addBrand } = useBrands();

  const handleCreate = (name: string) => {
    addBrand(name);
    navigate("/brands");
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "1.8rem", color: "#333", marginBottom: "1.5rem" }}>
        Adicionar Marca
      </h1>
      <BrandForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
