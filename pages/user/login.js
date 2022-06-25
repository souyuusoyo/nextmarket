import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

const Login = () => {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("https://nextmarket-nine.vercel.app/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
            if(response.status == 200) {
                router.push("/")
            }
        } catch (err) {
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <Head><title>ログイン</title></Head>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={user.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
                <input value={user.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login