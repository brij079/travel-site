exports.handler = function(event, context, callback) {
    const secretContent = `
    <h3> Welcome to Secret area</h3>
    <p>Sky is <strong>blue</strong><p>`
    
    let body


    if (event.body) {
        body = JSON.parse(event.body)
    } else{
        body = {}
    }

    if (body.passwod == "javascript") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
            
        })
    }
    
    
}