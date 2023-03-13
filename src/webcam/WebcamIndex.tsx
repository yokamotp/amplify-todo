import "./styles.css";
import { useState } from "react";

export default function App() {
    const [openDialog, setOpenDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    return (
        <div className="App">
            <button onClick={() => setOpenDialog(true)}>open dialog</button>
            {imageSrc && <img src={imageSrc} alt="captured img" />}
        </div>
    );
}
