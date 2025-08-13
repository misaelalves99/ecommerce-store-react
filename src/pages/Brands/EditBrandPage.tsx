// src/pages/Brand/EditBrandPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BrandForm from '../../components/Brands/BrandForm'; // Ajuste para default export
import { Brand } from '../../types/Brand';
import { brands as mockBrands } from '../../mocks/brands';
import styles from './EditBrandPage.module.css';

const EditBrandPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (id) {
      const foundBrand = mockBrands.find(b => b.id === Number(id));
      if (foundBrand) {
        setBrand(foundBrand);
      } else {
        alert('Marca não encontrada.');
        navigate('/brands');
      }
    }
  }, [id, navigate]);

  const handleUpdate = (name: string) => {
    console.log('Marca atualizada:', { id, name });
    // Aqui iria a lógica real de atualização (API)
    navigate('/brands');
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
      <BrandForm initialName={brand.name} onSubmit={handleUpdate} onCancel={handleCancel} />
    </div>
  );
};

export default EditBrandPage;
