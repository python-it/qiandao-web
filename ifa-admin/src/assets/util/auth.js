/**
 * @encodeUnicode加码
 * @param {*} str
 * @returns
 */
export function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

/**
 * @decodeUnicode解码
 * @param {*} str
 * @returns
 */
export function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}