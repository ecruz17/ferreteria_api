import mongoose from "mongoose";

const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    }
}, {
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
});

export default mongoose.model('Providers', providerSchema);