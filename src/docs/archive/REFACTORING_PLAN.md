# Project Refactoring & Modernization Plan

## 🎯 Objective
Transform the codebase into a professional-grade enterprise application applying **Feature-Sliced Design (FSD)**, **SOLID** principles, **Clean Code**, and a **Multi-Agent** quality assurance workflow.

## 🏗 Proposed Architecture: Feature-Sliced Design (FSD)
We will migrate from the current feature-based structure to a strict FSD hierarchy:
- **app/**: Application setup, providers, global styles, routing.
- **pages/**: Compositional layer. Pages combine features and entities into full views.
- **widgets/**: Large complex components that combine features (e.g., `Header`, `UserSearchForm`).
- **features/**: User actions/business logic that bring value (e.g., `search-user`, `update-profile`).
- **entities/**: Business entities (e.g., `User`, `Post`). Contains state, mappers, and basic UI.
- **shared/**: Reusable UI (UI Kit), helpers, api-clients, and constants.

## 🛠 Refactoring Pillars

### 1. Clean Code & Standards
- **Naming**: 
  - Components $\rightarrow$ `PascalCase`
  - Functions/Variables $\rightarrow$ `camelCase`
  - Constants $\rightarrow$ `UPPER_SNAKE_CASE`
- **SOLID**: 
  - Single Responsibility: Split hooks into specialized logic.
  - Interface Segregation: Optimized props in components.
- **DRY**: Extract repetitive logic into `shared/lib` or `shared/hooks`.

### 2. Decoupling & Design Patterns
- **API Layer**: Implement a Repository pattern to isolate API calls from business logic.
- **State Management**: Ensure Redux slices are strictly mapped to FSD entities.
- **UI/UX**: Transition to an Atomic Design approach within `shared/ui`.

### 3. QA & Testing Strategy
- **Unit Tests**: Vitest for services, mappers, and hooks.
- **Component Tests**: React Testing Library for UI components.
- **E2E**: Playwright/Cypress for critical flows (e.g., Search $\rightarrow$ View Profile).

## 🤖 Multi-Agent Workflow Prompt (The Master Prompt)

Whenever a refactoring task is started, the following prompt logic will be applied:

> "Act as a Senior Fullstack Engineer and Software Architect. Analyze the current implementation of [MODULE/FILE]. 
> 1. **Identify**: Find violations of SOLID, DRY, and FSD. Detect naming inconsistencies.
> 2. **Plan**: Create a step-by-step plan to decouple the logic, rename entities, and move files to the correct FSD layer.
> 3. **Execute**: 
>    - Refactor code using Clean Code standards.
>    - Ensure maximum independence (decoupling).
>    - Apply appropriate Design Patterns.
> 4. **Verify**: Run linting and suggest specific test cases to validate the change.
> 5. **Review**: UX/UI agent must verify the change doesn't break accessibility or design consistency."

## 📅 Roadmap
1. **Phase 1: Analysis & Mapping** $\rightarrow$ Map current files to FSD layers.
2. **Phase 2: Structural Migration** $\rightarrow$ Physical movement of files.
3. **Phase 3: Logic Refactoring** $\rightarrow$ Apply SOLID/Clean Code.
4. **Phase 4: UI/UX Polish** $\rightarrow$ Implementation of Design System standards.
5. **Phase 5: Testing & Hardening** $\rightarrow$ Full test suite implementation.
