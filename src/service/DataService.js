const deviceMethods{
    Lw360hr = '/device-up-payload/lw-360-hr/from-base64/',
    Goodwin = '/device-up-payload/goodwin/from-base64/'
}

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
    },
    getPayloadMethod(str64){
        let method = ''
        if(str64){
        if(str64.len == 50){
            method = deviceMethods.Lw360hr;
        }else if(str64.len == 30){
            method = deviceMethods.Goodwin;
        }
        return method;
    }
}