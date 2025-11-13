const Order= require("../modals/orderSchema");
const asyncHandler= require("express-async-handler");
//desc get all orders
//route Get /api/orders
//access public

const getOrders= async (req,res)=>{
    try{
    const orders= await Order.find({status: "requested"});
    res.status(200).json(orders);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}

//desc get order by id
//route get /api/orders/:id
//access public

const getOrder= async (req,res)=>{
    const order= await Order.findById(req.params.id);
    if(!order){
        res.status(400);
        throw new Error ("Order not found!");
    }
    res.status(200).json({order});
}

//desc scoping orders by hostel
//route get
//access private
const getHostelOrder= asyncHandler(
    async (req,res)=>{
        const orders= await Order.find({hostel: req.params.hostelId});
        res.status(200).json({orders});
    }
)

//desc 
//route
//access private
const userOrders= asyncHandler(
    async (req,res)=>{
        const orders= await Order.find({user_id: req.params.id});
        res.status(200).json({orders});
    }
)
//desc delete order by id
//router Delete /api/orders/
//access private

const deleteOrder= asyncHandler(
    async (req,res)=>{
        const orderId= req.params.id;
        const order= await Order.findById(orderId);
        if(!order){
            res.status(404).json({message: "There is no such order!"});
        }
        //await order.remove();
         Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'order deleted successfully', orderId, order_name: order.order_name});
    }
)

//desc create new order
//route POST /api/orders
//access public

const createOrder=asyncHandler( async (req,res)=>{
    const {hostel, order_name, tip, beforeTime}= req.body;
    if(!hostel || !order_name || !tip || !beforeTime){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    
    const order= await Order.create({user_id: req.user.id, hostel, order_name, tip, beforeTime});
    res.status(201).json(order);
})

//desc get my orders
//router Get /api/orders/myorders
//access private

const getMyOrders= asyncHandler ( async(req,res)=>{
    const myOrders= await Order.find({user_id: req.user.id});
    res.status(200).json({myOrders});
})

//desc accepting the order
//router Patch /api/orders/:id/accept
//access private (any logged in user)

const acceptOrder= asyncHandler(
    async (req,res)=>{
        const order= await Order.findById(req.params.id);

        if(!order){
            res.status(404);
            return res.json({error_message: "No such order found"});
        }

        if(order.status=="accepted"){
            return res.status(400).json({message: "Order already accepted by someone else"})
        }

        order.status= "accepted"; // rn the changes are in the node.js only
        order.acceptedBy= req.user._id;
        await order.save(); // now the changes are in DB
        res.status(200).json({message: "order accepted", order});
    }
)

//desc show user's accepted orders
//route Get /api/orders/acceptedOrders
//access private
const acceptedOrders= asyncHandler(
    async (req,res)=>{
        orders= await Order.findById({acceptedBy: req.user._id});
        return res.status(200).json({orders});
    }
)




module.exports= {createOrder, getOrders, getOrder, getMyOrders, deleteOrder, userOrders, getHostelOrder, acceptOrder, acceptedOrders};