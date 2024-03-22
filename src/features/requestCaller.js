import axios from 'axios';

export const executeRequest = async (request) => {
    try {
        const { url, method, headers, body } = request;
        const response = await axios({
            url,
            method,
            headers,
            data: body ? JSON.stringify(body) : null,
        });
        const cookies = response?.headers['set-cookie'] || null;
        const headersObj = {};
        for (const [key, value] of Object.entries(response.headers)) {
            headersObj[key] = value;
        }
        const Obj = {
            status: response?.status || 400,
            headers: headersObj,
            body: response?.data || {},
        }
        return Obj;
    } catch (error) {
        const Obj = {
            status: 500,
            headers: {},
            body: { error: error?.message ||  "Something Missing" },
        }
        return Obj
    }
};
