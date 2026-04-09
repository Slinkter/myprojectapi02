/**
 * @fileoverview Componente de búsqueda interactivo.
 * @module SearchBar
 */

import { memo, useTransition } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";
import { useSearchInput } from "../hooks/useSearchInput";
import { Input, Button } from "@/shared/ui/FormElements";

const SearchBar = memo(({ onSearch, onPrefetch, isLoading }) => {
    const [isPending, startTransition] = useTransition();
    const { searchValue, onInputChange, helperMessage, hasError } = useSearchInput();

    const handleSearch = () => {
        if (searchValue && !hasError) {
            startTransition(() => {
                onSearch(searchValue);
            });
        }
    };

    const handlePrefetch = () => {
        if (searchValue && !hasError && onPrefetch) {
            onPrefetch(searchValue);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto mb-golden-lg px-golden-sm">
            <div className="flex flex-col sm:flex-row gap-golden-base w-full">
                <div className="relative w-full">
                    <label htmlFor="userId" className="sr-only">ID o nombre de usuario</label>
                    <Input
                        id="userId"
                        placeholder="ID (1-10) o Nombre..."
                        value={searchValue}
                        onChange={onInputChange}
                        hasError={hasError}
                        aria-describedby={helperMessage ? "search-helper" : undefined}
                    />
                </div>
                <Button
                    onClick={handleSearch}
                    onMouseEnter={handlePrefetch}
                    disabled={!searchValue || isLoading || hasError}
                    isLoading={isLoading}
                    aria-busy={isPending}
                >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>Buscar</span>
                </Button>
            </div>
            {helperMessage && (
                <p id="search-helper" aria-live="polite" className={cn("mt-3 text-sm font-medium", hasError ? "text-red-500" : "text-slate-500 dark:text-slate-400")}>
                    {helperMessage}
                </p>
            )}
        </div>
    );
});

SearchBar.displayName = "SearchBar";

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onPrefetch: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
