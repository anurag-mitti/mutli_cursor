import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { useEffect, useRef } from 'react'
import { Cursor } from './Cursor'

const renderCursors=users=>{
    return Object.keys(users).map(uuid=>{
        const user= users[uuid]

        return(
            <Cursor key={uuid} point={[user.state.x, user.state.y]}/>
        )
    })
}

const renderUserList=users=>{

    return(
        <ul>
            {Object.keys(users).map(uuid=>{
                return <li key={uuid}>{JSON.stringify(users[uuid])}</li>
            })}
        </ul>
    )
}

export default function Home({username})
{ 
    const WS_url='ws://localhost:8000'
    const {sendJsonMessage,lastJsonMessage}=useWebSocket(WS_url,{
        queryParams:{username}
    })


    const THROTTLE=50
    const sendJsonMessageThrottled=useRef(throttle(sendJsonMessage,THROTTLE))

    useEffect(()=>{
        sendJsonMessage({
            x:0,
            y:0
        })
        window.addEventListener("mousemove",e=>{
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y:e.clientX
            })
        })
    },[])
    if(lastJsonMessage){
        return(<>
        {renderCursors(lastJsonMessage)}
        {renderUserList(lastJsonMessage)}
        </>)
    }

    return(
        <>
        <h1> welcome  {username}</h1>
        </>
    )
}