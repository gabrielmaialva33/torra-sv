/**
 * Global application state management
 */
import {writable} from 'svelte/store';

// Sidebar state
export const sidebarOpen = writable(true);

// Loading state
export const isLoading = writable(false);

// Notifications
function createNotificationStore() {
    const {subscribe, set, update} = writable([]);
    let nextId = 1;

    return {
        subscribe,
        add: (notification) => {
            const id = nextId++;
            const newNotification = {
                id,
                type: 'info',
                duration: 5000,
                ...notification,
                timestamp: new Date()
            };

            update(n => [...n, newNotification]);

            // Auto-remove after duration
            if (newNotification.duration > 0) {
                setTimeout(() => {
                    update(n => n.filter(item => item.id !== id));
                }, newNotification.duration);
            }

            return id;
        },
        remove: (id) => update(n => n.filter(item => item.id !== id)),
        clear: () => set([])
    };
}

export const notifications = createNotificationStore();

// Theme
export const theme = writable('light');

// Current page/route
export const currentRoute = writable('/dashboard');