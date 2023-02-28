import "./styles.css";
import { useState } from "react";
import WebcamDialog from "./WebcamDialog";

export default function App() {
    const [openDialog, setOpenDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    return (
        <div className="App">
            <WebcamDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                setImageSrc={setImageSrc}
            />
            <button onClick={() => setOpenDialog(true)}>open dialog</button>
            {imageSrc && <img src={imageSrc} alt="captured img" />}
        </div>
    );
}
