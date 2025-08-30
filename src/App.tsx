// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/HomePage";

import './App.css'

// Products
import ProductsPage from "./pages/Products/Index";
import CreateProductPage from "./pages/Products/CreateProductPage";
import EditProductPage from "./pages/Products/EditProductPage";
import DetailsProductPage from "./pages/Products/DetailsProductPage";
import DeleteProductPage from "./pages/Products/DeleteProductPage";

// Brands
import BrandsPage from "./pages/Brands/Index";
import CreateBrandPage from "./pages/Brands/CreateBrandPage";
import EditBrandPage from "./pages/Brands/EditBrandPage";
import DetailsBrandPage from "./pages/Brands/DetailsBrandPage";
import DeleteBrandPage from "./pages/Brands/DeleteBrandPage";

// Categories
import CategoryPage from "./pages/Category/Index";
import CreateCategoryPage from "./pages/Category/CreateCategoryPage";
import EditCategoryPage from "./pages/Category/EditCategoryPage";
import DetailsCategoryPage from "./pages/Category/DetailsCategoryPage";
import DeleteCategoryPage from "./pages/Category/DeleteCategoryPage";

// Context Providers
import { ProductProvider } from "@/contexts/ProductProvider";
import { BrandProvider } from "@/contexts/BrandProvider";
import { CategoryProvider } from "@/contexts/CategoryProvider";

export default function App() {
  return (
    <ProductProvider>
      <BrandProvider>
        <CategoryProvider>
          <Router>
            <Navbar />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Products */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/create" element={<CreateProductPage />} />
                <Route path="/products/edit/:id" element={<EditProductPage />} />
                <Route path="/products/details/:id" element={<DetailsProductPage />} />
                <Route path="/products/delete/:id" element={<DeleteProductPage />} />

                {/* Brands */}
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/brands/create" element={<CreateBrandPage />} />
                <Route path="/brands/edit/:id" element={<EditBrandPage />} />
                <Route path="/brands/details/:id" element={<DetailsBrandPage />} />
                <Route path="/brands/delete/:id" element={<DeleteBrandPage />} />

                {/* Categories */}
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/categories/create" element={<CreateCategoryPage />} />
                <Route path="/categories/edit/:id" element={<EditCategoryPage />} />
                <Route path="/categories/details/:id" element={<DetailsCategoryPage />} />
                <Route path="/categories/delete/:id" element={<DeleteCategoryPage />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </CategoryProvider>
      </BrandProvider>
    </ProductProvider>
  );
}
