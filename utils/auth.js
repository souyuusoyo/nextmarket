import jwt from "jsonwebtoken"

const secret_key = "nextmarket"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZ2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2NTU5NDgxMzksImV4cCI6MTY1NjAzMDkzOX0.xE1xposcMrCoFtipWOxeU-uJPbFJ6S6cqEin1gVFA_g"

const auth = (handler) => {

    return async (req, res) => {
        if (req.method === "GET") {
            return handler(req, res)
        }

        // const token = await req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "トークンがありません" })
        }

        try {
            const decoded = jwt.verify(token, secret_key)
            console.log(decoded)
            req.body.email = decoded.email
            return handler(req, res)
        } catch (err) {
            return res.status(401).json({ message: "トークンが正しくないので、ログインしてください" })
        }
    }
}

export default auth