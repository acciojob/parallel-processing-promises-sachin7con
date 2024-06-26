//SGN your JS code here. If required.

    const output = document.getElementById("output");
    const btn = document.getElementById("download-images-button");

    const images = [
      { url: "https://picsum.photos/id/237/200/300" },
      { url: "https://picsum.photos/id/238/200/300" },
      { url: "https://picsum.photos/id/239/200/300" },
    ];

    // download image
    const downloadImage = (image) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(image);
            img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
            img.src = image.url;
        });
    };

    // display image
    const displayImages = (images) => {
        images.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', image.url);
            imgElement.onload = () => {
            output.appendChild(imgElement);
        };
        imgElement.src = image.url;
        });
    };

    const loadImage = () => {
        const downloadPromises = images.map(downloadImage);
        Promise.all(downloadPromises)
            .then((downloadedImages) => {
                console.log('All images downloaded successfully:', downloadedImages);
                displayImages(downloadedImages);
            })
            .catch((error) => {
                console.error('Error downloading images:', error);
            });
    };

    // handle btn
    btn.addEventListener('click', loadImage);
