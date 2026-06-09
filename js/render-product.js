const productContainer = document.getElementById("product-container");

// khởi tạo Firestore
const db = firebase.firestore();
let html = ``;
// Lấy dữ liệu sản phẩm từ Firestore
db.collection("products")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productId = doc.id;
            html += `  <tr class="hover:bg-surface-container-low/50 transition-colors group">
                            <td class="px-6 py-4 w-1/4">
                                <div class="flex items-center gap-4">
                                    <div class="w-24 h-30 rounded-lg overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10">
                                        <img class="w-full h-full object-cover"
                                            src="${product.image}"/>
                                    </div>
                                    <div>
                                        <p class="font-label-md text-label-md text-primary">${product.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 font-body-md text-primary font-semibold">${product.price.toLocaleString()}đ</td>
                                 <td class="px-6 py-4 font-body-md text-on-surface line-clamp-2">${product.description}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <button class="p-2 text-on-surface-variant hover:text-secondary hover:bg-surface-container-high rounded-full transition-all" title="Edit"  onclick="window.location.href='./edit-product.html?${productId}'">
                                        <span class="material-symbols-outlined">edit</span>
                                    </button>
                                    <button class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all" title="Delete" onclick="deleteProduct('${productId}')">
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
        });
        productContainer.innerHTML = html;
    })
    .catch((error) => {
        console.error("Error fetching products: ", error);
    });

function deleteProduct(productId) {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection("products")
                .doc(productId)
                .delete()
                .then(() => {
                    Swal.fire("Deleted!", "The product has been deleted.", "success").then(() => {
                        window.location.reload();
                    });
                })
                .catch((error) => {
                    console.error("Error deleting product: ", error);
                    Swal.fire("Error!", "There was an error deleting the product. Please try again.", "error");
                });
        }
    });
}
