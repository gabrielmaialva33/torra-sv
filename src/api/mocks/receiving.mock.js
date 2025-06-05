/**
 * Mock receiving data for development
 */

// Generate mock receiving orders
const generateReceivingOrders = () => {
    const stores = ['Loja Centro', 'Loja Sul', 'Loja Norte', 'Loja Oeste', 'Loja Leste'];
    const firstNames = ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Julia', 'Lucas', 'Beatriz'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima', 'Pereira', 'Alves'];

    const pendingOrders = [];
    const receivedOrders = [];

    // Generate pending orders
    for (let i = 0; i < 15; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        const sentAt = new Date();
        sentAt.setHours(sentAt.getHours() - Math.floor(Math.random() * 24));

        pendingOrders.push({
            id: `REC${String(i + 1).padStart(6, '0')}`,
            code: String(2000 + i),
            customerName: `${firstName} ${lastName}`,
            customerCpf: generateCpf(),
            status: 'sent',
            storeName: stores[Math.floor(Math.random() * stores.length)],
            items: Math.floor(Math.random() * 5) + 1,
            invoiceNumber: `NF${String(Math.floor(Math.random() * 99999) + 10000)}`,
            sentAt: sentAt.toISOString(),
            estimatedArrival: new Date(sentAt.getTime() + 86400000).toISOString()
        });
    }

    // Generate received orders
    for (let i = 0; i < 25; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        const sentAt = new Date();
        sentAt.setDate(sentAt.getDate() - 1);
        sentAt.setHours(Math.floor(Math.random() * 12));

        const receivedAt = new Date();
        receivedAt.setHours(Math.floor(Math.random() * 8) + 8); // Received between 8-16h

        receivedOrders.push({
            id: `REC${String(100 + i).padStart(6, '0')}`,
            code: String(3000 + i),
            customerName: `${firstName} ${lastName}`,
            customerCpf: generateCpf(),
            status: 'received',
            storeName: stores[Math.floor(Math.random() * stores.length)],
            items: Math.floor(Math.random() * 5) + 1,
            invoiceNumber: `NF${String(Math.floor(Math.random() * 99999) + 10000)}`,
            sentAt: sentAt.toISOString(),
            receivedAt: receivedAt.toISOString(),
            receivedBy: 'João Silva'
        });
    }

    return {pendingOrders, receivedOrders};
};

// Helper function to generate CPF
function generateCpf() {
    const numbers = [];
    for (let i = 0; i < 11; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

const {pendingOrders, receivedOrders} = generateReceivingOrders();

export const mockReceivingData = {
    pendingOrders,
    receivedOrders,

    stats: {
        pendingCount: pendingOrders.length,
        receivedToday: receivedOrders.filter(o => {
            const today = new Date().toDateString();
            return new Date(o.receivedAt).toDateString() === today;
        }).length,
        avgReceivingTime: '2h 30min'
    },

    // Get order items for receiving
    getOrderItems: (orderId) => {
        const products = [
            'Smartphone Samsung Galaxy',
            'Notebook Dell Inspiron',
            'Fone de Ouvido JBL',
            'Smart TV LG 50"',
            'Tablet Apple iPad',
            'Console PlayStation 5',
            'Câmera Canon EOS',
            'Smartwatch Apple Watch'
        ];

        const items = [];
        const itemCount = Math.floor(Math.random() * 4) + 1;

        for (let i = 0; i < itemCount; i++) {
            items.push({
                id: `ITEM${i + 1}`,
                name: products[Math.floor(Math.random() * products.length)],
                sku: `SKU${Math.floor(Math.random() * 99999) + 10000}`,
                quantity: Math.floor(Math.random() * 3) + 1,
                received: 0
            });
        }

        return items;
    }
};
