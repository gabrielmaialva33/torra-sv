import {apiClient} from '../client';
import {mockDelay, mockError, mockSuccess, mockTrackingData, paginate} from '../mocks';

/**
 * Tracking service
 * Handles order tracking and management
 */
class TrackingService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Get orders with filters
     * @param {Object} filters
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getOrders(filters = {}) {
        if (this.useMock) {
            await mockDelay(600);

            let orders = [...mockTrackingData.orders];

            // Apply filters
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                orders = orders.filter(order =>
                    order.code.includes(searchLower) ||
                    order.customerName.toLowerCase().includes(searchLower) ||
                    order.customerCpf.includes(searchLower)
                );
            }

            if (filters.status && filters.status !== 'all') {
                orders = orders.filter(order => order.status === filters.status);
            }

            if (filters.dateFrom) {
                orders = orders.filter(order =>
                    new Date(order.createdAt) >= new Date(filters.dateFrom)
                );
            }

            if (filters.dateTo) {
                orders = orders.filter(order =>
                    new Date(order.createdAt) <= new Date(filters.dateTo)
                );
            }

            // Sort by date desc
            orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const paginatedData = paginate(orders, filters.page || 1, filters.limit || 20);

            return mockSuccess(paginatedData);
        }

        try {
            const response = await apiClient.get('/tracking/orders', {
                params: filters
            });
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Get order details
     * @param {string} orderId
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getOrderDetails(orderId) {
        if (this.useMock) {
            await mockDelay(500);

            const orderDetails = mockTrackingData.getOrderDetails(orderId);
            if (!orderDetails) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            return mockSuccess(orderDetails);
        }

        try {
            const response = await apiClient.get(`/tracking/orders/${orderId}`);
            return mockSuccess(response.data);
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Update order
     * @param {string} orderId
     * @param {Object} data
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async updateOrder(orderId, data) {
        if (this.useMock) {
            await mockDelay(800);

            const orderIndex = mockTrackingData.orders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Update mock data
            mockTrackingData.orders[orderIndex] = {
                ...mockTrackingData.orders[orderIndex],
                ...data,
                updatedAt: new Date().toISOString()
            };

            return mockSuccess(mockTrackingData.orders[orderIndex], 'Pedido atualizado com sucesso');
        }

        try {
            const response = await apiClient.put(`/tracking/orders/${orderId}`, data);
            return mockSuccess(response.data, 'Pedido atualizado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Cancel order
     * @param {string} orderId
     * @param {string} reason
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async cancelOrder(orderId, reason) {
        if (this.useMock) {
            await mockDelay(1000);

            const orderIndex = mockTrackingData.orders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Update order status
            mockTrackingData.orders[orderIndex] = {
                ...mockTrackingData.orders[orderIndex],
                status: 'cancelled',
                cancelReason: reason,
                cancelledAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            return mockSuccess(
                mockTrackingData.orders[orderIndex],
                'Pedido cancelado com sucesso'
            );
        }

        try {
            const response = await apiClient.post(`/tracking/orders/${orderId}/cancel`, {
                reason
            });
            return mockSuccess(response.data, 'Pedido cancelado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }

    /**
     * Update order status
     * @param {string} orderId
     * @param {string} status
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async updateOrderStatus(orderId, status) {
        if (this.useMock) {
            await mockDelay(700);

            const orderIndex = mockTrackingData.orders.findIndex(o => o.id === orderId);
            if (orderIndex === -1) {
                return mockError('Pedido não encontrado', 'ORDER_NOT_FOUND');
            }

            // Update order status
            mockTrackingData.orders[orderIndex] = {
                ...mockTrackingData.orders[orderIndex],
                status,
                updatedAt: new Date().toISOString()
            };

            return mockSuccess(
                mockTrackingData.orders[orderIndex],
                'Status atualizado com sucesso'
            );
        }

        try {
            const response = await apiClient.patch(`/tracking/orders/${orderId}/status`, {
                status
            });
            return mockSuccess(response.data, 'Status atualizado com sucesso');
        } catch (error) {
            return mockError(error.message);
        }
    }
}

export const trackingService = new TrackingService();
