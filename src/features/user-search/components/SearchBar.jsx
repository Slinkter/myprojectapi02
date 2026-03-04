import { Input, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

/**
 * Componente funcional para el formulario de búsqueda de ID de usuario.
 * @component
 */
function SearchBar({ value, onChange, onSearch, isLoading }) {
  return (
    <div className="search-form">
      <Input
        type="number"
        label="ID de Usuario (1-10)"
        value={value}
        onChange={onChange}
        min="1"
        max="10"
      />
      <Button
        onClick={onSearch}
        className="search-form__button flex items-center gap-2"
        disabled={!value || isLoading}
      >
        {isLoading ? (
          "Buscando..."
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
