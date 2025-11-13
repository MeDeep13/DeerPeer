const container= document.getElementById("container");

const form= document.getElementById("signupForm");

const usernameInput= document.getElementById("username");
const emailInput= document.getElementById("email");
const passwordInput= document.getElementById("password");


const submit= document.getElementById("submit");

//login instead?
const other_container= document.createElement("div");
const login_btn= document.createElement("button");
login_btn.textContent= "Login";
other_container.appendChild(login_btn);
login_btn.addEventListener("click", ()=>{
    window.location.href="login.html";
})
document.body.appendChild(other_container);


form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const username= usernameInput.value;
    const email= emailInput.value;
    const password= passwordInput.value;

    try{
        const res= await fetch("http://localhost:1973/api/users/register",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password})
    });

    const data= await res.json();
    if(res.ok){
        alert("User registered!");
        window.location.href= "login.html";
    }else{
        alert("Registration failed");
    }
    }catch(err){
        alert("Error connecting to the server");
    }
    passwordInput.value="";
})