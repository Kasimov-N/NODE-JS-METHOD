const http = require('http')
const body = require('./body')
const { randomUUID } = require('crypto')
let DATA = []
const server = http.createServer(async(req, res)=>{
    body(req,res).then(()=>{
        if(req.url === '/main' && req.method === 'GET'){
            res.writeHead( 200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(DATA))
        }else if(req.url === '/main' && req.method === 'POST'){
            res.writeHead( 200, {'Content-Type':'application/json'})
            const BD = JSON.parse(req.body)
            const newData = {
                id: randomUUID(),
                name: BD.name,
                age: BD.age
            }
            DATA.push(newData)
            const resp = {
                status: 'OK',
            }
            res.end(JSON.stringify(resp))
        }else if( req.url.match(/\/main\/\w+/) && req.method === 'DELETE'){
            const id = req.url.split('/')[2]
            DATA = DATA.filter(item => item.id !== id)
            res.writeHead( 200, {'Content-Type':'application/json'})
            const resp = {
                status: 'DELETE'
            }
            res.end(JSON.stringify(resp))
        }

    })
})





const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`Server Listening on port ${3000}`);
})



