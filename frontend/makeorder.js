const container= document.getElementById("container");

const form= document.createElement("form");

const hostel_input= document.createElement("input");
hostel_input.placeholder= "Enter your hostel here";
hostel_input.required= true;

const order_name_input= document.createElement("input");
order_name_input.placeholder= "What do you want to ordre?";
order_name_input.required= true;

const tip_input= document.createElement("input");
tip_input.placeholder= "Enter the tip(higher tip, higher chances!";
tip_input.required= true;

const beforeTime_input= document.createElement("input");
beforeTime_input.placeholder= "Enter by when you want your order?";
beforeTime_input.required= true;


form.appendChild(hostel_input);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));
form.appendChild(order_name_input);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));
form.appendChild(tip_input);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));
form.appendChild(beforeTime_input);
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

container.appendChild(form);

const submit= document.createElement("button");
submit.textContent= "Submit";
submit.type= "submit";
form.appendChild(submit);

form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const hostel= hostel_input.value;
    const order_name= order_name_input.value;
    const tip= tip_input.value;
    const beforeTime= beforeTime_input.value;

    try{
        const res= await fetch("http://localhost:1973/api/orders/",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({hostel, order_name, tip, beforeTime})
        });

        const data= await res.json();
        if(res.ok && data.accessToken){
            alert(data.message);
            window.location.href="makeorder.html";
        }else{
            alert("Are you logged in?");
        }
    }catch(err){
        console.log(err);
        alert("Error making an order");
    }
})