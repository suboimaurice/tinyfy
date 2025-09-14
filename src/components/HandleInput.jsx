import { useEffect } from "react";

export default function HandleInput({ fileInput, previewContainer, allowedTypes, setButtonText, setShowForm, setSelectedFiles }) {
    useEffect(() => {
        const fileInputElement = document.getElementById(fileInput);
        const urlInput = document.querySelector(".urlInput");

        if (!fileInputElement || !urlInput) return;

        const handleFileChange = (event) => {
            const files = Array.from(event.target.files); // Convert FileList to array

            if (files.length > 0) {
                setSelectedFiles(files); 
                setButtonText("Compress"); 
                setShowForm(true); 
            } else {
                setShowForm(false);
            }
        };

        const handleUrlChange = (event) => {
            const urlValue = event.target.value.trim();
            const isValidUrl = urlValue.match(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g);

            if (isValidUrl) {
                setButtonText("Shorten");
                setShowForm(false); // Hide file popup when entering a URL
            }
        };

        fileInputElement.addEventListener("change", handleFileChange);
        urlInput.addEventListener("input", handleUrlChange);

        return () => {
            fileInputElement.removeEventListener("change", handleFileChange);
            urlInput.removeEventListener("input", handleUrlChange);
        };
    }, [fileInput,previewContainer,allowedTypes, setButtonText, setShowForm, setSelectedFiles]);

    return null;
}

