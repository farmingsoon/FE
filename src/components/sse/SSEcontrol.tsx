// import { useRef, useEffect } from "react";
// import { EventSourcePolyfill } from "event-source-polyfill";

// const SSEcontrol = () => {
//     const eventSource = useRef<EventSourcePolyfill | null | undefined>();
//     const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//     const config = {
        
//     }

//     useEffect(() => {
//         const connectSSE = () => {
//             eventSource.current = new EventSourcePolyfill(`${BASE_URL}/api/notifications/subscribe`)
//         }
//     })
// }

// export default SSEcontrol;