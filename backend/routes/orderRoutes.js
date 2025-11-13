const Order= require('../modals/orderSchema');
const express= require('express');

const router= express.Router();

const {validateToken}= require('../middleware/validTokenHandler');

const {createOrder, getOrders, getOrder, getMyOrders, deleteOrder, userOrders, getHostelOrder, acceptOrder, acceptedOrders}= require("../controller/orderController");

router.use(validateToken); // yha koi bhi route access krna hai to login hona hi pdega

// for get all (feed) or creating an order
router.route('/').get(getOrders).post(createOrder);

// to get current user orders only
router.route('/myorders').get(getMyOrders);

// to get order hostel wise
router.route('/hostel/:hostelId').get(getHostelOrder);

// to get any user's orders (admin privilage)
router.route('/user/:id').get(userOrders);

// for accepting orders
router.route('/:id/accept').patch(acceptOrder);

// for user's accepted orders
router.route("/acceptedorders").get(acceptedOrders);

// for get by id and delete by id
router.route('/:id').get(getOrder).delete(deleteOrder);

// wrong route
router.use(
    (req,res)=>{
        res.status(404).json({message: 'No such route or CRUD operation exists!'});
    }
)

module.exports= router;