/**
 * Central mock data management
 * Exports all mock data and utilities
 */

export {mockAuthData} from './auth.mock';
export {mockDashboardData} from './dashboard.mock';
export {mockTrackingData} from './tracking.mock';
export {mockReceivingData} from './receiving.mock';
export {mockStorageData} from './storage.mock';
export {mockPickupData} from './pickup.mock';
export {mockLockerData} from './locker.mock';
export {mockConfigData} from './config.mock';
export {mockSupportData} from './support.mock';
export {mockReportsData} from './reports.mock';

// Mock utilities
export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockError = (message = 'Erro simulado', code = 'MOCK_ERROR') => ({
    success: false,
    error: {
        message,
        code
    }
});

export const mockSuccess = (data, message = 'Operação realizada com sucesso') => ({
    success: true,
    data,
    message
});

// Mock pagination
export const paginate = (data, page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = data.slice(start, end);

    return {
        items,
        pagination: {
            page,
            limit,
            total: data.length,
            totalPages: Math.ceil(data.length / limit),
            hasNext: end < data.length,
            hasPrev: page > 1
        }
    };
};

// Mock search/filter
export const filterData = (data, filters = {}) => {
    return data.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;

            const itemValue = item[key];
            if (typeof itemValue === 'string') {
                return itemValue.toLowerCase().includes(value.toLowerCase());
            }

            return itemValue === value;
        });
    });
};