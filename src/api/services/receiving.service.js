import {apiClient} from '../client';
import {mockDelay, mockError, mockReceivingData, mockSuccess, paginate} from '../mocks';

/**
 * Receiving service
 * Handles order receiving operations
 */
class ReceivingService {
    constructor() {
        this.useMock = true;
    }

    /**
     * Get pending orders
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getPendingOrders() {
        if (this.useMock) {
            await mockDelay(600);

            const paginatedData = paginate(mockReceivingData.pendingOrders, 1, 50);
            return mockSuccess(paginatedData);
        }

        try {
            const response = await apiClient.get('/receiving/pending');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get received orders
     * @param {Object} filters
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getReceivedOrders(filters = {}) {
        if (this.useMock) {
            await mockDelay(500);

            let orders = [...mockReceivingData.receivedOrders];

            // Filter by date if provided
            if (filters.date) {
                const filterDate = new Date(filters.date).toDateString();
                orders = orders.filter(order =>
                    new Date(order.receivedAt).toDateString() === filterDate
                );
            }

            const paginatedData = paginate(orders, filters.page || 1, filters.limit || 50);
            return mockSuccess(paginatedData);
        }

        try {
            const response = await apiClient.get('/receiving/received', {
                params: filters
            });
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get receiving stats
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStats() {
        if (this.useMock) {
            await mockDelay(400);
            return mockSuccess(mockReceivingData.stats);
        }

        try {
            const response = await apiClient.get('/receiving/stats');
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get order items for receiving
     * @param {string} orderId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getOrderItems(orderId) {
        if (this.useMock) {
            await mockDelay(500);

            const items = mockReceivingData.getOrderItems(orderId);
            return mockSuccess(items);
        }

        try {
            const response = await apiClient.get(`/receiving/orders/${orderId}/items`);
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Receive order
     * @param {string} orderId
     * @param {Object} data
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async receiveOrder(orderId, data = {}) {
        if (this.useMock) {
            await mockDelay(1000);

            // Find order in pending list
            const orderIndex = mockReceivingData.pendingOrders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Move to received list
            const order = mockReceivingData.pendingOrders.splice(orderIndex, 1)[0];
            order.status = 'received';
            order.receivedAt = new Date().toISOString();
            order.receivedBy = 'Usuário Atual';

            mockReceivingData.receivedOrders.unshift(order);

            // Update stats
            mockReceivingData.stats.pendingCount--;
            mockReceivingData.stats.receivedToday++;

            return mockSuccess(order, 'Pedido recebido com sucesso');
        }

        try {
            const response = await apiClient.post(`/receiving/orders/${orderId}/receive`, data);
            return mockSuccess(response.data, 'Pedido recebido com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Reject order
     * @param {string} orderId
     * @param {string} reason
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async rejectOrder(orderId, reason) {
        if (this.useMock) {
            await mockDelay(800);

            // Find order in pending list
            const orderIndex = mockReceivingData.pendingOrders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Remove from pending list
            const order = mockReceivingData.pendingOrders.splice(orderIndex, 1)[0];
            order.status = 'rejected';
            order.rejectedAt = new Date().toISOString();
            order.rejectedBy = 'Usuário Atual';
            order.rejectReason = reason;

            // Update stats
            mockReceivingData.stats.pendingCount--;

            return mockSuccess(order, 'Pedido rejeitado');
        }

        try {
            const response = await apiClient.post(`/receiving/orders/${orderId}/reject`, {
                reason
            });
            return mockSuccess(response.data, 'Pedido rejeitado');
        } catch (error) {
            return mockError(error.message);
        }
    }
}

export const receivingService = new ReceivingService();
