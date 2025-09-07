// src/pages/Products/EditProductPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import { Product, NewProduct } from '../../types/Product';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import styles from './EditProductPage.module.css';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { products, updateProduct } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find((p) => p.id === Number(id));
      if (found) {
        setProduct(found);
      } else {
        alert('Produto não encontrado.');
        navigate('/products');
      }
    }
  }, [id, products, navigate]);

  const handleSave = (formProduct: NewProduct) => {
    if (!product) return;

    // Converte NewProduct de volta para Product mantendo id e ids de categoria/marca
    const updatedProduct: Product = {
      ...product,
      name: formProduct.name,
      description: formProduct.description,
      sku: formProduct.sku,
      price: formProduct.price,
      stock: formProduct.stock,
      isActive: formProduct.isActive,
      category: { id: product.category?.id || 0, name: formProduct.categoryName },
      brand: { id: product.brand?.id || 0, name: formProduct.brandName },
      categoryId: product.categoryId,
      brandId: product.brandId,
    };

    updateProduct(updatedProduct);
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (!product) {
    return <p className={styles.loading}>Carregando produto...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Editar Produto</h1>
      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={handleCancel}
        submitLabel="Salvar"
      />
    </div>
  );
}
