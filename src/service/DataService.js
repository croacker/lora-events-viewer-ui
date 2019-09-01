export default {
    byteToHex(arr) {
        return Array.from(arr, function(byte) {
            return ("0" + (byte & 0xff).toString(16)).slice(-2);
        }).join("");
    },
    byteToBase64(arr) {
        let binary = "";
        const bytes = new Uint8Array(arr);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}