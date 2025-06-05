/**
 * Mock dashboard data for development
 */
export const mockDashboardData = {
    stats: {
        todayOrders: 42,
        pendingPickups: 18,
        availableLockers: 35,
        monthlyOrders: 847
    },

    ordersChart: {
        week: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [
                {
                    label: 'Pedidos Recebidos',
                    data: [32, 45, 38, 52, 48, 55, 42],
                    backgroundColor: 'rgba(255, 81, 1, 0.1)',
                    borderColor: '#FF5101',
                    borderWidth: 2
                },
                {
                    label: 'Pedidos Retirados',
                    data: [28, 40, 35, 48, 44, 50, 38],
                    backgroundColor: 'rgba(66, 67, 123, 0.1)',
                    borderColor: '#42437B',
                    borderWidth: 2
                }
            ]
        },
        month: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [
                {
                    label: 'Pedidos Recebidos',
                    data: [215, 238, 252, 240],
                    backgroundColor: 'rgba(255, 81, 1, 0.1)',
                    borderColor: '#FF5101',
                    borderWidth: 2
                },
                {
                    label: 'Pedidos Retirados',
                    data: [198, 220, 235, 225],
                    backgroundColor: 'rgba(66, 67, 123, 0.1)',
                    borderColor: '#42437B',
                    borderWidth: 2
                }
            ]
        }
    },

    recentOrders: [
        {
            id: '1234',
            customer: 'João Silva',
            status: 'ready',
            statusLabel: 'Pronto para Retirada',
            store: 'Loja Centro',
            time: '10 min atrás',
            items: 3
        },
        {
            id: '1233',
            customer: 'Maria Santos',
            status: 'pending',
            statusLabel: 'Aguardando',
            store: 'Loja Sul',
            time: '25 min atrás',
            items: 1
        },
        {
            id: '1232',
            customer: 'Carlos Oliveira',
            status: 'picked',
            statusLabel: 'Retirado',
            store: 'Loja Norte',
            time: '1 hora atrás',
            items: 5
        },
        {
            id: '1231',
            customer: 'Ana Costa',
            status: 'ready',
            statusLabel: 'Pronto para Retirada',
            store: 'Loja Centro',
            time: '2 horas atrás',
            items: 2
        },
        {
            id: '1230',
            customer: 'Pedro Alves',
            status: 'pending',
            statusLabel: 'Aguardando',
            store: 'Loja Oeste',
            time: '3 horas atrás',
            items: 4
        }
    ]
};