// src/pages/Products/EditProductPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import { Product, Category, Brand } from '../../types/Product';
import { products as mockProducts } from '../../mocks/products';
import { categories as mockCategories } from '../../mocks/categories';
import { brands as mockBrands } from '../../mocks/brands';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    // Simula busca dos dados para edição
    const found = mockProducts.find((p) => p.id === Number(id));
    setProduct(found ?? null);
    setCategories(mockCategories);
    setBrands(mockBrands);
  }, [id]);

  const handleSave = async (updatedProduct: Product) => {
    // Aqui deveria ter lógica para salvar via API ou atualizar estado global
    console.log('Salvando produto', updatedProduct);
    navigate('/products');
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Editar Produto</h1>
      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={() => navigate('/products')}
        submitLabel="Salvar"
      />
    </div>
  );
}
