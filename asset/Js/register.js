const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password,fullname } = registerForm;
 try {
   const handleRegister = await axios.post("http://localhost:3000/users", {
    email: email.value,
    password: password.value,
    fullname: fullname.value,
  });
  if (handleRegister.status == 201) {
   alert("Đăng ký thành công, Vui lòng Nhấn Vào User để đăng nhập!");
   window.location='../../index.html'
  }
 } catch (error) {
   if (error?.response?.data == "Email already exists") {
     alert("Email người dùng đã tồn tại")
     return;
   }
  alert(error?.response?.data);

 }
  
});
