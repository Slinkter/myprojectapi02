# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-04-09

### Added
- **React 19 Patterns**: Implemented `useTransition` and `useDeferredValue` for better UX and Concurrent Mode support.
- **Suspense Support**: Added Suspense integration to StateBoundary component.
- **Card Composition**: New Card components with CardHeader, CardContent, and CardFooter slots.
- **Documentation System**: Complete documentation overhaul with master README_TECHNICAL.md and ASCII diagrams.
- **New Shared Components**: EmptyState, Typography, PageContainer, FormElements.

### Changed
- **Performance Optimization**: Removed unnecessary memoization (`useMemo` on hook returns), derived state during render.
- **State Management**: Eliminated redundant `useEffects`, simplified state derivation with `useMemo`.
- **Documentation**: Consolidated 16+ redundant files into organized docs/ folder, removed src/docs/ duplicates.
- **Code Cleanup**: Replaced `flex-grow` with `grow`, removed console.log debug statements.

### Fixed
- **Lint Issues**: Fixed unused variables, ensured 0 warnings.
- **Component Props**: Improved Card component to support custom `as` prop for element polymorphism.

---

## [2.0.0] - 2026-03-05

### Added
- **Clean Architecture & DDD:** Separation of application services and mappers to sanitize data and keep business logic independent of UI (`user-service.js`, `user.mappers.js`).
- **Professional i18n System:** Hierarchical internationalization using a `t()` hook with dot-notation support for scalable multi-language contexts.
- **Pedagogical Excellence:** Created a doctoral-grade documentation ecosystem (`MASTERCLASS_INGENIERIA.md`, `CURSO_TESTING.md`, `QUE_ES_MCP.md`) turning the project into a senior teaching tool.

### Changed
- **Infrastructure Refactoring:** Complete isolation of the external API (`api.config.js` migrated to `api-client.js`).
- **Error Management:** Implemented error handling based on HTTP status codes to protect the domain.
- **Clean Code Standardization:** Applied systematic use of **Early Returns** and universal `camelCase`/`PascalCase` naming conventions to reduce cognitive load.

## [0.1.0] - 2026-04-11
### Added
- Implemented local development security layer with Husky and Lint-staged.
- Configured pre-commit hooks for linting and pre-push hooks for testing.
- Created GitHub Actions CI/CD pipeline for automated security audits, builds, testing, and deployment to GitHub Pages.
- Added caching support to CI/CD pipeline for faster execution.
