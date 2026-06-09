const cartContainer = document.getElementById("cart-container");

// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let html = "";
if (cart.length === 0) {
    html = `<p class="text-center text-on-surface-variant font-body-md">Your cart is empty. Start adding some delicious coffee!</p>`;
} else {
    cart.forEach((item) => {
        html += `  <div class="bg-surface shadow-warm rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 group transition-all duration-200 hover:-translate-y-0.5">
                        <div class="w-full md:w-32 h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
                            <img
                                class="w-full h-full object-cover"
                                data-alt="A premium bag of artisanal dark roast coffee beans sitting on a rustic wooden table in a sunlit boutique cafe. The lighting is soft and warm, highlighting the matte finish of the packaging and the deep brown colors of the brand identity. The background shows a blurred high-end espresso machine."
                                src="${item.image}"
                            />
                        </div>
                        <div class="flex-grow w-full">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <h3 class="font-headline-md text-headline-md text-primary">${item.name}</h3>
                                    <p class="text-on-surface-variant font-label-md">Light Roast • Whole Bean</p>
                                </div>
                                <button class="text-outline hover:text-error transition-colors p-1" title="Remove Item">
                                    <span class="material-symbols-outlined" data-icon="delete">delete</span>
                                </button>
                            </div>
                            <div class="flex justify-between items-center mt-4">
                                <div class="flex items-center bg-surface-container-low rounded-full px-2 border border-outline-variant/30">
                                    <button class="p-2 text-primary hover:text-secondary active:scale-90 transition-transform">
                                        <span class="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
                                    </button>
                                    <span class="px-4 font-bold text-on-surface">${item.quantity}</span>
                                    <button class="p-2 text-primary hover:text-secondary active:scale-90 transition-transform">
                                        <span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                                    </button>
                                </div>
                                <span class="font-headline-md text-headline-md text-secondary">${(item.price * item.quantity).toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>`;
    });
    cartContainer.innerHTML = html;
}

const subtotalText = document.getElementById("subtotal-text");
const subtotalAmount = document.getElementById("subtotal-amount");
const shippingAmount = document.getElementById("shipping-amount");
const taxesAmount = document.getElementById("taxes-amount");
const totalAmount = document.getElementById("total-amount");

function updateCartSummary() {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 20000; // Giả sử phí vận chuyển cố định là 20,000đ
    const taxes = subtotal * 0.08; // Giả sử thuế là 8%
    const total = subtotal + shipping + taxes;
    subtotalText.textContent = `Subtotal (${cart.reduce((acc, item) => acc + item.quantity, 0)} items)`;
    subtotalAmount.textContent = `${subtotal.toLocaleString()}đ`;
    shippingAmount.textContent = `${shipping.toLocaleString()}đ`;
    taxesAmount.textContent = `${taxes.toLocaleString()}đ`;
    totalAmount.textContent = `${total.toLocaleString()}đ`;
}

updateCartSummary();
