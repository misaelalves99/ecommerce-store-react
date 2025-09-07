// src/components/Product/ProductForm.tsx

import React, { useState, FormEvent } from 'react';
import styles from './ProductForm.module.css';
import { Category, Brand, NewProduct, Product } from '../../types/Product';

interface Props {
  initialData: NewProduct | Product;
  categories: Category[];
  brands: Brand[];
  onSubmit: (product: NewProduct) => Promise<void> | void;
  onCancel: () => void;
  submitLabel?: string;
}

// Tipo interno do formulário usando nomes de categoria e marca
interface ProductFormData {
  id?: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryName: string;
  brandName: string;
}

function ProductForm({
  initialData,
  categories,
  brands,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: Props) {
  const [formData, setFormData] = useState<ProductFormData>({
    id: 'id' in initialData ? initialData.id : undefined,
    name: initialData.name,
    description: initialData.description,
    sku: initialData.sku,
    price: initialData.price,
    stock: initialData.stock,
    isActive: initialData.isActive,
    categoryName:
      'category' in initialData && initialData.category
        ? initialData.category.name
        : 'categoryName' in initialData
        ? initialData.categoryName
        : '',
    brandName:
      'brand' in initialData && initialData.brand
        ? initialData.brand.name
        : 'brandName' in initialData
        ? initialData.brandName
        : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
      return;
    }

    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? 0 : Number(value) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.sku.trim()) newErrors.sku = 'SKU é obrigatório';
    if (formData.price <= 0) newErrors.price = 'Preço deve ser maior que zero';
    if (formData.stock < 0) newErrors.stock = 'Estoque não pode ser negativo';
    if (!formData.categoryName) newErrors.categoryName = 'Categoria é obrigatória';
    if (!formData.brandName) newErrors.brandName = 'Marca é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Produto usando apenas nomes
    const productToSubmit: NewProduct = {
      name: formData.name,
      description: formData.description,
      sku: formData.sku,
      price: formData.price,
      stock: formData.stock,
      isActive: formData.isActive,
      categoryName: formData.categoryName,
      brandName: formData.brandName,
    };

    await onSubmit(productToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <input type="hidden" name="id" value={formData.id} />

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.controlLabel}>Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.formControl}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.textDanger}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.controlLabel}>Descrição</label>
        <textarea
          id="description"
          name="description"
          className={styles.formControl}
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span className={styles.textDanger}>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sku" className={styles.controlLabel}>SKU</label>
        <input
          id="sku"
          name="sku"
          type="text"
          className={styles.formControl}
          value={formData.sku}
          onChange={handleChange}
        />
        {errors.sku && <span className={styles.textDanger}>{errors.sku}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.controlLabel}>Preço</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className={styles.formControl}
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <span className={styles.textDanger}>{errors.price}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="stock" className={styles.controlLabel}>Estoque</label>
        <input
          id="stock"
          name="stock"
          type="number"
          className={styles.formControl}
          value={formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <span className={styles.textDanger}>{errors.stock}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categoryName" className={styles.controlLabel}>Categoria</label>
        <select
          id="categoryName"
          name="categoryName"
          className={styles.formControl}
          value={formData.categoryName}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryName && <span className={styles.textDanger}>{errors.categoryName}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="brandName" className={styles.controlLabel}>Marca</label>
        <select
          id="brandName"
          name="brandName"
          className={styles.formControl}
          value={formData.brandName}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {brands.map(b => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
        {errors.brandName && <span className={styles.textDanger}>{errors.brandName}</span>}
      </div>

      <div className={styles.formCheck}>
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          className={styles.formCheckInput}
          checked={formData.isActive}
          onChange={handleChange}
        />
        <label htmlFor="isActive" className={styles.formCheckLabel}>Ativo</label>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>{submitLabel}</button>
      <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default ProductForm;
