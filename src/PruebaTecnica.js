import { ProductProvider } from "./products/context/ProductProvider";
import { AppRouter } from "./router/AppRouter";

export const PruebaTecnica = () => {
    return (
        <>
            <ProductProvider>
                <AppRouter />
            </ProductProvider>
        </>
    );
};