import {apiClient} from '../client';
import {mockSupportData} from '../mocks/support.mock';

/**
 * Support service
 * Handles all support/SAC-related API calls
 */
class SupportService {
    constructor() {
        this.useMock = import.meta.env.DEV;
    }

    /**
     * Get support tickets
     * @param {object} filters
     * @returns {Promise<any>}
     */
    async getTickets(filters = {}) {
        if (this.useMock) {
            return mockSupportData.getTickets(filters);
        }

        try {
            const response = await apiClient.get('/support/tickets', {params: filters});
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get ticket by ID
     * @param {string} ticketId
     * @returns {Promise<any>}
     */
    async getTicketById(ticketId) {
        if (this.useMock) {
            return mockSupportData.getTicketById(ticketId);
        }

        try {
            const response = await apiClient.get(`/support/tickets/${ticketId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Create new support ticket
     * @param {object} ticketData
     * @returns {Promise<any>}
     */
    async createTicket(ticketData) {
        if (this.useMock) {
            return mockSupportData.createTicket(ticketData);
        }

        try {
            const response = await apiClient.post('/support/tickets', ticketData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error creating ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Update ticket
     * @param {string} ticketId
     * @param {object} updates
     * @returns {Promise<any>}
     */
    async updateTicket(ticketId, updates) {
        if (this.useMock) {
            return mockSupportData.updateTicket(ticketId, updates);
        }

        try {
            const response = await apiClient.put(`/support/tickets/${ticketId}`, updates);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error updating ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Add comment to ticket
     * @param {string} ticketId
     * @param {string} comment
     * @returns {Promise<any>}
     */
    async addComment(ticketId, comment) {
        if (this.useMock) {
            return mockSupportData.addComment(ticketId, comment);
        }

        try {
            const response = await apiClient.post(`/support/tickets/${ticketId}/comments`, {
                comment
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error adding comment:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get FAQs
     * @returns {Promise<any>}
     */
    async getFAQs() {
        if (this.useMock) {
            return mockSupportData.getFAQs();
        }

        try {
            const response = await apiClient.get('/support/faqs');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export const supportService = new SupportService();
