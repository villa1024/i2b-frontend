import { ProductCard } from "./ProductCard";

export const ProductsList = ({ data }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            {
                data.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    );
};