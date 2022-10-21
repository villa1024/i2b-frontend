import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';
import { ProductsPage, OrdersPage, SearchPage, ViewProductPage } from '../pages';

export const PruebaRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route
                        path="/products/getAll"
                        element={<ProductsPage />}
                    />
                    <Route
                        path="/products/orders"
                        element={<OrdersPage />}
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