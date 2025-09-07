// src/pages/Category/EditCategoryPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryForm from '../../components/Category/CategoryForm';
import { Category } from '../../types/Category';
import { useCategories } from '@/hooks/useCategories';
import styles from './EditCategoryPage.module.css';

const EditCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategories();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id && categories.length > 0) {
      const foundCategory = categories.find(c => c.id === Number(id));
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        alert('Categoria não encontrada.');
        navigate('/categories');
      }
    }
  }, [id, categories, navigate]);

  const handleUpdate = (data: { name: string; description: string }) => {
    if (category) {
      updateCategory(category.id, data);
      console.log('Categoria atualizada:', { id: category.id, ...data });
      navigate('/categories');
    }
  };

  const handleCancel = () => {
    navigate('/categories');
  };

  if (!category) {
    return <p className={styles.loading}>Carregando categoria...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Editar Categoria</h1>
      <CategoryForm
        initialName={category.name}
        initialDescription={category.description}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditCategoryPage;
