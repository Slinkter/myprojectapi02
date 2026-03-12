# TODO: Testing Implementation (v2.0)

## 📋 Roadmap: Testing for Clean Architecture

This document tracks the testing implementation aligned with the new **Software Architecture** refactors.

---

## 📦 Dependencies

```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8 jsdom
```

---

## 📝 Critical Test Cases

### 1. Domain Mappers (High Priority)
**`src/features/user-search/api/__tests__/user.mappers.test.js`**
- [ ] Verify `mapRawUser` sanitization (default values).
- [ ] Verify `mapRawPosts` filtering logic.
- [ ] Test early returns on invalid data.

### 2. Application Services
**`src/features/user-search/services/__tests__/user-service.test.js`**
- [ ] Test `fetchUserProfileById` orchestration.
- [ ] Test error propagation from infrastructure.
- [ ] Verify early returns on null IDs.

### 3. State Management (Redux)
**`src/features/user-search/redux/__tests__/userSlice.test.js`**
- [ ] Test `fetchStatus` transitions (idle -> loading -> succeeded).
- [ ] Verify memoized selectors (`selectCurrentUserProfile`).
- [ ] Test `notFound` state mapping from HTTP 404.

### 4. Custom Hooks
**`src/features/user-search/hooks/__tests__/useSearchInput.test.js`**
- [ ] Verify `helperMessage` updates with i18n keys.
- [ ] Test validation logic (ID 1-10 limit).

---

## 🚀 Execution Guide
Refer to **[CURSO_TESTING.md](./src/docs/CURSO_TESTING.md)** for a pedagogical step-by-step implementation.
