// src/pages/Category/CreateCategoryPage.tsx

import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import { useCategories } from "../../hooks/useCategories";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const { addCategory } = useCategories();

  const handleCreate = (data: { name: string; description: string }) => {
    addCategory(data);
    navigate("/categories");
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "1.8rem", color: "#333", marginBottom: "1.5rem" }}>
        Adicionar Categoria
      </h1>
      <CategoryForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
