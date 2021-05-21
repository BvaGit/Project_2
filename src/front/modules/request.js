function postRequest(url, obj){
  
   return (fetch (url, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(obj)
    }));
 
}

export default postRequest;