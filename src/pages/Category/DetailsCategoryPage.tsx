// src/pages/Category/DetailsCategoryPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CategoryDetails from '../../components/Category/CategoryDetails';
import { Category } from '../../types/Category';
import { useCategories } from '@/hooks/useCategories';
import styles from './DetailsCategoryPage.module.css';

const DetailsCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories } = useCategories();

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

  if (!category) {
    return <p className={styles.loading}>Carregando detalhes da categoria...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Detalhes da Categoria</h1>
      <CategoryDetails category={category} />
      <div className={styles.actions}>
        <Link to="/categories" className={`btn btn-secondary ${styles.btn}`}>
          Voltar
        </Link>
        <Link to={`/categories/edit/${category.id}`} className={`btn btn-warning ${styles.btn}`}>
          Editar
        </Link>
      </div>
    </div>
  );
};

export default DetailsCategoryPage;
