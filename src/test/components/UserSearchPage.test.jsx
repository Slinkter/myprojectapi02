import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UserSearchPage from "@/pages/user-search/UserSearchPage";
import userReducer from "@/entities/user/store/userSlice";
import postReducer from "@/entities/post/store/post.slice";
import { useUserSearch } from "@/features/user-search/hooks/useUserSearch";
import { useSearchInput } from "@/features/user-search/hooks/useSearchInput";
import { useUserProfile } from "@/features/user-profile/hooks/useUserProfile";

// Mock hooks
vi.mock("@/features/user-search/hooks/useUserSearch", () => ({
  useUserSearch: vi.fn(),
}));

vi.mock("@/features/user-search/hooks/useSearchInput", () => ({
  useSearchInput: vi.fn(),
}));

vi.mock("@/features/user-profile/hooks/useUserProfile", () => ({
  useUserProfile: vi.fn(),
}));

const createMockStore = () => configureStore({
  reducer: { 
      user: userReducer,
      post: postReducer
  },
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
    vi.mocked(useUserSearch).mockReturnValue({
      user: { id: 1, username: "JohnDoe", name: "John Doe" },
      status: "succeeded",
      error: null,
      lastSearchQuery: "1",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    vi.mocked(useSearchInput).mockReturnValue(mockSearchInput);

    vi.mocked(useUserProfile).mockReturnValue({
        user: { id: 1, username: "JohnDoe", name: "John Doe", email: "j@d.com", company: { name: "JD Corp" }, address: { street: "123 St" }, phone: "123", website: "jd.com" },
        posts: [{ id: 101, title: "Hello World", body: "Content" }],
        isLoading: false,
        error: null,
        isNotFound: false
    });

    renderWithProviders(<UserSearchPage />);

    expect(screen.getByText(/Buscador de Usuarios/i)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@JohnDoe")).toBeInTheDocument();
  });

  it("should render LoadingView when status is loading", () => {
    vi.mocked(useUserSearch).mockReturnValue({
      user: null,
      status: "loading",
      error: null,
      lastSearchQuery: "1",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    vi.mocked(useSearchInput).mockReturnValue(mockSearchInput);

    renderWithProviders(<UserSearchPage />);
    expect(screen.getByText(/Buscador de Usuarios/i)).toBeInTheDocument();
  });

  it("should render NotFoundCard when status is notFound", () => {
    vi.mocked(useUserSearch).mockReturnValue({
      user: null,
      status: "notFound",
      error: null,
      lastSearchQuery: "Unknown",
      performSearch: vi.fn(),
      handleRetry: vi.fn(),
    });

    vi.mocked(useSearchInput).mockReturnValue(mockSearchInput);

    renderWithProviders(<UserSearchPage />);
    expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
  });

  it("should call performSearch when search button is clicked", () => {
    const performSearch = vi.fn();

    vi.mocked(useUserSearch).mockReturnValue({
      user: null,
      status: "idle",
      error: null,
      lastSearchQuery: "1",
      performSearch,
      handleRetry: vi.fn(),
    });

    vi.mocked(useSearchInput).mockReturnValue(mockSearchInput);

    renderWithProviders(<UserSearchPage />);
    
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(searchButton);

    expect(performSearch).toHaveBeenCalledWith("1");
  });
});
