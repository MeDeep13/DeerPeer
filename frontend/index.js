const container= document.getElementById("container");
const login_btn= document.getElementById("login");
const signup_btn= document.getElementById("signup");

login_btn.addEventListener("click", ()=>{
    window.location.href="login.html";
});

signup_btn.addEventListener("click", ()=>{
    window.location.href= "signup.html";
})