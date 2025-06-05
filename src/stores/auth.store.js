import { writable, derived } from 'svelte/store';
import { push } from 'svelte-spa-router';
import { authService } from '../api/services/auth.service';

/**
 * Authentication store
 * Manages user authentication state and operations
 */
function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Load saved session from localStorage
  const loadSession = () => {
    try {
      const savedSession = localStorage.getItem('torra_session');
      if (savedSession) {
        const session = JSON.parse(savedSession);
        set({
          user: session.user,
          token: session.token,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      localStorage.removeItem('torra_session');
    }
  };

  // Save session to localStorage
  const saveSession = (user, token) => {
    try {
      localStorage.setItem('torra_session', JSON.stringify({ user, token }));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  // Clear session from localStorage
  const clearSession = () => {
    localStorage.removeItem('torra_session');
  };

  return {
    subscribe,
    
    /**
     * Login user
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
      update(state => ({ ...state, isLoading: true, error: null }));
      
      try {
        const response = await authService.login(username, password);
        
        if (response.success) {
          const { user, token } = response.data;
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          saveSession(user, token);
          push('/dashboard');
          
          return { success: true };
        } else {
          update(state => ({
            ...state,
            isLoading: false,
            error: response.error || 'Login failed'
          }));
          
          return { success: false, error: response.error };
        }
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: 'Network error. Please try again.'
        }));
        
        return { success: false, error: error.message };
      }
    },
    
    /**
     * Logout user
     */
    logout() {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
      clearSession();
      push('/login');
    },
    
    /**
     * Update user profile
     * @param {object} userData
     */
    updateUser(userData) {
      update(state => {
        const updatedUser = { ...state.user, ...userData };
        if (state.token) {
          saveSession(updatedUser, state.token);
        }
        return {
          ...state,
          user: updatedUser
        };
      });
    },
    
    /**
     * Clear error message
     */
    clearError() {
      update(state => ({ ...state, error: null }));
    },
    
    /**
     * Initialize store
     */
    init() {
      loadSession();
    }
  };
}

export const authStore = createAuthStore();

// Derived stores for easy access
export const currentUser = derived(authStore, $auth => $auth.user);
export const isAuthenticated = derived(authStore, $auth => $auth.isAuthenticated);
export const authError = derived(authStore, $auth => $auth.error);
export const isLoading = derived(authStore, $auth => $auth.isLoading);