/**
 * Mock pickup data for customer pickup functionality
 */

export const PICKUP_STATUS = {
    READY: 'ready',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

export const VERIFICATION_METHOD = {
    CPF: 'cpf',
    CODE: 'code',
    QR_CODE: 'qr_code'
};

export const mockPickupData = {
    readyForPickup: [
        {
            id: 'PICK-001',
            orderId: 'ORD-2025-0001',
            orderNumber: '10001',
            customer: {
                id: 'CUST-001',
                name: 'João Silva',
                cpf: '123.456.789-00',
                phone: '(11) 98765-4321',
                email: 'joao.silva@email.com'
            },
            status: PICKUP_STATUS.READY,
            items: [
                {
                    id: 'ITEM-001',
                    name: 'Notebook Dell Inspiron',
                    sku: 'NB-DELL-001',
                    quantity: 1,
                    location: 'A-01'
                },
                {
                    id: 'ITEM-002',
                    name: 'Mouse Logitech MX Master',
                    sku: 'MS-LOG-001',
                    quantity: 1,
                    location: 'L-01',
                    lockerCode: 'L001'
                }
            ],
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            pickupCode: '1234',
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            readyAt: '2025-01-05T14:30:00Z',
            expiresAt: '2025-01-12T14:30:00Z',
            notificationsSent: {
                sms: true,
                whatsapp: true,
                email: true
            }
        },
        {
            id: 'PICK-002',
            orderId: 'ORD-2025-0011',
            orderNumber: '10011',
            customer: {
                id: 'CUST-005',
                name: 'Mariana Ferreira',
                cpf: '111.222.333-44',
                phone: '(11) 99999-8888',
                email: 'mariana.ferreira@email.com'
            },
            status: PICKUP_STATUS.READY,
            items: [
                {
                    id: 'ITEM-007',
                    name: 'Smart TV LG 50"',
                    sku: 'TV-LG-001',
                    quantity: 1,
                    location: 'B-03'
                }
            ],
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            pickupCode: '5678',
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            readyAt: '2025-01-05T10:00:00Z',
            expiresAt: '2025-01-12T10:00:00Z',
            notificationsSent: {
                sms: true,
                whatsapp: false,
                email: true
            }
        }
    ],

    inProgress: [
        {
            id: 'PICK-003',
            orderId: 'ORD-2025-0012',
            orderNumber: '10012',
            customer: {
                id: 'CUST-006',
                name: 'Roberto Alves',
                cpf: '555.666.777-88',
                phone: '(11) 97777-6666',
                email: 'roberto.alves@email.com'
            },
            status: PICKUP_STATUS.IN_PROGRESS,
            items: [
                {
                    id: 'ITEM-008',
                    name: 'PlayStation 5',
                    sku: 'GM-SON-001',
                    quantity: 1,
                    location: 'A-05',
                    collected: true
                },
                {
                    id: 'ITEM-009',
                    name: 'Controle DualSense',
                    sku: 'GM-SON-002',
                    quantity: 2,
                    location: 'A-05',
                    collected: false
                }
            ],
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            pickupCode: '9012',
            startedAt: '2025-01-05T16:30:00Z',
            attendant: {
                id: 3,
                name: 'Maria Santos'
            }
        }
    ],

    completedToday: [
        {
            id: 'PICK-004',
            orderId: 'ORD-2025-0003',
            orderNumber: '10003',
            customer: {
                id: 'CUST-003',
                name: 'Carlos Oliveira',
                cpf: '456.789.123-00',
                phone: '(11) 95555-5555',
                email: 'carlos.oliveira@email.com'
            },
            status: PICKUP_STATUS.COMPLETED,
            items: [
                {
                    id: 'ITEM-004',
                    name: 'iPhone 15 Pro Max',
                    sku: 'PH-APP-001',
                    quantity: 1
                },
                {
                    id: 'ITEM-005',
                    name: 'AirPods Pro',
                    sku: 'AU-APP-001',
                    quantity: 1
                }
            ],
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            completedAt: '2025-01-05T15:45:00Z',
            attendant: {
                id: 3,
                name: 'Maria Santos'
            },
            verificationMethod: VERIFICATION_METHOD.CPF,
            signature: 'data:image/png;base64,signature_base64_here',
            documents: {
                cpf: '456.789.123-00',
                rg: '12.345.678-9'
            }
        }
    ],

    // Methods
    searchByCode(code) {
        return this.readyForPickup.find(pickup => pickup.pickupCode === code);
    },

    searchByCPF(cpf) {
        const normalizedCPF = cpf.replace(/\D/g, '');
        return this.readyForPickup.filter(pickup => {
            const customerCPF = pickup.customer.cpf.replace(/\D/g, '');
            return customerCPF === normalizedCPF;
        });
    },

    searchByOrderNumber(orderNumber) {
        return this.readyForPickup.find(pickup => pickup.orderNumber === orderNumber);
    },

    startPickup(pickupId, attendantId) {
        const index = this.readyForPickup.findIndex(p => p.id === pickupId);
        if (index === -1) return null;

        const pickup = this.readyForPickup[index];
        pickup.status = PICKUP_STATUS.IN_PROGRESS;
        pickup.startedAt = new Date().toISOString();
        pickup.attendant = {
            id: attendantId,
            name: 'Atendente'
        };

        // Move to in progress
        this.readyForPickup.splice(index, 1);
        this.inProgress.push(pickup);

        return pickup;
    },

    markItemCollected(pickupId, itemId) {
        const pickup = this.inProgress.find(p => p.id === pickupId);
        if (!pickup) return null;

        const item = pickup.items.find(i => i.id === itemId);
        if (!item) return null;

        item.collected = true;
        return pickup;
    },

    completePickup(pickupId, verificationData) {
        const index = this.inProgress.findIndex(p => p.id === pickupId);
        if (index === -1) return null;

        const pickup = this.inProgress[index];

        // Verify all items are collected
        const allCollected = pickup.items.every(item => item.collected);
        if (!allCollected) {
            return {error: 'Nem todos os itens foram coletados'};
        }

        pickup.status = PICKUP_STATUS.COMPLETED;
        pickup.completedAt = new Date().toISOString();
        pickup.verificationMethod = verificationData.method;
        pickup.documents = verificationData.documents;
        pickup.signature = verificationData.signature;

        // Move to completed
        this.inProgress.splice(index, 1);
        this.completedToday.push(pickup);

        return pickup;
    },

    sendNotification(pickupId, channel) {
        const pickup = this.readyForPickup.find(p => p.id === pickupId);
        if (!pickup) return null;

        pickup.notificationsSent[channel] = true;

        // Simulate notification sending
        return {
            success: true,
            message: `Notificação enviada via ${channel}`
        };
    },

    getStats() {
        return {
            readyForPickup: this.readyForPickup.length,
            inProgress: this.inProgress.length,
            completedToday: this.completedToday.length,
            expiringToday: this.readyForPickup.filter(p => {
                const expiresAt = new Date(p.expiresAt);
                const today = new Date();
                return expiresAt.toDateString() === today.toDateString();
            }).length
        };
    }
};