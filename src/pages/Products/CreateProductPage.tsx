// src/pages/Products/CreateProductPage.tsx

import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/Product/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "../../types/Product";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import styles from "./CreateProductPage.module.css";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  // Pegando categorias e marcas do contexto
  const { categories } = useCategories();
  const { brands } = useBrands();

  // Produto vazio inicial
  const emptyProduct: Product = {
    id: 0,
    name: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    isActive: true,
    category: undefined,
    brand: undefined,
  };

  const handleSave = async (newProduct: Product) => {
    const productToAdd = {
      ...newProduct,
      id: Date.now(), // gera ID único
      category: categories.find((c) => c.id === newProduct.categoryId),
      brand: brands.find((b) => b.id === newProduct.brandId),
    };

    addProduct(productToAdd);
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Produto</h1>
      <ProductForm
        initialData={emptyProduct}
        categories={categories} // categorias do contexto
        brands={brands}         // marcas do contexto
        onSubmit={handleSave}
        onCancel={() => navigate("/products")}
        submitLabel="Adicionar"
      />
    </div>
  );
};

export default CreateProductPage;
