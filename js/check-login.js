const btnLogin = document.getElementById("btn-login");
const profile = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");

// kiểm tra trạng thái đăng nhập của người dùng
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        // người dùng đã đăng nhập, hiển thị thông tin người dùng
        profileName.textContent = user.displayName || "N/A"; // hiển thị  tên người dùng
        profileAvatar.src = user.photoURL || "https://marketplace.canva.com/tXH-Q/MAG7IGtXH-Q/1/tl/canva-MAG7IGtXH-Q.jpg"; // hiển thị ảnh đại diện
        profile.style.display = "block"; // hiển thị phần thông tin người dùng
        btnLogin.style.display = "none"; // ẩn nút đăng nhập
    } else {
        profile.style.display = "none"; // ẩn phần thông tin người dùng
        btnLogin.style.display = "block"; // hiển thị nút đăng nhập
    }
});
