import { Route, Routes } from "react-router-dom";

import { PruebaRoutes } from "../products";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<PruebaRoutes />} />
            </Routes>
        </>
    );
};