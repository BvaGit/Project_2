function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

export function postRequest(url, obj){
    const token = getCookie("token");
    return (fetch (url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        }));
 
}

export function putRequest(url, obj){
    const token = getCookie("token");
    return (fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    }));

}


export function getRequest(url){
    const token = getCookie("token");
    return (fetch (url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }));
 
}

export function deleteRequest(url){
    const token = getCookie("token");
    return (fetch (url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
}

/*export function deleteAllRequest(url){
    const token = getCookie("token");
    return (fetch (url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
}*/




