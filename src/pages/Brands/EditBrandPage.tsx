// src/pages/Brand/EditBrandPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BrandForm from '../../components/Brands/BrandForm';
import { Brand } from '../../types/Brand';
import { useBrands } from '@/hooks/useBrands';
import styles from './EditBrandPage.module.css';

const EditBrandPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { brands, updateBrand } = useBrands();

  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (id && brands.length > 0) {
      const foundBrand = brands.find(b => b.id === Number(id));
      if (foundBrand) {
        setBrand(foundBrand);
      } else {
        alert('Marca não encontrada.');
        navigate('/brands');
      }
    }
  }, [id, brands, navigate]);

  const handleUpdate = (name: string) => {
    if (brand) {
      // se existir updateBrand no hook, atualiza estado global
      if (updateBrand) {
        updateBrand(brand.id, name);
      }
      console.log('Marca atualizada:', { id: brand.id, name });
      navigate('/brands');
    }
  };

  const handleCancel = () => {
    navigate('/brands');
  };

  if (!brand) {
    return <p className={styles.loading}>Carregando marca...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Editar Marca</h1>
      <BrandForm
        initialName={brand.name}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBrandPage;
