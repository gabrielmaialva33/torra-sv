/**
 * Mock configuration data for system settings
 */

export const mockConfigData = {
    stores: [
        {
            id: 'STORE-001',
            name: 'Loja Centro',
            cnpj: '11.111.111/0001-11',
            address: {
                street: 'Rua Principal',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01000-000'
            },
            phone: '(11) 3333-3333',
            email: 'centro@lojastorra.com.br',
            manager: {
                id: 2,
                name: 'João Silva'
            },
            businessHours: {
                monday: {open: '09:00', close: '22:00'},
                tuesday: {open: '09:00', close: '22:00'},
                wednesday: {open: '09:00', close: '22:00'},
                thursday: {open: '09:00', close: '22:00'},
                friday: {open: '09:00', close: '22:00'},
                saturday: {open: '09:00', close: '20:00'},
                sunday: {open: '10:00', close: '18:00'}
            },
            settings: {
                maxPickupDays: 7,
                enableLockers: true,
                enableSMS: true,
                enableWhatsApp: true,
                enableEmail: true
            },
            active: true,
            createdAt: '2023-01-01T00:00:00Z'
        },
        {
            id: 'STORE-002',
            name: 'Loja Sul',
            cnpj: '11.111.111/0002-22',
            address: {
                street: 'Av. das Nações',
                number: '456',
                complement: 'Shopping Sul',
                neighborhood: 'Sul',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '02000-000'
            },
            phone: '(11) 4444-4444',
            email: 'sul@lojastorra.com.br',
            manager: {
                id: 5,
                name: 'Ana Costa'
            },
            businessHours: {
                monday: {open: '10:00', close: '22:00'},
                tuesday: {open: '10:00', close: '22:00'},
                wednesday: {open: '10:00', close: '22:00'},
                thursday: {open: '10:00', close: '22:00'},
                friday: {open: '10:00', close: '22:00'},
                saturday: {open: '10:00', close: '22:00'},
                sunday: {open: '12:00', close: '20:00'}
            },
            settings: {
                maxPickupDays: 7,
                enableLockers: false,
                enableSMS: true,
                enableWhatsApp: true,
                enableEmail: true
            },
            active: true,
            createdAt: '2023-03-15T00:00:00Z'
        },
        {
            id: 'STORE-003',
            name: 'Loja Norte',
            cnpj: '11.111.111/0003-33',
            address: {
                street: 'Rua do Comércio',
                number: '789',
                complement: '',
                neighborhood: 'Norte',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '03000-000'
            },
            phone: '(11) 5555-5555',
            email: 'norte@lojastorra.com.br',
            manager: {
                id: 6,
                name: 'Carlos Santos'
            },
            businessHours: {
                monday: {open: '09:00', close: '21:00'},
                tuesday: {open: '09:00', close: '21:00'},
                wednesday: {open: '09:00', close: '21:00'},
                thursday: {open: '09:00', close: '21:00'},
                friday: {open: '09:00', close: '21:00'},
                saturday: {open: '09:00', close: '18:00'},
                sunday: {closed: true}
            },
            settings: {
                maxPickupDays: 5,
                enableLockers: true,
                enableSMS: true,
                enableWhatsApp: false,
                enableEmail: true
            },
            active: true,
            createdAt: '2023-06-01T00:00:00Z'
        }
    ],

    users: [
        {
            id: 1,
            username: 'admin',
            email: 'admin@lojastorra.com.br',
            name: 'Administrador Sistema',
            cpf: '000.000.000-00',
            phone: '(11) 99999-0000',
            role: 'admin',
            store: null,
            permissions: ['all'],
            active: true,
            createdAt: '2023-01-01T00:00:00Z',
            lastLogin: '2025-01-05T10:30:00Z'
        },
        {
            id: 2,
            username: 'gerente01',
            email: 'gerente01@lojastorra.com.br',
            name: 'João Silva',
            cpf: '111.111.111-11',
            phone: '(11) 98888-1111',
            role: 'manager',
            store: 'STORE-001',
            permissions: ['dashboard', 'tracking', 'receiving', 'storage', 'pickup', 'reports'],
            active: true,
            createdAt: '2023-03-15T00:00:00Z',
            lastLogin: '2025-01-05T08:00:00Z'
        },
        {
            id: 3,
            username: 'atendente01',
            email: 'atendente01@lojastorra.com.br',
            name: 'Maria Santos',
            cpf: '222.222.222-22',
            phone: '(11) 97777-2222',
            role: 'attendant',
            store: 'STORE-001',
            permissions: ['dashboard', 'tracking', 'receiving', 'pickup'],
            active: true,
            createdAt: '2023-06-20T00:00:00Z',
            lastLogin: '2025-01-05T07:45:00Z'
        },
        {
            id: 4,
            username: 'suporte01',
            email: 'suporte01@lojastorra.com.br',
            name: 'Carlos Oliveira',
            cpf: '333.333.333-33',
            phone: '(11) 96666-3333',
            role: 'support',
            store: null,
            permissions: ['dashboard', 'support', 'tracking'],
            active: true,
            createdAt: '2023-09-10T00:00:00Z',
            lastLogin: '2025-01-04T14:20:00Z'
        },
        {
            id: 5,
            username: 'gerente02',
            email: 'gerente02@lojastorra.com.br',
            name: 'Ana Costa',
            cpf: '444.444.444-44',
            phone: '(11) 95555-4444',
            role: 'manager',
            store: 'STORE-002',
            permissions: ['dashboard', 'tracking', 'receiving', 'storage', 'pickup', 'reports'],
            active: true,
            createdAt: '2023-07-01T00:00:00Z',
            lastLogin: '2025-01-05T09:15:00Z'
        },
        {
            id: 6,
            username: 'gerente03',
            email: 'gerente03@lojastorra.com.br',
            name: 'Carlos Santos',
            cpf: '555.555.555-55',
            phone: '(11) 94444-5555',
            role: 'manager',
            store: 'STORE-003',
            permissions: ['dashboard', 'tracking', 'receiving', 'storage', 'pickup', 'reports'],
            active: false,
            createdAt: '2023-08-01T00:00:00Z',
            lastLogin: '2024-12-20T15:00:00Z'
        }
    ],

    systemSettings: {
        general: {
            systemName: 'Click & Retire - Lojas Torra',
            defaultLanguage: 'pt-BR',
            timezone: 'America/Sao_Paulo',
            dateFormat: 'DD/MM/YYYY',
            currency: 'BRL'
        },
        notifications: {
            emailProvider: 'SendGrid',
            smsProvider: 'Twilio',
            whatsappProvider: 'Twilio',
            defaultSender: {
                email: 'noreply@lojastorra.com.br',
                sms: 'TORRA',
                whatsapp: '+5511999999999'
            }
        },
        security: {
            passwordMinLength: 8,
            passwordRequireSpecialChar: true,
            passwordRequireNumber: true,
            sessionTimeout: 30, // minutes
            maxLoginAttempts: 5,
            lockoutDuration: 15 // minutes
        },
        api: {
            rateLimit: 100, // requests per minute
            timeout: 30, // seconds
            maintenanceMode: false
        }
    },

    // Methods
    getStoreById(storeId) {
        return this.stores.find(store => store.id === storeId);
    },

    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    },

    createStore(storeData) {
        const newStore = {
            id: `STORE-${Date.now()}`,
            ...storeData,
            createdAt: new Date().toISOString(),
            active: true
        };

        this.stores.push(newStore);
        return newStore;
    },

    updateStore(storeId, updates) {
        const store = this.getStoreById(storeId);
        if (!store) return null;

        Object.assign(store, updates);
        return store;
    },

    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            ...userData,
            createdAt: new Date().toISOString(),
            active: true,
            lastLogin: null
        };

        this.users.push(newUser);
        return newUser;
    },

    updateUser(userId, updates) {
        const user = this.getUserById(userId);
        if (!user) return null;

        Object.assign(user, updates);
        return user;
    },

    toggleUserStatus(userId) {
        const user = this.getUserById(userId);
        if (!user) return null;

        user.active = !user.active;
        return user;
    },

    updateSystemSettings(section, settings) {
        if (this.systemSettings[section]) {
            Object.assign(this.systemSettings[section], settings);
            return this.systemSettings[section];
        }
        return null;
    }
};