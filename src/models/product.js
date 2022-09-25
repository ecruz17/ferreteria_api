import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
});

export default mongoose.model('Product', productSchema);
