const btnLogin = document.getElementById("btn-login");
const profile = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");
const btnLogout = document.getElementById("btn-logout");

// kiểm tra trạng thái đăng nhập của người dùng
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        // người dùng đã đăng nhập, hiển thị thông tin người dùng
        profileName.textContent = user.displayName || "N/A"; // hiển thị  tên người dùng
        profileAvatar.src = user.photoURL || "https://marketplace.canva.com/tXH-Q/MAG7IGtXH-Q/1/tl/canva-MAG7IGtXH-Q.jpg"; // hiển thị ảnh đại diện
        profile.classList.remove("hidden"); // hiển thị phần thông tin người dùng
        btnLogin.classList.add("hidden"); // ẩn nút đăng nhập
    } else {
        profile.classList.add("hidden"); // ẩn phần thông tin người dùng
        btnLogin.classList.remove("hidden"); // hiển thị nút đăng nhập
    }
});

// xử lý sự kiện đăng xuất
btnLogout.addEventListener("click", () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Logout Successful",
                text: "You have been logged out successfully.",
            });
        })
        .catch((error) => {
            console.error("Error during logout:", error);
            Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: error.message,
            });
        });
});
