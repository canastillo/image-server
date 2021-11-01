const imgPicker = document.getElementById("single-img");
const imgPreview = document.getElementById("img-preview");

imgPicker.addEventListener("change", function () {
    const files = imgPicker.files[0];

    if (files) {
        const fileReader = new FileReader();
        
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" />';
        });

        fileReader.readAsDataURL(files);
    }
});