import axios from 'axios';
import { Message } from 'element-ui';
// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        const { code, message, success } = response.data;
        const twoDomain = window.location.href.split('.')[1];
        if (
            success === false &&
            code === 10001 &&
            (twoDomain === 'apitest' || twoDomain === 'api')
        ) {
            Message.error(message || 'Has Error');
            setTimeout(() => {
                window.location.href = `//sso.${window.location.href.split('.')[1]}.com`;
            }, 800);
        }
        return response.data;
    },
    function(error) {
        // 对响应错误做点什么
        const twoDomain = window.location.href.split('.')[1];
        Message.error(error.response.data.message || 'Has Error');
        if (error.response.data.code === 10001 &&
            (twoDomain === 'apitest' || twoDomain === 'api')) {
            setTimeout(() => {
                window.location.href = `//sso.${window.location.href.split('.')[1]}.com`;
            }, 800);
        }
        return Promise.reject(error);
    }
);
export default params => {
    const { url, method, data, headers } = params;
    return axios(
        Object.assign(
            {
                url: url,
                method: method,
                headers
            },
            method === 'GET' ? { params: data } : { data: data }
        )
    );
};
