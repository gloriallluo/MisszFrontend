export default function getBackend(url, requestParams, onRespond) {
    let xmlHttp = null;
    if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (xmlHttp != null) {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                const jsonObj = JSON.parse(xmlHttp.responseText);
                onRespond(jsonObj);
            }
        }
        let trueUrl = url;
        console.log(requestParams);
        if (requestParams !== null && typeof requestParams === "object") {
            trueUrl += "?";
            Object.keys(requestParams).forEach(key => {
                trueUrl += `${key}=${requestParams[key]}&`;
            });
            trueUrl = trueUrl.substring(0, trueUrl.length - 1);
        }
        console.log(trueUrl);
        xmlHttp.open('GET', trueUrl, true);
        xmlHttp.send(null);
    } else {
        alert("Your browser does not support XmlHTTP...");
    }
}