export const getTreeData = (data) => {
    if (data) {
        // 循环遍历json数据
        for (var i = 0; i < data.length; i++) {
            if (data[i].childrenDepartment) {
                if (data[i].childrenDepartment.length < 1) {
                    // children若为空数组，则将children设为undefined
                    data[i].childrenDepartment = undefined;
                } else {
                    // children若不为空数组，则继续 递归调用 本方法
                    getTreeData(data[i].childrenDepartment);
                }
            }
        }
    }
    return data;
};
