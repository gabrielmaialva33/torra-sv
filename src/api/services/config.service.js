import {apiClient} from '../client';
import {mockConfigData, mockDelay, mockError, mockSuccess} from '../mocks';

/**
 * Configuration service
 * Handles system configuration operations
 */
class ConfigService {
    constructor() {
        this.useMock = import.meta.env.DEV || !import.meta.env.VITE_API_URL || import.meta.env.VITE_USE_MOCKS === "true";
    }

    /**
     * Get all stores
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStores() {
        if (this.useMock) {
            await mockDelay(500);

            // Map to UI format
            const stores = mockConfigData.stores.map(store => ({
                id: store.id,
                name: store.name,
                cnpj: store.cnpj,
                address: `${store.address.street}, ${store.address.number}${store.address.complement ? ' - ' + store.address.complement : ''}`,
                city: store.address.city,
                state: store.address.state,
                zipCode: store.address.zipCode,
                phone: store.phone,
                manager: store.manager.name,
                openingHours: this.formatBusinessHours(store.businessHours),
                active: store.active
            }));

            return mockSuccess(stores);
        }

        try {
            const response = await apiClient.get('/config/stores');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get store by ID
     * @param {string} storeId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStore(storeId) {
        if (this.useMock) {
            await mockDelay(400);

            const store = mockConfigData.getStoreById(storeId);
            if (!store) {
                return mockError('Loja não encontrada', 'STORE_NOT_FOUND');
            }

            return mockSuccess(store);
        }

        try {
            const response = await apiClient.get(`/config/stores/${storeId}`);
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Create new store
     * @param {Object} storeData
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async createStore(storeData) {
        if (this.useMock) {
            await mockDelay(800);

            // Check if CNPJ already exists
            const exists = mockConfigData.stores.some(s => s.cnpj === storeData.cnpj);
            if (exists) {
                return mockError('CNPJ já cadastrado', 'CNPJ_EXISTS');
            }

            // Create store data in the expected format
            const newStore = mockConfigData.createStore({
                name: storeData.name,
                cnpj: storeData.cnpj,
                address: {
                    street: storeData.address.split(',')[0] || '',
                    number: storeData.address.split(',')[1]?.trim() || '',
                    complement: '',
                    neighborhood: '',
                    city: storeData.city,
                    state: storeData.state,
                    zipCode: storeData.zipCode
                },
                phone: storeData.phone,
                email: `${storeData.name.toLowerCase().replace(/\s+/g, '')}@lojastorra.com.br`,
                manager: {
                    id: 0,
                    name: storeData.manager
                },
                businessHours: this.parseBusinessHours(storeData.openingHours),
                settings: {
                    maxPickupDays: 7,
                    enableLockers: true,
                    enableSMS: true,
                    enableWhatsApp: true,
                    enableEmail: true
                }
            });

            return mockSuccess(newStore, 'Loja criada com sucesso');
        }

        try {
            const response = await apiClient.post('/config/stores', storeData);
            return mockSuccess(response.data, 'Loja criada com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Update store
     * @param {string} storeId
     * @param {Object} storeData
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async updateStore(storeId, storeData) {
        if (this.useMock) {
            await mockDelay(700);

            const updates = {
                name: storeData.name,
                cnpj: storeData.cnpj,
                address: {
                    street: storeData.address.split(',')[0] || '',
                    number: storeData.address.split(',')[1]?.trim() || '',
                    complement: '',
                    neighborhood: '',
                    city: storeData.city,
                    state: storeData.state,
                    zipCode: storeData.zipCode
                },
                phone: storeData.phone,
                manager: {
                    name: storeData.manager
                },
                businessHours: this.parseBusinessHours(storeData.openingHours),
                active: storeData.active
            };

            const updatedStore = mockConfigData.updateStore(storeId, updates);
            if (!updatedStore) {
                return mockError('Loja não encontrada', 'STORE_NOT_FOUND');
            }

            return mockSuccess(updatedStore, 'Loja atualizada com sucesso');
        }

        try {
            const response = await apiClient.put(`/config/stores/${storeId}`, storeData);
            return mockSuccess(response.data, 'Loja atualizada com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Delete store
     * @param {string} storeId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async deleteStore(storeId) {
        if (this.useMock) {
            await mockDelay(600);

            const index = mockConfigData.stores.findIndex(s => s.id === storeId);
            if (index === -1) {
                return mockError('Loja não encontrada', 'STORE_NOT_FOUND');
            }

            mockConfigData.stores.splice(index, 1);
            return mockSuccess(null, 'Loja excluída com sucesso');
        }

        try {
            const response = await apiClient.delete(`/config/stores/${storeId}`);
            return mockSuccess(response.data, 'Loja excluída com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get all users
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getUsers() {
        if (this.useMock) {
            await mockDelay(500);
            return mockSuccess(mockConfigData.users);
        }

        try {
            const response = await apiClient.get('/config/users');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Create new user
     * @param {Object} userData
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async createUser(userData) {
        if (this.useMock) {
            await mockDelay(800);

            // Check if email already exists
            const exists = mockConfigData.users.some(u => u.email === userData.email);
            if (exists) {
                return mockError('E-mail já cadastrado', 'EMAIL_EXISTS');
            }

            const newUser = mockConfigData.createUser(userData);
            return mockSuccess(newUser, 'Usuário criado com sucesso');
        }

        try {
            const response = await apiClient.post('/config/users', userData);
            return mockSuccess(response.data, 'Usuário criado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Update user
     * @param {number} userId
     * @param {Object} userData
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async updateUser(userId, userData) {
        if (this.useMock) {
            await mockDelay(700);

            const updatedUser = mockConfigData.updateUser(userId, userData);
            if (!updatedUser) {
                return mockError('Usuário não encontrado', 'USER_NOT_FOUND');
            }

            return mockSuccess(updatedUser, 'Usuário atualizado com sucesso');
        }

        try {
            const response = await apiClient.put(`/config/users/${userId}`, userData);
            return mockSuccess(response.data, 'Usuário atualizado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Delete user
     * @param {number} userId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async deleteUser(userId) {
        if (this.useMock) {
            await mockDelay(600);

            const index = mockConfigData.users.findIndex(u => u.id === userId);
            if (index === -1) {
                return mockError('Usuário não encontrado', 'USER_NOT_FOUND');
            }

            mockConfigData.users.splice(index, 1);
            return mockSuccess(null, 'Usuário excluído com sucesso');
        }

        try {
            const response = await apiClient.delete(`/config/users/${userId}`);
            return mockSuccess(response.data, 'Usuário excluído com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Helper to format business hours
     */
    formatBusinessHours(businessHours) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const sameDays = days.filter(day =>
            businessHours[day] &&
            businessHours[day].open === businessHours.monday.open &&
            businessHours[day].close === businessHours.monday.close
        );

        if (sameDays.length === 5 && !businessHours.saturday && !businessHours.sunday) {
            return `Seg-Sex: ${businessHours.monday.open} - ${businessHours.monday.close}`;
        } else if (sameDays.length === 7) {
            return `Todos os dias: ${businessHours.monday.open} - ${businessHours.monday.close}`;
        } else {
            return `${businessHours.monday.open} - ${businessHours.monday.close}`;
        }
    }

    /**
     * Helper to parse business hours
     */
    parseBusinessHours(hoursString) {
        const [open, close] = hoursString.split(' - ');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const hours = {};

        days.forEach(day => {
            hours[day] = {open, close};
        });

        return hours;
    }
}

export const configService = new ConfigService();
