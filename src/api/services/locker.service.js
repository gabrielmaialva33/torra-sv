import {apiClient} from '../client';
import {mockDelay, mockError, mockLockerData, mockSuccess} from '../mocks';

/**
 * Locker service
 * Handles locker management operations
 */
class LockerService {
    constructor() {
        this.useMock = true;
    }

    /**
     * Get all lockers
     * @param {Object} filters
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getLockers(filters = {}) {
        if (this.useMock) {
            await mockDelay(500);

            let lockers = [...mockLockerData.lockers];

            // Apply filters
            if (filters.status && filters.status !== 'all') {
                lockers = lockers.filter(locker => locker.status === filters.status);
            }

            if (filters.size && filters.size !== 'all') {
                // Map sizes to match the UI
                const sizeMap = {
                    'P': 'small',
                    'M': 'medium',
                    'G': 'large'
                };
                const mappedSize = sizeMap[filters.size];
                if (mappedSize) {
                    lockers = lockers.filter(locker => locker.size === mappedSize);
                }
            }

            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                lockers = lockers.filter(locker =>
                    locker.code.toLowerCase().includes(searchLower) ||
                    locker.number.includes(searchLower)
                );
            }

            // Map to UI format
            const mappedLockers = lockers.map(locker => ({
                id: locker.id,
                number: locker.number,
                size: locker.size === 'small' ? 'P' : locker.size === 'medium' ? 'M' : 'G',
                status: locker.status,
                order: locker.currentOrder ? {
                    code: locker.currentOrder.orderNumber,
                    customerName: locker.currentOrder.customer,
                    storedAt: locker.currentOrder.storedAt
                } : null
            }));

            return mockSuccess(mappedLockers);
        }

        try {
            const response = await apiClient.get('/lockers', {
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
    async getStats() {
        if (this.useMock) {
            await mockDelay(400);
            const stats = mockLockerData.getStats();
            return mockSuccess({
                total: stats.total,
                available: stats.available,
                occupied: stats.occupied,
                maintenance: stats.maintenance,
                occupancyRate: stats.occupancyRate
            });
        }

        try {
            const response = await apiClient.get('/lockers/stats');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Create new locker(s)
     * @param {Array} lockers
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async createLocker(lockers) {
        if (this.useMock) {
            await mockDelay(800);

            const createdLockers = [];

            for (const lockerData of lockers) {
                // Check if locker number already exists
                const exists = mockLockerData.lockers.some(l => l.number === lockerData.number);
                if (exists) {
                    return mockError(`Locker ${lockerData.number} já existe`, 'LOCKER_EXISTS');
                }

                // Map size from UI to mock format
                const sizeMap = {
                    'P': 'small',
                    'M': 'medium',
                    'G': 'large'
                };

                const newLocker = {
                    id: `LOCK-${String(mockLockerData.lockers.length + 1).padStart(3, '0')}`,
                    code: `L${String(lockerData.number).padStart(3, '0')}`,
                    section: lockerData.size === 'P' || lockerData.size === 'M' ? 'A' : 'B',
                    number: String(lockerData.number).padStart(3, '0'),
                    size: sizeMap[lockerData.size] || 'medium',
                    status: 'available',
                    store: {
                        id: 'STORE-001',
                        name: 'Loja Centro'
                    },
                    dimensions: {
                        width: lockerData.size === 'P' ? 30 : lockerData.size === 'M' ? 40 : 50,
                        height: lockerData.size === 'P' ? 30 : lockerData.size === 'M' ? 40 : 60,
                        depth: lockerData.size === 'P' ? 40 : lockerData.size === 'M' ? 50 : 60
                    },
                    currentOrder: null,
                    temperature: 22.5,
                    lastMaintenance: new Date().toISOString()
                };

                mockLockerData.lockers.push(newLocker);
                createdLockers.push(newLocker);
            }

            return mockSuccess(createdLockers, 'Locker(s) criado(s) com sucesso');
        }

        try {
            const response = await apiClient.post('/lockers/batch', lockers);
            return mockSuccess(response.data, 'Locker(s) criado(s) com sucesso');
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
    async updateStatus(lockerId, status) {
        if (this.useMock) {
            await mockDelay(600);

            const locker = mockLockerData.getLockerById(lockerId);
            if (!locker) {
                return mockError('Locker não encontrado', 'LOCKER_NOT_FOUND');
            }

            if (status === 'maintenance') {
                const result = mockLockerData.setMaintenance(lockerId, 'Manutenção solicitada via sistema');
                return mockSuccess(result, 'Locker colocado em manutenção');
            } else if (status === 'available' && locker.status === 'maintenance') {
                locker.status = 'available';
                locker.maintenanceNotes = null;
                return mockSuccess(locker, 'Locker liberado da manutenção');
            }

            return mockError('Operação não permitida');
        }

        try {
            const response = await apiClient.patch(`/lockers/${lockerId}/status`, {
                status
            });
            return mockSuccess(response.data, 'Status atualizado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Delete locker
     * @param {string} lockerId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async deleteLocker(lockerId) {
        if (this.useMock) {
            await mockDelay(700);

            const index = mockLockerData.lockers.findIndex(l => l.id === lockerId);
            if (index === -1) {
                return mockError('Locker não encontrado', 'LOCKER_NOT_FOUND');
            }

            const locker = mockLockerData.lockers[index];
            if (locker.status === 'occupied') {
                return mockError('Não é possível excluir locker ocupado', 'LOCKER_OCCUPIED');
            }

            mockLockerData.lockers.splice(index, 1);
            return mockSuccess(null, 'Locker excluído com sucesso');
        }

        try {
            const response = await apiClient.delete(`/lockers/${lockerId}`);
            return mockSuccess(response.data, 'Locker excluído com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }
}

export const lockerService = new LockerService();
