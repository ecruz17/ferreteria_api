import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
});

export default mongoose.model('User', userSchema);
