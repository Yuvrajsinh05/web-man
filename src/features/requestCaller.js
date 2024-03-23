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
        const contentLength = response.headers['content-length'] || 0;
        const jsonData = JSON.stringify(response.data);
        const dataSizeInBytes = new Blob([jsonData]).size; 
        const headersObj = {};
        for (const [key, value] of Object.entries(response.headers)) {
            headersObj[key] = value;
        }
        const Obj = {
            status: response?.status || 400,
            headers: headersObj,
            body: response?.data || {},
            dataSizeInBytes
        }
        return Obj;
    } catch (error) {
        if (error.response) {
            const errorResponse = {
                status: error.response.status,
                headers: error.response.headers,
                body: error.response.data,
                dataSizeInBytes: 0
            };
            return errorResponse;
        } else {
            const errorResponse = {
                status: 500,
                headers: {},
                body: { error: error?.message || "Something went wrong" },
                dataSizeInBytes: 0
            };
            return errorResponse;
        }
        
    }
};
