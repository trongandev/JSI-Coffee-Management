const loginForm = document.getElementById("login-form");

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

// lắng nghe sự kiện submit của form đăng nhập
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // ngăn chặn hành vi mặc định của form

    // lấy giá trị từ form
    const formData = new FormData(loginForm);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    if (email === "") {
        validate("email", "Email");
        return;
    }
    if (password === "") {
        validate("password", "Password");
        return;
    }

    console.log({ email, password });
    // sử dụng Firebase Authentication để đăng nhập
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Đăng nhập thành công, trả về thông tin người dùng
            var user = userCredential.user;
            console.log(user);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have been logged in successfully.",
                willClose: () => {
                    window.location.href = "/index.html";
                },
            });
        })
        .catch((error) => {
            // lỗi đăng nhập, hiển thị thông báo lỗi
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Error during login:", errorCode, errorMessage);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: errorMessage,
            });
        });
});
