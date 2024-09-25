// Handle file selection
document.getElementById('fileInputButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function () {
    handleFiles(this.files);
});

const dragArea = document.getElementById('dragArea');

dragArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    dragArea.style.backgroundColor = '#f0f8ff';
});

dragArea.addEventListener('dragleave', function () {
    dragArea.style.backgroundColor = '';
});

dragArea.addEventListener('drop', function (event) {
    event.preventDefault();
    dragArea.style.backgroundColor = '';
    handleFiles(event.dataTransfer.files);
});

function handleFiles(files) {
    const uploadedFilesContainer = document.getElementById('uploadedFilesContainer');
    const OR = document.getElementById('oR');
    uploadedFilesContainer.innerHTML = ''; // Clear previous uploaded files

    const validFiles = Array.from(files).filter(file => file.type === 'image/jpeg');
    const totalFiles = validFiles.length;

    // Hide the selection and drag area if files are selected
    if (totalFiles > 0) {
        document.getElementById('fileInputButton').style.display = 'none';
        dragArea.style.display = 'none';
        OR.style.display = 'none';
    }

    validFiles.forEach((file, index) => {
        // Create new uploadedFiles section if necessary
        let uploadedFilesSection;
        if (index % 6 === 0) {
            uploadedFilesSection = document.createElement('div');
            uploadedFilesSection.className = 'uploadedFiles';
            uploadedFilesContainer.appendChild(uploadedFilesSection);
        } else {
            uploadedFilesSection = uploadedFilesContainer.lastChild;
        }

        // Create fileBox
        const fileBox = document.createElement('div');
        fileBox.className = 'fileBox';
        fileBox.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        uploadedFilesSection.appendChild(fileBox);
    });

    // Show the convert button when files are selected
    document.querySelector('.convertBtn').style.display = 'block';
}

// Convert multiple JPGs to PNG and download separately
document.querySelector('.convertBtn').addEventListener('click', function () {
    const boxes = document.querySelectorAll('.fileBox');

    boxes.forEach((box, index) => {
        const imgUrl = box.style.backgroundImage.slice(5, -2);
        const img = new Image();
        img.src = imgUrl;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const pngData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngData;
            link.download = `simplyconvert-converted-image-${index + 1}.png`;
            link.click();
        };
    });
});
