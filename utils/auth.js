import jwt from "jsonwebtoken"

const secret_key = "nextmarket"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2NTU5NjA3NjksImV4cCI6MTY1NjA0MzU2OX0.cNM2AYll64AZisObdixA3f9ZKEYITdgSKuXTzmH4r5E"

const auth = (handler) => {

    return async (req, res) => {
        if (req.method === "GET") {
            return handler(req, res)
        }

        const token = await req.headers.authorization.split(" ")[1]
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