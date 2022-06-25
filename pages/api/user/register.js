import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModules"

const registerUser = async (req, res) => {
    try {
        await connectDB()
        console.log(0)
        const ret = await UserModel.create(req.body)
        console.log(1)
        return res.status(200).json({ message: "ユーザー登録成功" })
    } catch (err) {
        console.log(2)
        return res.status(400).json({ message: "ユーザー登録失敗" })
    }
}

export default registerUser