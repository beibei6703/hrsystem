import { Message } from 'element-ui';

export const successMsg = (data) => {
    Message({
        message: data,
        type: 'success'
    });
};
export const errorMsg = (data) => {
    Message.error(data);
};
