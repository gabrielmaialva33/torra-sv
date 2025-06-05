import { apiClient } from '../client';
import { mockReportsData } from '../mocks/report.mock';

/**
 * Report service
 * Handles all report-related API calls
 */
class ReportService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Get reports list
     * @param {object} filters
     * @returns {Promise<any>}
     */
    async getReports(filters = {}) {
        if (this.useMock) {
            return mockReportsData.getReports(filters);
        }

        try {
            const response = await apiClient.get('/reports', { params: filters });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching reports:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get stores for reports
     * @returns {Promise<any>}
     */
    async getStores() {
        if (this.useMock) {
            return mockReportsData.getStores();
        }

        try {
            const response = await apiClient.get('/reports/stores');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching stores:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Export report
     * @param {object} filters
     * @param {string} format - 'pdf' or 'excel'
     * @returns {Promise<any>}
     */
    async exportReport(filters, format) {
        if (this.useMock) {
            return mockReportsData.exportReport(filters, format);
        }

        try {
            const response = await apiClient.post('/reports/export', {
                filters,
                format
            });
            
            // Handle file download
            if (response.data && response.data.url) {
                window.open(response.data.url, '_blank');
            }
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error exporting report:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Generate store report
     * @param {object} params
     * @returns {Promise<any>}
     */
    async generateStoreReport(params) {
        if (this.useMock) {
            return mockReportsData.generateStoreReport(params);
        }

        try {
            const response = await apiClient.post('/reports/store', params);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error generating store report:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get report statistics
     * @param {string} period - 'daily', 'weekly', 'monthly', 'yearly'
     * @returns {Promise<any>}
     */
    async getStatistics(period = 'monthly') {
        if (this.useMock) {
            return mockReportsData.getStatistics(period);
        }

        try {
            const response = await apiClient.get(`/reports/statistics/${period}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export const reportService = new ReportService();
