/**
 * Store for authentication state management
 */
import {derived, writable} from 'svelte/store';

// User store
function createUserStore() {
    const {subscribe, set, update} = writable(null);

    return {
        subscribe,
        login: (userData) => {
            set(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout: () => {
            set(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        updateProfile: (updates) => update(user => ({...user, ...updates})),
        loadFromStorage: () => {
            const stored = localStorage.getItem('user');
            if (stored) {
                set(JSON.parse(stored));
            }
        }
    };
}

// Auth token store
function createAuthTokenStore() {
    const {subscribe, set} = writable(null);

    return {
        subscribe,
        setToken: (token) => {
            set(token);
            localStorage.setItem('token', token);
        },
        clearToken: () => {
            set(null);
            localStorage.removeItem('token');
        },
        loadFromStorage: () => {
            const token = localStorage.getItem('token');
            if (token) {
                set(token);
            }
        }
    };
}

export const user = createUserStore();
export const authToken = createAuthTokenStore();

// Derived store for authentication status
export const isAuthenticated = derived(
    [user, authToken],
    ([$user, $authToken]) => !!$user && !!$authToken
);

// Initialize from localStorage
if (typeof window !== 'undefined') {
    user.loadFromStorage();
    authToken.loadFromStorage();
}