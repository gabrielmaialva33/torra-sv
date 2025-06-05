/**
 * Application router configuration
 * Uses svelte-spa-router for client-side routing
 */
import { wrap } from 'svelte-spa-router/wrap';
import { get } from 'svelte/store';
import { authStore } from '../stores/auth.store';

// Lazy load all routes for better performance
const routes = {
  // Public routes
  '/': wrap({
    asyncComponent: () => import('../features/auth/pages/LoginPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return !auth.isAuthenticated;
    }
  }),
  
  '/login': wrap({
    asyncComponent: () => import('../features/auth/pages/LoginPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return !auth.isAuthenticated;
    }
  }),
  
  // Protected routes
  '/dashboard': wrap({
    asyncComponent: () => import('../features/dashboard/pages/DashboardPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/tracking': wrap({
    asyncComponent: () => import('../features/tracking/pages/TrackingPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/receiving': wrap({
    asyncComponent: () => import('../features/receiving/pages/ReceivingPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/storage': wrap({
    asyncComponent: () => import('../features/storage/pages/StoragePage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/pickup': wrap({
    asyncComponent: () => import('../features/pickup/pages/PickupPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/lockers': wrap({
    asyncComponent: () => import('../features/locker/pages/LockerPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/config/stores': wrap({
    asyncComponent: () => import('../features/config/pages/StoresConfigPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated && auth.user?.role === 'admin';
    }
  }),
  
  '/config/users': wrap({
    asyncComponent: () => import('../features/config/pages/UsersConfigPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated && auth.user?.role === 'admin';
    }
  }),
  
  '/support': wrap({
    asyncComponent: () => import('../features/support/pages/SupportPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  '/reports': wrap({
    asyncComponent: () => import('../features/reports/pages/ReportsPage.svelte'),
    conditions: () => {
      const auth = get(authStore);
      return auth.isAuthenticated;
    }
  }),
  
  // Fallback
  '*': wrap({
    asyncComponent: () => import('../layouts/NotFound.svelte')
  })
};

// Route guards
export function requireAuth() {
  const auth = get(authStore);
  if (!auth.isAuthenticated) {
    return '/login';
  }
  return true;
}

export function requireAdmin() {
  const auth = get(authStore);
  if (!auth.isAuthenticated || auth.user?.role !== 'admin') {
    return '/dashboard';
  }
  return true;
}

export default routes;