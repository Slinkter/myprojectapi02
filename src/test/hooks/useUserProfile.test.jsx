import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useUserProfile } from "@/features/user-profile/hooks/useUserProfile";
import userReducer from "@/entities/user/store/userSlice";
import postReducer from "@/entities/post/store/post.slice";
import { fetchUserAndPosts } from "@/entities/user/store/userSlice";

vi.mock("@/entities/user/store/userSlice", async () => {
  const actual = await vi.importActual("@/entities/user/store/userSlice");
  return {
    ...actual,
    fetchUserAndPosts: vi.fn(),
  };
});

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      user: userReducer,
      post: postReducer,
    },
    preloadedState: initialState,
  });
};

describe("useUserProfile", () => {
  const wrapper = ({ children, state }) => {
    const store = createMockStore(state);
    return <Provider store={store}>{children}</Provider>;
  };

  it("should return empty state if no userId is provided", () => {
    const { result } = renderHook(() => useUserProfile(null), { 
      wrapper: ({ children }) => wrapper({ children, state: {} }) 
    });

    expect(result.current).toEqual({
      user: null,
      posts: [],
      isLoading: false,
      error: null,
      isNotFound: false,
    });
  });

  it("should dispatch fetchUserAndPosts on mount when userId is provided", () => {
    const userId = 1;
    renderHook(() => useUserProfile(userId), { 
      wrapper: ({ children }) => wrapper({ children, state: { user: { profile: null, status: 'idle' }, post: { posts: [], status: 'idle' } } }) 
    });

    expect(fetchUserAndPosts).toHaveBeenCalledWith(userId);
  });

  it("should correctly derive isLoading state", () => {
    const state = {
      user: { profile: null, status: 'loading', error: null },
      post: { posts: [], status: 'idle', error: null },
    };

    const { result } = renderHook(() => useUserProfile(1), { 
      wrapper: ({ children }) => wrapper({ children, state }) 
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should correctly derive isNotFound state", () => {
    const state = {
      user: { profile: null, status: 'notFound', error: 'Not Found' },
      post: { posts: [], status: 'idle', error: null },
    };

    const { result } = renderHook(() => useUserProfile(1), { 
      wrapper: ({ children }) => wrapper({ children, state }) 
    });

    expect(result.current.isNotFound).toBe(true);
  });

  it("should correctly derive error state from either user or post errors", () => {
    const userErrorState = {
      user: { profile: null, status: 'failed', error: 'User Error' },
      post: { posts: [], status: 'idle', error: null },
    };

    const { result: resultUser } = renderHook(() => useUserProfile(1), { 
      wrapper: ({ children }) => wrapper({ children, state: userErrorState }) 
    });
    expect(resultUser.current.error).toBe('User Error');

    const postErrorState = {
      user: { profile: { id: 1 }, status: 'succeeded', error: null },
      post: { posts: [], status: 'failed', error: 'Posts Error' },
    };

    const { result: resultPost } = renderHook(() => useUserProfile(1), { 
      wrapper: ({ children }) => wrapper({ children, state: postErrorState }) 
    });
    expect(resultPost.current.error).toBe('Posts Error');
  });

  it("should return user and posts from store", () => {
    const state = {
      user: { profile: { id: 1, name: 'Test User' }, status: 'succeeded', error: null },
      post: { posts: [{ id: 101, title: 'Test Post' }], status: 'succeeded', error: null },
    };

    const { result } = renderHook(() => useUserProfile(1), { 
      wrapper: ({ children }) => wrapper({ children, state }) 
    });

    expect(result.current.user).toEqual({ id: 1, name: 'Test User' });
    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0].title).toBe('Test Post');
  });
});
