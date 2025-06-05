/**
 * Report mock service
 * Simulates report API responses for development
 */
export const mockReportsData = {
    /**
     * Get reports list
     * @param {object} filters
     * @returns {Promise<any>}
     */
    async getReports(filters) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const reports = [
            {
                id: 'RPT001',
                type: 'orders',
                typeLabel: 'Pedidos',
                startDate: '2024-01-01',
                endDate: '2024-01-31',
                storeName: 'Loja Centro',
                storeId: 'STR001',
                totalOrders: 245,
                totalValue: 48750.00,
                status: 'completed',
                statusLabel: 'Concluído'
            },
            {
                id: 'RPT002',
                type: 'pickups',
                typeLabel: 'Retiradas',
                startDate: '2024-01-01',
                endDate: '2024-01-31',
                storeName: 'Loja Norte',
                storeId: 'STR002',
                totalOrders: 189,
                totalValue: 37800.00,
                status: 'completed',
                statusLabel: 'Concluído'
            },
            {
                id: 'RPT003',
                type: 'storage',
                typeLabel: 'Armazenamento',
                startDate: '2024-02-01',
                endDate: '2024-02-29',
                storeName: 'Loja Sul',
                storeId: 'STR003',
                totalOrders: 156,
                totalValue: 31200.00,
                status: 'processing',
                statusLabel: 'Processando'
            },
            {
                id: 'RPT004',
                type: 'lockers',
                typeLabel: 'Lockers',
                startDate: '2024-02-01',
                endDate: '2024-02-29',
                storeName: 'Loja Centro',
                storeId: 'STR001',
                totalOrders: 78,
                totalValue: 15600.00,
                status: 'completed',
                statusLabel: 'Concluído'
            }
        ];

        // Apply filters
        let filteredReports = [...reports];

        if (filters.reportType && filters.reportType !== 'all') {
            filteredReports = filteredReports.filter(r => r.type === filters.reportType);
        }

        if (filters.store) {
            filteredReports = filteredReports.filter(r => r.storeId === filters.store);
        }

        if (filters.startDate) {
            filteredReports = filteredReports.filter(r => r.startDate >= filters.startDate);
        }

        if (filters.endDate) {
            filteredReports = filteredReports.filter(r => r.endDate <= filters.endDate);
        }

        return {
            success: true,
            data: filteredReports
        };
    },

    /**
     * Get stores for reports
     * @returns {Promise<any>}
     */
    async getStores() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            data: [
                {
                    id: 'STR001',
                    name: 'Loja Centro',
                    code: 'LC001',
                    address: 'Rua Central, 123'
                },
                {
                    id: 'STR002',
                    name: 'Loja Norte',
                    code: 'LN002',
                    address: 'Av. Norte, 456'
                },
                {
                    id: 'STR003',
                    name: 'Loja Sul',
                    code: 'LS003',
                    address: 'Rua Sul, 789'
                },
                {
                    id: 'STR004',
                    name: 'Loja Oeste',
                    code: 'LO004',
                    address: 'Av. Oeste, 321'
                }
            ]
        };
    },

    /**
     * Export report
     * @param {object} filters
     * @param {string} format
     * @returns {Promise<any>}
     */
    async exportReport(filters, format) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Exporting report:', {filters, format});

        return {
            success: true,
            data: {
                url: `https://example.com/reports/export.${format}`,
                filename: `relatorio_${new Date().getTime()}.${format}`
            }
        };
    },

    /**
     * Generate store report
     * @param {object} params
     * @returns {Promise<any>}
     */
    async generateStoreReport(params) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Generating store report:', params);

        return {
            success: true,
            data: {
                reportId: `RPT${Math.floor(Math.random() * 10000)}`,
                status: 'processing',
                message: 'Relatório sendo gerado. Você receberá um e-mail quando estiver pronto.'
            }
        };
    },

    /**
     * Get report statistics
     * @param {string} period
     * @returns {Promise<any>}
     */
    async getStatistics(period) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const statistics = {
            daily: {
                orders: 45,
                pickups: 38,
                storage: 12,
                lockers: 8,
                revenue: 8500.00
            },
            weekly: {
                orders: 315,
                pickups: 266,
                storage: 84,
                lockers: 56,
                revenue: 59500.00
            },
            monthly: {
                orders: 1260,
                pickups: 1064,
                storage: 336,
                lockers: 224,
                revenue: 238000.00
            },
            yearly: {
                orders: 15120,
                pickups: 12768,
                storage: 4032,
                lockers: 2688,
                revenue: 2856000.00
            }
        };

        return {
            success: true,
            data: statistics[period] || statistics.monthly
        };
    }
};
