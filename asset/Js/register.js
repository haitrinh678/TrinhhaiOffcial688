const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password,fullname } = registerForm;
  const handleRegister = await axios.post("http://localhost:3000/users", {
    email: email.value,
    password: password.value,
    fullname: fullname.value,
  });
  if (handleRegister.status == 201) {
   alert("Đăng ký thành công, vui lòng đăng nhập");
   window.location='../../index.html'
  }
  
});
