const id = window.location.search.substring(1);
const db = firebase.firestore();
// tham chiếu đến tài liệu sản phẩm cụ thể trong Firestore
const productRef = db.collection("products").doc(id);

// lấy dữ liệu sản phẩm và điền vào form
productRef
    .get()
    .then((doc) => {
        if (doc.exists) {
            const product = doc.data();
            document.querySelector('input[name="name"]').value = product.name;
            document.querySelector('input[name="price"]').value = product.price;
            document.querySelector('textarea[name="description"]').value = product.description;
            document.querySelector('input[name="image"]').value = product.image;
        } else {
            console.error("No such document!");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Product not found.",
            }).then(() => {
                window.location.href = "/html/dashboard-crud.html";
            });
        }
    })
    .catch((error) => {
        console.error("Error getting document: ", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an error fetching the product data. Please try again.",
        }).then(() => {
            window.location.href = "./index.html";
        });
    });

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
        .doc(id)
        .update({
            name: name,
            price: price,
            description: description,
            image: image,
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Product Edited",
                text: "Your product has been edited successfully.",
            }).then(() => {
                window.location.href = "/html/dashboard-crud.html";
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
