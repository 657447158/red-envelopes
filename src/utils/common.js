/*
** 时间戳显示为多少分钟前，多少天前的处理
*/
export function dateDiff (timestamp) {
    // 补全为13位
    let arrTimestamp = (timestamp + '').split('');
    for (let start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;

    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }

    // 计算差异时间的量级
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;

    // 数值补0方法
    let zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            let date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
}

// 将传入的秒数转为分钟形式 mm分ss秒 mm:ss
export function translateMinute (s, formats = 'mm分ss秒') {
    let zero = function (value) {
        if (value < 10) {
            return '0' + value
        }
        return value
    }
    let minute = zero(parseInt(s / 60))
    let secends = zero(s % 60)

    return formats.replace(/mm|ss/ig, (matches) => {
        return ({
           mm: minute,
           ss: secends 
        })[matches]
    })
}