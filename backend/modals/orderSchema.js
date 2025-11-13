const mongoose= require('mongoose');

const orderSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    hostel: {
        type: String,
        required: [true, "Hostel name is required!"]
    },
    order_name: {
        type: String,
        required: [true, "What do you want to order?!"]
    },
    tip: {
        type: String,
        required: [true, "Add a tip!"]
    },
    beforeTime: {
        type: String,
        required: [true, "By when do you want your ordre?"]
    },
    status: {
        type: String,
        enum: ["requested", "accepted", "rejected", "completed", "Expired"],
        default: "requested"
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
},{timestamps: true});

module.exports= mongoose.model("Order", orderSchema);