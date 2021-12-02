const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// tslint:disable-next-line:only-arrow-functions
export function dateToString(inDate: Date, formatMask: string) {
    if (!formatMask) {
        throw new Error ('DateToString: Missing format mask');
    }
    formatMask = formatMask.toLowerCase();
    if (formatMask.indexOf('dd') === -1 || formatMask.indexOf('mm') === -1) {
        throw new Error ('DateToString: Invalid format mask ' + formatMask);
    }
    const d = inDate.getDate();
    const dStr = d < 10 ? '0' + d.toString() : d.toString();
    const m = inDate.getMonth() + 1;
    const mStr = m < 10 ? '0' + m.toString() : m.toString();
    let outStr = formatMask.replace('dd', dStr);
    outStr = outStr.replace('mmm', months[m]);
    outStr = outStr.replace('mm', mStr);
    outStr = outStr.replace('yyyy', inDate.getFullYear().toString());
    outStr = outStr.replace('yy', inDate.getFullYear().toString().substr(0, 2));
    return outStr;
}
