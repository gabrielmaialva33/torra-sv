/**
 * Mock authentication data for development
 */
export const mockAuthData = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@lojastorra.com.br',
      name: 'Administrador Sistema',
      role: 'admin',
      store: null,
      permissions: ['all'],
      avatar: null,
      createdAt: '2023-01-01T00:00:00Z',
      lastLogin: '2025-01-05T10:30:00Z'
    },
    {
      id: 2,
      username: 'gerente01',
      password: 'gerente123',
      email: 'gerente01@lojastorra.com.br',
      name: 'João Silva',
      role: 'manager',
      store: 'loja01',
      permissions: ['dashboard', 'tracking', 'receiving', 'storage', 'pickup', 'reports'],
      avatar: null,
      createdAt: '2023-03-15T00:00:00Z',
      lastLogin: '2025-01-05T08:00:00Z'
    },
    {
      id: 3,
      username: 'atendente01',
      password: 'atendente123',
      email: 'atendente01@lojastorra.com.br',
      name: 'Maria Santos',
      role: 'attendant',
      store: 'loja01',
      permissions: ['dashboard', 'tracking', 'receiving', 'pickup'],
      avatar: null,
      createdAt: '2023-06-20T00:00:00Z',
      lastLogin: '2025-01-05T07:45:00Z'
    },
    {
      id: 4,
      username: 'suporte01',
      password: 'suporte123',
      email: 'suporte01@lojastorra.com.br',
      name: 'Carlos Oliveira',
      role: 'support',
      store: null,
      permissions: ['dashboard', 'support', 'tracking'],
      avatar: null,
      createdAt: '2023-09-10T00:00:00Z',
      lastLogin: '2025-01-04T14:20:00Z'
    }
  ],

  tokens: new Map(),

  /**
   * Generate a mock JWT token
   * @param {number} userId
   * @returns {string}
   */
  generateToken(userId) {
    const token = `mock-jwt-token-${userId}-${Date.now()}`;
    this.tokens.set(token, userId);
    return token;
  },

  /**
   * Validate a mock token
   * @param {string} token
   * @returns {number|null} userId if valid, null otherwise
   */
  validateToken(token) {
    return this.tokens.get(token) || null;
  },

  /**
   * Revoke a token
   * @param {string} token
   */
  revokeToken(token) {
    this.tokens.delete(token);
  }
};

// Role permissions mapping
export const rolePermissions = {
  admin: {
    name: 'Administrador',
    permissions: [
      'dashboard.view',
      'tracking.view',
      'tracking.edit',
      'receiving.view',
      'receiving.edit',
      'storage.view',
      'storage.edit',
      'pickup.view',
      'pickup.edit',
      'locker.view',
      'locker.edit',
      'config.view',
      'config.edit',
      'support.view',
      'support.edit',
      'reports.view',
      'reports.export',
      'users.view',
      'users.edit',
      'users.delete'
    ]
  },
  manager: {
    name: 'Gerente',
    permissions: [
      'dashboard.view',
      'tracking.view',
      'tracking.edit',
      'receiving.view',
      'receiving.edit',
      'storage.view',
      'storage.edit',
      'pickup.view',
      'pickup.edit',
      'reports.view',
      'reports.export'
    ]
  },
  attendant: {
    name: 'Atendente',
    permissions: [
      'dashboard.view',
      'tracking.view',
      'receiving.view',
      'receiving.edit',
      'pickup.view',
      'pickup.edit'
    ]
  },
  support: {
    name: 'Suporte',
    permissions: [
      'dashboard.view',
      'support.view',
      'support.edit',
      'tracking.view'
    ]
  }
};