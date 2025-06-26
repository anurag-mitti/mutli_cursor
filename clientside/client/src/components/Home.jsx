import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { useEffect, useRef } from 'react'
export default function Home({username})
{ 
    const WS_url='ws://localhost:8000'
    const {sendJsonMessage}=useWebSocket(WS_url,{
        queryParams:{username}
    })


    const THROTTLE=50
    const sendJsonMessageThrottled=useRef(throttle(sendJsonMessage,THROTTLE))

    useEffect(()=>{
        window.addEventListener("mousemove",e=>{
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y:e.clientX
            })
        })
    },[])

    return(
        <>
        <h1> welcome  {username}</h1>
        </>
    )
}