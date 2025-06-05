/**
 * Mock reports data
 */

export const REPORT_TYPE = {
    ORDERS: 'orders',
    PICKUPS: 'pickups',
    STORAGE: 'storage',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial'
};

export const mockReportsData = {
    // Summary data
    summary: {
        period: {
            start: '2025-01-01',
            end: '2025-01-05'
        },
        orders: {
            total: 156,
            completed: 142,
            cancelled: 8,
            pending: 6,
            totalValue: 287650.90
        },
        pickups: {
            total: 142,
            onTime: 128,
            late: 14,
            avgPickupTime: '2.5 horas'
        },
        storage: {
            avgOccupancy: 68.5,
            peakOccupancy: 85.2,
            avgStorageTime: '3.2 dias'
        },
        performance: {
            avgProcessingTime: '45 minutos',
            customerSatisfaction: 4.7,
            supportTickets: 23,
            resolvedTickets: 19
        }
    },

    // Orders by day
    ordersByDay: [
        {date: '2025-01-01', orders: 28, value: 52340.50},
        {date: '2025-01-02', orders: 35, value: 67890.20},
        {date: '2025-01-03', orders: 32, value: 58920.40},
        {date: '2025-01-04', orders: 30, value: 54780.90},
        {date: '2025-01-05', orders: 31, value: 53718.90}
    ],

    // Orders by store
    ordersByStore: [
        {
            store: 'Loja Centro',
            orders: 78,
            value: 143825.45,
            avgTicket: 1844.04
        },
        {
            store: 'Loja Sul',
            orders: 52,
            value: 95430.20,
            avgTicket: 1835.19
        },
        {
            store: 'Loja Norte',
            orders: 26,
            value: 48395.25,
            avgTicket: 1861.35
        }
    ],

    // Top products
    topProducts: [
        {
            rank: 1,
            sku: 'PH-APP-001',
            name: 'iPhone 15 Pro Max',
            quantity: 23,
            revenue: 206897.70
        },
        {
            rank: 2,
            sku: 'NB-DELL-001',
            name: 'Notebook Dell Inspiron',
            quantity: 18,
            revenue: 62998.20
        },
        {
            rank: 3,
            sku: 'TV-SAM-001',
            name: 'Smart TV Samsung 55"',
            quantity: 15,
            revenue: 41998.50
        },
        {
            rank: 4,
            sku: 'GM-SON-001',
            name: 'PlayStation 5',
            quantity: 12,
            revenue: 47998.80
        },
        {
            rank: 5,
            sku: 'EL-BRA-001',
            name: 'Geladeira Brastemp Frost Free',
            quantity: 8,
            revenue: 25599.20
        }
    ],

    // Storage utilization
    storageUtilization: [
        {date: '2025-01-01', shelves: 65, lockers: 72, pallets: 45},
        {date: '2025-01-02', shelves: 72, lockers: 80, pallets: 52},
        {date: '2025-01-03', shelves: 68, lockers: 75, pallets: 48},
        {date: '2025-01-04', shelves: 70, lockers: 82, pallets: 55},
        {date: '2025-01-05', shelves: 66, lockers: 78, pallets: 50}
    ],

    // Pickup times distribution
    pickupTimeDistribution: [
        {range: '0-1 hora', count: 45, percentage: 31.7},
        {range: '1-2 horas', count: 38, percentage: 26.8},
        {range: '2-4 horas', count: 32, percentage: 22.5},
        {range: '4-8 horas', count: 18, percentage: 12.7},
        {range: '8+ horas', count: 9, percentage: 6.3}
    ],

    // Customer satisfaction
    customerSatisfaction: [
        {rating: 5, count: 89, percentage: 62.7},
        {rating: 4, count: 35, percentage: 24.6},
        {rating: 3, count: 12, percentage: 8.5},
        {rating: 2, count: 4, percentage: 2.8},
        {rating: 1, count: 2, percentage: 1.4}
    ],

    // Support tickets by category
    supportTicketsByCategory: [
        {category: 'Problema na Retirada', count: 8},
        {category: 'Atraso na Entrega', count: 5},
        {category: 'Produto Errado', count: 3},
        {category: 'Produto Danificado', count: 2},
        {category: 'Problema no Locker', count: 2},
        {category: 'Outros', count: 3}
    ],

    // Methods
    generateReport(type, filters = {}) {
        const {startDate, endDate, storeId} = filters;

        switch (type) {
            case REPORT_TYPE.ORDERS:
                return this.generateOrdersReport(startDate, endDate, storeId);
            case REPORT_TYPE.PICKUPS:
                return this.generatePickupsReport(startDate, endDate, storeId);
            case REPORT_TYPE.STORAGE:
                return this.generateStorageReport(startDate, endDate, storeId);
            case REPORT_TYPE.PERFORMANCE:
                return this.generatePerformanceReport(startDate, endDate, storeId);
            case REPORT_TYPE.FINANCIAL:
                return this.generateFinancialReport(startDate, endDate, storeId);
            default:
                return null;
        }
    },

    generateOrdersReport(startDate, endDate, storeId) {
        return {
            type: REPORT_TYPE.ORDERS,
            period: {startDate, endDate},
            store: storeId || 'Todas',
            data: {
                summary: this.summary.orders,
                byDay: this.ordersByDay,
                byStore: this.ordersByStore,
                topProducts: this.topProducts
            },
            generatedAt: new Date().toISOString()
        };
    },

    generatePickupsReport(startDate, endDate, storeId) {
        return {
            type: REPORT_TYPE.PICKUPS,
            period: {startDate, endDate},
            store: storeId || 'Todas',
            data: {
                summary: this.summary.pickups,
                timeDistribution: this.pickupTimeDistribution,
                satisfaction: this.customerSatisfaction
            },
            generatedAt: new Date().toISOString()
        };
    },

    generateStorageReport(startDate, endDate, storeId) {
        return {
            type: REPORT_TYPE.STORAGE,
            period: {startDate, endDate},
            store: storeId || 'Todas',
            data: {
                summary: this.summary.storage,
                utilization: this.storageUtilization
            },
            generatedAt: new Date().toISOString()
        };
    },

    generatePerformanceReport(startDate, endDate, storeId) {
        return {
            type: REPORT_TYPE.PERFORMANCE,
            period: {startDate, endDate},
            store: storeId || 'Todas',
            data: {
                summary: this.summary.performance,
                supportTickets: this.supportTicketsByCategory,
                satisfaction: this.customerSatisfaction
            },
            generatedAt: new Date().toISOString()
        };
    },

    generateFinancialReport(startDate, endDate, storeId) {
        const totalRevenue = this.ordersByStore.reduce((sum, store) => sum + store.value, 0);
        const avgTicket = totalRevenue / this.summary.orders.total;

        return {
            type: REPORT_TYPE.FINANCIAL,
            period: {startDate, endDate},
            store: storeId || 'Todas',
            data: {
                totalRevenue,
                avgTicket,
                orderCount: this.summary.orders.total,
                byStore: this.ordersByStore,
                topProducts: this.topProducts.map(p => ({
                    ...p,
                    margin: (p.revenue * 0.15).toFixed(2) // 15% margin simulation
                }))
            },
            generatedAt: new Date().toISOString()
        };
    },

    exportReport(report, format = 'pdf') {
        // Simulate report export
        return {
            success: true,
            filename: `relatorio-${report.type}-${new Date().toISOString().split('T')[0]}.${format}`,
            size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB and 1MB
            url: `data:application/${format};base64,mock_report_data`
        };
    },

    scheduleReport(reportConfig) {
        return {
            id: `SCHED-${Date.now()}`,
            ...reportConfig,
            createdAt: new Date().toISOString(),
            nextRun: this.calculateNextRun(reportConfig.frequency),
            active: true
        };
    },

    calculateNextRun(frequency) {
        const now = new Date();
        switch (frequency) {
            case 'daily':
                return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
            case 'weekly':
                return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
            case 'monthly':
                return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
            default:
                return null;
        }
    }
};