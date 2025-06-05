import {apiClient} from '../client';
import {mockAuthData} from '../mocks/auth.mock';

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
class AuthService {
    constructor() {
        // Use mock data in development or when API URL is not configured
        this.useMock = import.meta.env.DEV || !import.meta.env.VITE_API_URL || import.meta.env.VITE_USE_MOCKS === 'true';
    }

    /**
     * Login user
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{success: boolean, data?: object, error?: string}>}
     */
    async login(username, password) {
        if (this.useMock) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check mock credentials
            const user = mockAuthData.users.find(
                u => u.username === username && u.password === password
            );

            if (user) {
                const {password: _, ...userData} = user;
                return {
                    success: true,
                    data: {
                        user: userData,
                        token: mockAuthData.generateToken(user.id)
                    }
                };
            }

            return {
                success: false,
                error: 'Usuário ou senha inválidos'
            };
        }

        // Real API call
        try {
            const response = await apiClient.post('/auth/login', {
                username,
                password
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao fazer login'
            };
        }
    }

    /**
     * Logout user
     * @param {string} token
     * @returns {Promise<{success: boolean}>}
     */
    async logout(token) {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return {success: true};
        }

        try {
            await apiClient.post('/auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {success: true};
        } catch (error) {
            // Always return success for logout
            return {success: true};
        }
    }

    /**
     * Validate token
     * @param {string} token
     * @returns {Promise<{valid: boolean, user?: object}>}
     */
    async validateToken(token) {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 300));

            // Simple mock validation
            const userId = mockAuthData.validateToken(token);
            if (userId) {
                const user = mockAuthData.users.find(u => u.id === userId);
                if (user) {
                    const {password: _, ...userData} = user;
                    return {
                        valid: true,
                        user: userData
                    };
                }
            }

            return {valid: false};
        }

        try {
            const response = await apiClient.get('/auth/validate', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                valid: true,
                user: response.data.user
            };
        } catch (error) {
            return {valid: false};
        }
    }

    /**
     * Request password reset
     * @param {string} email
     * @returns {Promise<{success: boolean, message?: string}>}
     */
    async requestPasswordReset(email) {
        if (this.useMock) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user = mockAuthData.users.find(u => u.email === email);
            if (user) {
                return {
                    success: true,
                    message: 'Email de recuperação enviado com sucesso'
                };
            }

            return {
                success: false,
                message: 'Email não encontrado'
            };
        }

        try {
            const response = await apiClient.post('/auth/forgot-password', {email});

            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao enviar email'
            };
        }
    }
}

export const authService = new AuthService();