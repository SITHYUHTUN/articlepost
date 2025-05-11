import { useEffect } from "react";
import { useApp, queryClient } from "./ThemedApp";
import useWebSocket, { ReadyState } from "react-use-websocket";
export default function AppSocket() {
    const { auth } = useApp();
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        import.meta.env.VITE_WS
    )
    useEffect(() => {
        if (auth && readyState === ReadyState.OPEN) {
            sendJsonMessage({

                token: auth.token,
            })
        }
    },[auth, readyState])
    useEffect(() => {
        console.log("WS: new message received");
        if(lastJsonMessage && lastJsonMessage.event) {
            queryClient.invalidateQueries(lastJsonMessage.event)
        }
    },[lastJsonMessage])
    return <></>
}