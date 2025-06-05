import {apiClient} from '../client';
import {mockDelay, mockError, mockPickupData, mockSuccess} from '../mocks';

/**
 * Pickup service
 * Handles customer pickup operations
 */
class PickupService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Search orders for pickup
     * @param {string} query - Search query
     * @param {string} type - Search type (code, cpf, order)
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async searchOrders(query, type) {
        if (this.useMock) {
            await mockDelay(500);

            let results = [];

            if (type === 'code') {
                const order = mockPickupData.searchByCode(query);
                if (order) results.push(order);
            } else if (type === 'cpf') {
                results = mockPickupData.searchByCPF(query);
            } else if (type === 'order') {
                const order = mockPickupData.searchByOrderNumber(query);
                if (order) results.push(order);
            }

            return mockSuccess(results);
        }

        try {
            const response = await apiClient.get('/pickup/search', {
                params: {query, type}
            });
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get pickup stats
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStats() {
        if (this.useMock) {
            await mockDelay(400);
            return mockSuccess(mockPickupData.getStats());
        }

        try {
            const response = await apiClient.get('/pickup/stats');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Start pickup process
     * @param {string} pickupId
     * @param {number} attendantId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async startPickup(pickupId, attendantId = 1) {
        if (this.useMock) {
            await mockDelay(600);

            const pickup = mockPickupData.startPickup(pickupId, attendantId);
            if (!pickup) {
                return mockError('Pedido não encontrado', 'PICKUP_NOT_FOUND');
            }

            return mockSuccess(pickup, 'Retirada iniciada');
        }

        try {
            const response = await apiClient.post(`/pickup/${pickupId}/start`, {
                attendantId
            });
            return mockSuccess(response.data, 'Retirada iniciada');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Mark item as collected
     * @param {string} pickupId
     * @param {string} itemId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async markItemCollected(pickupId, itemId) {
        if (this.useMock) {
            await mockDelay(400);

            const pickup = mockPickupData.markItemCollected(pickupId, itemId);
            if (!pickup) {
                return mockError('Item não encontrado', 'ITEM_NOT_FOUND');
            }

            return mockSuccess(pickup);
        }

        try {
            const response = await apiClient.post(`/pickup/${pickupId}/items/${itemId}/collect`);
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Confirm pickup
     * @param {string} pickupId
     * @param {Object} verificationData
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async confirmPickup(pickupId, verificationData) {
        if (this.useMock) {
            await mockDelay(1000);

            // Convert to the expected format for mock
            const formattedData = {
                method: verificationData.method === 'document' ? 'cpf' : verificationData.method,
                documents: {
                    cpf: verificationData.document || ''
                },
                signature: null
            };

            const result = mockPickupData.completePickup(pickupId, formattedData);

            if (result.error) {
                return mockError(result.error);
            }

            return mockSuccess(result, 'Retirada confirmada com sucesso');
        }

        try {
            const response = await apiClient.post(`/pickup/${pickupId}/confirm`, verificationData);
            return mockSuccess(response.data, 'Retirada confirmada com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Send notification to customer
     * @param {string} pickupId
     * @param {string} channel - sms, whatsapp, email
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async sendNotification(pickupId, channel) {
        if (this.useMock) {
            await mockDelay(800);

            const result = mockPickupData.sendNotification(pickupId, channel);
            if (!result) {
                return mockError('Pedido não encontrado', 'PICKUP_NOT_FOUND');
            }

            return mockSuccess(result);
        }

        try {
            const response = await apiClient.post(`/pickup/${pickupId}/notify`, {
                channel
            });
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }
}

export const pickupService = new PickupService();
