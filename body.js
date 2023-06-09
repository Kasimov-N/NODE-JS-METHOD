module.exports = function(req,res){
    return new Promise((resolve, reject)=>{
        try{
            let body = ''
            req.on('data', (chunk)=>{
                body += chunk.toString()
            })
            req.on('end', ()=>{
                req.body = body
                resolve(body)
            })
        }catch(err){
            reject(err);
        }
    })
}