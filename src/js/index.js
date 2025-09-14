// document.addEventListener("DOMContentLoaded", () => {
// 		class FileUploader {
// 				constructor(inputSelector, uploadUrl) {
// 						this.fileInput = document.querySelector(inputSelector);
// 						this.filePreviewContainer = this.createPreviewContainer();
// 						this.allowedTypes = [
// 								"image/jpeg", "image/png", "image/gif", "image/webp", 
//                 "image/svg+xml", "image/bmp", "application/pdf", 
//                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// 								"application/vnd.openxmlformats-officedocument.presentationml.presentation"
// 						];
// 						this.maxFiles = 5;
// 						this.selectedFiles = [];
// 						this.uploadUrl = uploadUrl;

// 						this.init();
// 				}

// 				init() {
// 						this.fileInput.addEventListener("change", () => this.handleFileSelection());
// 				}

// 				createPreviewContainer() {
// 						const container = document.createElement("div");
// 						container.id = "filePreviewContainer";
// 						container.className = "file-preview-container";
// 						this.fileInput.parentNode.insertBefore(container, this.fileInput.nextSibling);
// 						return container;
// 				}

// 				handleFileSelection() {
// 						const newFiles = Array.from(this.fileInput.files);
// 						const validFiles = this.filterValidFiles(newFiles);
// 						const uniqueFiles = this.filterDuplicates(validFiles);

// 						if (this.selectedFiles.length + uniqueFiles.length > this.maxFiles) {
// 								alert(`You can only select up to ${this.maxFiles} files.`);
// 								return;
// 						}

// 						this.selectedFiles = [...this.selectedFiles, ...uniqueFiles];
// 						this.updateFilePreview();
// 				}

// 				filterValidFiles(files) {
// 						return files.filter(file => {
// 								if (!this.allowedTypes.includes(file.type)) {
// 										alert(`Unsupported file: ${file.name}`);
// 										return false;
// 								}
// 								return true;
// 						});
// 				}

// 				filterDuplicates(files) {
// 						return files.filter(file => {
// 								const isDuplicate = this.selectedFiles.some(existingFile =>
// 										existingFile.name === file.name && existingFile.size === file.size
// 								);
// 								if (isDuplicate) alert(`Duplicate file ignored: ${file.name}`);
// 								return !isDuplicate;
// 						});
// 				}

// 				updateFilePreview() {
// 						this.filePreviewContainer.innerHTML = "";
// 						if (this.selectedFiles.length === 0) return;

// 						const fileList = document.createElement("ul");
// 						fileList.className = "file-list";

// 						this.selectedFiles.forEach((file, index) => {
// 								const fileItem = document.createElement("li");
// 								fileItem.className = "file-item";

// 								fileItem.innerHTML = `
// 										<span class="file-icon">${this.getFileIcon(file.type)}</span>
// 										<span class="file-name">${file.name}</span>
// 										<span class="file-size">${this.formatFileSize(file.size)}</span>
// 										<button class="remove-file" data-index="${index}">×</button>
// 								`;

// 								fileList.appendChild(fileItem);
// 						});

// 						this.filePreviewContainer.appendChild(fileList);
// 						this.addRemoveEvent();
// 				}

// 				addRemoveEvent() {
// 						document.querySelectorAll(".remove-file").forEach(btn => {
// 								btn.addEventListener("click", (e) => {
// 										const index = e.target.dataset.index;
// 										this.selectedFiles.splice(index, 1);
// 										this.updateFilePreview();
// 								});
// 						});
// 				}

// 				getFileIcon(fileType) {
// 						if (fileType.startsWith("image/")) return "🖼️";
// 						if (fileType.includes("pdf")) return "📄";
// 						if (fileType.includes("word")) return "📝";
// 						if (fileType.includes("presentation")) return "📊";
// 						return "📁";
// 				}

// 				formatFileSize(bytes) {
// 						const sizes = ["Bytes", "KB", "MB", "GB"];
// 						const i = Math.floor(Math.log(bytes) / Math.log(1024));
// 						return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
// 				}

// 				uploadFiles() {
// 						if (this.selectedFiles.length === 0) {
// 								alert("Please select at least one file.");
// 								return;
// 						}

// 						const formData = new FormData();
// 						this.selectedFiles.forEach(file => formData.append("files[]", file));

// 						fetch(this.uploadUrl, { method: "POST", body: formData })
// 								.then(res => res.json())
// 								.then(data => {
// 										if (data.success) {
// 												alert("Files uploaded successfully!");
// 												this.selectedFiles = [];
// 												this.updateFilePreview();
// 										} else {
// 												alert("Upload failed.");
// 										}
// 								})
// 								.catch(error => console.error("Upload error:", error));
// 				}
// 		}

// 		// Initialize file uploader
// 		const uploader = new FileUploader("#fileInput", "compress");

// 		// Attach upload button event
// 		document.getElementById("uploadBtn").addEventListener("click", () => uploader.uploadFiles());
// });
