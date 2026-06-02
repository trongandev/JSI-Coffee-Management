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
});
