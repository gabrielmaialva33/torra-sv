import {apiClient} from '../client';
import {mockDelay, mockError, mockStorageData, mockSuccess, paginate} from '../mocks';

/**
 * Storage service
 * Handles locker and storage operations
 */
class StorageService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Get all lockers
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getLockers() {
        if (this.useMock) {
            await mockDelay(500);
            return mockSuccess(mockStorageData.lockers);
        }

        try {
            const response = await apiClient.get('/storage/lockers');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get stored orders
     * @param {Object} filters
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStoredOrders(filters = {}) {
        if (this.useMock) {
            await mockDelay(600);

            let orders = [...mockStorageData.storedOrders];

            // Apply filters
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                orders = orders.filter(order =>
                    order.code.includes(searchLower) ||
                    order.customerName.toLowerCase().includes(searchLower)
                );
            }

            if (filters.status && filters.status !== 'all') {
                if (filters.status === 'available') {
                    orders = orders.filter(order => !order.lockerNumber);
                } else if (filters.status === 'occupied') {
                    orders = orders.filter(order => order.lockerNumber);
                }
            }

            if (filters.locker && filters.locker !== 'all') {
                orders = orders.filter(order =>
                    order.lockerNumber === filters.locker.replace('LOCK', '')
                );
            }

            const paginatedData = paginate(orders, filters.page || 1, filters.limit || 50);
            return mockSuccess(paginatedData);
        }

        try {
            const response = await apiClient.get('/storage/orders', {
                params: filters
            });
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get locker statistics
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getLockerStats() {
        if (this.useMock) {
            await mockDelay(400);
            return mockSuccess(mockStorageData.getLockerStats());
        }

        try {
            const response = await apiClient.get('/storage/stats');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Assign order to locker
     * @param {string} orderId
     * @param {string} lockerId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async assignLocker(orderId, lockerId) {
        if (this.useMock) {
            await mockDelay(800);

            // Find locker
            const locker = mockStorageData.lockers.find(l => l.id === lockerId);
            if (!locker) {
                return mockError('Locker não encontrado', 'LOCKER_NOT_FOUND');
            }

            if (locker.status !== 'available') {
                return mockError('Locker não está disponível', 'LOCKER_NOT_AVAILABLE');
            }

            // Find order
            const order = mockStorageData.storedOrders.find(o => o.id === orderId);
            if (!order) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Update locker
            locker.status = 'occupied';
            locker.order = {
                id: order.id,
                code: order.code,
                customerName: order.customerName,
                storedAt: new Date().toISOString()
            };

            // Update order
            order.lockerNumber = locker.number;
            order.storedAt = new Date().toISOString();
            order.status = 'stored';

            return mockSuccess(
                {locker, order},
                'Locker atribuído com sucesso'
            );
        }

        try {
            const response = await apiClient.post('/storage/assign', {
                orderId,
                lockerId
            });
            return mockSuccess(response.data, 'Locker atribuído com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Release locker
     * @param {string} lockerId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async releaseLocker(lockerId) {
        if (this.useMock) {
            await mockDelay(700);

            // Find locker
            const locker = mockStorageData.lockers.find(l => l.id === lockerId);
            if (!locker) {
                return mockError('Locker não encontrado', 'LOCKER_NOT_FOUND');
            }

            if (locker.status !== 'occupied') {
                return mockError('Locker não está ocupado', 'LOCKER_NOT_OCCUPIED');
            }

            // Update locker
            locker.status = 'available';
            locker.order = null;

            return mockSuccess(locker, 'Locker liberado com sucesso');
        }

        try {
            const response = await apiClient.post(`/storage/lockers/${lockerId}/release`);
            return mockSuccess(response.data, 'Locker liberado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Update locker status
     * @param {string} lockerId
     * @param {string} status
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async updateLockerStatus(lockerId, status) {
        if (this.useMock) {
            await mockDelay(600);

            const locker = mockStorageData.lockers.find(l => l.id === lockerId);
            if (!locker) {
                return mockError('Locker não encontrado', 'LOCKER_NOT_FOUND');
            }

            locker.status = status;
            if (status === 'maintenance' || status === 'available') {
                locker.order = null;
            }

            return mockSuccess(locker, 'Status do locker atualizado');
        }

        try {
            const response = await apiClient.patch(`/storage/lockers/${lockerId}/status`, {
                status
            });
            return mockSuccess(response.data, 'Status do locker atualizado');
        } catch (error) {
            return mockError(error.message);
        }
    }
}

export const storageService = new StorageService();
