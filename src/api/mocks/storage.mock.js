/**
 * Mock storage data for development
 */

// Generate mock lockers
const generateLockers = () => {
    const lockers = [];
    const sizes = ['P', 'M', 'G'];
    const totalLockers = 50;

    for (let i = 1; i <= totalLockers; i++) {
        const status = Math.random() > 0.7 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'available';
        const size = sizes[Math.floor(Math.random() * sizes.length)];

        const locker = {
            id: `LOCK${String(i).padStart(3, '0')}`,
            number: String(i),
            size,
            status,
            order: null
        };

        // Add order info if occupied
        if (status === 'occupied') {
            const storedAt = new Date();
            storedAt.setHours(storedAt.getHours() - Math.floor(Math.random() * 72));

            locker.order = {
                id: `ORD${String(Math.floor(Math.random() * 9999) + 1000)}`,
                code: String(Math.floor(Math.random() * 9999) + 1000),
                customerName: `Cliente ${i}`,
                storedAt: storedAt.toISOString()
            };
        }

        // Some lockers in maintenance
        if (Math.random() > 0.95) {
            locker.status = 'maintenance';
            locker.order = null;
        }

        lockers.push(locker);
    }

    return lockers;
};

// Generate stored orders
const generateStoredOrders = () => {
    const orders = [];
    const firstNames = ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Julia', 'Lucas', 'Beatriz'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima', 'Pereira', 'Alves'];

    // Create some orders already in lockers
    for (let i = 1; i <= 30; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const hasLocker = Math.random() > 0.3;

        const storedAt = new Date();
        storedAt.setHours(storedAt.getHours() - Math.floor(Math.random() * 72));

        orders.push({
            id: `STORED${String(i).padStart(6, '0')}`,
            code: String(5000 + i),
            customerName: `${firstName} ${lastName}`,
            customerCpf: generateCpf(),
            customerPhone: generatePhone(),
            items: Math.floor(Math.random() * 5) + 1,
            lockerNumber: hasLocker ? String(Math.floor(Math.random() * 50) + 1) : null,
            storedAt: hasLocker ? storedAt.toISOString() : null,
            status: hasLocker ? 'stored' : 'awaiting_locker'
        });
    }

    return orders;
};

// Helper function to generate CPF
function generateCpf() {
    const numbers = [];
    for (let i = 0; i < 11; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Helper function to generate phone
function generatePhone() {
    const areaCode = Math.floor(Math.random() * 90) + 10;
    const firstPart = Math.floor(Math.random() * 90000) + 10000;
    const secondPart = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export const mockStorageData = {
    lockers: generateLockers(),
    storedOrders: generateStoredOrders(),

    // Get available lockers by size
    getAvailableLockersBySize: (size) => {
        return mockStorageData.lockers.filter(l =>
            l.status === 'available' && (!size || l.size === size)
        );
    },

    // Get locker usage stats
    getLockerStats: () => {
        const lockers = mockStorageData.lockers;
        const total = lockers.length;
        const available = lockers.filter(l => l.status === 'available').length;
        const occupied = lockers.filter(l => l.status === 'occupied').length;
        const maintenance = lockers.filter(l => l.status === 'maintenance').length;

        return {
            total,
            available,
            occupied,
            maintenance,
            occupancyRate: Math.round((occupied / total) * 100)
        };
    }
};
