async function loadOrders(){

// selecting my feed container
const feed= document.getElementById("container");

const list= document.createElement("ul");
//list.style.textAlign= "center";
list.style.listStyleType= "none";
feed.appendChild(list);

const token= localStorage.getItem("token");

if(!token){
    console.log("Please login first");
    return;
}

// make order button
const make_order= document.getElementById("make_order");
make_order.addEventListener("click", ()=>{
    window.location.href="makeorder.html";
})

try{
const orders= await fetch("http://localhost:1973/api/orders",{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`}
    // GET requests do not have body
    
});

const data= await orders.json();

if(orders.ok){
    for(let i=0;i<data.length;i++){
        //creating a  li
        const li= document.createElement("li");
        //creating a div for the li
        const lidiv= document.createElement("div");
        lidiv.style.border= "solid green"
        lidiv.style.padding= "10px";

        //creating a button for this li div
        const accept= document.createElement("button");
        accept.innerHTML= "<b>Accept</b>";
        accept.style.color= "green";


        lidiv.innerHTML= `<b>Order:</b>  ${data[i].order_name} <br>
        <b>Hostel:</b>  ${data[i].hostel} <br>
        <b>Tip:</b>  ${data[i].tip}<br><br>
        `;
        lidiv.append(accept);

        li.append(lidiv);
        li.append(document.createElement("br"));
        li.append(document.createElement("br"));
        

        list.append(li);
        //feed.appendChild(document.createElement("br"));
        //feed.appendChild(document.createElement("br"));
    }
}
}catch(err){
    console.log(err);
    alert("Error connecting to dsf server")
}

}

//calling the function
loadOrders();
