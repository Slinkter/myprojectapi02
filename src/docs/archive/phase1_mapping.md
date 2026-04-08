# FSD Mapping Analysis - Phase 1

## 🗺 Architectural Map

Based on the Senior Software Architect analysis, the following mapping will be implemented in Phase 2:

| Current Path | FSD Layer | Recommended FSD Path |
| :--- | :--- | :--- |
| `src/store/store.js` | **app** | `src/app/store/store.js` |
| `src/store/uiSlice.js` | **app** | `src/app/store/uiSlice.js` |
| `src/features/user-search/UserSearchPage.jsx` | **pages** | `src/pages/user-search/UserSearchPage.jsx` |
| `src/components/layout/MainLayout.jsx` | **widgets** | `src/widgets/layout/MainLayout.jsx` |
| `src/features/user-search/components/UserView.jsx` | **widgets** | `src/widgets/user-view/UserView.jsx` |
| `src/features/user-search/hooks/useUserSearch.js` | **features** | `src/features/user-search/hooks/useUserSearch.js` |
| `src/features/user-search/hooks/useSearchInput.js` | **features** | `src/features/user-search/hooks/useSearchInput.js` |
| `src/features/user-search/components/SearchBar.jsx` | **features** | `src/features/user-search/components/SearchBar.jsx` |
| `src/features/user-search/store/userSlice.js` | **entities** | `src/entities/user/store/userSlice.js` |
| `src/features/user-search/domain/user.mappers.js` | **entities** | `src/entities/user/domain/user.mappers.js` |
| `src/features/user-search/api/user.api.js` | **entities** | `src/entities/user/api/user.api.js` |
| `src/features/user-search/api/post.api.js` | **entities** | `src/entities/post/api/post.api.js` |
| `src/features/user-search/components/UserProfile.jsx` | **entities** | `src/entities/user/ui/UserProfile.jsx` |
| `src/features/user-search/components/PostList.jsx` | **entities** | `src/entities/post/ui/PostList.jsx` |
| `src/features/user-search/components/skeletons/...` | **entities** | `src/entities/*/ui/skeletons/...` |
| `src/features/user-search/services/user-service.js` | **entities** | `src/entities/user/services/user-service.js` |
| `src/components/ui/ThemeToggleButton.jsx` | **shared** | `src/shared/ui/ThemeToggleButton.jsx` |
| `src/components/ui/ErrorBoundary.jsx` | **shared** | `src/shared/ui/ErrorBoundary.jsx` |
| `src/components/ui/StateBoundary.jsx` | **shared** | `src/shared/ui/StateBoundary.jsx` |
| `src/components/ui/ErrorMessage.jsx` | **shared** | `src/shared/ui/ErrorMessage.jsx` |
| `src/components/ui/NotFoundCard.jsx` | **shared** | `src/shared/ui/NotFoundCard.jsx` |
| `src/hooks/useTheme.js` | **shared** | `src/shared/hooks/useTheme.js` |
| `src/lib/api-client.js` | **shared** | `src/shared/api/api-client.js` |
| `src/lib/utils.js` | **shared** | `src/shared/lib/utils.js` |
| `src/config/constants.js` | **shared** | `src/shared/config/constants.js` |

## 🗝 Key Insights
- **Decoupling**: Redux slices and API calls for Users/Posts are being moved to `entities` to avoid "God Folder" patterns in `features`.
- **Layering**: The `UserSearchPage` is promoted to `pages` as a composition orchestrator.
- **Infrastructure**: All generic utilities, constants, and basic UI now move to `shared`.
