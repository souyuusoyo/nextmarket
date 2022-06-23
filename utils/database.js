import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://next-market:mbsOuya25879@cluster0.xg0ks.mongodb.net/?retryWrites=true&w=majority")
        console.log("Success: Connected to MongoDB")
    } catch (err) {
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB