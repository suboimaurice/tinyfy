import { useState, useEffect } from "react";

function FilePreviewForm({ onClose }) {
    const [compressedFiles, setCompressedFiles] = useState([]);

    useEffect(() => {
        fetch("http://localhost/url-shortener/backend/routes/fetchCompressed.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.files) {
                    setCompressedFiles(data.files);
                }
            })
            .catch((error) => console.error("Error fetching files:", error));
    }, []);

    return (
        <div className="file-preview">
            <h2>Compressed Files</h2>
            <ul>
                {compressedFiles.map((file, index) => (
                    <li key={index}>
                        <a href={file.url} download>{file.name}</a>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default FilePreviewForm;
