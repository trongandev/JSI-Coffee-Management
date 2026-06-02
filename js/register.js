const registerForm = document.getElementById("register-form");

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

// lắng nghe sự kiện submit của form đăng ký
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // ngăn chặn hành vi mặc định của form

    // lấy giá trị từ form
    const formData = new FormData(registerForm);
    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (fullName === "") {
        validate("fullName", "Full Name");
        return;
    }
    if (email === "") {
        validate("email", "Email");
        return;
    }
    if (password === "") {
        validate("password", "Password");
        return;
    }
    if (confirmPassword !== password) {
        validate("confirmPassword", "Confirm Password, password not match");
        return;
    }

    console.log({ email, fullName, password, confirmPassword });
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "Your account has been created successfully.",
                willClose: () => {
                    window.location.href = "./login.html";
                },
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Error during registration:", errorCode, errorMessage);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: errorMessage,
            });
        });
});
