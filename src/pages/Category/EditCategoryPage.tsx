// src/pages/Category/EditCategoryPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryForm from '../../components/Category/CategoryForm'; // ajuste para default export
import { Category } from '../../types/Category';
import { categories as mockCategories } from '../../mocks/categories';
import styles from './EditCategoryPage.module.css';

const EditCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id) {
      const foundCategory = mockCategories.find(c => c.id === Number(id));
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        alert('Categoria não encontrada.');
        navigate('/categories');
      }
    }
  }, [id, navigate]);

  const handleUpdate = (data: { name: string; description: string }) => {
    console.log('Categoria atualizada:', { id, ...data });
    // Aqui ficaria a lógica real de atualização via API
    navigate('/categories');
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
