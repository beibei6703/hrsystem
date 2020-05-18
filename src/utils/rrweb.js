import Axios from '@src/utils/requestNoError';
const rrweb = require('rrweb');
export default (userName, workCode) => {
    try {
        (function() {
            let events = [];
            let isFirstFrame = true;
            let whiteList = ['#/roster', '#/organizemanage', '#/api'];
            rrweb.record({
                emit(event, isCheckout) {
                    if (isCheckout) {
                        isFirstFrame = true;
                    }
                    const isInWhiteList = whiteList.includes(window.location.hash);
                    if (isInWhiteList && events.length === 301) {
                        save(JSON.parse(JSON.stringify(events)));
                        events = [];
                    }
                    isInWhiteList && events.push(event);
                },
                checkoutEveryNth: 299
            });
            // save 函数用于将 events 发送至后端存入，并重置 events 数组
            function save(eventData) {
                let params = {
                    userName,
                    workCode,
                    system: 'hrm',
                    events: JSON.stringify(eventData),
                    url: location.href,
                    isFirstFrame
                };
                let twoDomain = window.location.href.split('.')[1];
                let baseUrl = '';
                // 如果是线上或者测试环境才跳转
                if (twoDomain === 'apitest' || twoDomain === 'api') {
                    baseUrl = `//skyeye.${twoDomain}.com/behavior/addBehavior`;
                } else {
                    baseUrl = '//skyeye.apitest.com/behavior/addBehavior';
                }
                // 第一帧第二帧发送并缓存
                if (isFirstFrame) {
                    isFirstFrame = false;
                }
                Axios({
                    method: 'post',
                    url: baseUrl,
                    data: params
                });
            }
            // // 每 10 秒调用一次 save 方法，避免请求过多
            // setTimeout(save, 10 * 1000);
        })();
    } catch (error) {
        console.log(error);
    }
};
