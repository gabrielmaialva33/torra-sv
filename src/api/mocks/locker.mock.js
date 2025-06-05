/**
 * Mock locker data for locker management
 */

export const LOCKER_STATUS = {
    AVAILABLE: 'available',
    OCCUPIED: 'occupied',
    MAINTENANCE: 'maintenance',
    RESERVED: 'reserved'
};

export const LOCKER_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    EXTRA_LARGE: 'extra_large'
};

export const mockLockerData = {
    lockers: [
        {
            id: 'LOCK-001',
            code: 'L001',
            section: 'A',
            number: '001',
            size: LOCKER_SIZE.SMALL,
            status: LOCKER_STATUS.OCCUPIED,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 30,
                height: 30,
                depth: 40
            },
            currentOrder: {
                id: 'ORD-2025-0001',
                orderNumber: '10001',
                customer: 'João Silva',
                pickupCode: '1234',
                storedAt: '2025-01-05T14:35:00Z',
                expiresAt: '2025-01-12T14:35:00Z'
            },
            temperature: 22.5,
            lastMaintenance: '2024-12-01T10:00:00Z'
        },
        {
            id: 'LOCK-002',
            code: 'L002',
            section: 'A',
            number: '002',
            size: LOCKER_SIZE.SMALL,
            status: LOCKER_STATUS.AVAILABLE,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 30,
                height: 30,
                depth: 40
            },
            currentOrder: null,
            temperature: 22.3,
            lastMaintenance: '2024-12-01T10:00:00Z'
        },
        {
            id: 'LOCK-003',
            code: 'L003',
            section: 'A',
            number: '003',
            size: LOCKER_SIZE.MEDIUM,
            status: LOCKER_STATUS.OCCUPIED,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 40,
                height: 40,
                depth: 50
            },
            currentOrder: {
                id: 'ORD-2025-0013',
                orderNumber: '10013',
                customer: 'Ana Paula',
                pickupCode: '5678',
                storedAt: '2025-01-05T09:00:00Z',
                expiresAt: '2025-01-12T09:00:00Z'
            },
            temperature: 22.4,
            lastMaintenance: '2024-12-01T10:00:00Z'
        },
        {
            id: 'LOCK-004',
            code: 'L004',
            section: 'A',
            number: '004',
            size: LOCKER_SIZE.MEDIUM,
            status: LOCKER_STATUS.MAINTENANCE,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 40,
                height: 40,
                depth: 50
            },
            currentOrder: null,
            temperature: null,
            lastMaintenance: '2025-01-05T08:00:00Z',
            maintenanceNotes: 'Troca de fechadura eletrônica'
        },
        {
            id: 'LOCK-005',
            code: 'L005',
            section: 'B',
            number: '001',
            size: LOCKER_SIZE.LARGE,
            status: LOCKER_STATUS.AVAILABLE,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 50,
                height: 60,
                depth: 60
            },
            currentOrder: null,
            temperature: 22.6,
            lastMaintenance: '2024-12-01T10:00:00Z'
        },
        {
            id: 'LOCK-006',
            code: 'L006',
            section: 'B',
            number: '002',
            size: LOCKER_SIZE.LARGE,
            status: LOCKER_STATUS.RESERVED,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            dimensions: {
                width: 50,
                height: 60,
                depth: 60
            },
            currentOrder: null,
            reservedFor: {
                orderId: 'ORD-2025-0014',
                orderNumber: '10014',
                customer: 'Roberto Carlos',
                reservedAt: '2025-01-05T17:00:00Z',
                expiresAt: '2025-01-05T19:00:00Z'
            },
            temperature: 22.5,
            lastMaintenance: '2024-12-01T10:00:00Z'
        }
    ],

    sections: [
        {
            id: 'SEC-A',
            code: 'A',
            name: 'Seção A - Pequenos',
            store: 'STORE-001',
            totalLockers: 20,
            availableLockers: 8,
            lockerSizes: [LOCKER_SIZE.SMALL, LOCKER_SIZE.MEDIUM]
        },
        {
            id: 'SEC-B',
            code: 'B',
            name: 'Seção B - Grandes',
            store: 'STORE-001',
            totalLockers: 15,
            availableLockers: 5,
            lockerSizes: [LOCKER_SIZE.LARGE, LOCKER_SIZE.EXTRA_LARGE]
        }
    ],

    history: [
        {
            id: 'HIST-001',
            lockerId: 'LOCK-001',
            lockerCode: 'L001',
            action: 'stored',
            orderId: 'ORD-2025-0001',
            orderNumber: '10001',
            customer: 'João Silva',
            timestamp: '2025-01-05T14:35:00Z',
            attendant: 'Maria Santos'
        },
        {
            id: 'HIST-002',
            lockerId: 'LOCK-003',
            lockerCode: 'L003',
            action: 'stored',
            orderId: 'ORD-2025-0013',
            orderNumber: '10013',
            customer: 'Ana Paula',
            timestamp: '2025-01-05T09:00:00Z',
            attendant: 'Carlos Oliveira'
        }
    ],

    // Methods
    getLockerById(lockerId) {
        return this.lockers.find(locker => locker.id === lockerId);
    },

    getLockerByCode(code) {
        return this.lockers.find(locker => locker.code === code);
    },

    getAvailableLockers(size = null, storeId = null) {
        return this.lockers.filter(locker => {
            const isAvailable = locker.status === LOCKER_STATUS.AVAILABLE;
            const matchesSize = !size || locker.size === size;
            const matchesStore = !storeId || locker.store.id === storeId;
            return isAvailable && matchesSize && matchesStore;
        });
    },

    assignLocker(lockerId, orderData) {
        const locker = this.getLockerById(lockerId);
        if (!locker || locker.status !== LOCKER_STATUS.AVAILABLE) {
            return {error: 'Locker não disponível'};
        }

        locker.status = LOCKER_STATUS.OCCUPIED;
        locker.currentOrder = {
            ...orderData,
            storedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Add to history
        this.history.unshift({
            id: `HIST-${Date.now()}`,
            lockerId: locker.id,
            lockerCode: locker.code,
            action: 'stored',
            orderId: orderData.id,
            orderNumber: orderData.orderNumber,
            customer: orderData.customer,
            timestamp: new Date().toISOString(),
            attendant: 'Sistema'
        });

        return locker;
    },

    releaseLocker(lockerId) {
        const locker = this.getLockerById(lockerId);
        if (!locker || locker.status !== LOCKER_STATUS.OCCUPIED) {
            return {error: 'Locker não está ocupado'};
        }

        const order = locker.currentOrder;
        locker.status = LOCKER_STATUS.AVAILABLE;
        locker.currentOrder = null;

        // Add to history
        this.history.unshift({
            id: `HIST-${Date.now()}`,
            lockerId: locker.id,
            lockerCode: locker.code,
            action: 'released',
            orderId: order.id,
            orderNumber: order.orderNumber,
            customer: order.customer,
            timestamp: new Date().toISOString(),
            attendant: 'Sistema'
        });

        return locker;
    },

    setMaintenance(lockerId, notes) {
        const locker = this.getLockerById(lockerId);
        if (!locker) return null;

        locker.status = LOCKER_STATUS.MAINTENANCE;
        locker.lastMaintenance = new Date().toISOString();
        locker.maintenanceNotes = notes;

        return locker;
    },

    getStats(storeId = null) {
        const filteredLockers = storeId
            ? this.lockers.filter(l => l.store.id === storeId)
            : this.lockers;

        const stats = {
            total: filteredLockers.length,
            available: 0,
            occupied: 0,
            maintenance: 0,
            reserved: 0,
            bySize: {}
        };

        Object.values(LOCKER_SIZE).forEach(size => {
            stats.bySize[size] = {
                total: 0,
                available: 0,
                occupied: 0
            };
        });

        filteredLockers.forEach(locker => {
            stats[locker.status]++;
            stats.bySize[locker.size].total++;

            if (locker.status === LOCKER_STATUS.AVAILABLE) {
                stats.bySize[locker.size].available++;
            } else if (locker.status === LOCKER_STATUS.OCCUPIED) {
                stats.bySize[locker.size].occupied++;
            }
        });

        stats.occupancyRate = ((stats.occupied / stats.total) * 100).toFixed(1);
        stats.availabilityRate = ((stats.available / stats.total) * 100).toFixed(1);

        return stats;
    },

    openLocker(code, pickupCode) {
        const locker = this.getLockerByCode(code);
        if (!locker) return {error: 'Locker não encontrado'};

        if (locker.status !== LOCKER_STATUS.OCCUPIED) {
            return {error: 'Locker não está ocupado'};
        }

        if (locker.currentOrder.pickupCode !== pickupCode) {
            return {error: 'Código de retirada inválido'};
        }

        // Simulate locker opening
        return {
            success: true,
            message: 'Locker aberto com sucesso',
            locker: locker
        };
    }
};