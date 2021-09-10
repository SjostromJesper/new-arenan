import {useState, useEffect} from 'react'
import io from "socket.io-client"

const endpoint = "http://90.142.49.129:27280";
const socket = io(endpoint);

function App() {
    const [response, setResponse] = useState([]);
    const [foo, setFoo] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        socket.on("message", data => {
            setResponse(data);
        })

        socket.on("error", data => {
            setError(data);
        })
    })

    const queueing = () => {
        // const idNumber = Math.floor(Math.random() * 2) + 1
        socket.emit('queue', foo)
    }

    return (
        <div className="App">

            <p>{error}</p>
            <input type="text" onChange={e => setFoo(e.target.value)}/>
            <button onClick={() => queueing()}>queue</button>

            {
                response.map(t => {
                    return (
                        <div>
                            <p>{t}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default App;
