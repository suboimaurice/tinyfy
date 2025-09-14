import React, { useState } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import { showSuccess, showError } from "../utils/toast";

function getFileIcon(type) {
    if (type.startsWith("image/")) return "📷";
    if (type === "application/pdf") return "📄";
    if (type.includes("word")) return "📝";
    return "📁";
}

function formatFileSize(size) {
    return size < 1024
        ? `${size} B`
        : size < 1048576
        ? `${(size / 1024).toFixed(2)} KB`
        : `${(size / 1048576).toFixed(2)} MB`;
}

function FilePreviewForm({ selectedFiles, setSelectedFiles, onClose }) {
    const [isUploading, setIsUploading] = useState(false);
    const [compressedFiles, setCompressedFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleDelete = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };


    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setIsUploading(true);
        setProgress(0);
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const backendUrl = `${API_BASE_URL}/compress`;
            const res = await fetch(backendUrl, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            setIsUploading(false);
            setProgress(100);
            if (data.zip) {
                showSuccess("Files compressed successfully!");
                setCompressedFiles([{ name: data.zip, size: data.size, url: `/compress/${data.zip}` }]);
                setSelectedFiles([]);
            } else {
                showError("Compression failed.");
            }
        } catch (error) {
            setIsUploading(false);
            showError("Error uploading files for compression: " + error.message);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center relative">
                <button className="absolute top-4 right-4 bg-red-400 text-white rounded px-3 py-1 text-lg font-bold hover:bg-red-600 transition" onClick={onClose}>
                    <FaTimes />
                </button>
                {selectedFiles.length > 0 && compressedFiles.length === 0 && (
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Selected Files</h3>
                )}
                <ul className="w-full mb-4">
                    {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-center bg-gray-100 rounded-lg p-3 mb-2 shadow">
                            <span className="text-xl mr-2">{getFileIcon(file.type)}</span>
                            <span className="font-semibold flex-1 truncate">{file.name}</span>
                            <span className="text-sm text-gray-500 mx-2">({formatFileSize(file.size)})</span>
                            <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700" onClick={() => handleDelete(index)}><FaTimes/>Remove</button>
                        </li>
                    ))}
                </ul>

                {isUploading && <progress value={progress} max="100" className="w-full mb-4" />}
                {selectedFiles.length > 0 && (
                    <button className="w-full py-4 md:py-3 lg:py-3  bg-[#2d112b] text-white rounded-xl font-semibold shadow-md hover:bg-[#e483dd] hover:text-[#2d112b] transition mb-0 " onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Compress"}
                    </button>
                )}

                {compressedFiles.length > 0 && (
                    <>
                        <h3 className="text-lg font-bold mb-2 text-gray-800">Compressed File</h3>
                        <ul className="w-full">
                            {compressedFiles.map((file, index) => (
                                <li key={index} className="flex items-center justify-between bg-[#f1c5ef] rounded-xl p-3 mb-2 shadow">
                                    <span className="font-semibold flex-1 truncate">{file.name}</span>
                                    <span className="text-sm text-gray-500 mx-2">({formatFileSize(file.size)})</span>
                                    <a href={file.url} download className="flex gap-2 items-center bg-[#2d112b] text-white px-2 py-1 rounded-xl shadow-sm font-semibold hover:bg-[#e483dd] hover:text-[#2d112b] transition">
                                        Download
                                        <FaDownload className="text-[#e483dd] hover:text-[#2d112b]" size={12}/>
                                        </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
    
}

export default FilePreviewForm;
