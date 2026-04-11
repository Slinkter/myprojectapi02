import { describe, it, expect, vi } from "vitest";
import { useUserProfile } from "@/features/user-profile/hooks/useUserProfile";
import { fetchUserAndPosts } from "@/entities/user/store/user.thunks";
import { renderHookWithProviders } from "../test-utils";

// Helper to create a mock RTK thunk result
const createMockThunkResult = () => {
  const promise = Promise.resolve({});
  promise.abort = vi.fn();
  promise.unwrap = vi.fn().mockResolvedValue({});
  promise.catch = vi.fn().mockReturnValue(promise);
  return promise;
};

// Mock the thunk directly
vi.mock("@/entities/user/store/user.thunks", () => ({
  fetchUserAndPosts: vi.fn(() => () => createMockThunkResult()),
}));

describe("useUserProfile", () => {
  it("should return empty state if no userId is provided", () => {
    const { result } = renderHookWithProviders(() => useUserProfile(null), { 
      preloadedState: {
          user: { currentUser: null, fetchStatus: 'idle', error: null },
          post: { posts: [], fetchStatus: 'idle', error: null }
      }
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
    renderHookWithProviders(() => useUserProfile(userId), { 
      preloadedState: { 
          user: { currentUser: null, fetchStatus: 'idle' }, 
          post: { posts: [], fetchStatus: 'idle' } 
      } 
    });

    expect(fetchUserAndPosts).toHaveBeenCalledWith(userId);
  });

  it("should correctly derive isLoading state", () => {
    const preloadedState = {
      user: { currentUser: null, fetchStatus: 'loading', error: null },
      post: { posts: [], fetchStatus: 'idle', error: null },
    };

    const { result } = renderHookWithProviders(() => useUserProfile(1), { 
        preloadedState 
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should correctly derive isNotFound state", () => {
    const preloadedState = {
      user: { currentUser: null, fetchStatus: 'notFound', error: 'Not Found' },
      post: { posts: [], fetchStatus: 'idle', error: null },
    };

    const { result } = renderHookWithProviders(() => useUserProfile(1), { 
        preloadedState 
    });

    expect(result.current.isNotFound).toBe(true);
  });

  it("should correctly derive error state from either user or post errors", () => {
    const userErrorState = {
      user: { currentUser: null, fetchStatus: 'failed', error: 'User Error' },
      post: { posts: [], fetchStatus: 'idle', error: null },
    };

    const { result: resultUser } = renderHookWithProviders(() => useUserProfile(1), { 
        preloadedState: userErrorState 
    });
    expect(resultUser.current.error).toBe('User Error');

    const postErrorState = {
      user: { currentUser: { id: 1 }, fetchStatus: 'succeeded', error: null },
      post: { posts: [], fetchStatus: 'failed', error: 'Posts Error' },
    };

    const { result: resultPost } = renderHookWithProviders(() => useUserProfile(1), { 
        preloadedState: postErrorState 
    });
    expect(resultPost.current.error).toBe('Posts Error');
  });

  it("should return user and posts from store", () => {
    const preloadedState = {
      user: { currentUser: { id: 1, name: 'Test User' }, fetchStatus: 'succeeded', error: null },
      post: { posts: [{ id: 101, title: 'Test Post' }], fetchStatus: 'succeeded', error: null },
    };

    const { result } = renderHookWithProviders(() => useUserProfile(1), { 
        preloadedState 
    });

    expect(result.current.user).toEqual({ id: 1, name: 'Test User' });
    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0].title).toBe('Test Post');
  });
});
