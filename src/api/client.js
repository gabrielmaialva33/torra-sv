/**
 * API client configuration
 * Base configuration for all API calls
 */
class ApiClient {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        this.timeout = 30000;
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    /**
     * Set authorization token
     * @param {string} token
     */
    setAuthToken(token) {
        if (token) {
            this.headers.Authorization = `Bearer ${token}`;
        } else {
            delete this.headers.Authorization;
        }
    }

    /**
     * Make HTTP request
     * @param {string} method
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @returns {Promise<any>}
     */
    async request(method, url, data = null, options = {}) {
        const config = {
            method,
            headers: {
                ...this.headers,
                ...options.headers,
            },
        };

        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
            config.body = JSON.stringify(data);
        }

        if (options.params) {
            const params = new URLSearchParams(options.params);
            url = `${url}?${params.toString()}`;
        }

        try {
            const response = await fetch(`${this.baseURL}${url}`, config);

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw {
                    response: {
                        status: response.status,
                        data: error
                    }
                };
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();
        } catch (error) {
            if (error.response) {
                throw error;
            }

            throw {
                message: 'Network error',
                code: 'NETWORK_ERROR'
            };
        }
    }

    /**
     * GET request
     * @param {string} url
     * @param {object} options
     * @returns {Promise<any>}
     */
    get(url, options = {}) {
        return this.request('GET', url, null, options);
    }

    /**
     * POST request
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @returns {Promise<any>}
     */
    post(url, data, options = {}) {
        return this.request('POST', url, data, options);
    }

    /**
     * PUT request
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @returns {Promise<any>}
     */
    put(url, data, options = {}) {
        return this.request('PUT', url, data, options);
    }

    /**
     * PATCH request
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @returns {Promise<any>}
     */
    patch(url, data, options = {}) {
        return this.request('PATCH', url, data, options);
    }

    /**
     * DELETE request
     * @param {string} url
     * @param {object} options
     * @returns {Promise<any>}
     */
    delete(url, options = {}) {
        return this.request('DELETE', url, null, options);
    }
}

// Create and export a single instance
export const apiClient = new ApiClient();