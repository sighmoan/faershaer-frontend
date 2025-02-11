/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EventImport } from './routes/_event'

// Create Virtual Routes

const CreateEventLazyImport = createFileRoute('/create-event')()
const IndexLazyImport = createFileRoute('/')()
const EventEventSlugTransactionsLazyImport = createFileRoute(
  '/_event/$eventSlug/transactions',
)()
const EventEventSlugReimbursementsLazyImport = createFileRoute(
  '/_event/$eventSlug/reimbursements',
)()
const EventEventSlugBalancesLazyImport = createFileRoute(
  '/_event/$eventSlug/balances',
)()

// Create/Update Routes

const CreateEventLazyRoute = CreateEventLazyImport.update({
  path: '/create-event',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/create-event.lazy').then((d) => d.Route))

const EventRoute = EventImport.update({
  id: '/_event',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const EventEventSlugTransactionsLazyRoute =
  EventEventSlugTransactionsLazyImport.update({
    path: '/$eventSlug/transactions',
    getParentRoute: () => EventRoute,
  } as any).lazy(() =>
    import('./routes/_event/$eventSlug/transactions.lazy').then((d) => d.Route),
  )

const EventEventSlugReimbursementsLazyRoute =
  EventEventSlugReimbursementsLazyImport.update({
    path: '/$eventSlug/reimbursements',
    getParentRoute: () => EventRoute,
  } as any).lazy(() =>
    import('./routes/_event/$eventSlug/reimbursements.lazy').then(
      (d) => d.Route,
    ),
  )

const EventEventSlugBalancesLazyRoute = EventEventSlugBalancesLazyImport.update(
  {
    path: '/$eventSlug/balances',
    getParentRoute: () => EventRoute,
  } as any,
).lazy(() =>
  import('./routes/_event/$eventSlug/balances.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_event': {
      id: '/_event'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof EventImport
      parentRoute: typeof rootRoute
    }
    '/create-event': {
      id: '/create-event'
      path: '/create-event'
      fullPath: '/create-event'
      preLoaderRoute: typeof CreateEventLazyImport
      parentRoute: typeof rootRoute
    }
    '/_event/$eventSlug/balances': {
      id: '/_event/$eventSlug/balances'
      path: '/$eventSlug/balances'
      fullPath: '/$eventSlug/balances'
      preLoaderRoute: typeof EventEventSlugBalancesLazyImport
      parentRoute: typeof EventImport
    }
    '/_event/$eventSlug/reimbursements': {
      id: '/_event/$eventSlug/reimbursements'
      path: '/$eventSlug/reimbursements'
      fullPath: '/$eventSlug/reimbursements'
      preLoaderRoute: typeof EventEventSlugReimbursementsLazyImport
      parentRoute: typeof EventImport
    }
    '/_event/$eventSlug/transactions': {
      id: '/_event/$eventSlug/transactions'
      path: '/$eventSlug/transactions'
      fullPath: '/$eventSlug/transactions'
      preLoaderRoute: typeof EventEventSlugTransactionsLazyImport
      parentRoute: typeof EventImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  EventRoute: EventRoute.addChildren({
    EventEventSlugBalancesLazyRoute,
    EventEventSlugReimbursementsLazyRoute,
    EventEventSlugTransactionsLazyRoute,
  }),
  CreateEventLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_event",
        "/create-event"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_event": {
      "filePath": "_event.tsx",
      "children": [
        "/_event/$eventSlug/balances",
        "/_event/$eventSlug/reimbursements",
        "/_event/$eventSlug/transactions"
      ]
    },
    "/create-event": {
      "filePath": "create-event.lazy.tsx"
    },
    "/_event/$eventSlug/balances": {
      "filePath": "_event/$eventSlug/balances.lazy.tsx",
      "parent": "/_event"
    },
    "/_event/$eventSlug/reimbursements": {
      "filePath": "_event/$eventSlug/reimbursements.lazy.tsx",
      "parent": "/_event"
    },
    "/_event/$eventSlug/transactions": {
      "filePath": "_event/$eventSlug/transactions.lazy.tsx",
      "parent": "/_event"
    }
  }
}
ROUTE_MANIFEST_END */
