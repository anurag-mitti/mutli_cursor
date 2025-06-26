const http= require('http')
const uuidv4=   require('uuid').v4
const url= require('url')

const { WebSocketServer } = require('ws')
 
const server= http.createServer()
const port=8000
const wsServer= new WebSocketServer({ server })

const connections= {}
const users= {}

const broadcast = () => {
  const message = JSON.stringify(users);

  wsServer.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};







const handleMessage=(bytes,uuid)=>
{
    const message=JSON.parse(bytes.toString())
    const curUser=users[uuid]
    curUser.state=message
    broadcast()
    
}

wsServer.on('connection', (connection,request) => {
    const{username}= url.parse(request.url, true).query
    const uuid= uuidv4() 

    connections[uuid]= connection
    users[uuid]={
        username,
        state:{
            x:0,
            y:0

        }
    }

    connection.on('message', message=>handleMessage(message,uuid))

    
  
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
