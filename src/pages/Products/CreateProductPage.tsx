// src/pages/Products/CreateProductPage.tsx

import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/Product/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "../../types/Product";
import { categories as mockCategories } from "../../mocks/categories";
import { brands as mockBrands } from "../../mocks/brands";
import styles from "./CreateProductPage.module.css";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const emptyProduct: Product = {
    id: 0,
    name: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    isActive: true
  };

  const handleSave = async (newProduct: Product) => {
    addProduct(newProduct);
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Produto</h1>
      <ProductForm
        initialData={emptyProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={handleSave}
        onCancel={() => navigate("/products")}
        submitLabel="Adicionar"
      />
    </div>
  );
};

export default CreateProductPage;
