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
            html += `<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(75,54,33,0.06)] hover:-translate-y-1 transition-all duration-300">
                            <div class="relative aspect-square overflow-hidden bg-surface-container">
                                <img
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    data-alt="A premium matte-finished coffee bag standing elegantly on a wooden counter of a sunlit boutique cafe. The packaging features minimalist artisanal typography and earthy brown tones, surrounded by scattered whole coffee beans. Warm, high-key natural lighting creates soft shadows, emphasizing a clean, professional light-mode aesthetic."
                                    src="${product.image}"
                                />
                                <span class="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm uppercase tracking-wide">Single Origin</span>
                            </div>
                            <div class="p-6">
                                <a href="./detail.html?${productId}" class="font-headline-md text-headline-md text-primary mb-1">${product.name}</a>
                          
                                <p class="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2 italic">${product.description}</p>
                                <div class="flex items-center justify-between mt-auto">
                                    <span class="font-headline-md text-headline-md text-primary">${product.price.toLocaleString()}đ</span>
                                    <button class="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-secondary transition-colors active:scale-95 flex items-center gap-2">
                                        <span class="material-symbols-outlined text-[20px]" data-icon="add_shopping_cart">add_shopping_cart</span>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>`;
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
