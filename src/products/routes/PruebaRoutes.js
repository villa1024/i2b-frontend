import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';
import { ProductsAllPage, ProductsByDatePage, SearchPage, ViewProductPage } from '../pages';

export const PruebaRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route
                        path="/products/getAll"
                        element={<ProductsAllPage />}
                    />
                    <Route
                        path="/products/getAllByDate"
                        element={<ProductsByDatePage />}
                    />
                    <Route
                        path="/products/:id"
                        element={<ViewProductPage />}
                    />
                    <Route
                        path="/products/search"
                        element={<SearchPage />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/products/getAll" />}
                    />
                </Routes>
            </div>
        </>
    );
};