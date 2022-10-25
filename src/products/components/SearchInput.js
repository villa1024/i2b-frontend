export const SearchInput = ({ search, onInputChange }) => {
    return (
        <div className="btn-toolbar mb-5">
            <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon">Buscar por nombre</div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Escriba aquí..."
                    name="search"
                    value={search}
                    onChange={onInputChange}
                />
            </div>
        </div>
    );
};