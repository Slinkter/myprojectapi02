# 🎓 Masterclass de Ingeniería: myprojectapi02 (v2.1)

Este documento no es una guía de uso, es una **disección técnica** de las decisiones de arquitectura que convierten a este sistema en una herramienta de grado empresarial.

---

## 🗺️ Mapa de Patrones de Diseño (Pattern Mapping)

```
                    SOFTWARE DESIGN PATTERNS MAP
                    ────────────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │     FLUX PATTERN     │           │     STRATEGY PAT     │
       │     Redux Store      │──────────►│     useUserSearch    │
       └──────────────────────┘           └──────────────────────┘
                  ▲                                  │
                  │                                  ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │     OBSERVER PAT     │           │     ADAPTER PAT      │
       │    Redux Selectors   │◄──────────│      User Mapper     │
       └──────────────────────┘           └──────────────────────┘
```

---

## 🏗️ SECCIÓN 1: El Problema — SPA y el Caos de Estado

```
        SITUACIÓN SIN ORDEN                ORDEN ARQUITECTÓNICO
        ───────────────────                ────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │      Componente      │           │       Capas UI       │
       │     Llama a API      │           │    (Desacoplado)     │
       └──────────────────────┘           └──────────────────────┘
                  │                                  │
                  ▼                                  ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │       Caos de        │           │     DOMINIO PURO     │
       │        Estado        │           │    Mappers + Ent     │
       └──────────────────────┘           └──────────────────────┘
```

---

## 🛡️ SECCIÓN 2: El Patrón Data Mapper — Programación Defensiva

```
                    EL ESCUDO — DATA MAPPING
                    ────────────────────────

    ┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
    │   API RAW    │       │   DATA MAPPER    │       │DOMINIO SEGURO│
    │ { "id": 1 }  │──────►│   mapRawUser()   │──────►│  { id: 1 }   │
    └──────────────┘       └──────────────────┘       └──────────────┘
```

---

## 💀 SECCIÓN 3: StateBoundary — El Patrón Declarativo

```
                    STATEBOUNDARY — CICLO DE VIDA
                    ──────────────────────────────

                         dispatch(fetchUser)
                                │
                                ▼
              ┌──────────────────────────────────────┐
              │          status = "loading"          │
              │         <ProfileSkeleton />          │
              │         <PostListSkeleton />         │
              └──────────────────────────────────────┘
                ╱               │                ╲
               ╱                │                 ╲
       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
       │   "failed"   │  │ "succeeded"  │  │  "notFound"  │
       │  <ErrorMsg>  │  │  <UserView/> │  │  <NotFound/> │
       └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎣 SECCIÓN 4: Orquestación de Hooks (SRP)

```
                    PIPELINE DE HOOKS — FLUJO
                    ─────────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │    useSearchInput    │           │     Debounce Log     │
       │   (Local State UI)   │──────────►│    (Performance)     │
       └──────────────────────┘           └──────────────────────┘
                                                     │
                                                     ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │     REDUX STORE      │           │    useUserSearch     │
       │    (Global State)    │◄──────────│    (Domain Hook)     │
       └──────────────────────┘           └──────────────────────┘
```

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
