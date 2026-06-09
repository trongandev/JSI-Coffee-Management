const id = window.location.search.substring(1);
const db = firebase.firestore();
// tham chiếu đến tài liệu sản phẩm cụ thể trong Firestore
const productRef = db.collection("products").doc(id);
const btnCart = document.getElementById("btn-cart");
let productData = null;
// lấy dữ liệu sản phẩm và điền vào form
productRef
    .get()
    .then((doc) => {
        if (doc.exists) {
            const product = doc.data();
            document.querySelector("#name1").textContent = product.name;
            document.querySelector("#name").textContent = product.name;
            document.querySelector("#price").textContent = product.price.toLocaleString() + "đ";
            document.querySelector("#description").textContent = product.description;
            document.querySelector("#image").src = product.image;

            btnCart.addEventListener("click", () => {
                // Lấy giỏ hàng hiện tại từ localStorage
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
                const existingProductIndex = cart.findIndex((item) => item.id === id);
                if (existingProductIndex !== -1) {
                    // Nếu đã tồn tại, tăng số lượng lên 1
                    cart[existingProductIndex].quantity += 1;
                } else {
                    // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                    cart.push({
                        id: id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                    });
                }
                // Lưu giỏ hàng đã cập nhật vào localStorage
                localStorage.setItem("cart", JSON.stringify(cart));

                // Hiển thị thông báo thành công
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Product added to cart!",
                });
            });
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
            window.location.href = "/index.html";
        });
    });
