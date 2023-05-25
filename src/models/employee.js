import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false }
}, {
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
});

export default mongoose.model('Employee', employeeSchema);
