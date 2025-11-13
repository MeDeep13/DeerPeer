// selecting the container where i will be appending elements
const container= document.getElementById("loginContainer");

// create a login form
const form= document.createElement("form"); // creates element dynamically

// create email input
const emailInput= document.createElement("input");
emailInput.type= "email";
emailInput.placeholder= "Enter college email";
emailInput.required= true; // user must fill this

//creating password input
const passwordInput= document.createElement("input");
passwordInput.type= "password";
passwordInput.placeholder= "Enter password";
passwordInput.required= true;

// creating submit button
const submitBtn= document.createElement("button");
submitBtn.type= "submit";
submitBtn.textContent= "Login"; //sets text inside a tag

//signup instead?
const signupbtn= document.createElement("button");
signupbtn.textContent= "Signup";
const other_container= document.getElementById("other_container");
other_container.appendChild(signupbtn);
signupbtn.addEventListener("click", ()=>{
    window.location.href= "signup.html";
})

// appending inputs and button to our form element
form.appendChild(emailInput);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));
form.appendChild(passwordInput);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));
form.appendChild(submitBtn);


// appending form to container
container.appendChild(form);


// Now for form submission
form.addEventListener("submit", async(e)=>{
    e.preventDefault(); // stops the browser from doing its default action(reloading)
    // when we submit form, the default behavior of form is to reload when submitted
    // Take values from form inputs
    const email= emailInput.value;
    const password= passwordInput.value;

    try{
        //fetch(url, options)
        const res= await fetch("http://localhost:1973/api/users/login", { // fetching request
            //res is response object
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const data= await res.json();

        if(res.ok && data.accessToken){//res.ok = boolean that is true if status code is 200–299, false otherwise
            //it is shortcut for checking status codes
            //res.ok === (res.status >= 200 && res.status < 300)
            
            localStorage.setItem("token", data.accessToken); // save JWT token in browser
            alert("Login successful");
            window.location.href= "feed.html"; // go to app // redirect to another page

        }else{
            alert(data.message || "Login failed");
        }
    }catch(err){
        console.log(err);
        alert("Error connecting to server");
    }
    passwordInput.value= "";
})