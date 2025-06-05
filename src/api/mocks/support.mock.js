/**
 * Mock support/SAC data
 */

export const TICKET_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    WAITING_CUSTOMER: 'waiting_customer',
    RESOLVED: 'resolved',
    CLOSED: 'closed'
};

export const TICKET_PRIORITY = {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent'
};

export const TICKET_CATEGORY = {
    ORDER_ISSUE: 'order_issue',
    DELIVERY_DELAY: 'delivery_delay',
    WRONG_PRODUCT: 'wrong_product',
    DAMAGED_PRODUCT: 'damaged_product',
    PICKUP_PROBLEM: 'pickup_problem',
    LOCKER_ISSUE: 'locker_issue',
    REFUND_REQUEST: 'refund_request',
    OTHER: 'other'
};

export const mockSupportData = {
    tickets: [
        {
            id: 'TKT-2025-0001',
            number: '20250001',
            customer: {
                name: 'João Silva',
                cpf: '123.456.789-00',
                email: 'joao.silva@email.com',
                phone: '(11) 98765-4321'
            },
            order: {
                id: 'ORD-2025-0001',
                number: '10001'
            },
            category: TICKET_CATEGORY.PICKUP_PROBLEM,
            subject: 'Não consigo retirar meu pedido',
            description: 'Estou na loja mas o código de retirada não está funcionando. Já tentei várias vezes.',
            status: TICKET_STATUS.OPEN,
            priority: TICKET_PRIORITY.HIGH,
            assignedTo: null,
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            createdAt: '2025-01-05T16:45:00Z',
            updatedAt: '2025-01-05T16:45:00Z',
            messages: [
                {
                    id: 'MSG-001',
                    sender: {
                        type: 'customer',
                        name: 'João Silva'
                    },
                    message: 'Estou na loja mas o código de retirada não está funcionando. Já tentei várias vezes.',
                    timestamp: '2025-01-05T16:45:00Z',
                    attachments: []
                }
            ],
            tags: ['urgente', 'loja-fisica']
        },
        {
            id: 'TKT-2025-0002',
            number: '20250002',
            customer: {
                name: 'Maria Santos',
                cpf: '987.654.321-00',
                email: 'maria.santos@email.com',
                phone: '(11) 91234-5678'
            },
            order: {
                id: 'ORD-2025-0002',
                number: '10002'
            },
            category: TICKET_CATEGORY.DELIVERY_DELAY,
            subject: 'Pedido não chegou no prazo',
            description: 'Meu pedido estava previsto para chegar ontem mas ainda não recebi nenhuma notificação.',
            status: TICKET_STATUS.IN_PROGRESS,
            priority: TICKET_PRIORITY.NORMAL,
            assignedTo: {
                id: 4,
                name: 'Carlos Oliveira'
            },
            store: {
                id: 'STORE-002',
                name: 'Loja Sul'
            },
            createdAt: '2025-01-05T14:30:00Z',
            updatedAt: '2025-01-05T15:00:00Z',
            messages: [
                {
                    id: 'MSG-002',
                    sender: {
                        type: 'customer',
                        name: 'Maria Santos'
                    },
                    message: 'Meu pedido estava previsto para chegar ontem mas ainda não recebi nenhuma notificação.',
                    timestamp: '2025-01-05T14:30:00Z',
                    attachments: []
                },
                {
                    id: 'MSG-003',
                    sender: {
                        type: 'support',
                        name: 'Carlos Oliveira'
                    },
                    message: 'Olá Maria! Vou verificar o status do seu pedido. Por favor, aguarde alguns minutos.',
                    timestamp: '2025-01-05T14:45:00Z',
                    attachments: []
                },
                {
                    id: 'MSG-004',
                    sender: {
                        type: 'support',
                        name: 'Carlos Oliveira'
                    },
                    message: 'Verifiquei aqui e seu pedido está em separação. Deve estar disponível para retirada ainda hoje. Você receberá uma notificação assim que estiver pronto.',
                    timestamp: '2025-01-05T15:00:00Z',
                    attachments: []
                }
            ],
            tags: ['atraso', 'em-andamento']
        },
        {
            id: 'TKT-2025-0003',
            number: '20250003',
            customer: {
                name: 'Carlos Oliveira',
                cpf: '456.789.123-00',
                email: 'carlos.oliveira@email.com',
                phone: '(11) 95555-5555'
            },
            order: {
                id: 'ORD-2025-0003',
                number: '10003'
            },
            category: TICKET_CATEGORY.ORDER_ISSUE,
            subject: 'Pedido retirado com sucesso',
            description: 'Consegui retirar o pedido sem problemas. Obrigado!',
            status: TICKET_STATUS.RESOLVED,
            priority: TICKET_PRIORITY.LOW,
            assignedTo: {
                id: 4,
                name: 'Carlos Oliveira'
            },
            store: {
                id: 'STORE-001',
                name: 'Loja Centro'
            },
            createdAt: '2025-01-04T18:00:00Z',
            updatedAt: '2025-01-04T18:30:00Z',
            resolvedAt: '2025-01-04T18:30:00Z',
            messages: [
                {
                    id: 'MSG-005',
                    sender: {
                        type: 'customer',
                        name: 'Carlos Oliveira'
                    },
                    message: 'Consegui retirar o pedido sem problemas. Obrigado!',
                    timestamp: '2025-01-04T18:00:00Z',
                    attachments: []
                },
                {
                    id: 'MSG-006',
                    sender: {
                        type: 'support',
                        name: 'Carlos Oliveira'
                    },
                    message: 'Que ótimo! Ficamos felizes que tudo tenha corrido bem. Obrigado por nos informar!',
                    timestamp: '2025-01-04T18:30:00Z',
                    attachments: []
                }
            ],
            tags: ['resolvido', 'positivo']
        }
    ],

    templates: [
        {
            id: 'TPL-001',
            name: 'Boas-vindas',
            content: 'Olá {customer_name}! Obrigado por entrar em contato. Vou analisar sua solicitação e retornarei em breve.'
        },
        {
            id: 'TPL-002',
            name: 'Verificando pedido',
            content: 'Estou verificando as informações do seu pedido {order_number}. Por favor, aguarde alguns instantes.'
        },
        {
            id: 'TPL-003',
            name: 'Pedido pronto',
            content: 'Seu pedido {order_number} está pronto para retirada na {store_name}. Seu código de retirada é: {pickup_code}'
        },
        {
            id: 'TPL-004',
            name: 'Problema resolvido',
            content: 'O problema foi resolvido. Por favor, tente novamente e me informe se ainda precisar de ajuda.'
        }
    ],

    // Methods
    getTicketById(ticketId) {
        return this.tickets.find(ticket => ticket.id === ticketId);
    },

    getTicketsByStatus(status) {
        return this.tickets.filter(ticket => ticket.status === status);
    },

    getTicketsByCustomer(cpf) {
        return this.tickets.filter(ticket => ticket.customer.cpf === cpf);
    },

    createTicket(ticketData) {
        const ticketNumber = (parseInt(this.tickets[0]?.number || '20250000') + 1).toString();

        const newTicket = {
            id: `TKT-2025-${ticketNumber.slice(-4)}`,
            number: ticketNumber,
            ...ticketData,
            status: TICKET_STATUS.OPEN,
            assignedTo: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: [
                {
                    id: `MSG-${Date.now()}`,
                    sender: {
                        type: 'customer',
                        name: ticketData.customer.name
                    },
                    message: ticketData.description,
                    timestamp: new Date().toISOString(),
                    attachments: []
                }
            ],
            tags: []
        };

        this.tickets.unshift(newTicket);
        return newTicket;
    },

    updateTicket(ticketId, updates) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;

        Object.assign(ticket, updates);
        ticket.updatedAt = new Date().toISOString();

        if (updates.status === TICKET_STATUS.RESOLVED) {
            ticket.resolvedAt = new Date().toISOString();
        }

        return ticket;
    },

    addMessage(ticketId, message) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;

        const newMessage = {
            id: `MSG-${Date.now()}`,
            ...message,
            timestamp: new Date().toISOString(),
            attachments: message.attachments || []
        };

        ticket.messages.push(newMessage);
        ticket.updatedAt = new Date().toISOString();

        return ticket;
    },

    assignTicket(ticketId, userId, userName) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;

        ticket.assignedTo = {
            id: userId,
            name: userName
        };
        ticket.status = TICKET_STATUS.IN_PROGRESS;
        ticket.updatedAt = new Date().toISOString();

        return ticket;
    },

    getStats() {
        const stats = {
            total: this.tickets.length,
            open: 0,
            inProgress: 0,
            waitingCustomer: 0,
            resolved: 0,
            closed: 0,
            byPriority: {},
            byCategory: {},
            avgResolutionTime: 0
        };

        // Initialize counters
        Object.values(TICKET_PRIORITY).forEach(priority => {
            stats.byPriority[priority] = 0;
        });

        Object.values(TICKET_CATEGORY).forEach(category => {
            stats.byCategory[category] = 0;
        });

        // Count tickets
        let totalResolutionTime = 0;
        let resolvedCount = 0;

        this.tickets.forEach(ticket => {
            stats[ticket.status]++;
            stats.byPriority[ticket.priority]++;
            stats.byCategory[ticket.category]++;

            if (ticket.resolvedAt) {
                const created = new Date(ticket.createdAt);
                const resolved = new Date(ticket.resolvedAt);
                totalResolutionTime += (resolved - created) / (1000 * 60 * 60); // hours
                resolvedCount++;
            }
        });

        if (resolvedCount > 0) {
            stats.avgResolutionTime = (totalResolutionTime / resolvedCount).toFixed(1);
        }

        return stats;
    }
};