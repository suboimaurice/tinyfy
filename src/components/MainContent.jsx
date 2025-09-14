import React, { useState } from "react";
import HandleInput from "./HandleInput";
import FilePreviewForm from "./FilePreviewForm";
import ShortenModal from "./ShortenModal";
import mainImage from "../assets/images/main-image.png";
import { showSuccess,showError } from "../utils/toast";

function MainContent() {
    const [buttonText, setButtonText] = useState("Upload");
    const [showForm, setShowForm] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlInput = document.querySelector(".urlInput");
        const urlValue = urlInput.value.trim();
        if (urlValue) {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const backendUrl = `${API_BASE_URL}/shorten`;
                const res = await fetch(backendUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: urlValue })
                });
                const data = await res.json();
                if (data.short) {
                    showSuccess("Link shortened successfully!");
                    setShortUrl(data.short);
                    setModalOpen(true);
                }
            } catch (err) {
                showError("Error shortening link: " + err.message);
            }
        }
        // else: handle file upload (existing logic)
    };

    return (
        <>
            {showForm && (
                <FilePreviewForm
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onClose={() => setShowForm(false)}
                />
            )}
            <ShortenModal open={modalOpen} shortUrl={shortUrl} onClose={() => setModalOpen(false)} />
            <HandleInput
                fileInput="fileInput"
                previewContainer="filePreviewContainer"
                allowedTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "*/*",
                ]}
                setButtonText={setButtonText}
                setShowForm={setShowForm}
                setSelectedFiles={setSelectedFiles}
            />
            <div className="w-full flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#270125d7]">
                <div className="flex flex-col items-center p-6">
                    <img src={mainImage} alt="Tinyfy" className="rounded-lg shadow-lg max-w-xs mb-4" />
                </div>
                <div className="border-l border-[#5c385a] mx-8 hidden md:block h-100"></div>
                <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center md:text-left lg:text-left">
                    <h1 className="text-3xl font-bold mb-1 text-[#2d112b]">Just tinyfy...</h1>
                    <h2 className="text-xl font-bold mb-2 text-[#974091]">your bytes!</h2>
                    <p className="text-[#974091] mb-6">
                        Simplify your digital world. Shorten links, compress images, convert files (docs, pdf, etc.), and more with Tinyfy.
                    </p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                id="fileInput"
                                name="files[]"
                                className="fileInput hidden"
                                multiple
                                accept="image/*,.pdf,.doc,.docx,*"
                            />
                            <label htmlFor="fileInput" className="block p-4 border-1 border-dashed border-[#974091] rounded-xl cursor-pointer bg-[#f1c5ef] hover:bg-gray-200 text-center text-[#974091]">
                                Drop your files here or click to browse
                            </label>
                            <input type="url" className="urlInput w-full p-3 border-1 border-[#974091] rounded-xl focus:outline-none focus:border-[#e483dd] text-lg" placeholder="Or paste a link here" />
                        </div>
                        <button id="uploadBtn" type="submit" className="w-full py-3 px-6 bg-[#2d112b] text-white rounded-xl font-semibold shadow hover:bg-[#e483dd] hover:text-[#2d112b] transition">
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MainContent;
