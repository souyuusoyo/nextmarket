import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const secret_key = "nextmarket"

const useAuth = () => {
    const router = useRouter()

    const [loginUser, setLoginUser] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            router.push("/user/login")
        }

        try {
            const decoded = jwt.verify(token, secret_key)
            setLoginUser(decoded.email)
        } catch (err) {
            router.push("/user/login")
        }
    }, [router])

    return loginUser
}

export default useAuth