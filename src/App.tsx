import Main from './views/pages/Main'
import { useEffect, useState } from "react";
import liff from "@line/liff";

import '@aws-amplify/ui-react/styles.css';

function App() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        liff
            .init({
                liffId: "1657927433-J7pr9M35",
            })
            .then(() => {

            })
            .catch((e) => {
                setMessage("LIFF init failed.");
                setError(`${e}`);
            });
    });

    return (
        <div className="App">
            {message && <p>{message}</p>}
            {error && (
                <p>
                    <code>{error}</code>
                </p>
            )}
            <Main />
        </div>
    );
}

export default App;
