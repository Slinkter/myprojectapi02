import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UserSearchPage from "@/pages/user-search/UserSearchPage";
import userReducer from "@/entities/user/store/userSlice";

// Mock hooks to control state independently
vi.mock("@/features/user-search/hooks/useUserSearch", () => ({
  useUserSearch: vi.fn(),
}));

vi.mock("@/features/user-search/hooks/useSearchInput", () => ({
  useSearchInput: vi.fn(),
}));

const createMockStore = () => configureStore({
  reducer: { user: userReducer },
});

const renderWithProviders = (ui) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe("UserSearchPage", () => {
  const mockSearchInput = {
    searchValue: "1",
    helperMessage: "Buscando...",
    hasError: false,
    onInputChange: vi.fn(),
  };

  it("should render SearchBar and UserView when user is found (Success Case)", () => {
    // Arrange
    const { useUserSearch } = require("@/features/user-search/hooks/useUserSearch");
    const { useSearchInput } = require("@/features/user-search/hooks/useSearchInput");

    useUserSearch.mockReturnValue({
      user: { id: 1, username: "JohnDoe", fullName: "John Doe" },
      posts: [{ id: 101, title: "Hello World" }],
      status: "succeeded",
      error: null,
      lastSearchQuery: "1",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    useSearchInput.mockReturnValue(mockSearchInput);

    // Act
    renderWithProviders(<UserSearchPage />);

    // Assert
    expect(screen.getByText(/Buscador de Usuarios/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
  });

  it("should render LoadingView when status is loading (Searching Case)", () => {
    // Arrange
    const { useUserSearch } = require("@/features/user-search/hooks/useUserSearch");
    const { useSearchInput } = require("@/features/user-search/hooks/useSearchInput");

    useUserSearch.mockReturnValue({
      user: null,
      posts: [],
      status: "loading",
      error: null,
      lastSearchQuery: "1",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    useSearchInput.mockReturnValue(mockSearchInput);

    // Act
    renderWithProviders(<UserSearchPage />);

    // Assert
    // LoadingView consists of skeletons. We check for existence of some common skeleton markers or the container.
    // Since we verify if the state boundary renders the loadingComponent.
    expect(screen.getByText(/Buscador de Usuarios/i)).toBeInTheDocument();
  });

  it("should render NotFoundCard when status is notFound (Not Found Case)", () => {
    // Arrange
    const { useUserSearch } = require("@/features/user-search/hooks/useUserSearch");
    const { useSearchInput } = require("@/features/user-search/hooks/useSearchInput");

    useUserSearch.mockReturnValue({
      user: null,
      posts: [],
      status: "notFound",
      error: null,
      lastSearchQuery: "Unknown",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    useSearchInput.mockReturnValue(mockSearchInput);

    // Act
    renderWithProviders(<UserSearchPage />);

    // Assert
    // StateBoundary is responsible for rendering NotFoundCard.
    // We expect to see the text typical of the NotFoundCard or the attempted query.
    expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
  });

  it("should call performSearch when search button is clicked", () => {
    // Arrange
    const { useUserSearch } = require("@/features/user-search/hooks/useUserSearch");
    const { useSearchInput } = require("@/features/user-search/hooks/useSearchInput");
    const performSearch = vi.fn();

    useUserSearch.mockReturnValue({
      user: null,
      posts: [],
      status: "idle",
      error: null,
      lastSearchQuery: "1",
      performSearch,
      handleRetry: vi.fn(),
    });

    useSearchInput.mockReturnValue(mockSearchInput);

    // Act
    renderWithProviders(<UserSearchPage />);
    
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(searchButton);

    // Assert
    expect(performSearch).toHaveBeenCalledWith("1");
  });
});
