/**
 * Mock tracking data for development
 */

// Generate mock orders
const generateOrders = (count = 50) => {
    const statuses = ['sent', 'received', 'checked', 'stored', 'ready', 'picked', 'cancelled'];
    const stores = ['Loja Centro', 'Loja Sul', 'Loja Norte', 'Loja Oeste', 'Loja Leste'];
    const firstNames = ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Julia', 'Lucas', 'Beatriz'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima', 'Pereira', 'Alves'];

    const orders = [];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        // Generate dates based on status
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

        const updatedAt = new Date(createdAt);
        updatedAt.setHours(updatedAt.getHours() + Math.floor(Math.random() * 48));

        orders.push({
            id: `ORD${String(i + 1).padStart(6, '0')}`,
            code: String(1000 + i),
            customerName: `${firstName} ${lastName}`,
            customerCpf: generateCpf(),
            customerPhone: generatePhone(),
            customerEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
            status,
            storeName: stores[Math.floor(Math.random() * stores.length)],
            storeId: `STORE${Math.floor(Math.random() * stores.length) + 1}`,
            items: Math.floor(Math.random() * 5) + 1,
            total: (Math.random() * 500 + 50).toFixed(2),
            notes: Math.random() > 0.7 ? 'Cliente solicitou entrega urgente' : '',
            lockerNumber: status === 'stored' || status === 'ready' ? `L${Math.floor(Math.random() * 50) + 1}` : null,
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
            pickedAt: status === 'picked' ? updatedAt.toISOString() : null
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

export const mockTrackingData = {
    orders: generateOrders(100),

    // Order details
    getOrderDetails: (orderId) => {
        const order = mockTrackingData.orders.find(o => o.id === orderId);
        if (!order) return null;

        return {
            ...order,
            timeline: [
                {
                    status: 'sent',
                    label: 'Pedido enviado para a loja',
                    date: order.createdAt,
                    user: 'Sistema'
                },
                {
                    status: 'received',
                    label: 'Pedido recebido pela loja',
                    date: new Date(new Date(order.createdAt).getTime() + 3600000).toISOString(),
                    user: 'João Silva'
                },
                {
                    status: 'checked',
                    label: 'Pedido conferido',
                    date: new Date(new Date(order.createdAt).getTime() + 7200000).toISOString(),
                    user: 'Maria Santos'
                },
                {
                    status: 'stored',
                    label: 'Pedido armazenado no locker',
                    date: new Date(new Date(order.createdAt).getTime() + 10800000).toISOString(),
                    user: 'Carlos Oliveira',
                    lockerNumber: order.lockerNumber
                }
            ],
            products: [
                {
                    id: 'PROD001',
                    name: 'Produto Exemplo 1',
                    quantity: 2,
                    price: 49.90
                },
                {
                    id: 'PROD002',
                    name: 'Produto Exemplo 2',
                    quantity: 1,
                    price: 99.90
                }
            ]
        };
    }
};
