export default function postBackend(url, requestBody, onRespond, parse=true) {
    // 现在还不是 json
    let jsonObj;    // 返回的东西
    let xmlHttpPost;
    if (window.XMLHttpRequest)
        xmlHttpPost = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlHttpPost = new ActiveXObject("Microsoft.XMLHTTP");

    xmlHttpPost.onreadystatechange = function () {
        if (xmlHttpPost.readyState === 4) {
            if (parse)
                jsonObj = JSON.parse(xmlHttpPost.responseText);
            else
                jsonObj = xmlHttpPost.responseText;
            console.log(jsonObj);
            onRespond(jsonObj);
        }
    }
    xmlHttpPost.open('POST', url, true);
    console.log(url);
    xmlHttpPost.setRequestHeader('content-type', 'application/json');
    console.log(requestBody);
    xmlHttpPost.send(JSON.stringify(requestBody));
}
