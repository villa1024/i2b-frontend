export const Pagination = ({ handlePrevPage, handleNextPage, page, totalPages }) => {
    return (
        <div className="btn-group mb-5" role="group" aria-label="Basic example">
            <button
                className="btn btn-outline-primary"
                onClick={handlePrevPage}
            >
                Atras
            </button>
            <p className="mx-4">Página {page + 1} de {totalPages}</p>
            <button
                className="btn btn-outline-primary"
                onClick={handleNextPage}
            >
                Siguiente
            </button>
        </div>
    );
};