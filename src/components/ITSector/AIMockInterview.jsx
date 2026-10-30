import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSector } from '../../context/SectorContext';
import { useAuth } from '../../context/AuthContext';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  Clock,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileText,
  Download,
  Maximize2,
  Minimize2,
  Zap,
  Eye,
  Crosshair,
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  Flame,
  XCircle,
  Users,
  Search,
  BookOpen,
  Filter,
  Check,
  Award,
  TrendingUp,
  MessageSquareQuote,
  Loader2,
  Layers,
  Cpu,
  Code2,
  Terminal,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Shield,
  X,
  SkipForward,
  HelpCircle,
  CheckCircle
} from 'lucide-react';
import {
  getOpenRouterConfig,
  evaluateCandidateResponses,
  evaluateDeterministicRubric,
  generateFollowUpQuestion,
  OPENROUTER_POPULAR_MODELS
} from '../../utils/openRouterService';

export const TECH_STACK_DOMAINS = [
  // --------------------------------------------------------------------------
  // 1. FRONTEND & FULL STACK
  // --------------------------------------------------------------------------
  {
    id: 'react-fullstack',
    name: 'Full-Stack Web Developer (React & Node.js)',
    category: 'Frontend & Full Stack',
    roleTitle: 'Senior Full-Stack Engineer',
    icon: '⚛️',
    badge: 'Popular • React 19 & Node.js',
    color: '#8b5cf6',
    recruiterName: 'Sarah Chen',
    recruiterTitle: 'Lead Full-Stack Architect & Engineering Manager',
    recruiterAvatar: '👩‍💻',
    difficulty: 'Intermediate / Advanced',
    duration: '25-30 mins',
    description: 'Master full-stack architecture: React 19 component trees, Server Actions, Node.js asynchronous I/O, REST/GraphQL API design, JWT auth, and database transactions.',
    questions: [
      {
        id: 1,
        category: 'React Architecture & State Lifecycle',
        question: 'Explain the difference between React Server Components (RSC) and Client Components in modern React. When would you designate a component with the "use client" directive versus keeping it on the server?',
        expectedKeyPoints: [
          'RSCs execute exclusively on the server and send zero JavaScript to the client bundle',
          'Client components ("use client") are required for interactivity, React hooks (useState, useEffect), and browser APIs',
          'RSC benefits include direct backend resource/DB access and reduced bundle size',
          'Component composition: Passing Server Components as children/props to Client Components'
        ],
        idealAnswer: 'React Server Components execute only on the server, generating a serialized JSON stream rather than sending JavaScript code to the browser, which keeps bundle sizes minimal and allows direct database access. We use the "use client" directive specifically when components require client-side interactivity, state (useState/useReducer), lifecycle hooks (useEffect), or browser-only APIs like window and localStorage.',
        aiTip: 'Clearly distinguish bundle payload reduction from client-side interactive event listeners.'
      },
      {
        id: 2,
        category: 'Backend Node.js & Event Loop',
        question: 'How does the Node.js Event Loop process asynchronous tasks across microtask queues (process.nextTick, Promise.then) versus macrotask phases (Timers, Poll, Check)? What causes Event Loop blocking and how do you prevent it?',
        expectedKeyPoints: [
          'Phases: Timers (setTimeout), Poll (I/O callbacks), Check (setImmediate), Close',
          'Microtasks (process.nextTick, resolved promises) execute immediately after each phase before moving to the next macrotask',
          'CPU-intensive sync operations (crypto, heavy JSON parsing) block the single-threaded event loop',
          'Solutions: Worker Threads (worker_threads module), offloading to background message queues, or streaming data'
        ],
        idealAnswer: 'The Node.js event loop orchestrates non-blocking I/O across phases including Timers, Poll, and Check. Microtasks like process.nextTick and Promise callbacks have top priority and drain completely between each phase transition. CPU-bound calculations block the single thread, so we resolve this by offloading intensive tasks to Worker Threads or external background workers using BullMQ.',
        aiTip: 'Mention microtask queue draining precedence and Worker Threads for CPU tasks.'
      },
      {
        id: 3,
        category: 'API Security & Authentication',
        question: 'When implementing JSON Web Token (JWT) authentication for a Single Page Application, where should tokens be stored to prevent both XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery) attacks?',
        expectedKeyPoints: [
          'Access tokens in short-lived in-memory state or HttpOnly cookies',
          'Refresh tokens stored in Secure, HttpOnly, SameSite=Strict/Lax cookies',
          'Avoiding localStorage/sessionStorage due to direct XSS token exfiltration vulnerability',
          'CSRF protection using Double Submit Cookies or SameSite cookie attributes'
        ],
        idealAnswer: 'Storing tokens in localStorage makes them vulnerable to XSS exfiltration. The industry standard is storing short-lived Access Tokens in application memory or HttpOnly cookies, and Refresh Tokens in Secure, HttpOnly, SameSite=Strict cookies with a restricted path. This prevents JavaScript from reading the token while SameSite and CSRF anti-forgery tokens neutralize cross-site request attacks.',
        aiTip: 'Explicitly explain why localStorage is insecure for auth tokens and detail HttpOnly SameSite cookies.'
      },
      {
        id: 4,
        category: 'Database Optimization & Indexing',
        question: 'In a high-traffic e-commerce database (PostgreSQL/MySQL), a query searching order history by `user_id` and `created_at` sorted descending is running slow. How do you analyze the query plan with EXPLAIN and design an optimal Composite Index?',
        expectedKeyPoints: [
          'Using EXPLAIN ANALYZE to identify Sequential Scans versus Index Scans',
          'Creating a composite B-Tree index: `(user_id, created_at DESC)`',
          'Column ordering rule: Equality column (user_id) first, followed by Range/Sort column (created_at)',
          'Covering indexes to allow Index-Only Scans avoiding table heap lookups'
        ],
        idealAnswer: 'We run EXPLAIN (ANALYZE, BUFFERS) to verify if Postgres performs a sequential scan. We create a composite index on `(user_id, created_at DESC)`. Ordering is critical: placing the equality filter (user_id) first allows the B-tree to navigate directly to the user records, while the second column (created_at DESC) serves the sorting requirement in memory without extra sort passes.',
        aiTip: 'Explain the left-to-right rule for composite index columns: equality filters first, range/sort columns second.'
      },
      {
        id: 5,
        category: 'Full-Stack Performance & Caching',
        question: 'Describe your end-to-end caching strategy for a high-traffic web application across the Browser (Cache-Control), CDN (Edge Caching), and Backend Application layer (Redis). How do you handle cache invalidation?',
        expectedKeyPoints: [
          'Browser: Cache-Control headers with immutable assets and content-hashed filenames',
          'CDN: Stale-While-Revalidate and edge surrogate keys for instant global purges',
          'Application: Redis caching with TTLs and Cache-Aside pattern',
          'Cache Invalidation: Event-driven eviction on write/update mutations'
        ],
        idealAnswer: 'We implement a layered caching topology. Static assets use content hashes with `max-age=31536000, immutable`. Dynamic API responses leverage CDN Edge caching with `stale-while-revalidate` and Surrogate-Key tagging. At the backend layer, we use Redis with the Cache-Aside pattern. When data is modified, backend mutation services trigger asynchronous cache eviction events.',
        aiTip: 'Address CDN Surrogate Keys, Cache-Aside pattern, and event-driven invalidation.'
      }
    ]
  },
  {
    id: 'frontend-react-ts',
    name: 'Frontend React & TypeScript Specialist',
    category: 'Frontend & Full Stack',
    roleTitle: 'Senior Frontend Engineer',
    icon: '🎨',
    badge: 'Core UI • React, TS & Web Vitals',
    color: '#0284c7',
    recruiterName: 'Marcus Sterling',
    recruiterTitle: 'VP of Web Architecture & Client Infrastructure',
    recruiterAvatar: '👨‍💻',
    difficulty: 'Intermediate / Advanced',
    duration: '20-25 mins',
    description: 'Deep-dive into frontend performance: React Hooks mechanics, useMemo/useCallback pitfalls, TypeScript Generics, Core Web Vitals (LCP, INP, CLS), and state management.',
    questions: [
      {
        id: 1,
        category: 'React Performance & Rendering Mechanics',
        question: 'When a parent component in React re-renders, why do its children re-render by default even if their props have not changed? How do React.memo, useCallback, and useMemo work together to prevent unnecessary renders?',
        expectedKeyPoints: [
          'React re-renders children recursively down the virtual DOM tree upon parent state changes',
          'React.memo performs shallow prop comparison on child components',
          'Un-memoized object literals and inline functions create new memory references on each render, breaking React.memo',
          'useCallback preserves function reference equality; useMemo preserves computed object values'
        ],
        idealAnswer: 'By default, React re-renders the entire subtree under a state change to ensure UI consistency. React.memo wraps child components to skip rendering if props are shallowly equal. However, inline functions and objects create fresh memory references every render, causing shallow equality to fail. We use useCallback and useMemo to preserve stable references across renders.',
        aiTip: 'Highlight reference equality comparisons (Object.is) and memory caching trade-offs.'
      },
      {
        id: 2,
        category: 'Core Web Vitals & INP Optimization',
        question: 'Interaction to Next Paint (INP) replaced FID as a Core Web Vital. What causes poor INP scores in large React applications, and how do you profile and fix main-thread blocking during user interactions?',
        expectedKeyPoints: [
          'INP measures overall latency of all user interactions (clicks, taps, typing) during the page lifecycle',
          'Causes: Long tasks (>50ms) blocking the main thread, heavy state updates, layout thrashing',
          'Solutions: React 19 `useTransition` for non-urgent updates, `scheduler.yield()`, and offloading computations to Web Workers',
          'Profiling tools: Chrome DevTools Performance panel, LoAF (Long Animation Frames API)'
        ],
        idealAnswer: 'Poor INP occurs when synchronous JavaScript execution or heavy DOM operations block the browser main thread for over 50ms during user input. We diagnose bottlenecks using Chrome DevTools Performance insights and Long Animation Frames (LoAF). To resolve it, we wrap heavy updates in React `useTransition` or `startTransition` and break up monolithic execution loops using `scheduler.yield()`.',
        aiTip: 'Mention Long Animation Frames (LoAF) and React concurrency transitions.'
      },
      {
        id: 3,
        category: 'TypeScript Generics & Advanced Types',
        question: 'How do you create a type-safe generic utility type in TypeScript that extracts only the function properties from an interface, or transforms an API response schema with strict type narrowing?',
        expectedKeyPoints: [
          'Conditional Types using `T extends U ? X : Y`',
          'Mapped types with key filtering: `[K in keyof T as T[K] extends Function ? K : never]: T[K]`',
          'The `infer` keyword for extracting return types or generic arguments',
          'Discriminated unions for strict runtime and compile-time type narrowing'
        ],
        idealAnswer: 'We use mapped types combined with key remapping and conditional checks: `type FunctionKeys<T> = { [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] }`. For API schemas, we use discriminated unions with unique literal `type` or `status` tags, allowing TypeScript to narrow types automatically in switch/if branches with zero type casting.',
        aiTip: 'Provide the exact mapped type syntax using key remapping (`as`) and `infer`.'
      },
      {
        id: 4,
        category: 'Modern State Management & Architecture',
        question: 'Compare Zustand, Redux Toolkit, and React Context for managing application state. In what scenarios does React Context cause performance bottlenecks compared to selector-based stores?',
        expectedKeyPoints: [
          'React Context triggers re-renders on ALL consumer components when any part of the context value changes',
          'Zustand and Redux Toolkit use external subscriber stores with memoized atomic selectors',
          'Context is ideal for low-frequency changes (theming, auth user profile)',
          'Selector stores are essential for high-frequency or granular updates (data tables, canvas, carts)'
        ],
        idealAnswer: 'React Context lacks fine-grained selector subscriptions: whenever any value in the context object changes, every component calling `useContext` re-renders. Zustand and Redux Toolkit maintain state outside the React render tree and use subscriber listeners with equality checks, re-rendering only the specific components whose selected slice of state has actually changed.',
        aiTip: 'Focus on context subscription re-render cascades versus store selector subscriptions.'
      },
      {
        id: 5,
        category: 'CSS Architecture, Responsive Design & Accessibility (a11y)',
        question: 'How do you ensure enterprise web applications meet WCAG 2.1 AA accessibility standards while maintaining responsive, high-performance UI components with Tailwind CSS or CSS Modules?',
        expectedKeyPoints: [
          'Semantic HTML elements (`<main>`, `<nav>`, `<button>`, `<dialog>`) over generic `<div>` wrappers',
          'Proper ARIA attributes (`aria-expanded`, `aria-live`, `aria-describedby`) and keyboard focus management',
          'Color contrast ratios (minimum 4.5:1 for normal text)',
          'Responsive design using CSS Clamp, container queries, and fluid typography'
        ],
        idealAnswer: 'We prioritize native semantic HTML over ARIA wherever possible, ensuring natural tab index order and keyboard accessibility. Interactive modals and dropdowns manage focus trapping with Escape key listeners. We verify WCAG 2.1 AA compliance with automated Axe tools, maintain 4.5:1 contrast ratios, and use CSS container queries and `clamp()` for fluid responsive scaling.',
        aiTip: 'Mention native HTML semantics first, keyboard focus traps, and WCAG 4.5:1 contrast ratios.'
      }
    ]
  },
  {
    id: 'angular-modern-web',
    name: 'Angular & TypeScript Web Developer',
    category: 'Frontend & Full Stack',
    roleTitle: 'Senior Angular Engineer',
    icon: '🅰️',
    badge: 'Enterprise UI • Angular 17+ & RxJS',
    color: '#e11d48',
    recruiterName: 'Chloe Martin',
    recruiterTitle: 'Principal UI Architect & Angular Specialist',
    recruiterAvatar: '👩‍💻',
    difficulty: 'Intermediate / Advanced',
    duration: '20-25 mins',
    description: 'Angular 17+ architecture: Signals reactivity, Standalone Components, RxJS transformation pipelines, Hierarchical Dependency Injection, and OnPush change detection.',
    questions: [
      {
        id: 1,
        category: 'Angular Signals & Modern Reactivity',
        question: 'How do Angular Signals (signal, computed, effect) fundamentally improve change detection compared to Zone.js and the traditional digest cycle?',
        expectedKeyPoints: [
          'Signals provide fine-grained, glitch-free reactivity with direct dependency tracking',
          'Zone.js monkey-patches browser async APIs, triggering broad component tree change detection checks',
          'Signal-based components enable zoneless Angular applications with localized DOM updates',
          '`computed()` signals are memoized and only re-evaluate when dependencies change'
        ],
        idealAnswer: 'Zone.js monkey-patches asynchronous browser APIs and triggers change detection across the component tree whenever any event occurs. Angular Signals introduce fine-grained reactivity: when a signal updates, Angular knows the exact node in the DOM that depends on it. This eliminates Zone.js overhead and allows zoneless Angular applications with pinpoint rendering performance.',
        aiTip: 'Contrast Zone.js monkey-patching with fine-grained reactive dependency graphs in Signals.'
      },
      {
        id: 2,
        category: 'RxJS Operators & Memory Leaks',
        question: 'Explain the difference between `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`. How do you prevent memory leaks from active RxJS subscriptions in Angular components?',
        expectedKeyPoints: [
          '`switchMap`: Cancels previous inner observable when a new value arrives (search auto-complete)',
          '`mergeMap`: Runs all inner observables concurrently (batch downloads)',
          '`concatMap`: Queues inner observables sequentially in order (sequential writes)',
          '`exhaustMap`: Ignores new emissions while current observable is pending (prevent double button submits)',
          'Preventing leaks: `takeUntilDestroyed()`, `async` pipe in templates, or `DestroyRef`'
        ],
        idealAnswer: 'SwitchMap cancels the prior request upon new emission (ideal for live search); mergeMap processes concurrently; concatMap queues sequentially; exhaustMap ignores new triggers until the current one finishes (ideal for login submissions). To prevent leaks, we use the `async` pipe in templates or the Angular 16+ `takeUntilDestroyed()` operator tied to the component lifecycle.',
        aiTip: 'Provide use-cases for all 4 flattening operators and mention `takeUntilDestroyed()`.'
      },
      {
        id: 3,
        category: 'Hierarchical Dependency Injection',
        question: 'How does Angular resolve dependencies through its Hierarchical Injector tree (Root Injector, Module Injector, Element Injector)? What happens when a service is provided in a Component vs `providedIn: "root"`?',
        expectedKeyPoints: [
          '`providedIn: "root"` creates a singleton instance shared across the entire application and enables tree-shaking',
          'Component-level `providers: [...]` creates a new isolated service instance per component instance and its children',
          'Resolution traverses upward from Element Injector to Environment/Root Injector',
          'Injection tokens and `@Self()`, `@SkipSelf()`, `@Optional()` decorators'
        ],
        idealAnswer: 'Angular DI resolves dependencies hierarchically from the component Element Injector upward to the Root/Environment Injector. Providing a service in root makes it an application-wide singleton that is tree-shakable. Providing it in a component creates a fresh, isolated instance scoped only to that component and its child subtree, automatically destroyed when the component unmounts.',
        aiTip: 'Explain singleton scoping in root versus isolated lifecycle scoping in component providers.'
      },
      {
        id: 4,
        category: 'Standalone Components & Lazy Loading',
        question: 'How do Standalone Components and the new control flow syntax (`@if`, `@for`, `@defer`) streamline Angular application architecture and bundle size optimization?',
        expectedKeyPoints: [
          'Eliminates the boilerplate of NgModules by declaring imports directly in the component decorator',
          'Simplifies routing with direct `loadComponent: () => import(...)` lazy loading',
          '`@defer` blocks enable declarative lazy-loading of template sub-sections based on viewport, interaction, or timer conditions',
          'Built-in control flow (@if, @for) is faster than structural directives (*ngIf, *ngFor) and doesn’t require CommonModule'
        ],
        idealAnswer: 'Standalone components remove NgModule complexity by self-declaring their dependencies, enabling direct route-level code splitting via `loadComponent`. The `@defer` block introduces declarative lazy-loading for heavy template subtrees (loading only when scrolled into viewport or hovered), while the built-in control flow syntax improves compilation speed and runtime template execution.',
        aiTip: 'Mention `@defer` viewport triggers and standalone route lazy-loading.'
      },
      {
        id: 5,
        category: 'Forms & Reactive Validation',
        question: 'When building complex enterprise data entry forms, why are Angular Reactive Forms preferred over Template-Driven Forms? How do you implement asynchronous cross-field validation?',
        expectedKeyPoints: [
          'Reactive Forms are synchronous, immutable, and programmatic, offering direct unit-testability',
          'Template-driven forms rely on two-way data binding (ngModel) with asynchronous template updates',
          'Custom AsyncValidatorFn returning `Observable<ValidationErrors | null>` for server uniqueness checks',
          'Cross-field validation by attaching validators to the root `FormGroup` rather than individual `FormControl`'
        ],
        idealAnswer: 'Reactive Forms provide programmatic access to the form model with immutable state streams, making complex dynamic forms and unit testing straightforward. For cross-field validation (e.g. password matching or date ranges), we attach a custom validator to the parent FormGroup. For async checks like checking username availability, we implement an AsyncValidator returning an Observable with debounce.',
        aiTip: 'Explain attaching validators to FormGroup for cross-field checks and debouncing async validators.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. BACKEND & APIS
  // --------------------------------------------------------------------------
  {
    id: 'java-spring-microservices',
    name: 'Java Spring Boot & Microservices Backend',
    category: 'Backend & APIs',
    roleTitle: 'Senior Java Backend Engineer',
    icon: '☕',
    badge: 'Enterprise • Spring Boot & JPA',
    color: '#059669',
    recruiterName: 'Vikram Malhotra',
    recruiterTitle: 'Head of Core Infrastructure & Database Engines',
    recruiterAvatar: '👨‍💼',
    difficulty: 'Advanced',
    duration: '25-30 mins',
    description: 'Enterprise backend mastery: Spring Boot 3, Java 21 Virtual Threads, Hibernate/JPA N+1 optimizations, Microservices Sagas, and Kafka messaging.',
    questions: [
      {
        id: 1,
        category: 'Spring Framework & Bean Lifecycle',
        question: 'Walk through the Spring Bean lifecycle from instantiation to destruction. What is the role of BeanPostProcessor, and how does Spring resolve circular dependencies between singleton beans?',
        expectedKeyPoints: [
          'Phases: Instantiation -> Populate Properties -> Aware interfaces -> BeanPostProcessor (beforeInit) -> @PostConstruct/init-method -> BeanPostProcessor (afterInit) -> Ready -> PreDestroy',
          'BeanPostProcessor is where Spring applies AOP proxies (for @Transactional, @Async)',
          'Circular dependencies in singletons are solved via 3-level caching in DefaultSingletonBeanRegistry (early singleton exposure)',
          'Constructor injection circular dependencies cannot be solved without @Lazy'
        ],
        idealAnswer: 'Spring instantiates beans, populates properties, executes Aware callbacks, and runs BeanPostProcessors where dynamic AOP proxies (like @Transactional) are wrapped. For circular dependencies between singleton beans, Spring uses a 3-level cache in DefaultSingletonBeanRegistry to expose an early unpopulated object reference before completing initialization. Constructor injection loops require @Lazy.',
        aiTip: 'Detail the 3-level cache mechanism for circular singleton resolution and AOP proxy wrapping.'
      },
      {
        id: 2,
        category: 'Hibernate / JPA & N+1 Query Problem',
        question: 'What causes the notorious N+1 query problem in Hibernate/JPA relationships, and what are the three most effective strategies to resolve it in production Spring Boot services?',
        expectedKeyPoints: [
          'N+1 occurs when fetching a parent collection generates 1 query for the parent plus N individual queries for each child record',
          'Strategy 1: `JOIN FETCH` in JPQL or HQL queries',
          'Strategy 2: `@EntityGraph` (NamedEntityGraph or dynamic EntityGraph)',
          'Strategy 3: `@BatchSize(size = 25)` on entities/collections to batch query execution'
        ],
        idealAnswer: 'The N+1 problem occurs when lazy-loaded child associations execute an individual SQL query for each of the N parent entities retrieved. We solve this using `JOIN FETCH` in JPQL to eagerly fetch associations in a single SQL join, utilizing `@EntityGraph` for declarative fetching plans, or applying `@BatchSize` to batch child queries into `WHERE parent_id IN (...)` batches.',
        aiTip: 'Explain `JOIN FETCH`, `@EntityGraph`, and `@BatchSize` with concrete SQL query examples.'
      },
      {
        id: 3,
        category: 'Microservices & Distributed Transactions (Saga Pattern)',
        question: 'In a distributed microservices architecture, why is 2-Phase Commit (2PC) rarely used in cloud environments, and how does the Saga Pattern (Choreography vs Orchestration) maintain eventual consistency?',
        expectedKeyPoints: [
          '2PC is synchronous, blocking, and introduces high latency and single points of failure across networks',
          'Sagas break distributed transactions into a sequence of local transactions',
          'Choreography: Services publish and listen to domain events via message brokers (Kafka/RabbitMQ)',
          'Orchestration: A central orchestrator service coordinates steps and triggers compensating transactions upon failure'
        ],
        idealAnswer: '2PC requires locking distributed resources until all participants agree, causing severe latency and blocking risks under network partitions. Sagas maintain eventual consistency through sequential local transactions. In Choreography, microservices listen to event streams. In Orchestration, a dedicated coordinator manages execution and executes compensating rollback transactions if any step fails.',
        aiTip: 'Contrast Choreography event meshes with Orchestrator state machines and compensating rollback transactions.'
      },
      {
        id: 4,
        category: 'Java 21 Concurrency & Virtual Threads',
        question: 'How do Java 21 Virtual Threads (Project Loom) differ from traditional Platform (OS) Threads, and what architectural changes do they bring to high-throughput Spring Boot web servers?',
        expectedKeyPoints: [
          'Platform threads map 1:1 to OS kernel threads with fixed stack sizes (~1MB) limiting concurrency to thousands',
          'Virtual Threads are lightweight user-mode threads managed by the JVM with small dynamic heaps, allowing millions of concurrent tasks',
          'When a virtual thread executes blocking I/O, the JVM unmounts it from the carrier thread',
          'Eliminates complex reactive programming (WebFlux/RxJava) in favor of clean synchronous, blocking code'
        ],
        idealAnswer: 'Platform threads are heavy OS threads consuming ~1MB memory, capping server concurrency. Virtual Threads are JVM-managed user-mode threads that take bytes of memory. When a virtual thread performs blocking network I/O, the JVM unmounts it from the underlying OS carrier thread, enabling standard synchronous code to handle hundreds of thousands of concurrent requests without thread starvation.',
        aiTip: 'Explain carrier thread unmounting during blocking I/O and contrast with reactive programming.'
      },
      {
        id: 5,
        category: 'Kafka Messaging & Exactly-Once Semantics',
        question: 'How do Kafka Producers and Consumers achieve Exactly-Once Processing (EOS)? How do Consumer Groups handle partition rebalancing without message loss?',
        expectedKeyPoints: [
          'Producer idempotence via `enable.idempotence=true` with Producer IDs and sequence numbers',
          'Transactional API with Kafka Transaction Coordinator writing commit markers to partitions',
          'Consumer manual offset commit after successful business logic execution',
          'Cooperative Sticky Assignor for incremental non-blocking partition rebalances'
        ],
        idealAnswer: 'Kafka achieves EOS by combining idempotent producers (preventing broker duplicates via sequence IDs) with atomic multi-partition transactions coordinated via commit markers. Consumers maintain EOS by committing offsets manually only after processing completes. We use the Cooperative Sticky Assignor to reassign partitions incrementally without stopping all consumers.',
        aiTip: 'Detail producer idempotence flags, transactional commit markers, and cooperative sticky rebalancing.'
      }
    ]
  },
  {
    id: 'python-fastapi-django',
    name: 'Python & FastAPI / Django Backend Developer',
    category: 'Backend & APIs',
    roleTitle: 'Senior Python Backend Developer',
    icon: '🐍',
    badge: 'Fast APIs • Python 3.12 & AsyncIO',
    color: '#10b981',
    recruiterName: 'Alexander Brooks',
    recruiterTitle: 'Staff Backend Architect & Python Specialist',
    recruiterAvatar: '👨‍💻',
    difficulty: 'Intermediate / Advanced',
    duration: '20-25 mins',
    description: 'Master modern Python backend engineering: AsyncIO event loop, FastAPI Dependency Injection, Pydantic V2 validation, Django ORM query optimization, and Celery worker queues.',
    questions: [
      {
        id: 1,
        category: 'Python AsyncIO & The Global Interpreter Lock (GIL)',
        question: 'Explain how `async` and `await` work under the hood with the Python AsyncIO Event Loop. When does Python’s GIL (Global Interpreter Lock) still bottleneck async applications, and how do you handle CPU-bound vs I/O-bound tasks?',
        expectedKeyPoints: [
          'AsyncIO uses cooperative multitasking with coroutines yielding execution via `await` at I/O boundaries',
          'The GIL prevents multiple native OS threads from executing Python bytecode simultaneously',
          'I/O-bound tasks (HTTP requests, DB queries) thrive on single-threaded AsyncIO because the GIL is released during OS I/O calls',
          'CPU-bound tasks (image processing, data transformation) require `multiprocessing` or `ProcessPoolExecutor` to bypass the GIL'
        ],
        idealAnswer: 'AsyncIO relies on single-threaded cooperative multitasking where coroutines suspend at `await` expressions, allowing the event loop to run other tasks while waiting for network/disk I/O. The GIL only restricts concurrent CPU bytecode execution. Therefore, I/O-bound endpoints scale effortlessly on AsyncIO, while CPU-bound computations are offloaded to `ProcessPoolExecutor` or Celery workers.',
        aiTip: 'Clearly distinguish I/O-bound cooperative yielding from CPU-bound multiprocessing solutions.'
      },
      {
        id: 2,
        category: 'FastAPI Architecture & Pydantic V2',
        question: 'How does FastAPI’s Dependency Injection system (`Depends`) manage database session lifecycles (like SQLAlchemy `AsyncSession`), and how does Pydantic V2 achieve 5-10x faster data validation using Rust?',
        expectedKeyPoints: [
          '`Depends` with `yield` generators handles automatic setup (opening session) and teardown (commit/rollback/close) per request',
          'Automatic OpenAPI / Swagger documentation generation from type hints',
          'Pydantic V2 core validation engine (`pydantic-core`) is written in Rust, compiling schema parsing down to native machine code',
          'Strict mode vs Lax mode validation and model serialization'
        ],
        idealAnswer: 'FastAPI uses `Depends` with generator functions (`yield`) to scope database sessions per HTTP request: yielding the session to the route handler and automatically executing commit/close in a `finally` block. Pydantic V2 achieves massive speedups by rebuilding its validation engine in Rust (`pydantic-core`), parsing JSON and validating data types in compiled native code before reaching Python.',
        aiTip: 'Mention generator yield for session cleanup and Rust compilation in Pydantic V2.'
      },
      {
        id: 3,
        category: 'Django ORM Query Optimization',
        question: 'In a Django application, how do `select_related` and `prefetch_related` eliminate N+1 database queries, and what is the difference in the underlying SQL generated by each?',
        expectedKeyPoints: [
          '`select_related` performs an SQL `INNER JOIN` or `LEFT OUTER JOIN` in a single query (for ForeignKey and OneToOne)',
          '`prefetch_related` executes 2 separate queries and performs in-memory Python joining (for ManyToMany and reverse ForeignKeys)',
          'Using `.only()` and `.defer()` to limit retrieved columns',
          'Using `django-debug-toolbar` or `connection.queries` to inspect query counts'
        ],
        idealAnswer: '`select_related` solves N+1 for single-valued relationships (ForeignKey, OneToOne) by creating an SQL `JOIN` in a single query. `prefetch_related` is designed for multi-valued relationships (ManyToMany, reverse ForeignKeys) and executes two queries: one for the parents and one for all related children using `WHERE id IN (...)`, joining them in Python memory.',
        aiTip: 'Explain SQL JOIN vs separate IN query mechanics for select_related vs prefetch_related.'
      },
      {
        id: 4,
        category: 'Asynchronous Background Queues (Celery & Redis)',
        question: 'How do you architect a fault-tolerant background task processing system using Celery and Redis? How do you prevent task duplication, handle worker failures, and configure rate limits?',
        expectedKeyPoints: [
          'Celery tasks with Redis or RabbitMQ as the message broker and result backend',
          'Enforcing idempotency with distributed Redis locks using unique task IDs',
          'Task retries with exponential backoff (`autoretry_for`, `retry_backoff`)',
          'Dead Letter Queues (DLQ) and monitoring via Flower'
        ],
        idealAnswer: 'We configure Celery with Redis/RabbitMQ as the broker. To ensure fault tolerance, tasks are designed to be idempotent using Redis distributed lock keys with short TTLs. We configure automated retries with exponential jitter (`retry_backoff=True`) for transient network errors and route persistently failing tasks to a Dead Letter Queue while monitoring throughput with Flower.',
        aiTip: 'Address task idempotency via Redis locks and exponential retry backoff configurations.'
      },
      {
        id: 5,
        category: 'API Rate Limiting & Microservice Security',
        question: 'How would you implement a distributed Token Bucket or Sliding Window rate limiter in FastAPI backed by Redis to protect your APIs against DDoS and scraping attacks?',
        expectedKeyPoints: [
          'Sliding Window algorithm using Redis Sorted Sets (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`)',
          'Atomic execution using Redis Lua scripts or multi-exec pipelines',
          'Returning standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` (HTTP 429)',
          'Rate limiting by IP, authenticated User ID, or API Key'
        ],
        idealAnswer: 'We implement a Sliding Window rate limiter using Redis Sorted Sets. Each request adds a timestamp to a key scoped by User ID or IP (`ZADD key now now`). We remove timestamps older than the window (`ZREMRANGEBYSCORE key 0 now-window`) and check the cardinality (`ZCARD`). Executing this logic in an atomic Redis Lua script ensures zero race conditions across distributed worker nodes.',
        aiTip: 'Detail the Redis Sorted Set commands (ZADD, ZREMRANGEBYSCORE, ZCARD) and atomic Lua scripting.'
      }
    ]
  },
  {
    id: 'golang-distributed-systems',
    name: 'Golang & High-Concurrency Systems Engineer',
    category: 'Backend & APIs',
    roleTitle: 'Senior Go Infrastructure Engineer',
    icon: '🐹',
    badge: 'High Scale • Go, gRPC & Concurrency',
    color: '#06b6d4',
    recruiterName: 'David Kim',
    recruiterTitle: 'Lead Distributed Systems Engineer',
    recruiterAvatar: '👨‍💻',
    difficulty: 'Advanced / Expert',
    duration: '25-30 mins',
    description: 'High-throughput Go systems: Goroutines & GMP scheduler, buffered vs unbuffered Channels, gRPC & Protobuf, memory escape analysis, and race condition elimination.',
    questions: [
      {
        id: 1,
        category: 'Go Concurrency — Goroutines & The GMP Scheduler',
        question: 'How does Go’s GMP Scheduler (Goroutines, Logical Processors, OS Threads) manage concurrency and work-stealing? What happens when a Goroutine executes a blocking syscall?',
        expectedKeyPoints: [
          'G (Goroutine), M (OS Machine Thread), P (Logical Processor context with run-queue)',
          'Work-stealing: When a P exhausts its local queue, it steals half the goroutines from another P’s queue',
          'Blocking Syscalls: P detaches from M, and a new/idle M takes over P to continue executing remaining Goroutines',
          'Network I/O: Handled asynchronously by Netpoller (epoll/kqueue) without blocking OS threads'
        ],
        idealAnswer: 'The Go runtime maps G (Goroutines) onto M (OS threads) via P (Logical Processors). Each P has a local run-queue; when empty, it steals half the work from another P. When a goroutine enters a blocking syscall, P detaches from M and binds to a fresh M to keep running. Network I/O is routed through the Netpoller using OS epoll, avoiding thread blocking altogether.',
        aiTip: 'Explain the roles of G, M, P, work-stealing algorithms, and Netpoller integration.'
      },
      {
        id: 2,
        category: 'Channels, Mutexes & Memory Safety',
        question: 'Compare Buffered Channels, Unbuffered Channels, and `sync.Mutex` in terms of synchronization guarantees and memory overhead. How do you detect and fix Goroutine leaks?',
        expectedKeyPoints: [
          'Unbuffered channels guarantee strict synchronization (rendezvous) between sender and receiver',
          'Buffered channels decouple execution up to the buffer capacity',
          '`sync.Mutex` is more performant for simple state protection, while Channels excel at passing data ownership',
          'Goroutine leaks occur when goroutines block indefinitely on unread channels or un-cancelled `context.Context`',
          'Detection: Go pprof Goroutine profiling and `uber-go/goleak`'
        ],
        idealAnswer: 'Unbuffered channels require synchronous rendezvous between sender and receiver. Buffered channels allow asynchronous writes until the buffer fills. For simple shared memory, `sync.Mutex` has lower overhead. Goroutine leaks happen when goroutines wait on unclosed channels or never receive context cancellation. We detect them using `pprof` heap/goroutine profiles and automated leak tests with `goleak`.',
        aiTip: 'Address channel rendezvous mechanics, context cancellation, and pprof leak debugging.'
      },
      {
        id: 3,
        category: 'gRPC, Protobuf & High-Throughput Microservices',
        question: 'Why is gRPC over HTTP/2 significantly faster and more resource-efficient than REST over JSON for inter-service communication? How do gRPC Interceptors implement distributed tracing and authentication?',
        expectedKeyPoints: [
          'Protocol Buffers (Protobuf) serialize data into compact binary format rather than verbose text JSON',
          'HTTP/2 multiplexing allows hundreds of concurrent RPC calls over a single persistent TCP connection',
          'Strongly-typed contracts with auto-generated client and server stubs in multiple languages',
          'Unary and Stream Interceptors wrap RPC calls for context propagation (OpenTelemetry trace IDs) and token auth'
        ],
        idealAnswer: 'gRPC utilizes binary Protobuf serialization which is orders of magnitude smaller and faster to parse than JSON. Running over HTTP/2 enables multiplexing multiple concurrent streams over a single TCP connection, eliminating connection handshake overhead. Interceptors act as middleware, extracting and propagating OpenTelemetry metadata and JWT auth headers across distributed calls.',
        aiTip: 'Highlight binary serialization efficiency, HTTP/2 multiplexing, and interceptor middleware.'
      },
      {
        id: 4,
        category: 'Memory Management & Escape Analysis',
        question: 'How does the Go compiler’s Escape Analysis decide whether a variable is allocated on the Stack versus the Heap? How does reducing heap allocations improve Go Garbage Collector performance?',
        expectedKeyPoints: [
          'Stack allocation is cheap, fast, and cleaned up automatically upon function return without GC intervention',
          'Heap allocation requires GC tracking, causing CPU overhead and potential STW (stop-the-world) mark phases',
          'Escape triggers: Returning pointers from functions, passing values to `interface{}` / `any`, slice capacity resizing',
          'Compiler flag: `go build -gcflags="-m"` to inspect escape analysis decisions'
        ],
        idealAnswer: 'Variables whose lifecycle is strictly contained within a function are allocated on the fast stack. If a reference escapes (e.g. returning a pointer or storing in an interface), the compiler allocates it on the heap. Heap allocations increase Garbage Collector load, so we use `go build -gcflags="-m"` to profile escapes and use `sync.Pool` to reuse memory buffers.',
        aiTip: 'Mention stack vs heap lifecycle, pointer escaping, and compiler `-gcflags="-m"` verification.'
      },
      {
        id: 5,
        category: 'Distributed Coordination & Raft Consensus',
        question: 'In a distributed key-value store built in Go (like etcd), how does the Raft consensus algorithm guarantee linearizable consistency across cluster nodes during leader elections and network partitions?',
        expectedKeyPoints: [
          'Raft states: Leader, Follower, Candidate',
          'Leader election via randomized heartbeat timeouts and majority quorum votes (N/2 + 1)',
          'Log replication: Entries must be committed to a majority quorum before acknowledging clients',
          'Handling split-brain: A partitioned leader in a minority quorum cannot commit entries or serve stale writes'
        ],
        idealAnswer: 'Raft maintains consistency across nodes through randomized election timeouts to prevent split votes. The elected leader appends log entries to followers and only applies commits once a majority quorum (N/2+1) acknowledges replication. If a network partition isolates the leader in a minority, it cannot achieve quorum commits, completely preventing split-brain and dirty writes.',
        aiTip: 'Explain randomized election timers, majority quorum commits, and minority partition isolation.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. SYSTEM DESIGN & ARCHITECTURE
  // --------------------------------------------------------------------------
  {
    id: 'system-design-cloud',
    name: 'System Design & Scalable Cloud Architecture',
    category: 'Architecture & Security',
    roleTitle: 'Principal Distributed Systems Architect',
    icon: '🏛️',
    badge: 'FAANG L5/L6 • Scalability & Resiliency',
    color: '#6366f1',
    recruiterName: 'Dr. Evelyn Reed',
    recruiterTitle: 'Distinguished Systems Architect & Technical Director',
    recruiterAvatar: '👩‍💻',
    difficulty: 'Advanced / Expert',
    duration: '30 mins',
    description: 'Design massive-scale distributed platforms: 100M+ DAU scaling, CDN & Load Balancing topologies, Database Sharding & Replication, CAP theorem trade-offs, and microsecond P99 SLAs.',
    questions: [
      {
        id: 1,
        category: 'High-Scale URL Shortener (TinyURL / Bitly)',
        question: 'Design a globally scalable URL shortening service (like Bitly) handling 500 Million new URLs per month and 10 Billion monthly redirects with sub-10ms P99 latency. Walk through your data model, Base62 encoding strategy, and caching layer.',
        expectedKeyPoints: [
          'Base62 encoding (a-z, A-Z, 0-9) yielding 62^7 = ~3.5 Trillion unique 7-character hashes',
          'ID Generation: Distributed sequence generator (Twitter Snowflake or pre-allocated range DB counters) over hashing',
          'Database choice: NoSQL key-value (DynamoDB/Cassandra) or PostgreSQL with hash sharding',
          'Caching: Redis caching the top 20% most active URLs (80/20 Pareto rule) with Least Recently Used (LRU) eviction'
        ],
        idealAnswer: 'We generate 64-bit unique IDs using a distributed Snowflake generator and convert them into 7-character strings using Base62 encoding. The storage layer uses DynamoDB with `short_key` as partition key for O(1) lookups. To satisfy 10B monthly reads with sub-10ms latency, we place Redis clusters at edge regions caching the top 20% hottest URLs using LRU eviction.',
        aiTip: 'Walk through Base62 capacity calculations (62^7) and Snowflake ID generator over MD5 hashing collisions.'
      },
      {
        id: 2,
        category: 'Database Sharding & Consistent Hashing',
        question: 'When a relational database outgrows a single server, how do you implement Horizontal Database Sharding? How does Consistent Hashing minimize data migration when adding or removing database nodes?',
        expectedKeyPoints: [
          'Sharding by partition key (e.g. `user_id`) to distribute write/read throughput across physical database nodes',
          'Standard modulo hashing (`hash(key) % N`) causes massive reshuffling (almost all keys move) when N changes',
          'Consistent Hashing maps both keys and nodes onto a circular 2^32 hash ring',
          'Virtual nodes (vnodes) balance load distribution and prevent hot spots on the ring'
        ],
        idealAnswer: 'Database sharding partitions data across independent database servers using a shard key like `user_id`. Traditional modulo hashing (`key % N`) requires reshuffling almost 100% of data when adding a node. Consistent Hashing places nodes and keys on a circular hash ring; adding a node only requires migrating keys from its immediate neighbor (k/N keys). Virtual nodes ensure uniform load distribution.',
        aiTip: 'Contrast modulo hashing migration chaos with Consistent Hashing ring topologies and virtual nodes.'
      },
      {
        id: 3,
        category: 'Distributed Caching & Cache Invalidation Strategies',
        question: 'Compare Cache-Aside, Read-Through, Write-Through, and Write-Behind (Write-Back) caching patterns. How do you mitigate the "Cache Stampede / Thundering Herd" problem when a hot key expires?',
        expectedKeyPoints: [
          'Cache-Aside: Application manages reading from cache and falling back to DB, then updating cache',
          'Write-Through: Data is written to cache and DB synchronously',
          'Write-Behind: Data is written to cache immediately and asynchronously flushed to DB in batches',
          'Thundering Herd solutions: Mutex locking (Redis SETNX with TTL), Probabilistic Early Refresh (XFetch), or stale-while-revalidate'
        ],
        idealAnswer: 'Cache-Aside puts cache control in the application, while Write-Through synchronously writes to cache and DB simultaneously. Write-Behind queues writes in cache for async DB batching. When a hot key expires, thousands of simultaneous queries can crash the DB (Cache Stampede). We prevent this using distributed mutex locks (`SETNX`) or probabilistic early recalculation (XFetch algorithm).',
        aiTip: 'Explain XFetch or distributed mutex locking for hot key stampede mitigation.'
      },
      {
        id: 4,
        category: 'CAP Theorem & Distributed Data Consistency',
        question: 'Explain the CAP Theorem (Consistency, Availability, Partition Tolerance) and PACELC extension. Why must all real-world distributed systems choose Partition Tolerance, and how do systems like Amazon Dynamo choose AP over CP?',
        expectedKeyPoints: [
          'Network partitions (P) are unavoidable in distributed networks',
          'Under partition: CP systems reject requests to preserve strict linearizability (etcd, HBase); AP systems accept writes to maintain availability at the cost of temporary inconsistency (Cassandra, DynamoDB)',
          'PACELC: If Partition -> choose Availability or Consistency; Else -> choose Latency or Consistency',
          'Eventual consistency mechanisms: Vector Clocks, Read Repair, and Hinted Handoff'
        ],
        idealAnswer: 'In distributed networks, cable cuts and packet drops make partitions unavoidable, requiring systems to support Partition Tolerance. During a partition, CP systems sacrifice availability to prevent stale data (returning errors), while AP systems accept writes to stay available, synchronizing later via Vector Clocks and Read Repair. PACELC extends this to normal operations (Latency vs Consistency).',
        aiTip: 'Explain PACELC extension and eventual consistency reconciliation (Vector Clocks, Read Repair).'
      },
      {
        id: 5,
        category: 'Microservices Resiliency — Circuit Breakers & Rate Limiting',
        question: 'When a downstream payment microservice experiences 5-second latency spikes, how does the Circuit Breaker Pattern (Closed, Open, Half-Open) prevent cascading system-wide outages? What is the role of bulkheads and retries with jitter?',
        expectedKeyPoints: [
          'States: Closed (normal), Open (trips upon error threshold, immediately fails fast without calling downstream), Half-Open (tests canary requests)',
          'Cascading failure: Thread pool exhaustion across upstream services while waiting for unresponsive dependencies',
          'Exponential backoff with randomized jitter to prevent synchronized retry storms',
          'Bulkhead isolation: Partitioning thread pools/resources so one failing service cannot consume all system resources'
        ],
        idealAnswer: 'Without circuit breakers, upstream services exhaust thread pools waiting on slow downstream dependencies, triggering cascading failures. The Circuit Breaker trips to "Open" when failures exceed a threshold (e.g. 50%), failing fast immediately. After a timeout, it transitions to "Half-Open" to test canary traffic. We combine this with exponential backoff plus jitter and bulkhead thread pool isolation.',
        aiTip: 'Describe the 3 circuit breaker states and bulkhead thread pool partitioning.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. AI, DATA SCIENCE & MACHINE LEARNING
  // --------------------------------------------------------------------------
  {
    id: 'generative-ai-llm',
    name: 'Generative AI & LLM Applications Developer',
    category: 'AI & Data Science',
    roleTitle: 'AI Solutions Architect & LLM Engineer',
    icon: '🤖',
    badge: 'Cutting Edge • RAG & Vector DBs',
    color: '#9333ea',
    recruiterName: 'Dr. Arthur Vance',
    recruiterTitle: 'Principal Scientist & AI Systems Lead',
    recruiterAvatar: '👨‍🔬',
    difficulty: 'Intermediate / Advanced',
    duration: '25 mins',
    description: 'Build enterprise GenAI: Retrieval-Augmented Generation (RAG) pipelines, Vector Embeddings (HNSW, Cosine), Prompt Engineering, Fine-Tuning vs RAG, and Hallucination Guardrails.',
    questions: [
      {
        id: 1,
        category: 'RAG Architecture & Chunking Strategies',
        question: 'How do you design a high-accuracy Retrieval-Augmented Generation (RAG) pipeline for 100,000 internal documents? What are the trade-offs between fixed-size chunking, recursive character chunking, and semantic chunking?',
        expectedKeyPoints: [
          'Pipeline stages: Document Ingestion -> Chunking -> Vector Embedding -> Vector Database Indexing -> Similarity Retrieval -> Prompt Context Injection -> LLM Generation',
          'Fixed-size chunking risks splitting sentences and losing context; Recursive character chunking respects paragraphs and markdown structure',
          'Semantic chunking dynamically splits text based on embedding distance shifts between sentences',
          'Chunk overlap (e.g. 10-20%) preserves continuity across chunk boundaries'
        ],
        idealAnswer: 'Our RAG pipeline parses documents into structured sections, applying recursive chunking with 15% overlap to preserve semantic context across sentence boundaries. For structured manuals, we use semantic chunking triggered by vector distance thresholds. Chunks are embedded with models like `text-embedding-3-large` and indexed in vector databases using HNSW for sub-20ms nearest-neighbor retrieval.',
        aiTip: 'Explain chunking overlap, recursive splitting algorithms, and vector embedding injection into LLM prompts.'
      },
      {
        id: 2,
        category: 'Vector Databases & Similarity Search',
        question: 'How do Vector Databases (Pinecone, Qdrant, Milvus, pgvector) execute fast Approximate Nearest Neighbor (ANN) searches over millions of high-dimensional vectors? Compare HNSW with Flat Indexing.',
        expectedKeyPoints: [
          'Flat indexing performs brute-force exact cosine/dot-product comparison across every vector (O(N) — slow for large datasets)',
          'Hierarchical Navigable Small World (HNSW) builds multi-layer graphs for logarithmic O(log N) search speed',
          'Distance metrics: Cosine Similarity, Dot Product, Euclidean (L2) distance',
          'Hybrid search combining dense vector embeddings with sparse BM25 keyword search using Reciprocal Rank Fusion (RRF)'
        ],
        idealAnswer: 'Exact flat search computes distance against every vector in O(N) time, which fails at scale. HNSW structures vectors into a multi-layered skip-list graph, routing queries through coarse upper layers before refining nearest neighbors in dense bottom layers in O(log N) time. We often combine HNSW dense vectors with BM25 keyword matching via Reciprocal Rank Fusion (RRF) for optimal precision.',
        aiTip: 'Contrast exact O(N) flat search with HNSW multi-layer graph skip-lists and Hybrid BM25 fusion.'
      },
      {
        id: 3,
        category: 'Prompt Engineering & Context Window Optimization',
        question: 'What techniques do you use to maximize LLM accuracy and reduce hallucinations in complex domain-specific tasks? Compare Zero-Shot, Few-Shot, Chain-of-Thought (CoT), and ReAct (Reason + Act) prompting.',
        expectedKeyPoints: [
          'Few-Shot: Providing 3-5 high-quality input/output examples to anchor expected schema and tone',
          'Chain-of-Thought (CoT): Prompting the model to "think step-by-step" to break down complex reasoning logic',
          'ReAct: Interleaving reasoning traces with external tool calling (APIs, databases, calculators)',
          'Guardrails: Output structure enforcement via JSON schemas / Pydantic models (Structured Outputs)'
        ],
        idealAnswer: 'To minimize hallucinations, we combine Few-Shot examples with Chain-of-Thought prompting, directing the model to articulate its reasoning steps before generating conclusions. For dynamic tasks, we apply the ReAct framework, enabling the LLM to formulate reasoning thoughts and invoke external tools. We strictly enforce OpenAI/OpenRouter Structured Outputs with Pydantic JSON schemas.',
        aiTip: 'Explain Chain-of-Thought reasoning steps, ReAct tool execution loops, and Pydantic schema constraints.'
      },
      {
        id: 4,
        category: 'Fine-Tuning vs RAG vs Prompting',
        question: 'How do you evaluate whether a business problem requires Prompt Engineering, RAG (Retrieval-Augmented Generation), or Fine-Tuning (LoRA / QLoRA)? Provide concrete decision criteria.',
        expectedKeyPoints: [
          'Prompt Engineering: Best for general tasks, rapid prototyping, and zero training overhead',
          'RAG: Essential for dynamic data, private enterprise knowledge bases, citation requirements, and frequent document updates',
          'Fine-Tuning (LoRA): Best for teaching specialized styles, custom output syntax/formats, specific domain vocabulary, or reducing latency/costs on smaller models',
          'Fine-tuning DOES NOT reliably inject new factual knowledge (hallucination risk remains without RAG)'
        ],
        idealAnswer: 'If the goal is accessing dynamic enterprise knowledge with verifiable source citations, RAG is required because models cannot be retrained daily. If the goal is customizing output style, mastering esoteric syntax, or steering a smaller 7B/8B model to match GPT-4 quality on a narrow task, Parameter-Efficient Fine-Tuning (LoRA/QLoRA) is ideal. Often, the best architecture combines both.',
        aiTip: 'Clarify that fine-tuning modifies model behavior/style while RAG provides factual knowledge retrieval.'
      },
      {
        id: 5,
        category: 'LLM Evaluation & Guardrails (LLMOps)',
        question: 'How do you measure and monitor production LLM application quality when ground-truth labels are unavailable? How do frameworks like RAGAS and LLM-as-a-Judge evaluate faithfulness and answer relevancy?',
        expectedKeyPoints: [
          'RAG Triad metrics: Context Precision (is retrieved context relevant?), Faithfulness (is answer grounded in context?), Answer Relevancy (does answer address query?)',
          'LLM-as-a-Judge: Using a high-capability model (GPT-4o, Claude 3.5 Sonnet) with detailed evaluation rubrics',
          'Guardrails: NeMo Guardrails, Guardrails AI, or Llama Guard to filter PII, toxicity, prompt injections, and off-topic queries',
          'Semantic drift tracking via embedding distance distributions across user queries'
        ],
        idealAnswer: 'We monitor production RAG applications using the RAGAS evaluation framework tracking the RAG Triad: Context Relevance, Faithfulness (groundedness against hallucinations), and Answer Relevance. An asynchronous pipeline runs LLM-as-a-Judge on sampled live conversations against strict rubrics. At the edge, input/output guardrails intercept prompt injection attempts and enforce PII sanitization.',
        aiTip: 'Detail the RAG Triad (Faithfulness, Context Relevance, Answer Relevance) and LLM-as-a-Judge rubrics.'
      }
    ]
  },
  {
    id: 'data-science-machine-learning',
    name: 'Data Science & Machine Learning Engineer',
    category: 'AI & Data Science',
    roleTitle: 'Senior ML & Data Scientist',
    icon: '📊',
    badge: 'Core ML • Scikit-Learn, PyTorch & Stats',
    color: '#ec4899',
    recruiterName: 'Dr. Sophia Martinez',
    recruiterTitle: 'Lead Data Scientist & Predictive Modeling Specialist',
    recruiterAvatar: '👩‍🔬',
    difficulty: 'Intermediate / Advanced',
    duration: '25 mins',
    description: 'Applied data science: Feature engineering, Overfitting & Cross-Validation, ROC-AUC vs Precision-Recall, Tree Ensembles (XGBoost/LightGBM), and model drift monitoring.',
    questions: [
      {
        id: 1,
        category: 'Feature Engineering & Data Preprocessing',
        question: 'How do you handle severe class imbalance in a fraud detection dataset where fraudulent transactions represent only 0.1% of all samples? Compare SMOTE, class weighting, and threshold tuning.',
        expectedKeyPoints: [
          'Accuracy is a misleading metric under severe class imbalance; focus on Precision, Recall, PR-AUC, and F1-score',
          'Class Weighting: Penalizing false negatives heavily in loss functions (e.g. `scale_pos_weight` in XGBoost)',
          'SMOTE (Synthetic Minority Over-sampling Technique): Synthesizing minority samples along feature vectors',
          'Decision Threshold Tuning: Shifting default 0.5 probability threshold to optimize commercial cost-benefit trade-offs'
        ],
        idealAnswer: 'With 0.1% fraud, accuracy is useless. We optimize for PR-AUC (Precision-Recall Area Under Curve) and F1-score. We apply algorithmic class weighting (`scale_pos_weight` in XGBoost or class weights in logistic loss) to heavily penalize missed fraud. Rather than over-sampling with SMOTE which can introduce noise, we calibrate probabilities and tune the decision threshold based on business cost matrices.',
        aiTip: 'Emphasize PR-AUC over ROC-AUC for imbalanced datasets and decision threshold calibration.'
      },
      {
        id: 2,
        category: 'Bias-Variance Trade-off & Regularization',
        question: 'Explain the Bias-Variance Trade-off in machine learning models. How do L1 (Lasso) and L2 (Ridge) regularization mathematically prevent overfitting in regression models?',
        expectedKeyPoints: [
          'High Bias = Underfitting (model too simplistic); High Variance = Overfitting (model memorizes training noise)',
          'L1 (Lasso) adds absolute coefficient magnitude penalty: $\\lambda \\sum |w_i|$, driving less important coefficients to zero (sparse feature selection)',
          'L2 (Ridge) adds squared coefficient magnitude penalty: $\\lambda \\sum w_i^2$, shrinking weights smoothly without setting them to zero',
          'ElasticNet combines both L1 and L2 penalties'
        ],
        idealAnswer: 'Bias reflects error from overly simplistic assumptions; Variance reflects error from sensitivity to training data noise. Regularization adds a penalty to the loss function. L1 Lasso adds absolute weight penalties ($\\|w\\|_1$), producing sparse models by driving redundant feature weights to zero. L2 Ridge adds squared weight penalties ($\\|w\\|_2^2$), shrinking weights uniformly to prevent any single feature from dominating.',
        aiTip: 'Explain why L1 induces geometric diamond sparsity while L2 induces smooth spherical weight shrinkage.'
      },
      {
        id: 3,
        category: 'Model Evaluation Metrics',
        question: 'When evaluating a binary classification model, in what scenario is Precision more critical than Recall, and in what scenario is Recall more critical than Precision? Explain the ROC-AUC vs PR-AUC curves.',
        expectedKeyPoints: [
          'High Precision priority: When False Positives are costly (e.g. spam detection, video recommendation)',
          'High Recall priority: When False Negatives are catastrophic (e.g. cancer detection, aircraft fault diagnosis)',
          'ROC-AUC plots True Positive Rate vs False Positive Rate; can look deceptively optimistic when negatives vastly outnumber positives',
          'PR-AUC plots Precision vs Recall and reflects true performance under heavy class imbalance'
        ],
        idealAnswer: 'Precision is paramount when false positives are costly (e.g. marking legitimate emails as spam). Recall is vital when false negatives are dangerous (e.g. medical diagnosis where missing a disease is fatal). ROC-AUC plots TPR vs FPR, but under severe class imbalance, the huge denominator of true negatives skews the curve. PR-AUC is far more reliable for evaluating rare events.',
        aiTip: 'Give concrete industry examples for Precision (spam/fraud) vs Recall (medical/security).'
      },
      {
        id: 4,
        category: 'Gradient Boosting (XGBoost / LightGBM) vs Neural Networks',
        question: 'Why do Tree-based Gradient Boosting models (XGBoost, LightGBM, CatBoost) consistently outperform Deep Neural Networks on tabular data? How does gradient boosting construct trees sequentially?',
        expectedKeyPoints: [
          'Tabular data features have heterogeneous types, unnormalized scales, and complex non-linear boundary thresholds that decision trees handle natively',
          'Gradient boosting fits new decision trees sequentially to the pseudo-residuals (gradients of the loss function) of prior trees',
          'Regularization in XGBoost: Tree depth limits, shrinkage (learning rate), subsampling, and leaf weight penalties',
          'Neural networks suffer on tabular data due to rotational invariance and lack of inductive bias for tabular features'
        ],
        idealAnswer: 'Tabular datasets feature un-correlated columns, varied data distributions, and sharp decision boundaries that tree partitions model natively without feature scaling. Gradient boosting constructs an ensemble sequentially: each new tree is fit to the negative gradients (residuals) of the loss function calculated from previous trees. Neural networks lack this tabular inductive bias and require extensive tuning.',
        aiTip: 'Explain fitting trees to loss function negative residuals and why decision trees excel on tabular data.'
      },
      {
        id: 5,
        category: 'MLOps — Model Drift & Production Retraining',
        question: 'Explain Data Drift (Covariate Shift) versus Concept Drift. How do you detect drift in production machine learning pipelines and design an automated retraining workflow?',
        expectedKeyPoints: [
          'Data Drift: Input feature distribution $P(X)$ changes while the relationship $P(Y|X)$ remains constant (e.g. user demographic changes)',
          'Concept Drift: The underlying relationship $P(Y|X)$ changes (e.g. consumer purchasing behavior changes during inflation/crisis)',
          'Statistical tests: Kolmogorov-Smirnov (KS) test, Population Stability Index (PSI), Wasserstein Distance',
          'Automated triggers: Retraining schedules, performance threshold alerts, and shadow model deployment'
        ],
        idealAnswer: 'Data Drift occurs when input feature distributions shift ($P(X)$ changes), while Concept Drift occurs when the true relationship between features and target labels shifts ($P(Y|X)$ changes). We detect feature drift using the Population Stability Index (PSI) and Kolmogorov-Smirnov tests. When drift thresholds trip, automated Airflow/Kubeflow pipelines retrain models on recent data and canary-deploy behind shadow endpoints.',
        aiTip: 'Contrast mathematical definitions of $P(X)$ shift vs $P(Y|X)$ shift and mention PSI testing.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. CLOUD & DEVOPS
  // --------------------------------------------------------------------------
  {
    id: 'devops-cloud-aws-k8s',
    name: 'DevOps & Cloud Engineer (AWS / Docker / Kubernetes)',
    category: 'Cloud & DevOps',
    roleTitle: 'Senior Cloud DevOps Engineer',
    icon: '☁️',
    badge: 'Infrastructure • AWS, Docker & K8s',
    color: '#f59e0b',
    recruiterName: 'Liam O’Connor',
    recruiterTitle: 'Head of Cloud Infrastructure & Site Reliability',
    recruiterAvatar: '👨‍💼',
    difficulty: 'Advanced',
    duration: '25 mins',
    description: 'Cloud & container automation: Docker multi-stage builds, Kubernetes pod scheduling & Ingress, Terraform Infrastructure-as-Code, CI/CD pipelines, and zero-downtime deployments.',
    questions: [
      {
        id: 1,
        category: 'Docker Containerization & Image Optimization',
        question: 'How do you optimize Docker container images for security and minimal image size? Explain the mechanics of Multi-Stage Builds, non-root users, and `.dockerignore` files.',
        expectedKeyPoints: [
          'Multi-stage builds compile artifacts in a build stage and copy only compiled binaries/assets into a minimal runtime base (e.g. Alpine or Distroless)',
          'Drastically reduces image size from gigabytes down to tens of megabytes, speeding up deployment pull times',
          'Running containers as non-root users (`USER 10001`) to prevent container breakout privilege escalation',
          'Layer caching optimization: Ordering `COPY package.json` and dependency installs before copying changing source code'
        ],
        idealAnswer: 'We use Docker multi-stage builds to compile code in a builder image and copy only the final executable into a scratch or distroless base image, reducing image sizes by 90% and eliminating compilers from production. We order Dockerfile instructions so dependencies are cached, use `.dockerignore` to exclude local artifacts, and enforce non-root user execution (`USER appuser`) for container security.',
        aiTip: 'Explain distroless base images, layer caching order, and non-root security boundaries.'
      },
      {
        id: 2,
        category: 'Kubernetes Pod Architecture & Scaling',
        question: 'How does Kubernetes manage pod lifecycle and self-healing? Explain the purpose of Liveness, Readiness, and Startup probes, and how the Horizontal Pod Autoscaler (HPA) scales workloads.',
        expectedKeyPoints: [
          'Startup Probe: Confirms the container initialized (disables liveness/readiness until passed for slow-starting apps)',
          'Readiness Probe: Checks if container is ready to accept user traffic; failing removes pod from Service endpoints without killing it',
          'Liveness Probe: Checks if container is healthy/running; failing restarts the container via kubelet',
          'Horizontal Pod Autoscaler (HPA): Scales replica count dynamically based on CPU, memory, or custom Prometheus metrics'
        ],
        idealAnswer: 'Kubernetes uses probes to manage traffic and health. Startup probes protect slow-booting apps from premature restarts. Readiness probes verify if the application can serve requests, removing failing pods from Service endpoints so users never see errors. Liveness probes detect deadlocks and restart containers. HPA monitors metrics via the Metrics Server to dynamically scale pod replicas.',
        aiTip: 'Clearly distinguish Liveness (container restart) from Readiness (traffic routing removal).'
      },
      {
        id: 3,
        category: 'Infrastructure as Code (Terraform)',
        question: 'In Terraform, what is the role of the State File (`terraform.tfstate`), and how do you implement state locking and remote backend storage in a team environment? What causes state drift?',
        expectedKeyPoints: [
          'State file maps declarative Terraform code to real-world cloud resources and tracks metadata',
          'Remote Backend (e.g. AWS S3 bucket with server-side encryption and versioning)',
          'State Locking using AWS DynamoDB to prevent concurrent executions from corrupting state',
          'State Drift: Discrepancy occurring when resources are modified out-of-band via cloud consoles or external APIs'
        ],
        idealAnswer: 'The Terraform state file maps declared code to physical cloud resource IDs and tracks dependencies. In teams, we store state in a secure remote S3 backend with versioning and apply DynamoDB state locking to prevent concurrent pipelines from overwriting state. State drift occurs when infrastructure is modified out-of-band; running `terraform plan` detects discrepancies and aligns real state with code.',
        aiTip: 'Detail remote S3 state backends, DynamoDB distributed locking, and `terraform plan` drift reconciliation.'
      },
      {
        id: 4,
        category: 'CI/CD Pipelines & Zero-Downtime Deployments',
        question: 'Compare Blue-Green Deployments, Canary Releases, and Rolling Updates. How do you automate automated rollbacks in a GitHub Actions or GitLab CI pipeline if error rates spike post-deployment?',
        expectedKeyPoints: [
          'Rolling Update: Progressively replaces old pods with new pods (requires backwards-compatible APIs and databases)',
          'Blue-Green: Deploys identical new environment (Green) alongside live (Blue), switching router/load balancer instantly upon testing',
          'Canary: Routes a small percentage of real traffic (e.g. 5%) to the new version, scaling up as health metrics validate',
          'Automated Rollback: Continuous verification via Prometheus/Datadog monitoring HTTP 5xx error rates and latency thresholds'
        ],
        idealAnswer: 'Rolling updates replace pods incrementally; Blue-Green maintains two parallel environments and switches traffic instantaneously at the router level. Canary routing routes 5% of traffic to the new version using Argo Rollouts or Istio. If Prometheus metrics detect error rates >1% or P99 latency spikes during the canary phase, the pipeline aborts and automatically rolls back traffic instantly.',
        aiTip: 'Contrast Blue-Green vs Canary traffic shifting and automated metric-driven rollbacks.'
      },
      {
        id: 5,
        category: 'Cloud Security & Secrets Management',
        question: 'How do you securely manage sensitive credentials, API keys, and database passwords in Kubernetes and AWS without committing them into Git repositories?',
        expectedKeyPoints: [
          'Using dedicated Secrets Managers (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault)',
          'External Secrets Operator (ESO) in Kubernetes to sync secrets directly from cloud vaults into K8s secrets',
          'AWS IAM Roles for Service Accounts (IRSA) / OIDC for temporary short-lived credential access instead of static keys',
          'Automated secret scanning in CI/CD using tools like Gitleaks or TruffleHog'
        ],
        idealAnswer: 'We ban static credentials in Git. Secrets are stored in AWS Secrets Manager or HashiCorp Vault with automated rotation. In Kubernetes, the External Secrets Operator (ESO) synchronizes vault secrets securely into in-memory K8s Secret objects. For AWS API access, pods assume IAM Roles for Service Accounts (IRSA) using OIDC tokens, completely eliminating long-lived access keys.',
        aiTip: 'Detail AWS IAM Roles for Service Accounts (IRSA) and External Secrets Operator (ESO).'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. MOBILE & QA TESTING
  // --------------------------------------------------------------------------
  {
    id: 'mobile-app-flutter-reactnative',
    name: 'Mobile App Developer (Flutter & React Native)',
    category: 'Mobile & QA',
    roleTitle: 'Lead Mobile Application Developer',
    icon: '📱',
    badge: 'Cross-Platform • Flutter & React Native',
    color: '#14b8a6',
    recruiterName: 'Jordan Rivera',
    recruiterTitle: 'Head of Mobile Engineering & Cross-Platform UI',
    recruiterAvatar: '👨‍💻',
    difficulty: 'Intermediate / Advanced',
    duration: '20-25 mins',
    description: 'Cross-platform mobile architecture: Flutter widget tree & Impeller rendering, React Native Fabric & JSI architecture, offline-first local databases, and frame rate optimization.',
    questions: [
      {
        id: 1,
        category: 'Mobile Architecture & Rendering Engines',
        question: 'How does Flutter’s rendering engine (Impeller / Skia) render widgets directly onto canvas, and how does it compare to React Native’s New Architecture (JSI, Fabric, TurboModules)?',
        expectedKeyPoints: [
          'Flutter compiles Dart to native ARM code and draws every pixel directly via Impeller/Skia without native UI platform widgets',
          'React Native New Architecture replaces the asynchronous JSON bridge with JavaScript Interface (JSI) for direct C++ memory invocation',
          'Fabric is React Native’s concurrent rendering engine; TurboModules load native modules lazily',
          'Impeller solves early-stage shader compilation jank on iOS and Android'
        ],
        idealAnswer: 'Flutter compiles Dart directly to native machine code and draws UI onto a Skia/Impeller canvas, bypassing native OS view hierarchies for consistent cross-platform 120fps performance. React Native’s new architecture eliminates the legacy asynchronous JSON bridge, using JSI for direct C++ method calls between JavaScript and native code, with Fabric managing concurrent UI rendering.',
        aiTip: 'Compare direct canvas drawing (Flutter Impeller) with JSI C++ memory bridges (React Native).'
      },
      {
        id: 2,
        category: 'State Management & Reactive Architecture',
        question: 'Compare Bloc / Riverpod (in Flutter) and Redux Toolkit / Zustand (in React Native) for managing global mobile state. How do you handle deep linking and navigation state?',
        expectedKeyPoints: [
          'Flutter Bloc uses event-driven Stream architecture separating business logic from UI; Riverpod offers compile-safe dependency injection',
          'Zustand/Redux provide lightweight centralized stores in React Native',
          'Deep linking: Parsing incoming URIs (Universal Links / App Links) and routing through declarative routers (`go_router` or `React Navigation`)',
          'State persistence: Hydrating critical user state from AsyncStorage / Hive on app launch'
        ],
        idealAnswer: 'In Flutter, Bloc enforces strict event-to-state stream transformations, while Riverpod provides compile-time safe dependency injection. In React Native, Zustand offers atomic store subscriptions. For deep linking, we configure Universal Links (iOS) and App Links (Android), routing incoming URLs through declarative routers (`go_router` or React Navigation) to reconstruct the navigation stack.',
        aiTip: 'Explain stream-based Bloc transformations and mobile deep linking URL mapping.'
      },
      {
        id: 3,
        category: 'Offline-First Architecture & Data Sync',
        question: 'How do you design an offline-first mobile application where users can create and edit data without internet connectivity, synchronizing seamlessly with backend servers when online?',
        expectedKeyPoints: [
          'Local embedded database (SQLite / Drift, Hive, Realm, WatermelonDB) as single source of truth for the UI',
          'Local mutations write immediately to disk with a "pending_sync" state flag',
          'Background sync queue monitoring connectivity changes (`connectivity_plus` / `@react-native-community/netinfo`)',
          'Conflict resolution strategies: Last-Write-Wins with timestamps or server-side CRDTs'
        ],
        idealAnswer: 'In an offline-first model, the local database (SQLite/Drift or WatermelonDB) is the single source of truth. UI updates write to local storage instantly with an `is_synced=false` flag. A background sync worker listens to network status changes and flushes pending mutations to the server in chronological batches. Conflicts are resolved using monotonic version timestamps or server-side reconciliation.',
        aiTip: 'Emphasize local DB as single source of truth, pending sync queues, and conflict resolution.'
      },
      {
        id: 4,
        category: 'Mobile Performance & Memory Optimization',
        question: 'What causes 60/120 FPS frame drops (jank) and memory leaks in mobile applications? How do you profile and optimize large list views with images?',
        expectedKeyPoints: [
          'Heavy synchronous computations on the main UI thread delaying frame rendering past the 16.6ms / 8.3ms deadline',
          'Virtualizing lists using `ListView.builder` (Flutter) or `FlashList` / `FlatList` (React Native) to recycle views',
          'Image caching and downsampling (`cached_network_image` / `react-native-fast-image`) to prevent GPU VRAM exhaustion',
          'Disposing controllers, streams, and event listeners in `dispose()` / `useEffect` cleanup'
        ],
        idealAnswer: 'Frame drops occur when main-thread computations exceed 16ms, missing the frame budget. We optimize lists using view virtualization (`ListView.builder` or `FlashList`) so only visible items are mounted. Images are downsampled to exact display dimensions and cached in memory. We profile memory using Flutter DevTools / Flipper and explicitly clean up animation controllers and subscriptions in `dispose()`.',
        aiTip: 'Detail list virtualization, image dimension downsampling, and controller disposal.'
      },
      {
        id: 5,
        category: 'App Store Releases & CI/CD Pipelines (Fastlane)',
        question: 'How do you automate mobile app building, code signing, and deployment to the Apple App Store and Google Play Store using Fastlane and GitHub Actions?',
        expectedKeyPoints: [
          'Fastlane `match` for Git-based encrypted iOS certificates and provisioning profiles',
          'Automated Android Keystore signing and Gradle bundle generation (`.aab`)',
          'Fastlane lanes (`fastlane beta`, `fastlane release`) for automated TestFlight and Play Store Internal Tracks',
          'Over-The-Air (OTA) updates using Expo EAS Update or CodePush for non-native bug fixes'
        ],
        idealAnswer: 'We use Fastlane to automate the entire mobile release pipeline. Fastlane `match` manages encrypted iOS certificates across team members in a private repo. In GitHub Actions, Fastlane lanes compile release binaries (AAB for Android, IPA for iOS), execute tests, handle code signing via secrets, and deploy builds automatically to TestFlight and Google Play Console Internal Track.',
        aiTip: 'Explain Fastlane `match` for iOS code signing and automated TestFlight / Play Store deployment.'
      }
    ]
  },
  {
    id: 'qa-automation-testing',
    name: 'QA & Automation Test Engineer',
    category: 'Mobile & QA',
    roleTitle: 'Senior QA Automation Architect',
    icon: '🧪',
    badge: 'Quality • Cypress, Playwright & APIs',
    color: '#84cc16',
    recruiterName: 'Jessica Taylor',
    recruiterTitle: 'Director of Quality Engineering & Test Automation',
    recruiterAvatar: '👩‍💼',
    difficulty: 'Intermediate / Advanced',
    duration: '20 mins',
    description: 'Modern test automation: Test Pyramid, Page Object Model (POM), Playwright vs Cypress, API testing with Postman/REST-Assured, flaky test elimination, and CI/CD pipelines.',
    questions: [
      {
        id: 1,
        category: 'Test Automation Pyramid & Strategy',
        question: 'Explain the Test Automation Pyramid (Unit, Integration, E2E). Why do enterprise engineering teams avoid the "Ice Cream Cone" anti-pattern of heavy E2E tests?',
        expectedKeyPoints: [
          'Base: Unit tests (fast, cheap, run thousands in seconds, isolated logic)',
          'Middle: Integration/API tests (verify database interactions and service contracts)',
          'Top: E2E UI tests (slow, expensive, brittle, high maintenance, test critical happy paths)',
          'The Ice Cream Cone anti-pattern results in slow CI/CD builds, frequent flaky test failures, and high maintenance costs'
        ],
        idealAnswer: 'The Test Pyramid advocates for a broad foundation of fast, deterministic Unit tests, a solid middle layer of Integration/API tests, and a lean top layer of E2E UI tests testing only critical customer journeys. Inverting this into an Ice Cream Cone creates slow, flaky CI/CD pipelines that break on minor UI tweaks, slowing engineering velocity and wasting developer time on debugging test flakiness.',
        aiTip: 'Explain unit vs integration vs E2E cost/speed trade-offs and the Ice Cream Cone anti-pattern.'
      },
      {
        id: 2,
        category: 'Playwright vs Cypress & Modern E2E Testing',
        question: 'How does Playwright execute tests via the Chrome DevTools Protocol (CDP) across multiple browser contexts compared to Cypress? How does auto-waiting prevent flaky tests?',
        expectedKeyPoints: [
          'Playwright communicates directly with browser binaries via CDP / WebSocket connections without in-browser script injection',
          'Supports true multi-tab, multi-window, and multi-origin workflows with isolated BrowserContexts in milliseconds',
          'Built-in Actionability Checks (Auto-waiting): Waits automatically for elements to be attached, visible, stable, enabled, and editable before clicking',
          'Eliminates hardcoded `sleep(5000)` statements that cause test flakiness'
        ],
        idealAnswer: 'Playwright interacts directly with browser engines via the Chrome DevTools Protocol over WebSockets, enabling multi-tab, multi-origin, and mobile emulation in isolated lightweight browser contexts. Playwright eliminates flakiness with built-in actionability auto-waiting: it automatically verifies that elements are attached, visible, non-animating, and enabled before executing actions, removing arbitrary sleeps.',
        aiTip: 'Detail CDP protocol communication and Playwright actionability checks over hardcoded sleeps.'
      },
      {
        id: 3,
        category: 'Page Object Model (POM) Design Pattern',
        question: 'How do you design a maintainable test automation suite using the Page Object Model (POM) pattern in TypeScript? What are the benefits for test refactoring?',
        expectedKeyPoints: [
          'Separates page UI locators and user interaction methods from the test assertion scripts',
          'Encapsulates DOM selector changes into single page class definitions',
          'Promotes reusability and clean readable test scenarios (e.g. `await loginPage.login(user, pass)`)',
          'Component Object Model variant for reusable UI widgets (navbars, modals, tables)'
        ],
        idealAnswer: 'The Page Object Model abstracts web page selectors and interaction logic into dedicated class files. Test scripts interact only with high-level methods like `await checkoutPage.enterShippingDetails()`. When a button locator or DOM structure changes, we update it in a single Page Object file rather than fixing dozens of individual test files, ensuring long-term suite maintainability.',
        aiTip: 'Explain selector encapsulation and maintainability when UI elements change.'
      },
      {
        id: 4,
        category: 'API Test Automation & Mocking',
        question: 'How do you automate API integration testing and contract testing? How do tools like Mock Service Worker (MSW) or WireMock simulate third-party API errors during automated test runs?',
        expectedKeyPoints: [
          'API testing validates status codes, response times, headers, JSON schema compliance, and payload integrity',
          'Mocking third-party APIs (payment gateways, OAuth providers) using MSW (network-level interception) or WireMock',
          'Contract Testing using Pact to verify consumer-provider contract adherence without spinning up all microservices',
          'Validating negative scenarios (HTTP 400, 401, 429, 500, timeouts) reliably'
        ],
        idealAnswer: 'API test automation validates response status codes, payload contracts, and performance against OpenAPI schemas. For external services like Stripe, we use tools like MSW to intercept network requests at the Service Worker layer and return deterministic responses or simulate network timeouts. We use Pact for Consumer-Driven Contract testing to verify API compatibility across teams.',
        aiTip: 'Mention JSON schema validation, MSW network interception, and Pact contract testing.'
      },
      {
        id: 5,
        category: 'Flaky Tests & CI/CD Pipeline Integration',
        question: 'What is your strategy for identifying, isolating, and fixing flaky tests in a high-velocity CI/CD pipeline running hundreds of PR builds daily?',
        expectedKeyPoints: [
          'Flakiness causes: Race conditions, timing issues, un-cleared test database state, network fluctuations',
          'Isolating flaky tests: Quarantining unstable tests into separate non-blocking test suites until resolved',
          'Ensuring test isolation: Running each test with fresh database state or unique tenant IDs',
          'Using test artifacts: Traces, video recordings, and screenshots captured automatically on failure in Playwright/Cypress'
        ],
        idealAnswer: 'Flaky tests erode team confidence. We identify flakiness by tracking retry rates in CI dashboards. Detected flaky tests are immediately quarantined into a non-blocking suite so they don’t block deployments. We resolve them by ensuring strict test isolation (fresh database seeds per test), eliminating timing race conditions with auto-waiting, and analyzing Playwright trace viewer recordings of failed runs.',
        aiTip: 'Explain quarantining flaky tests, ensuring clean test state isolation, and using trace viewers.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 7. SECURITY & HR BEHAVIORAL
  // --------------------------------------------------------------------------
  {
    id: 'cybersecurity-appsec',
    name: 'Cybersecurity & Application Security Engineer',
    category: 'Architecture & Security',
    roleTitle: 'Chief Information Security Officer & AppSec Lead',
    icon: '🛡️',
    badge: 'Security • OWASP Top 10 & Zero Trust',
    color: '#e11d48',
    recruiterName: 'Nathan Vance',
    recruiterTitle: 'Lead Security Architect & Threat Intelligence Specialist',
    recruiterAvatar: '👨‍💼',
    difficulty: 'Advanced / Expert',
    duration: '25 mins',
    description: 'Defend modern web applications: OWASP Top 10 mitigations (SQLi, XSS, CSRF, SSRF), OAuth 2.0 / OIDC security flows, Zero Trust architecture, and vulnerability remediation.',
    questions: [
      {
        id: 1,
        category: 'OWASP Top 10 — Server-Side Request Forgery (SSRF)',
        question: 'What is Server-Side Request Forgery (SSRF), and how does an attacker exploit SSRF to steal cloud IAM credentials from the AWS Instance Metadata Service (IMDS)? How does IMDSv2 mitigate this?',
        expectedKeyPoints: [
          'SSRF occurs when a server accepts a user-supplied URL and fetches it without proper validation',
          'Attackers target internal cloud metadata endpoints like `http://169.254.169.254/latest/meta-data/iam/security-credentials/` to exfiltrate temporary IAM keys',
          'IMDSv1 uses simple GET requests; IMDSv2 requires a session-oriented `PUT` request with a token header (`X-aws-ec2-metadata-token`) and TTL',
          'Defenses: URL allow-listing, blocking private RFC 1918 IP ranges, disabling unused metadata endpoints'
        ],
        idealAnswer: 'SSRF occurs when an application fetches remote resources from user-supplied URLs without restricting internal access. In AWS, attackers query `169.254.169.254` to steal instance IAM credentials. IMDSv1 is vulnerable because simple GET requests succeed. IMDSv2 eliminates this by requiring a token-backed session via a `PUT` request with an `X-aws-ec2-metadata-token` header, which SSRF injection vectors cannot forge.',
        aiTip: 'Contrast IMDSv1 GET vulnerability with IMDSv2 PUT session token requirements.'
      },
      {
        id: 2,
        category: 'OAuth 2.0, OpenID Connect & PKCE',
        question: 'Why is the Authorization Code Flow with PKCE (Proof Key for Code Exchange) mandatory for Single Page Apps and Mobile Apps instead of the deprecated Implicit Flow?',
        expectedKeyPoints: [
          'Implicit Flow returned access tokens directly in URL hash fragments, exposing them to browser history and XSS',
          'Public clients (SPAs, mobile) cannot securely store a static `client_secret`',
          'PKCE generates a cryptographically random `code_verifier` and its hashed `code_challenge`',
          'Prevents Authorization Code interception attacks by verifying the hash before issuing tokens'
        ],
        idealAnswer: 'The Implicit Flow returned tokens directly in URL fragments where they were exposed in browser history and referrer headers. SPAs and mobile apps are public clients that cannot hide a `client_secret`. PKCE solves this by generating a one-time random `code_verifier` and sending its SHA256 `code_challenge` during authorization. The token endpoint verifies the original string before issuing tokens.',
        aiTip: 'Explain why public clients cannot store secrets and how PKCE code_verifier/code_challenge works.'
      },
      {
        id: 3,
        category: 'SQL Injection & Cross-Site Scripting (XSS)',
        question: 'How do Parameterized Queries (Prepared Statements) prevent SQL Injection at the database driver level? Differentiate between Stored, Reflected, and DOM-based XSS.',
        expectedKeyPoints: [
          'Prepared statements compile SQL structure and query logic first, treating user input strictly as literal data rather than executable SQL code',
          'Stored XSS: Malicious payload is stored in the database and executed whenever victims view the affected page',
          'Reflected XSS: Payload in request parameters (e.g. search query) is immediately reflected in the server response HTML',
          'DOM-based XSS: Vulnerability occurs entirely in client-side JavaScript executing unsafe sinks like `innerHTML` or `eval()`'
        ],
        idealAnswer: 'Prepared statements pre-compile the SQL execution plan before binding parameters; user input is treated strictly as literal data, making SQL injection impossible regardless of input content. Stored XSS permanently saves scripts in databases; Reflected XSS reflects scripts from request queries; DOM-based XSS occurs when client-side JavaScript injects untrusted data into sinks like `innerHTML`.',
        aiTip: 'Detail SQL pre-compilation vs data binding and distinguish the 3 XSS categories.'
      },
      {
        id: 4,
        category: 'Zero Trust Security Architecture',
        question: 'What is the core philosophy of Zero Trust Architecture ("Never Trust, Always Verify")? How do Micro-segmentation, Mutual TLS (mTLS), and Identity-Aware Proxies implement this in cloud networks?',
        expectedKeyPoints: [
          'Traditional perimeter security (castle-and-moat) assumes everything inside the private network is trusted',
          'Zero Trust assumes the internal network is already compromised; every single request must be authenticated, authorized, and encrypted',
          'Mutual TLS (mTLS) enforces bi-directional cryptographic verification and encryption between all microservices',
          'Micro-segmentation restricts lateral movement between services using network security policies'
        ],
        idealAnswer: 'Zero Trust replaces perimeter "castle-and-moat" security with the rule "Never Trust, Always Verify." Every request—even internal service-to-service calls—is authenticated and authorized. We enforce Mutual TLS (mTLS) via service meshes (Istio/Linkerd) for bi-directional encryption and identity verification, while micro-segmentation policies prevent lateral movement if one service is compromised.',
        aiTip: 'Contrast castle-and-moat perimeter models with mTLS and lateral movement micro-segmentation.'
      },
      {
        id: 5,
        category: 'Secrets Management & Secure Software Supply Chain',
        question: 'How do you secure the software supply chain against malicious open-source packages (dependency confusion, typosquatting) and implement automated vulnerability scanning in CI/CD?',
        expectedKeyPoints: [
          'Automated Software Bill of Materials (SBOM) generation (CycloneDX, SPDX)',
          'Lockfile integrity verification and private package registry scoping (npm `@company` scope)',
          'Static Application Security Testing (SAST) and Dependency Scanning (Snyk, Trivy, GitHub Dependabot)',
          'Enforcing signed commits and cryptographic container image signing using Cosign / Sigstore'
        ],
        idealAnswer: 'We secure the supply chain by scoping private packages to private registries to prevent dependency confusion attacks. In CI/CD, we generate Software Bill of Materials (SBOM) and run automated SAST and dependency vulnerability scans with Trivy/Snyk. Production container images are cryptographically signed with Cosign/Sigstore and verified by Kubernetes admission controllers before execution.',
        aiTip: 'Mention SBOM generation, private package registry scoping, and Cosign container image signing.'
      }
    ]
  },
  {
    id: 'hr-behavioral-leadership',
    name: 'HR Behavioral & Tech Leadership Round',
    category: 'Architecture & Security',
    roleTitle: 'Executive HR & Engineering Leadership Panel',
    icon: '💼',
    badge: 'Soft Skills • STAR Method & Culture',
    color: '#d97706',
    recruiterName: 'Eleanor Vance',
    recruiterTitle: 'Head of Global Talent & Executive Leadership Panel',
    recruiterAvatar: '👩‍💼',
    difficulty: 'All Levels (STAR Method)',
    duration: '20 mins',
    description: 'Master behavioral leadership: STAR framework (Situation, Task, Action, Result), resolving team conflicts, managing tight project deadlines, and communicating technical trade-offs.',
    questions: [
      {
        id: 1,
        category: 'STAR Method — Resolving Technical Disagreements',
        question: 'Tell me about a time when you strongly disagreed with a senior engineer or architect on a technical decision (e.g. database choice or architecture). How did you present your perspective, navigate the conflict, and what was the outcome?',
        expectedKeyPoints: [
          'Situation: Clear context of the project and the technical dispute',
          'Task: Your objective to find the best architectural path forward without creating team friction',
          'Action: Data-driven proof-of-concept (POC), benchmarking trade-offs, collaborative 1-on-1 discussions, and objective decision matrix',
          'Result: The final decision reached, metrics of success, and how you maintained team cohesion'
        ],
        idealAnswer: 'In my previous project, a senior engineer favored a NoSQL database while our access patterns required complex relational transactions. I proposed building a 2-day proof-of-concept (POC) benchmarking query latencies and data integrity under load. The benchmark data clearly demonstrated that PostgreSQL reduced query complexity by 40%. The team aligned on the data-backed findings and delivered the feature on schedule.',
        aiTip: 'Structure response strictly using STAR: Situation, Task, Action (POC/benchmarks), and measurable Result.'
      },
      {
        id: 2,
        category: 'Managing Tight Deadlines & Scope Creep',
        question: 'Describe a situation where a critical product launch deadline was at risk due to unexpected technical roadblocks or scope creep. How did you prioritize deliverables, communicate with stakeholders, and deliver results?',
        expectedKeyPoints: [
          'Proactive stakeholder communication early rather than waiting until the deadline passes',
          'De-scoping non-critical features using MoSCoW prioritization (Must-have vs Nice-to-have)',
          'Re-allocating engineering capacity and avoiding burnout',
          'Delivering a rock-solid core MVP on time followed by phase-two fast-follows'
        ],
        idealAnswer: 'Two weeks before launch, third-party API delays threatened our release. I immediately convened product managers and presented a MoSCoW prioritization matrix. We agreed to launch the core Must-Have checkout features on schedule while moving secondary analytics to a phase-two release a week later. We shipped the launch on time with zero downtime and processed over $200k on day one.',
        aiTip: 'Highlight transparent proactive communication and structured MoSCoW MVP prioritization.'
      },
      {
        id: 3,
        category: 'Handling Constructive Feedback & Mistakes',
        question: 'Tell me about a time when you made a significant mistake in production or received tough constructive criticism during a performance review. How did you react and what changes did you implement?',
        expectedKeyPoints: [
          'Accountability: Taking direct ownership of the error without deflecting blame onto others or tools',
          'Action: Conducting a blameless post-mortem, fixing the immediate issue, and adding automated safety checks',
          'Growth Mindset: Actively incorporating feedback and using the experience to mentor peers'
        ],
        idealAnswer: 'Early in my career, I deployed a database migration that locked a hot table for 8 minutes during peak hours. I took immediate ownership, engaged the incident response team, and rolled back the change. Afterward, I authored a blameless post-mortem and implemented automated migration dry-run checks and zero-downtime guidelines in our CI/CD pipeline, preventing similar locks permanently.',
        aiTip: 'Show immediate personal accountability, blameless post-mortem analysis, and permanent prevention systems.'
      },
      {
        id: 4,
        category: 'Mentorship & Elevating Team Velocity',
        question: 'How do you mentor junior and mid-level engineers to improve team quality? Give an example of how you guided an engineer through a difficult technical challenge or code review.',
        expectedKeyPoints: [
          'Empathetic code reviews focused on "why" rather than dictatorial "what"',
          'Pair programming and architectural whiteboard sessions',
          'Encouraging autonomy by asking guiding questions rather than writing the code for them',
          'Measurable impact on the engineer’s confidence and independent output'
        ],
        idealAnswer: 'When a junior engineer struggled with complex state management and race conditions, I avoided simply rewriting their code. Instead, we scheduled a pair-programming session where I guided them through drawing state diagrams and tracing event loops. I explained the principles of unidirectional data flow. Within a month, they independently led our next core feature with exemplary code quality.',
        aiTip: 'Focus on guiding questions, pairing sessions, and fostering independent problem-solving capabilities.'
      },
      {
        id: 5,
        category: 'Why This Company & Career Vision',
        question: 'Why are you passionate about this specific software engineering role, and where do you see your technical and leadership impact growing over the next 2 to 3 years?',
        expectedKeyPoints: [
          'Alignment with company mission, engineering culture, and technical scale',
          'Desire to deepen technical domain mastery and lead architectural initiatives',
          'Commitment to continuous learning, cross-functional collaboration, and elevating engineering standards'
        ],
        idealAnswer: 'I am drawn to this role because your team solves high-concurrency distributed challenges that directly impact millions of users every day. Over the next 2-3 years, I aim to master your core platform systems, drive key architectural modernization initiatives, and mentor emerging engineers to foster a high-trust, high-velocity engineering culture.',
        aiTip: 'Connect personal technical passions directly to the company scale and engineering growth.'
      }
    ]
  }
];

export const AIMockInterview = () => {
  const { goHome } = useSector();
  const { addInterviewResult } = useAuth();

  // Navigation Stages: 'DOMAIN_SELECTION' | 'BRIEFING_AND_CHECK' | 'LIVE_ROOM' | 'EVALUATION_REPORT' | 'DISQUALIFIED'
  const [stage, setStage] = useState('DOMAIN_SELECTION');
  const [selectedDomainId, setSelectedDomainId] = useState('react-fullstack');
  const [selectedCategory, setSelectedCategory] = useState('All Tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);

  // Selected Domain object
  const currentDomain = TECH_STACK_DOMAINS.find(d => d.id === selectedDomainId) || TECH_STACK_DOMAINS[0];

  // Device & Stream States
  const [cameraStream, setCameraStream] = useState(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [micVolumeLevel, setMicVolumeLevel] = useState(0);

  // Anti-Cheating & Intelligent Gaze States
  const [gazeDirection, setGazeDirection] = useState('Center (Focused)');
  const [personCountStatus, setPersonCountStatus] = useState('1 Person (Candidate) 👤');
  const [integrityScore, setIntegrityScore] = useState(100);
  const [strikeCount, setStrikeCount] = useState(0);
  const [multiplePersonWarningCount, setMultiplePersonWarningCount] = useState(0);
  const [violationsList, setViolationsList] = useState([]);
  const [activeWarning, setActiveWarning] = useState(null);
  const [disqualificationReason, setDisqualificationReason] = useState('');

  // Debouncing refs
  const prolongedDownGazeRef = useRef(0);
  const prolongedAbsentFaceRef = useRef(0);
  const multiplePersonConsecutiveRef = useRef(0);
  const strikeCountRef = useRef(0);
  const multiplePersonWarningRef = useRef(0);

  // Live Interview Mechanics
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateResponses, setCandidateResponses] = useState({});
  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [isRecruiterSpeaking, setIsRecruiterSpeaking] = useState(false);
  const [interviewTimerSeconds, setInterviewTimerSeconds] = useState(0);
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAiGuidance, setShowAiGuidance] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFinishConfirmModal, setShowFinishConfirmModal] = useState(false);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);

  // Dynamic In-Interview AI Follow-Up Probing
  const [activeFollowUpData, setActiveFollowUpData] = useState(null);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);

  // Final Comprehensive Evaluation States
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [evaluationProgressStep, setEvaluationProgressStep] = useState('');
  const [finalEvaluationReport, setFinalEvaluationReport] = useState(null);
  const [expandedQuestionCard, setExpandedQuestionCard] = useState(0);

  // OpenRouter Config
  const openRouterConfig = getOpenRouterConfig();

  // DOM and Audio References
  const cameraStreamRef = useRef(null);
  const previewVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const proctoringIntervalRef = useRef(null);
  const questionTimerIntervalRef = useRef(null);
  const interviewContainerRef = useRef(null);

  const currentQuestion = currentDomain?.questions?.[currentQuestionIndex] || currentDomain?.questions?.[0] || {
    id: 1,
    category: 'General Technical',
    question: 'Please summarize your architecture background and high-scale systems experience.',
    expectedKeyPoints: [],
    idealAnswer: '',
    aiTip: ''
  };

  // Categories list
  const CATEGORIES = [
    'All Tracks',
    'Frontend & Full Stack',
    'Backend & APIs',
    'AI & Data Science',
    'Cloud & DevOps',
    'Mobile & QA',
    'Architecture & Security'
  ];

  // Filtered domains list
  const filteredDomains = TECH_STACK_DOMAINS.filter(dom => {
    const matchesCategory = selectedCategory === 'All Tracks' || dom.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      dom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dom.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dom.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dom.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --------------------------------------------------------------------------
  // Multi-Tier Camera & Microphone Stream Initialization
  // --------------------------------------------------------------------------
  const startMediaStreams = async () => {
    // If active stream already exists, reuse it
    if (cameraStreamRef.current && cameraStreamRef.current.active) {
      const vTracks = cameraStreamRef.current.getVideoTracks();
      const aTracks = cameraStreamRef.current.getAudioTracks();
      const hasLiveV = vTracks.length > 0 && vTracks[0].readyState === 'live';
      const hasLiveA = aTracks.length > 0 && aTracks[0].readyState === 'live';
      if (hasLiveV || hasLiveA) {
        setHasCameraAccess(hasLiveV);
        setHasMicAccess(hasLiveA);
        setCameraStream(cameraStreamRef.current);
        if (videoRef.current && videoRef.current.srcObject !== cameraStreamRef.current) {
          videoRef.current.srcObject = cameraStreamRef.current;
          videoRef.current.play().catch(() => {});
        }
        return cameraStreamRef.current;
      }
    }

    try {
      setCameraError(null);
      let stream = null;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera/Microphone API is not supported in this browser. Please use Chrome, Edge, or Firefox.');
      }

      // Tier 1: Try standard video + audio
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
      } catch (tier1Err) {
        console.warn('Tier 1 combined media failed, trying separate acquisition:', tier1Err);
        // Tier 2: Try video and audio independently
        let vStream = null;
        let aStream = null;
        try {
          vStream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (vErr) {
          console.warn('Video acquisition failed:', vErr);
        }
        try {
          aStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (aErr) {
          console.warn('Audio acquisition failed:', aErr);
        }

        if (vStream && aStream) {
          stream = new MediaStream([...vStream.getVideoTracks(), ...aStream.getAudioTracks()]);
        } else if (vStream) {
          stream = vStream;
          setCameraError('Microphone not detected or blocked. Camera is active.');
        } else if (aStream) {
          stream = aStream;
          setCameraError('Camera is disabled or in use by another app. Microphone is active.');
        } else {
          throw new Error('Neither camera nor microphone could be accessed. Please check browser permissions in your address bar.');
        }
      }

      if (!stream) {
        throw new Error('No media stream available.');
      }

      const vTracks = stream.getVideoTracks();
      const aTracks = stream.getAudioTracks();
      const hasLiveVideo = vTracks.length > 0 && vTracks[0].readyState === 'live';
      const hasLiveAudio = aTracks.length > 0 && aTracks[0].readyState === 'live';

      cameraStreamRef.current = stream;
      setCameraStream(stream);
      setHasCameraAccess(hasLiveVideo);
      setHasMicAccess(hasLiveAudio);
      setIsCameraMuted(!hasLiveVideo);
      setIsMicMuted(!hasLiveAudio);

      // Attach stream to DOM elements
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
        previewVideoRef.current.play().catch(() => {});
      }
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      if (hasLiveAudio) {
        initAudioVisualizer(stream);
      }
    } catch (err) {
      console.warn('Camera/Mic permission error:', err);
      setCameraError(err.message || 'Unable to access camera or microphone. Please allow permissions in your browser.');
      setHasCameraAccess(false);
      setHasMicAccess(false);
      setIsCameraMuted(true);
      setIsMicMuted(true);
    }
  };

  const stopMediaStreams = useCallback(() => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping media track:', e);
        }
      });
      cameraStreamRef.current = null;
    }
    setCameraStream(null);
    setHasCameraAccess(false);
    setHasMicAccess(false);
    setIsCameraMuted(false);
    setIsMicMuted(false);
    setMicVolumeLevel(0);

    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close().catch(() => {});
      } catch (e) {}
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (proctoringIntervalRef.current) {
      clearInterval(proctoringIntervalRef.current);
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      setIsSpeechRecognitionActive(false);
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsRecruiterSpeaking(false);
    }
  }, []);

  // Stage-based guard: only run camera & mic in LIVE_ROOM or BRIEFING_AND_CHECK; stop immediately when outside
  useEffect(() => {
    if (stage === 'BRIEFING_AND_CHECK' || stage === 'LIVE_ROOM') {
      if (!cameraStreamRef.current) {
        startMediaStreams();
      }
    } else {
      if (cameraStreamRef.current) {
        stopMediaStreams();
      }
    }
  }, [stage, stopMediaStreams]);

  // Ensure camera and microphone are stopped ONLY when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => {
          try { track.stop(); } catch (e) {}
        });
        cameraStreamRef.current = null;
      }
    };
  }, []);

  // Auto-bind media stream to video elements whenever available
  useEffect(() => {
    const stream = cameraStreamRef.current || cameraStream;
    if (stream) {
      const vTracks = stream.getVideoTracks();
      const aTracks = stream.getAudioTracks();
      const hasLiveVideo = vTracks.length > 0 && vTracks[0].readyState === 'live';
      const hasLiveAudio = aTracks.length > 0 && aTracks[0].readyState === 'live';
      setHasCameraAccess(hasLiveVideo);
      setHasMicAccess(hasLiveAudio);

      if (previewVideoRef.current && previewVideoRef.current.srcObject !== stream) {
        previewVideoRef.current.srcObject = stream;
        previewVideoRef.current.play().catch(() => {});
      }
      if (videoRef.current && videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [cameraStream, stage, isCameraMuted]);

  // Audio Level Visualizer
  const initAudioVisualizer = (stream) => {
    try {
      const aTracks = stream.getAudioTracks();
      if (!aTracks || aTracks.length === 0) return;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setMicVolumeLevel(normalized);
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (e) {
      console.error('Audio meter init error:', e);
    }
  };

  // --------------------------------------------------------------------------
  // Disqualification Handler (Automatic Termination)
  // --------------------------------------------------------------------------
  const triggerDisqualification = useCallback((primaryReason) => {
    stopMediaStreams();
    setStage('DISQUALIFIED');
    setDisqualificationReason(primaryReason || 'Exceeded the maximum allowable proctoring violations threshold.');

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Candidate Disqualified. Your interview session has been permanently terminated due to security and cheating violations.");
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [stopMediaStreams]);

  // --------------------------------------------------------------------------
  // General Strike Logger
  // --------------------------------------------------------------------------
  const registerProctoringViolation = useCallback((type, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const newViolation = { time: timestamp, type, message, timestampMs: Date.now() };

    setViolationsList(prev => [...prev, newViolation]);

    const newStrikes = strikeCountRef.current + 1;
    strikeCountRef.current = newStrikes;
    setStrikeCount(newStrikes);
    setIntegrityScore(prev => Math.max(0, prev - 30));

    setActiveWarning(`🚨 SECURITY STRIKE ${newStrikes} / 3: ${message}`);
    setTimeout(() => setActiveWarning(null), 3800);

    if (newStrikes >= 3) {
      triggerDisqualification(`Accumulated 3 severe integrity violations (${message}). Anti-cheating protocol enforced.`);
    }
  }, [triggerDisqualification]);

  // Multiple Persons Strike Logger
  const registerMultiplePersonViolation = useCallback((type, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const newViolation = { time: timestamp, type, message, timestampMs: Date.now() };

    setViolationsList(prev => [...prev, newViolation]);

    const newCount = multiplePersonWarningRef.current + 1;
    multiplePersonWarningRef.current = newCount;
    setMultiplePersonWarningCount(newCount);
    setIntegrityScore(prev => Math.max(0, prev - 35));

    if (newCount === 1) {
      setActiveWarning(`⚠️ PROCTORING ALERT: Extra Person Detected in camera frame! Please ensure you are alone.`);
      setTimeout(() => setActiveWarning(null), 4500);
    } else {
      triggerDisqualification(`Multiple persons detected in camera frame on consecutive checks. Only one candidate is allowed.`);
    }
  }, [triggerDisqualification]);

  // --------------------------------------------------------------------------
  // Camera Pixel Analysis & Computer Vision Proctoring
  // --------------------------------------------------------------------------
  const runVisualProctoringFrame = useCallback(() => {
    const video = stage === 'LIVE_ROOM' ? videoRef.current : previewVideoRef.current;
    if (!video || !canvasRef.current || !hasCameraAccess || isCameraMuted) return;

    if (video.readyState < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 160;
    canvas.height = 120;
    ctx.drawImage(video, 0, 0, 160, 120);

    try {
      const imgData = ctx.getImageData(0, 0, 160, 120);
      const pixels = imgData.data;

      let skinPixels = 0;
      let leftHalfSkin = 0;
      let rightHalfSkin = 0;
      let topHalfSkin = 0;
      let bottomHalfSkin = 0;

      for (let y = 0; y < 120; y++) {
        for (let x = 0; x < 160; x++) {
          const idx = (y * 160 + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          const isSkin = (r > 70 && g > 40 && b > 20 &&
                          r > g && r > b &&
                          Math.abs(r - g) > 12 &&
                          (r - g) < 140 &&
                          (r - b) > 10);

          if (isSkin) {
            skinPixels++;
            if (x < 80) leftHalfSkin++;
            else rightHalfSkin++;

            if (y < 60) topHalfSkin++;
            else bottomHalfSkin++;
          }
        }
      }

      const totalPixels = 160 * 120;
      const skinRatio = skinPixels / totalPixels;

      // 1. Person Count Classification
      if (skinRatio < 0.02) {
        setPersonCountStatus('No Candidate in Frame ❌');
        prolongedAbsentFaceRef.current += 1;
        multiplePersonConsecutiveRef.current = 0;

        if (stage === 'LIVE_ROOM' && prolongedAbsentFaceRef.current >= 8) {
          prolongedAbsentFaceRef.current = 0;
          registerProctoringViolation('Candidate Absent', 'Candidate is not visible in camera frame. Stay seated.');
        }
      } else if (skinRatio > 0.65) {
        setPersonCountStatus('⚠️ Multiple Persons Detected!');
        prolongedAbsentFaceRef.current = 0;
        multiplePersonConsecutiveRef.current += 1;

        if (stage === 'LIVE_ROOM' && multiplePersonConsecutiveRef.current >= 4) {
          multiplePersonConsecutiveRef.current = 0;
          registerMultiplePersonViolation('Multiple Persons', 'Multiple individuals or unauthorized helper detected.');
        }
      } else {
        setPersonCountStatus('1 Person (Candidate) 👤');
        prolongedAbsentFaceRef.current = 0;
        multiplePersonConsecutiveRef.current = 0;
      }

      // Check if candidate is actively typing or using speech dictation
      const isCandidateTyping = typeof document !== 'undefined' && document.activeElement && 
        (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT');

      // 2. Gaze Direction Analysis
      if (skinRatio >= 0.02) {
        const lrRatio = leftHalfSkin / (rightHalfSkin + 1);
        const tbRatio = topHalfSkin / (bottomHalfSkin + 1);

        if (isCandidateTyping || isSpeechRecognitionActive) {
          setGazeDirection(isSpeechRecognitionActive ? 'Speaking (Mic Active) 🎙️' : 'Typing / Formulating ⌨️');
          prolongedDownGazeRef.current = 0;
        } else if (tbRatio < 0.38 && skinRatio > 0.10) {
          setGazeDirection('Looking Down 📱');
          prolongedDownGazeRef.current += 1;

          if (stage === 'LIVE_ROOM' && prolongedDownGazeRef.current >= 8) {
            prolongedDownGazeRef.current = 0;
            registerProctoringViolation('Suspicious Downward Gaze', 'Prolonged downward gaze detected away from screen.');
          }
        } else if (lrRatio > 2.5) {
          setGazeDirection('Looking Left ⬅️');
          prolongedDownGazeRef.current = 0;
        } else if (lrRatio < 0.40) {
          setGazeDirection('Looking Right ➡️');
          prolongedDownGazeRef.current = 0;
        } else {
          setGazeDirection('Center (Focused) 🎯');
          prolongedDownGazeRef.current = 0;
        }
      }
    } catch (e) {
      console.error('Proctoring CV frame error:', e);
    }
  }, [stage, hasCameraAccess, isCameraMuted, registerProctoringViolation, registerMultiplePersonViolation]);

  // Start continuous proctoring in Calibration & Live Room
  useEffect(() => {
    if (stage === 'LIVE_ROOM' || stage === 'BRIEFING_AND_CHECK') {
      proctoringIntervalRef.current = setInterval(() => {
        runVisualProctoringFrame();
      }, 1200);
    } else {
      if (proctoringIntervalRef.current) {
        clearInterval(proctoringIntervalRef.current);
      }
    }

    return () => {
      if (proctoringIntervalRef.current) {
        clearInterval(proctoringIntervalRef.current);
      }
    };
  }, [stage, runVisualProctoringFrame]);

  // Tab Visibility & Focus Proctoring
  useEffect(() => {
    if (stage !== 'LIVE_ROOM') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        registerProctoringViolation('Tab Switch Detected', 'Candidate switched browser tabs during live interview session.');
      }
    };

    const handleWindowBlur = () => {
      registerProctoringViolation('Window Unfocused', 'Candidate clicked outside the interview window.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [stage, registerProctoringViolation]);

  // Prevent Copy / Paste Cheat Protection
  useEffect(() => {
    if (stage !== 'LIVE_ROOM') return;

    const handleCopyPaste = (e) => {
      e.preventDefault();
      registerProctoringViolation('Clipboard Paste Attempt', 'Direct copy-pasting is blocked in the proctored interview room. Please speak or type naturally.');
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'c' || e.key === 'a')) {
        e.preventDefault();
        registerProctoringViolation('Key Shortcut Blocked', `Keyboard shortcut (Ctrl+${e.key.toUpperCase()}) blocked for security.`);
      }
    };

    window.addEventListener('paste', handleCopyPaste);
    window.addEventListener('copy', handleCopyPaste);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('paste', handleCopyPaste);
      window.removeEventListener('copy', handleCopyPaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, registerProctoringViolation]);

  // Timers: Interview timer & Question countdown
  useEffect(() => {
    if (stage !== 'LIVE_ROOM') return;

    const interval = setInterval(() => {
      setInterviewTimerSeconds(prev => prev + 1);
      setQuestionTimerSeconds(prev => {
        if (prev >= 300) {
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  // --------------------------------------------------------------------------
  // Web Speech API: Text-to-Speech (Interviewer Speaking)
  // --------------------------------------------------------------------------
  const speakQuestion = useCallback((text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))) || voices[0];
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => setIsRecruiterSpeaking(true);
    utterance.onend = () => setIsRecruiterSpeaking(false);
    utterance.onerror = () => setIsRecruiterSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // --------------------------------------------------------------------------
  // Web Speech API: Speech-to-Text (Candidate Dictation)
  // --------------------------------------------------------------------------
  const toggleSpeechRecognition = () => {
    if (isSpeechRecognitionActive) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
      }
      setIsSpeechRecognitionActive(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition is not supported by your browser. You can type your answer directly into the response box.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsSpeechRecognitionActive(true);
      };

      recognition.onresult = (event) => {
        let finalChunk = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript;
          }
        }
        if (finalChunk) {
          setCurrentAnswerText(prev => {
            const separator = prev && !prev.endsWith(' ') ? ' ' : '';
            return prev + separator + finalChunk.trim();
          });
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          setIsSpeechRecognitionActive(false);
        }
      };

      recognition.onend = () => {
        setIsSpeechRecognitionActive(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsSpeechRecognitionActive(false);
    }
  };

  // --------------------------------------------------------------------------
  // Easy Question Shifting & Finish Interview Workflow
  // --------------------------------------------------------------------------
  const handleStartLiveInterview = async (trackId) => {
    setIsLaunchModalOpen(false);
    if (!cameraStream) {
      await startMediaStreams();
    }
    const targetDomain = (trackId && TECH_STACK_DOMAINS.find(d => d.id === trackId)) || currentDomain;
    if (trackId && trackId !== selectedDomainId) {
      setSelectedDomainId(trackId);
    }
    setStage('LIVE_ROOM');
    setCurrentQuestionIndex(0);
    setCandidateResponses({});
    setCurrentAnswerText('');
    setStrikeCount(0);
    strikeCountRef.current = 0;
    setViolationsList([]);
    setIntegrityScore(100);
    setQuestionTimerSeconds(0);
    setInterviewTimerSeconds(0);
    setActiveFollowUpData(null);
    setShowHint(false);
    setShowFinishConfirmModal(false);

    setTimeout(() => {
      const firstQ = targetDomain.questions[0];
      if (firstQ) {
        speakQuestion(`Welcome to your ${targetDomain.name} technical interview. Here is question 1: ${firstQ.question}`);
      }
    }, 800);
  };

  const handleSelectTrack = (trackId) => {
    setSelectedDomainId(trackId);
    setIsLaunchModalOpen(true);
  };

  const handleCloseLaunchModal = () => {
    setIsLaunchModalOpen(false);
    stopMediaStreams();
  };

  // Save current answer draft without throwing warnings or blocking navigation
  const saveCurrentAnswerDraft = (overrideText = null) => {
    const textToSave = overrideText !== null ? overrideText : currentAnswerText;
    const q = currentQuestion;
    if (!q) return candidateResponses;

    const updated = {
      ...candidateResponses,
      [q.id]: {
        questionNumber: currentQuestionIndex + 1,
        category: q.category,
        questionText: q.question,
        expectedKeyPoints: q.expectedKeyPoints,
        idealAnswer: q.idealAnswer,
        candidateAnswer: (textToSave || '').trim(),
        timeSpentSeconds: (candidateResponses[q.id]?.timeSpentSeconds || 0) + questionTimerSeconds,
        followUp: activeFollowUpData || candidateResponses[q.id]?.followUp || null
      }
    };
    setCandidateResponses(updated);
    return updated;
  };

  // Navigate directly to any question by index (user-friendly question shifting)
  const navigateToQuestion = (targetIndex) => {
    if (!currentDomain?.questions || targetIndex < 0 || targetIndex >= currentDomain.questions.length) return;
    if (targetIndex === currentQuestionIndex) return;

    // 1. Save current question draft
    const updated = saveCurrentAnswerDraft();

    // 2. Stop speech recognition if running
    if (speechRecognitionRef.current && isSpeechRecognitionActive) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      setIsSpeechRecognitionActive(false);
    }

    // 3. Cancel active TTS
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsRecruiterSpeaking(false);
    }

    // 4. Switch question state
    const targetQ = currentDomain.questions[targetIndex];
    setCurrentQuestionIndex(targetIndex);
    const savedAns = updated[targetQ?.id]?.candidateAnswer || '';
    setCurrentAnswerText(savedAns);
    setQuestionTimerSeconds(0);
    setActiveFollowUpData(updated[targetQ?.id]?.followUp || null);
    setShowHint(false);

    // 5. Read out the new question after a short natural delay
    setTimeout(() => {
      if (targetQ) {
        speakQuestion(`Question ${targetIndex + 1}: ${targetQ.question}`);
      }
    }, 400);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      navigateToQuestion(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentDomain.questions.length - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < currentDomain.questions.length - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    saveCurrentAnswerDraft();
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentDomain.questions.length) {
      navigateToQuestion(nextIndex);
    } else {
      handleFinishInterview();
    }
  };

  const handleFinishInterview = () => {
    const updated = saveCurrentAnswerDraft();
    const totalQ = currentDomain.questions.length;
    const answeredCount = Object.values(updated).filter(r => r.candidateAnswer && r.candidateAnswer.trim().length > 0).length;

    if (answeredCount < totalQ && !showFinishConfirmModal) {
      setShowFinishConfirmModal(true);
      return;
    }

    setShowFinishConfirmModal(false);
    if (speechRecognitionRef.current && isSpeechRecognitionActive) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      setIsSpeechRecognitionActive(false);
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsRecruiterSpeaking(false);
    }

    stopMediaStreams();
    setStage('EVALUATION_REPORT');
    runFullAiEvaluation(updated);
  };

  const handleShowHint = () => {
    setShowHint(prev => !prev);
  };

  // Generate Dynamic AI Probing Follow-Up
  const handleTriggerAiFollowUp = async () => {
    if (!currentAnswerText.trim() || currentAnswerText.trim().length < 30) {
      alert('Please provide a more substantial initial answer first so the AI interviewer can generate a deep follow-up probe.');
      return;
    }

    setIsGeneratingFollowUp(true);
    try {
      const followUp = await generateFollowUpQuestion(
        currentDomain.name,
        currentQuestion.question,
        currentAnswerText
      );
      setActiveFollowUpData(followUp);
      speakQuestion(`Follow-up question: ${followUp.followUpQuestion}`);
    } catch (err) {
      console.error('Follow-up generation error:', err);
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  // --------------------------------------------------------------------------
  // Run Final Comprehensive AI Evaluation
  // --------------------------------------------------------------------------
  const runFullAiEvaluation = async (finalResponses) => {
    setIsAiEvaluating(true);
    setEvaluationProgressStep('Synthesizing interview responses & code architecture...');

    const responsesToUse = finalResponses || candidateResponses;
    const questionPayload = currentDomain.questions.map(q => ({
      questionId: q.id,
      category: q.category,
      questionText: q.question,
      expectedKeyPoints: q.expectedKeyPoints,
      idealAnswer: q.idealAnswer,
      candidateAnswer: (responsesToUse[q.id]?.candidateAnswer || '').trim(),
      timeSpentSeconds: responsesToUse[q.id]?.timeSpentSeconds || 60,
      followUp: responsesToUse[q.id]?.followUp || null
    }));

    try {
      setEvaluationProgressStep(`Executing Bar-Raiser Analysis via ${openRouterConfig.model}...`);

      const report = await evaluateCandidateResponses(
        currentDomain.name,
        currentDomain.difficulty,
        questionPayload,
        violationsList,
        integrityScore
      );

      setFinalEvaluationReport(report);

      // Save to Supabase backend database & local interview history
      if (addInterviewResult) {
        const durationMin = interviewTimerSeconds > 0 ? `${Math.max(1, Math.ceil(interviewTimerSeconds / 60))} mins` : '15 mins';
        addInterviewResult({
          id: `i-it-${Date.now()}`,
          title: `${currentDomain.name} AI Mock Interview`,
          score: `${report?.overallScore || '9.0'} / 10`,
          date: 'Today',
          focusArea: currentDomain.name,
          duration: durationMin,
          integrityScore: `${integrityScore}% Clean`,
          questionsCount: currentDomain.questions.length,
          remarks: report?.executiveSummary || report?.summaryStrengths || 'Demonstrated strong domain competence and structured communication.'
        });
      }
    } catch (err) {
      console.error('AI evaluation execution error, using deterministic rubric:', err);
      // Fallback local report using deterministic rubric
      const fallbackReport = evaluateDeterministicRubric({
        domain: currentDomain.name,
        difficulty: currentDomain.difficulty,
        questionsPayload: questionPayload,
        violationsList: violationsList,
        integrityScore: integrityScore
      });
      setFinalEvaluationReport(fallbackReport);

      // Save fallback report to backend as well
      if (addInterviewResult) {
        const durationMin = interviewTimerSeconds > 0 ? `${Math.max(1, Math.ceil(interviewTimerSeconds / 60))} mins` : '15 mins';
        addInterviewResult({
          id: `i-it-${Date.now()}`,
          title: `${currentDomain.name} AI Mock Interview`,
          score: `${fallbackReport?.overallScore || '8.5'} / 10`,
          date: 'Today',
          focusArea: currentDomain.name,
          duration: durationMin,
          integrityScore: `${integrityScore}% Clean`,
          questionsCount: currentDomain.questions.length,
          remarks: fallbackReport?.summaryStrengths || fallbackReport?.executiveSummary || 'Solid responses across domain questions.'
        });
      }
    } finally {
      setIsAiEvaluating(false);
      setEvaluationProgressStep('');
    }
  };

  // Toggle Camera Mute / Activation
  const toggleCamera = async () => {
    const stream = cameraStreamRef.current || cameraStream;
    const vTracks = stream ? stream.getVideoTracks() : [];
    if (!stream || vTracks.length === 0 || vTracks[0].readyState === 'ended') {
      await startMediaStreams();
      return;
    }

    const nextMuteState = !isCameraMuted;
    vTracks.forEach(track => {
      track.enabled = !nextMuteState;
    });
    setIsCameraMuted(nextMuteState);
  };

  // Toggle Mic Mute / Activation
  const toggleMic = async () => {
    const stream = cameraStreamRef.current || cameraStream;
    const aTracks = stream ? stream.getAudioTracks() : [];
    if (!stream || aTracks.length === 0 || aTracks[0].readyState === 'ended') {
      await startMediaStreams();
      return;
    }

    const nextMuteState = !isMicMuted;
    aTracks.forEach(track => {
      track.enabled = !nextMuteState;
    });
    setIsMicMuted(nextMuteState);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (interviewContainerRef.current?.requestFullscreen) {
        interviewContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Step Progress Tracker
  const renderStepProgressBar = (currentStepIndex) => {
    const steps = [
      { num: 1, label: 'Choose Tech Stack' },
      { num: 2, label: 'Live Interview Session' },
      { num: 3, label: 'AI Scorecard Report' }
    ];

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.65rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {steps.map((step, idx) => {
          const isActive = currentStepIndex === step.num;
          const isDone = currentStepIndex > step.num;

          return (
            <React.Fragment key={step.num}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '2rem',
                background: isActive ? 'var(--primary-lavender)' : isDone ? 'var(--accent-mint-subtle)' : 'var(--bg-subtle)',
                color: isActive ? '#ffffff' : isDone ? 'var(--accent-mint)' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--primary-lavender)' : isDone ? '1px solid var(--accent-mint)' : '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: isActive || isDone ? '700' : '500',
                transition: 'all 0.2s ease'
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: isActive ? '#ffffff' : isDone ? 'var(--accent-mint)' : 'var(--bg-surface)',
                  color: isActive ? 'var(--primary-lavender)' : isDone ? '#ffffff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: '800'
                }}>
                  {isDone ? '✓' : step.num}
                </span>
                <span>{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <span style={{ color: isDone ? 'var(--accent-mint)' : 'var(--border-color)', fontSize: '0.8rem' }}>
                  ➔
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // ==========================================================================
  // STAGE: DISQUALIFIED
  // ==========================================================================
  if (stage === 'DISQUALIFIED') {
    return (
      <div style={{ padding: '2rem 1rem', maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: '1.5rem', border: '2px solid #ef4444' }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShieldAlert size={48} />
          </div>

          <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', fontWeight: '800', marginBottom: '1rem' }}>
            SECURITY VIOLATION TRIGGERED
          </span>

          <h1 style={{ fontSize: '2.2rem', color: '#ef4444', fontWeight: '800', marginBottom: '0.75rem' }}>
            Interview Terminated — Candidate Disqualified
          </h1>

          <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
            {disqualificationReason}
          </p>

          {/* Violations Table */}
          <div style={{ textAlign: 'left', background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" />
              Recorded Proctoring Violations Log ({violationsList.length} Total):
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {violationsList.map((v, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-surface)',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid #ef4444',
                  fontSize: '0.875rem'
                }}>
                  <div>
                    <strong style={{ color: '#ef4444', display: 'block' }}>
                      Violation {idx + 1}: {v.type}
                    </strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {v.message}
                    </span>
                  </div>
                  <span className="badge badge-subtle" style={{ fontSize: '0.75rem' }}>
                    {v.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setStage('BRIEFING_AND_CHECK');
                startMediaStreams();
              }}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={18} /> Recalibrate & Re-attempt Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // STAGE 1: DOMAIN SELECTION
  // ==========================================================================
  if (stage === 'DOMAIN_SELECTION') {
    return (
      <div style={{ padding: '0.5rem 0 3.5rem 0', maxWidth: '1240px', margin: '0 auto' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Interactive Step Progress Tracker */}
        {renderStepProgressBar(1)}

        {/* Hero Header */}
        <div className="glass-panel" style={{
          padding: '2.25rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), var(--bg-surface))',
          borderLeft: '5px solid var(--primary-lavender)',
          borderRadius: '1.25rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-lavender">✨ Real-Time Speech Recognition</span>
            <span className="badge badge-mint">⚡ Audio Question Playback</span>
            <span className="badge badge-blue">🔒 Smart Anti-Cheat Proctoring</span>
          </div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
            AI Technical & Behavioral Mock Interview Suite
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '900px', lineHeight: '1.6', margin: 0 }}>
            Choose from <strong>16 industry-standard tech stack modules</strong> covering Frontend, Backend, Cloud, Data Science, AI/LLMs, Mobile, and HR Behavioral rounds. Practice with realistic AI speech recognition, voice playback, and instant in-depth scorecard reports.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div style={{ marginBottom: '1.75rem' }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            marginBottom: '1rem'
          }}>
            <Search size={18} color="var(--primary-lavender)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack, role, or framework (e.g., React, Java, Python, AWS, Docker, Kubernetes, Flutter)..."
              className="input-field"
              style={{
                width: '100%',
                paddingLeft: '46px',
                paddingRight: '16px',
                height: '48px',
                fontSize: '0.925rem',
                borderRadius: '0.85rem',
                background: 'var(--bg-surface)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.825rem',
                    fontWeight: isActive ? '800' : '600',
                    background: isActive ? 'var(--primary-lavender)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-main)',
                    border: isActive ? '1px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(139, 92, 246, 0.3)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={20} color="var(--primary-lavender)" />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
              Available Interview Tracks ({filteredDomains.length} Modules)
            </h2>
          </div>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Select your target module to begin
          </span>
        </div>

        {/* Tech Stack Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {filteredDomains.map((dom) => {
            const isSelected = dom.id === selectedDomainId;
            return (
              <div
                key={dom.id}
                onClick={() => handleSelectTrack(dom.id)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderRadius: '1.15rem',
                  border: isSelected ? `2px solid ${dom.color || 'var(--primary-lavender)'}` : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  boxShadow: isSelected ? `0 10px 25px -4px ${dom.color || 'var(--primary-lavender)'}33` : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: `${dom.color || '#8b5cf6'}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {dom.icon || '⚡'}
                    </div>
                    
                    <span className="badge" style={{ background: `${dom.color || '#8b5cf6'}18`, color: dom.color || '#8b5cf6', fontWeight: '800', fontSize: '0.725rem' }}>
                      {dom.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.35rem', fontWeight: '800', lineHeight: '1.3' }}>
                    {dom.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{dom.recruiterAvatar || '👩‍💻'}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                      {dom.recruiterName} • {dom.roleTitle}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.835rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1rem' }}>
                    {dom.description}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                      {dom.questions?.length || 5} Questions
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: '700' }}>
                      {dom.duration || '20-25 mins'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTrack(dom.id);
                    }}
                    className="btn"
                    style={{
                      padding: '0.45rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      background: isSelected ? (dom.color || 'var(--primary-lavender)') : 'var(--bg-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-main)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      boxShadow: isSelected ? '0 4px 12px rgba(139, 92, 246, 0.25)' : 'none'
                    }}
                  >
                    {isSelected ? <>Selected <Check size={14} /></> : 'Select Track'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => handleSelectTrack(selectedDomainId)}
            className="btn btn-primary"
            style={{
              padding: '0.95rem 2.85rem',
              fontSize: '1.05rem',
              fontWeight: '800',
              borderRadius: '0.85rem',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            Start Interview with {currentDomain.name} <ChevronRight size={18} />
          </button>
        </div>

        {/* Direct Interview Launch Pop-Up Modal */}
        {isLaunchModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 7, 15, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              padding: '1rem'
            }}
            onClick={handleCloseLaunchModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '92vh',
                overflowY: 'auto',
                background: 'var(--bg-surface-elevated, #161b2c)',
                border: '1px solid var(--border-color)',
                borderRadius: '1.25rem',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(139, 92, 246, 0.25)',
                padding: '2rem',
                position: 'relative'
              }}
            >
              {/* Top Header with Close Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className="badge badge-lavender" style={{ fontSize: '0.75rem', fontWeight: '800' }}>
                      🎯 Ready to Connect
                    </span>
                    <span className="badge badge-mint" style={{ fontSize: '0.75rem', fontWeight: '800' }}>
                      Interactive Session
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                    Confirm & Start Interview
                  </h2>
                </div>
                <button
                  onClick={handleCloseLaunchModal}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Selected Track Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(16, 185, 129, 0.05))',
                border: `1px solid ${currentDomain.color || 'var(--primary-lavender)'}40`,
                borderRadius: '1rem',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.15rem'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `${currentDomain.color || '#8b5cf6'}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.85rem',
                  flexShrink: 0
                }}>
                  {currentDomain.icon || '⚡'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                      {currentDomain.name}
                    </h3>
                    <span className="badge" style={{ background: `${currentDomain.color || '#8b5cf6'}20`, color: currentDomain.color || '#8b5cf6', fontWeight: '800', fontSize: '0.72rem' }}>
                      {currentDomain.badge}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <span>{currentDomain.recruiterAvatar || '👩‍💻'}</span>
                    <span style={{ fontWeight: '600' }}>{currentDomain.recruiterName}</span>
                    <span>•</span>
                    <span>{currentDomain.roleTitle}</span>
                  </div>
                </div>
              </div>

              {/* Hardware & Privacy Readiness Notice (Sensors remain completely OFF until starting) */}
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: '1rem',
                padding: '1.25rem',
                border: '1px solid var(--border-color-subtle)',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--accent-mint-subtle)',
                    color: 'var(--accent-mint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Video size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      Camera & Mic on Demand
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                      Sensors are kept <strong>completely inactive</strong> right now. They start only when you click "Start Interview Session Now" below.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--primary-lavender-subtle)',
                    color: 'var(--primary-lavender)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      Auto-Stopped Immediately
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                      The camera and microphone automatically terminate the moment you complete the interview or leave the room.
                    </p>
                  </div>
                </div>
              </div>

              {/* Round Overview Highlights */}
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: '0.85rem',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color-subtle)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    {currentDomain.questions?.length || 5}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Technical Questions
                  </div>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-mint)' }}>
                    {currentDomain.duration || '20-25 mins'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Estimated Duration
                  </div>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-lavender)' }}>
                    {currentDomain.difficulty || 'Mid-Senior'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Seniority Level
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleCloseLaunchModal}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.85rem 1.35rem',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    borderRadius: '0.75rem'
                  }}
                >
                  Change Track
                </button>

                <button
                  type="button"
                  onClick={() => handleStartLiveInterview(currentDomain.id)}
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 2.25rem',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'linear-gradient(135deg, var(--primary-lavender), #7c3aed)',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.45)',
                    border: 'none',
                    color: '#ffffff'
                  }}
                >
                  <span>Start Interview Session Now</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // STAGE 2: INSTRUCTIONS & CALIBRATION
  // ==========================================================================
  if (stage === 'BRIEFING_AND_CHECK') {
    return (
      <div style={{ padding: '1rem 0 3.5rem 0', maxWidth: '1150px', margin: '0 auto' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Step Progress Tracker */}
        {renderStepProgressBar(2)}

        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => {
              stopMediaStreams();
              setStage('DOMAIN_SELECTION');
            }}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> Back to Track Selection
          </button>
          <span className="badge badge-lavender" style={{ fontSize: '0.825rem', fontWeight: '700' }}>
            Track: {currentDomain.name} ({currentDomain.difficulty})
          </span>
        </div>

        <div className="responsive-split-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Left: Simple & Friendly Guidelines */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--primary-lavender-subtle)',
                color: 'var(--primary-lavender)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                  Interview Guidelines & AI Proctoring
                </h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Designed to keep your mock session realistic and stress-free
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: '0.65rem', borderLeft: '3px solid var(--accent-mint)' }}>
                <Eye size={18} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    1. Natural Thinking Looks Permitted
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                    Looking around naturally while thinking is completely fine. Only prolonged downward gaze (&gt;5s) at external devices triggers an alert.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: '0.65rem', borderLeft: '3px solid var(--primary-lavender)' }}>
                <Users size={18} color="var(--primary-lavender)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    2. Solo Candidate in Camera Frame
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                    Please sit in a well-lit area alone. The smart proctor ensures one person is taking the assessment.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: '0.65rem', borderLeft: '3px solid #38bdf8' }}>
                <Mic size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    3. Live Voice-to-Text Dictation
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                    Speak naturally into your mic to answer. Your words will transcribe live into your answer box in real-time.
                  </p>
                </div>
              </div>
            </div>

            {/* Recruiter Card */}
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-subtle), var(--bg-surface))',
              padding: '0.9rem 1.1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{ fontSize: '1.85rem' }}>{currentDomain.recruiterAvatar || '👩‍💻'}</div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block' }}>
                  {currentDomain.recruiterName}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {currentDomain.recruiterTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Camera & Mic Check */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                  Camera & Microphone Check
                </h3>
                <span className="badge" style={{
                  background: (hasCameraAccess && hasMicAccess) ? 'var(--accent-mint-subtle)' : 'var(--bg-subtle)',
                  color: (hasCameraAccess && hasMicAccess) ? 'var(--accent-mint)' : 'var(--text-muted)',
                  fontWeight: '700'
                }}>
                  {hasCameraAccess ? 'Sensors Connected ✓' : 'Permission Needed'}
                </span>
              </div>

              {/* Video Box */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                background: '#090d16',
                borderRadius: '0.85rem',
                overflow: 'hidden',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--border-color)'
              }}>
                {hasCameraAccess && !isCameraMuted ? (
                  <video
                    ref={(el) => {
                      previewVideoRef.current = el;
                      if (el && cameraStream && el.srcObject !== cameraStream) {
                        el.srcObject = cameraStream;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    onLoadedMetadata={(e) => {
                      e.target.play().catch(() => {});
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                  />
                ) : hasCameraAccess && isCameraMuted ? (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '1.5rem' }}>
                    <VideoOff size={42} style={{ margin: '0 auto 0.5rem auto', color: '#94a3b8' }} />
                    <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      Camera is Turned Off
                    </p>
                    <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0' }}>
                      Click below to turn your video stream back on.
                    </p>
                    <button
                      onClick={toggleCamera}
                      className="btn btn-primary"
                      style={{ fontSize: '0.825rem', padding: '0.45rem 1rem' }}
                    >
                      Turn Camera On
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '1.5rem' }}>
                    <VideoOff size={42} style={{ margin: '0 auto 0.5rem auto', opacity: 0.7 }} />
                    <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      Camera Access Needed
                    </p>
                    <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0' }}>
                      {cameraError || 'Please allow camera and mic permissions in your browser.'}
                    </p>
                    <button
                      onClick={startMediaStreams}
                      className="btn btn-primary"
                      style={{ fontSize: '0.825rem', padding: '0.45rem 1rem' }}
                    >
                      Connect Camera & Mic
                    </button>
                  </div>
                )}

                {hasCameraAccess && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Crosshair size={12} color="#22c55e" />
                      <span>Gaze: <strong>{gazeDirection}</strong></span>
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      color: personCountStatus.includes('1 Person') ? '#22c55e' : '#ef4444',
                      fontSize: '0.7rem',
                      fontWeight: '800'
                    }}>
                      {personCountStatus}
                    </div>
                  </>
                )}
              </div>

              {/* Mic Volume Level */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Microphone Audio Level:
                  </span>
                  <span style={{ fontSize: '0.75rem', color: isMicMuted ? '#ef4444' : 'var(--accent-mint)', fontWeight: '700' }}>
                    {isMicMuted ? 'Muted' : `Active (${micVolumeLevel}%)`}
                  </span>
                </div>

                <div style={{ height: '7px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                  <div style={{
                    height: '100%',
                    width: `${isMicMuted ? 0 : micVolumeLevel}%`,
                    background: micVolumeLevel > 70 ? '#ef4444' : 'var(--accent-mint)',
                    transition: 'width 0.1s ease'
                  }} />
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={toggleCamera}
                    className={`btn ${!isCameraMuted && hasCameraAccess ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      background: !isCameraMuted && hasCameraAccess ? 'var(--accent-mint)' : undefined,
                      borderColor: !isCameraMuted && hasCameraAccess ? 'var(--accent-mint)' : undefined,
                      color: !isCameraMuted && hasCameraAccess ? '#ffffff' : undefined
                    }}
                  >
                    {!isCameraMuted && hasCameraAccess ? <Video size={15} /> : <VideoOff size={15} />}
                    {!isCameraMuted && hasCameraAccess ? 'Camera Active ✓' : hasCameraAccess ? 'Turn Camera On' : 'Connect Camera'}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`btn ${!isMicMuted && hasMicAccess ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      background: !isMicMuted && hasMicAccess ? 'var(--accent-mint)' : undefined,
                      borderColor: !isMicMuted && hasMicAccess ? 'var(--accent-mint)' : undefined,
                      color: !isMicMuted && hasMicAccess ? '#ffffff' : undefined
                    }}
                  >
                    {!isMicMuted && hasMicAccess ? <Mic size={15} /> : <MicOff size={15} />}
                    {!isMicMuted && hasMicAccess ? 'Mic Active ✓' : hasMicAccess ? 'Unmute Mic' : 'Connect Mic'}
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div>
              <button
                onClick={handleStartLiveInterview}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  borderRadius: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Zap size={18} /> Begin Interview Session Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // STAGE 3: LIVE SECURE PROCTORED INTERVIEW ROOM
  // ==========================================================================
  if (stage === 'LIVE_ROOM') {
    return (
      <div
        ref={interviewContainerRef}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          minHeight: isFullscreen ? '100vh' : '820px',
          background: 'var(--bg-main)',
          padding: '1.25rem',
          borderRadius: isFullscreen ? '0' : '1.25rem',
          position: 'relative'
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Step Progress Tracker */}
        {!isFullscreen && renderStepProgressBar(2)}

        {/* Security Warning Banner */}
        {activeWarning && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ef4444',
            color: '#ffffff',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            fontWeight: '800',
            fontSize: '0.9rem',
            zIndex: 9999,
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'bounce 0.5s ease'
          }}>
            <AlertTriangle size={18} />
            <span>{activeWarning}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="glass-panel" style={{
          padding: '0.75rem 1.25rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{currentDomain.recruiterAvatar || '👩‍💻'}</span>
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>
                {currentDomain.name}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Interviewer: {currentDomain.recruiterName} ({currentDomain.recruiterTitle})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Question Progress */}
            <div className="badge badge-lavender" style={{ fontSize: '0.8rem', fontWeight: '800' }}>
              Question {currentQuestionIndex + 1} of {currentDomain.questions.length}
            </div>

            {/* Total Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '700' }}>
              <Clock size={16} color="var(--accent-mint)" />
              <span>{formatTime(interviewTimerSeconds)}</span>
            </div>

            {/* Security Shield */}
            <div className="badge" style={{
              background: strikeCount === 0 ? 'var(--accent-mint-subtle)' : strikeCount === 1 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: strikeCount === 0 ? 'var(--accent-mint)' : strikeCount === 1 ? '#eab308' : '#ef4444',
              fontWeight: '800',
              fontSize: '0.75rem'
            }}>
              <Shield size={13} style={{ marginRight: '4px' }} />
              <span>Proctor: {strikeCount}/3 Warnings</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="btn btn-secondary"
              style={{ padding: '0.4rem', borderRadius: '0.5rem' }}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Main Split Layout: Left Question & Avatar | Right Response & Mic */}
        <div className="responsive-split-sidebar" style={{ gap: '1.25rem' }}>
          {/* Left Column: AI Interviewer & Live Webcam */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* AI Recruiter Speaking Box */}
            <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: isRecruiterSpeaking ? 'linear-gradient(135deg, var(--primary-lavender), var(--accent-mint))' : 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 0.75rem auto',
                boxShadow: isRecruiterSpeaking ? '0 0 25px rgba(139, 92, 246, 0.6)' : 'none',
                transition: 'all 0.3s ease',
                animation: isRecruiterSpeaking ? 'pulse 1.5s infinite' : 'none'
              }}>
                {currentDomain.recruiterAvatar || '👩‍💻'}
              </div>

              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '800', margin: '0 0 2px 0' }}>
                {currentDomain.recruiterName}
              </h4>
              <span style={{ fontSize: '0.75rem', color: isRecruiterSpeaking ? 'var(--accent-mint)' : 'var(--text-muted)', fontWeight: '700' }}>
                {isRecruiterSpeaking ? 'Speaking Question Audio...' : 'Listening to your response...'}
              </span>

              <div style={{ marginTop: '0.85rem' }}>
                <button
                  onClick={() => speakQuestion(currentQuestion.question)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.785rem', padding: '0.4rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Volume2 size={14} color="var(--primary-lavender)" /> Re-listen to Question
                </button>
              </div>
            </div>

            {/* Candidate Live Video Box */}
            <div className="glass-panel" style={{ padding: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  Live Candidate Feed
                </span>
                <span className="badge badge-mint" style={{ fontSize: '0.65rem' }}>
                  {hasCameraAccess && !isCameraMuted ? 'Camera Live 🟢' : 'Camera Paused'}
                </span>
              </div>

              <div style={{
                position: 'relative',
                width: '100%',
                height: '180px',
                background: '#090d16',
                borderRadius: '0.65rem',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {hasCameraAccess && !isCameraMuted ? (
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      const stream = cameraStreamRef.current || cameraStream;
                      if (el && stream && el.srcObject !== stream) {
                        el.srcObject = stream;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    onLoadedMetadata={(e) => {
                      e.target.play().catch(() => {});
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <VideoOff size={30} style={{ margin: '0 auto 0.4rem auto', color: '#94a3b8' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.35rem', color: '#cbd5e1', maxWidth: '240px' }}>
                      {cameraError ? cameraError : hasCameraAccess ? 'Camera is Off / Paused' : 'Camera Not Connected'}
                    </span>
                    <button
                      type="button"
                      onClick={() => startMediaStreams()}
                      className="btn btn-primary"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.725rem',
                        fontWeight: '700',
                        borderRadius: '0.45rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Video size={12} />
                      {hasCameraAccess ? 'Turn On Camera' : 'Connect Camera'}
                    </button>
                  </div>
                )}

                {/* HUD Overlays */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Crosshair size={10} color="#22c55e" />
                  <span>{gazeDirection}</span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  color: personCountStatus.includes('1 Person') ? '#22c55e' : '#ef4444',
                  fontSize: '0.65rem',
                  fontWeight: '800'
                }}>
                  {personCountStatus}
                </div>
              </div>

              {/* Dual Camera & Mic Interactive Control Bar */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button
                  type="button"
                  onClick={toggleCamera}
                  className={`btn ${!isCameraMuted && hasCameraAccess ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    flex: 1,
                    padding: '0.45rem 0.5rem',
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    background: !isCameraMuted && hasCameraAccess ? 'var(--accent-mint)' : undefined,
                    borderColor: !isCameraMuted && hasCameraAccess ? 'var(--accent-mint)' : undefined,
                    color: !isCameraMuted && hasCameraAccess ? '#ffffff' : undefined
                  }}
                  title={!isCameraMuted && hasCameraAccess ? 'Click to turn off camera' : 'Click to turn on camera'}
                >
                  {!isCameraMuted && hasCameraAccess ? <Video size={13} /> : <VideoOff size={13} />}
                  {!isCameraMuted && hasCameraAccess ? 'Cam Active' : 'Cam Off'}
                </button>
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`btn ${!isMicMuted && hasMicAccess ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    flex: 1,
                    padding: '0.45rem 0.5rem',
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    background: !isMicMuted && hasMicAccess ? 'var(--accent-mint)' : undefined,
                    borderColor: !isMicMuted && hasMicAccess ? 'var(--accent-mint)' : undefined,
                    color: !isMicMuted && hasMicAccess ? '#ffffff' : undefined
                  }}
                  title={!isMicMuted && hasMicAccess ? 'Click to mute microphone' : 'Click to unmute microphone'}
                >
                  {!isMicMuted && hasMicAccess ? <Mic size={13} /> : <MicOff size={13} />}
                  {!isMicMuted && hasMicAccess ? 'Mic Active' : 'Mic Muted'}
                </button>
              </div>

              {/* Mic Level Bar */}
              <div style={{ marginTop: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  <span>Voice Input Level</span>
                  <span>{isMicMuted ? 'Muted' : `${micVolumeLevel}%`}</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${isMicMuted ? 0 : micVolumeLevel}%`, background: 'var(--accent-mint)', transition: 'width 0.1s ease' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Question & Live Speech Dictation Box */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Question Navigation Stepper Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginRight: '0.2rem' }}>
                    Questions:
                  </span>
                  {currentDomain.questions.map((q, idx) => {
                    const isCurrent = idx === currentQuestionIndex;
                    const isAnswered = Boolean(candidateResponses[q.id]?.candidateAnswer && candidateResponses[q.id].candidateAnswer.trim().length > 0);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => navigateToQuestion(idx)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.775rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          border: isCurrent
                            ? '2px solid var(--primary-lavender)'
                            : isAnswered
                            ? '1px solid rgba(16, 185, 129, 0.5)'
                            : '1px solid var(--border-color)',
                          background: isCurrent
                            ? 'var(--primary-lavender)'
                            : isAnswered
                            ? 'rgba(16, 185, 129, 0.14)'
                            : 'rgba(255, 255, 255, 0.04)',
                          color: isCurrent
                            ? '#ffffff'
                            : isAnswered
                            ? 'var(--accent-mint)'
                            : 'var(--text-muted)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.2s ease',
                          boxShadow: isCurrent ? '0 0 12px rgba(139, 92, 246, 0.45)' : 'none'
                        }}
                        title={`Question ${idx + 1}: ${q.category}${isAnswered ? ' (Answered)' : ' (Unanswered)'}`}
                      >
                        <span>Q{idx + 1}</span>
                        {isAnswered && <CheckCircle size={12} color={isCurrent ? '#ffffff' : 'var(--accent-mint)'} />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      opacity: currentQuestionIndex === 0 ? 0.35 : 1,
                      cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                    title="Previous Question"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === currentDomain.questions.length - 1}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      opacity: currentQuestionIndex === currentDomain.questions.length - 1 ? 0.35 : 1,
                      cursor: currentQuestionIndex === currentDomain.questions.length - 1 ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                    title="Next Question"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span className="badge badge-lavender" style={{ fontSize: '0.75rem', fontWeight: '800' }}>
                  {currentQuestion.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Question {currentQuestionIndex + 1} of {currentDomain.questions.length} • Target time: 3-5 mins
                </span>
              </div>

              {/* Question Text */}
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                {currentQuestion.question}
              </h2>

              {/* Architectural Clue / Hint Box */}
              {showHint && (
                <div style={{
                  padding: '0.85rem 1.15rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  marginBottom: '1rem',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <HelpCircle size={15} color="#eab308" />
                    <strong style={{ fontSize: '0.825rem', color: '#eab308' }}>Architectural Clue & Key Focus Areas:</strong>
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    {currentQuestion.expectedKeyPoints?.slice(0, 3).map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Active AI Probing Follow-Up Box */}
              {activeFollowUpData && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(16, 185, 129, 0.1))',
                  border: '1px solid var(--primary-lavender)',
                  marginBottom: '1.25rem',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <Sparkles size={16} color="var(--primary-lavender)" />
                    <strong style={{ fontSize: '0.85rem', color: 'var(--primary-lavender)' }}>
                      Interviewer Follow-Up Probe:
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600', margin: '0 0 0.4rem 0', lineHeight: '1.4' }}>
                    {activeFollowUpData.followUpQuestion}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Focus: {activeFollowUpData.probeFocus}
                  </span>
                </div>
              )}

              {/* Answer Box Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  Your Technical Response:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {currentAnswerText.length} characters
                  </span>
                </div>
              </div>

              {/* Live Textarea */}
              <textarea
                value={currentAnswerText}
                onChange={(e) => setCurrentAnswerText(e.target.value)}
                placeholder="Speak naturally into your microphone using the button below, or type your structured technical explanation here..."
                className="input-field"
                style={{
                  width: '100%',
                  height: '240px',
                  fontSize: '0.925rem',
                  lineHeight: '1.6',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  resize: 'none',
                  background: 'var(--bg-subtle)'
                }}
              />
            </div>

            {/* Bottom Controls Bar */}
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Speech Dictation Button */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`btn ${isSpeechRecognitionActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    padding: '0.65rem 1.15rem',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: isSpeechRecognitionActive ? '#ef4444' : undefined,
                    borderColor: isSpeechRecognitionActive ? '#ef4444' : undefined,
                    boxShadow: isSpeechRecognitionActive ? '0 0 15px rgba(239, 68, 68, 0.4)' : undefined
                  }}
                >
                  {isSpeechRecognitionActive ? <MicOff size={16} /> : <Mic size={16} color="var(--accent-mint)" />}
                  {isSpeechRecognitionActive ? 'Stop Listening (Active 🎙️)' : 'Speak via Mic'}
                </button>

                {/* AI Follow-Up Probe Button */}
                {!activeFollowUpData && (
                  <button
                    type="button"
                    onClick={handleTriggerAiFollowUp}
                    disabled={isGeneratingFollowUp || currentAnswerText.length < 30}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.65rem 0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    title="Generate an in-depth follow-up question based on your response"
                  >
                    {isGeneratingFollowUp ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} color="var(--primary-lavender)" />}
                    {isGeneratingFollowUp ? 'Generating Probe...' : 'Request AI Follow-Up'}
                  </button>
                )}

                {/* Architectural Clue / Hint Button */}
                <button
                  type="button"
                  onClick={handleShowHint}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  title="View architectural concept clues"
                >
                  <HelpCircle size={14} color="#eab308" />
                  {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>
              </div>

              {/* Navigation & Submission Action Buttons */}
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Previous Question Button */}
                <button
                  type="button"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    borderRadius: '0.65rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    opacity: currentQuestionIndex === 0 ? 0.4 : 1,
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                  title="Previous Question"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                {/* Skip Question Button */}
                {currentQuestionIndex + 1 < currentDomain.questions.length && (
                  <button
                    type="button"
                    onClick={handleSkipQuestion}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      borderRadius: '0.65rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    title="Skip to next question"
                  >
                    <SkipForward size={16} /> Skip
                  </button>
                )}

                {/* Save & Next Question Button */}
                {currentQuestionIndex + 1 < currentDomain.questions.length && (
                  <button
                    type="button"
                    onClick={handleSaveAndNext}
                    className="btn btn-primary"
                    style={{
                      padding: '0.75rem 1.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      borderRadius: '0.65rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    Save & Next <ChevronRight size={16} />
                  </button>
                )}

                {/* Finish & Evaluate Button */}
                <button
                  type="button"
                  onClick={handleFinishInterview}
                  disabled={isSubmittingResponse || isAiEvaluating}
                  className="btn"
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    borderRadius: '0.65rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: currentQuestionIndex + 1 === currentDomain.questions.length
                      ? 'linear-gradient(135deg, var(--primary-lavender), var(--accent-mint))'
                      : 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid var(--accent-mint)',
                    color: '#ffffff',
                    boxShadow: currentQuestionIndex + 1 === currentDomain.questions.length ? '0 6px 20px rgba(139, 92, 246, 0.4)' : 'none'
                  }}
                >
                  {isSubmittingResponse || isAiEvaluating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Evaluating...
                    </>
                  ) : (
                    <>
                      Finish Interview <Award size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Unanswered Questions Confirmation Modal */}
        {showFinishConfirmModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div className="glass-panel" style={{
              maxWidth: '500px',
              width: '100%',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              border: '1px solid var(--border-color)',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <AlertTriangle size={24} color="#eab308" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                  Submit Technical Interview?
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                You have answered <strong>{Object.values(candidateResponses).filter(r => r.candidateAnswer?.trim().length > 0).length}</strong> of <strong>{currentDomain.questions.length}</strong> questions.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {currentDomain.questions.map((q, idx) => {
                  const isAns = Boolean(candidateResponses[q.id]?.candidateAnswer?.trim().length > 0);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setShowFinishConfirmModal(false);
                        navigateToQuestion(idx);
                      }}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        border: isAns ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(234, 179, 8, 0.4)',
                        background: isAns ? 'rgba(16, 185, 129, 0.12)' : 'rgba(234, 179, 8, 0.12)',
                        color: isAns ? 'var(--accent-mint)' : '#eab308',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                      title={isAns ? 'Answered' : 'Click to answer this question'}
                    >
                      <span>Q{idx + 1}</span>
                      {isAns ? <CheckCircle2 size={12} /> : <span>Pending</span>}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                Click any pending question above to provide your answer, or proceed directly to generate your AI evaluation report.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowFinishConfirmModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', fontWeight: '700' }}
                >
                  Return to Interview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFinishConfirmModal(false);
                    if (speechRecognitionRef.current && isSpeechRecognitionActive) {
                      try { speechRecognitionRef.current.stop(); } catch (e) {}
                      setIsSpeechRecognitionActive(false);
                    }
                    if (window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                      setIsRecruiterSpeaking(false);
                    }
                    stopMediaStreams();
                    setStage('EVALUATION_REPORT');
                    const updated = saveCurrentAnswerDraft();
                    runFullAiEvaluation(updated);
                  }}
                  className="btn btn-primary"
                  style={{
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--primary-lavender), var(--accent-mint))'
                  }}
                >
                  Submit & Generate Scorecard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // STAGE 4: EVALUATION & SCORECARD REPORT
  // ==========================================================================
  if (stage === 'EVALUATION_REPORT') {
    return (
      <div style={{ padding: '1rem 0 4rem 0', maxWidth: '1150px', margin: '0 auto' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Step Progress Tracker */}
        {renderStepProgressBar(3)}

        {/* Loading Spinner during AI grading */}
        {isAiEvaluating && (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-lavender-subtle)',
              color: 'var(--primary-lavender)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Loader2 size={40} className="animate-spin" />
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '0.5rem' }}>
              AI Bar-Raiser Evaluation in Progress
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '550px', margin: '0 auto 1.5rem auto' }}>
              {evaluationProgressStep || 'Deeply grading architectural depth, technical accuracy, and communication clarity...'}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-subtle)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Sparkles size={14} color="var(--primary-lavender)" />
              <span>Model: <strong>{openRouterConfig.model}</strong></span>
            </div>
          </div>
        )}

        {/* Completed Scorecard */}
        {!isAiEvaluating && finalEvaluationReport && (
          <div>
            {/* Top Overview Panel */}
            <div className="glass-panel" style={{
              padding: '2.25rem',
              marginBottom: '1.75rem',
              background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-surface-elevated))',
              borderLeft: `6px solid ${
                finalEvaluationReport.overallScore >= 70
                  ? 'var(--accent-mint)'
                  : finalEvaluationReport.overallScore >= 50
                  ? 'var(--primary-lavender)'
                  : '#ef4444'
              }`,
              borderRadius: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span className="badge badge-lavender">{currentDomain.name}</span>
                    <span className="badge badge-mint">{currentDomain.difficulty}</span>
                  </div>
                  <h1 style={{ fontSize: '1.85rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                    Official Technical Evaluation Scorecard
                  </h1>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Graded by AI Bar-Raiser Panel • Candidate Integrity Verified
                  </span>
                </div>

                {/* Score & Verdict Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: '700' }}>
                      HIRING VERDICT
                    </span>
                    <span style={{
                      fontSize: '1.15rem',
                      fontWeight: '900',
                      color: finalEvaluationReport.hiringRecommendation?.includes('STRONG') || finalEvaluationReport.hiringRecommendation === 'HIRE'
                        ? 'var(--accent-mint)'
                        : finalEvaluationReport.hiringRecommendation?.includes('NEEDS')
                        ? '#eab308'
                        : '#ef4444'
                    }}>
                      {finalEvaluationReport.hiringRecommendation || 'STRONG HIRE'}
                    </span>
                  </div>

                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: `conic-gradient(${
                      finalEvaluationReport.overallScore >= 70
                        ? 'var(--accent-mint)'
                        : finalEvaluationReport.overallScore >= 50
                        ? 'var(--primary-lavender)'
                        : '#ef4444'
                    } ${finalEvaluationReport.overallScore * 3.6}deg, var(--bg-subtle) 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 20px ${
                      finalEvaluationReport.overallScore >= 70
                        ? 'rgba(16, 185, 129, 0.25)'
                        : finalEvaluationReport.overallScore >= 50
                        ? 'rgba(139, 92, 246, 0.25)'
                        : 'rgba(239, 68, 68, 0.25)'
                    }`
                  }}>
                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: 'var(--bg-surface)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1' }}>
                        {finalEvaluationReport.overallScore}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                        / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', margin: '0 0 1.5rem 0', background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: '0.75rem' }}>
                {finalEvaluationReport.executiveSummary}
              </p>

              {/* Strengths & Growth Areas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-mint)', fontWeight: '800', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={16} /> Key Technical Strengths
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-main)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {finalEvaluationReport.strengths?.map((s, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem' }}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-lavender)', fontWeight: '800', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={16} /> Targeted Growth Areas
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-main)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {finalEvaluationReport.growthAreas?.map((g, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem' }}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Question-by-Question Detailed Breakdown */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <FileText size={20} color="var(--primary-lavender)" />
                <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>
                  Question-by-Question Technical Breakdown
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {finalEvaluationReport.questionEvaluations?.map((qEval, idx) => {
                  const originalQ = currentDomain.questions[idx] || currentDomain.questions[0];
                  const candidateAns = candidateResponses[originalQ.id]?.candidateAnswer || 'No answer submitted.';
                  const isExpanded = expandedQuestionCard === idx;

                  return (
                    <div
                      key={idx}
                      className="glass-panel"
                      style={{
                        padding: '1.25rem',
                        borderRadius: '0.85rem',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        onClick={() => setExpandedQuestionCard(isExpanded ? -1 : idx)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'var(--primary-lavender-subtle)',
                            color: 'var(--primary-lavender)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontSize: '0.85rem'
                          }}>
                            Q{idx + 1}
                          </span>
                          <div>
                            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>
                              {originalQ.question}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Category: {qEval.category || originalQ.category}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span className="badge" style={{
                            background: qEval.scoreOutOf100 >= 75
                              ? 'var(--accent-mint-subtle)'
                              : qEval.scoreOutOf100 >= 40
                              ? 'rgba(139, 92, 246, 0.15)'
                              : 'rgba(239, 68, 68, 0.12)',
                            color: qEval.scoreOutOf100 >= 75
                              ? 'var(--accent-mint)'
                              : qEval.scoreOutOf100 >= 40
                              ? 'var(--primary-lavender)'
                              : '#ef4444',
                            fontWeight: '800',
                            fontSize: '0.8rem'
                          }}>
                            {qEval.scoreOutOf100} / 100
                          </span>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {/* Expandable Body */}
                      {isExpanded && (
                        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color-subtle)' }}>
                          {/* Candidate Response */}
                          <div style={{ marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                              Your Response:
                            </span>
                            <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                              {candidateAns}
                            </div>
                          </div>

                          {/* Evaluator Feedback */}
                          <div style={{ marginBottom: '1rem', background: 'rgba(139, 92, 246, 0.06)', padding: '0.85rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--primary-lavender)' }}>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--primary-lavender)', display: 'block', marginBottom: '0.2rem' }}>
                              Evaluator Feedback:
                            </strong>
                            <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', margin: 0, lineHeight: '1.4' }}>
                              {qEval.feedback}
                            </p>
                          </div>

                          {/* Missed Key Concepts */}
                          {qEval.keyMissedConcepts?.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#eab308', fontWeight: '800', display: 'block', marginBottom: '0.3rem' }}>
                                Missed Concepts or Optimization Opportunities:
                              </span>
                              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                {qEval.keyMissedConcepts.map((m, mIdx) => (
                                  <li key={mIdx}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Ideal Bar-Raiser Answer */}
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                              Ideal Model Answer:
                            </span>
                            <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '0.85rem', borderRadius: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.5', borderLeft: '3px solid var(--accent-mint)' }}>
                              {qEval.modelAnswerComparison || originalQ.idealAnswer}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bottom Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  stopMediaStreams();
                  setStage('DOMAIN_SELECTION');
                }}
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RotateCcw size={18} /> Practice Another Tech Stack
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
