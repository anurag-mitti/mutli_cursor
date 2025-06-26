import useWebSocket from 'react-use-websocket'
export default function Home({username})
{ 
    const WS_url='ws://localhost:8000'
    const {sendJsonMessage}=useWebSocket(WS_url,{
        queryParams:{username}
    })
    return(
        <>
        <h1> welcome  {username}</h1>
        </>
    )
}