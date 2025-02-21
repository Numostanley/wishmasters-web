import http from "@/services/http.service";

// Allowed HTTP methods
const allowedMethods = ["post", "get", "delete", "patch", "put"];

/**
 * Format successful API responses
 */
export const getApiResponse = (data) => ({
  status: true,
  data: data?.data,
});

/**
 * Format error responses
 */
export const getErrorResponse = (error) => ({
  status: false,
  data: error?.response?.data,
});

/**
 * Universal API request handler
 * @param {string} method - HTTP method (get, post, etc.)
 * @param {string} url - API endpoint
 * @param {Object} [formData] - Request body data
 * @param {Object} [customHeaders] - Additional headers
 * @param {Object} [auth] - Basic authentication credentials ({ username, password })
 * @returns {Promise<Object>} API response or error
 */
export const requestHandler = async (
  method,
  url,
  formData = null,
  customHeaders = {},
  auth = null
) => {
  try {
    if (!allowedMethods.includes(method.toLowerCase())) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }

    const options = {
      method,
      url,
      headers: { ...customHeaders },
      ...(formData ? { data: formData } : {}),
    };

    if (auth) {
      options.auth = auth; // Basic Authentication
    }

    const response = await http(options);
    return getApiResponse(response);
  } catch (error) {
    return getErrorResponse(error);
  }
};
