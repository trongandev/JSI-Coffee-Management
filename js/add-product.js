const addForm = document.getElementById("form-add");

function validate(nameSelector, message) {
    Swal.fire({
        icon: "error",
        title: `${message} Required`,
        text: `Please enter your ${message.toLowerCase()}.`,
        willClose: () => {
            document.querySelector(`input[name="${nameSelector}"]`).focus();
        },
    });
    return;
}

addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addForm);
    const name = formData.get("name").trim();
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description").trim();
    const image = formData.get("image").trim();

    if (name === "") {
        validate("name", "Product Name");
        return;
    }

    if (isNaN(price) || price <= 0) {
        validate("price", "Valid Price");
        return;
    }

    if (description === "") {
        validate("description", "Description");
        return;
    }

    if (image === "") {
        validate("image", "Image URL");
        return;
    }
    console.log({ name, price, description, image });
    const db = firebase.firestore();

    Swal.fire({
        title: "Adding Product...",
        text: "Please wait while we add your product.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
    // Add a new document with a generated id.
    db.collection("products")
        .add({
            name: name,
            price: price,
            description: description,
            image: image,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            Swal.fire({
                icon: "success",
                title: "Product Added",
                text: "Your product has been added successfully.",
            }).then(() => {
                addForm.reset();
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error adding your product. Please try again.",
            });
        });
});
