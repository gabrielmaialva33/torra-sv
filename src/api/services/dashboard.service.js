import {apiClient} from '../client';
import {mockDashboardData} from '../mocks/dashboard.mock';

/**
 * Dashboard service
 * Handles dashboard data and analytics
 */
class DashboardService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Get dashboard statistics
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getStats() {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 800));

            return {
                success: true,
                data: mockDashboardData.stats
            };
        }

        try {
            const response = await apiClient.get('/dashboard/stats');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get orders chart data
     * @param {string} period - 'week', 'month', 'year'
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getOrdersChart(period = 'week') {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 600));

            return {
                success: true,
                data: mockDashboardData.ordersChart[period]
            };
        }

        try {
            const response = await apiClient.get('/dashboard/orders-chart', {
                params: {period}
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get recent orders
     * @param {number} limit
     * @returns {Promise<{success: boolean, data?: object}>}
     */
    async getRecentOrders(limit = 5) {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                success: true,
                data: mockDashboardData.recentOrders.slice(0, limit)
            };
        }

        try {
            const response = await apiClient.get('/dashboard/recent-orders', {
                params: {limit}
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export const dashboardService = new DashboardService();