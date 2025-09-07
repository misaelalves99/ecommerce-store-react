// src/pages/Products/CreateProductPage.tsx

import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/Product/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { NewProduct } from "../../types/Product"; 
import styles from "./CreateProductPage.module.css";

// Função auxiliar para transformar NewProduct em ProductFormData esperado pelo form
const toFormData = (product: NewProduct) => ({
  id: 0,
  name: product.name,
  description: product.description,
  sku: product.sku,
  price: product.price,
  stock: product.stock,
  isActive: product.isActive,
  categoryName: product.categoryName,
  brandName: product.brandName,
});

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const emptyProduct: NewProduct = {
    name: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    isActive: true,
    categoryName: "",
    brandName: "",
  };

  const handleSave = async (newProduct: NewProduct) => {
    addProduct(newProduct);
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Produto</h1>
      <ProductForm
        initialData={toFormData(emptyProduct)}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={() => navigate("/products")}
        submitLabel="Adicionar"
      />
    </div>
  );
};

export default CreateProductPage;
