// src/pages/Products/EditProductPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import { Product, Category, Brand } from '../../types/Product';
import { products as mockProducts } from '../../mocks/products';
import { categories as mockCategories } from '../../mocks/categories';
import { brands as mockBrands } from '../../mocks/brands';
import styles from './EditProductPage.module.css';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === Number(id));
    if (found) {
      setProduct(found);
    } else {
      alert('Produto não encontrado.');
      navigate('/products');
    }
    setCategories(mockCategories);
    setBrands(mockBrands);
  }, [id, navigate]);

  const handleSave = async (updatedProduct: Product) => {
    console.log('Salvando produto', updatedProduct);
    // Aqui iria a lógica real de atualização via API
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
