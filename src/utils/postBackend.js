export default function postBackend(url, requestBody, onRespond) {
    let xmlHttpCsrf;
    let jsonObj;    // 返回的东西
    if (window.XMLHttpRequest) {
        xmlHttpCsrf = new XMLHttpRequest();
        xmlHttpCsrf.open('GET', 'backend/csrf', true);
    } else {
        // eslint-disable-next-line no-undef
        xmlHttpCsrf = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
            if (xmlHttpCsrf.status === 200) {
                let xmlHttpPost;
                if (window.XMLHttpRequest)
                    xmlHttpPost = new XMLHttpRequest();
                else
                    // eslint-disable-next-line no-undef
                    xmlHttpPost = new ActiveXObject("Microsoft.XMLHTTP");

                xmlHttpPost.onreadystatechange = function () {
                    if (xmlHttpPost.readyState === 4) {
                        jsonObj = JSON.parse(xmlHttpPost.responseText);
                        console.log(jsonObj);
                        onRespond(jsonObj);
                    }
                }
                const csrfToken = xmlHttpCsrf.responseText;  // 获取 CSRF token
                xmlHttpPost.open('POST', url, true);
                xmlHttpPost.setRequestHeader('content-type', 'application/json');
                xmlHttpPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
                console.log(requestBody);
                xmlHttpPost.send(JSON.stringify(requestBody));
            } else {
                console.log(xmlHttpCsrf.responseText);
            }
        }
    }
    xmlHttpCsrf.send();
}
