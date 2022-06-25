import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"
import { useRouter } from "next/router"
import ImgInput from "../../components/imgInput"

const CreateItem = () => {
    const router = useRouter()

    const [item, setItem] = useState({
        title: "",
        price: "",
        image: "",
        description: ""
    })

    const handlerSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://nextmarket-nine.vercel.app/api/item/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(item)
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            if(response.status == 200) {
                router.push("/")
            }
        } catch (err) {
            alert("アイテム作成失敗")
        }
    }

    const handlerChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        })
    }

    const loginUser = useAuth()

    if (loginUser) {
        return (
            <div>
                <Head><title>アイテム作成</title></Head>
                <h1 className="page-title">アイテム作成</h1>
                <ImgInput image={item.image} setItem={setItem} />
                <form onSubmit={handlerSubmit}>
                    <input value={item.title} onChange={handlerChange} type="text" name="title" placeholder="アイテム名" required />
                    <input value={item.price} onChange={handlerChange} type="text" name="price" placeholder="価格" required />
                    <input value={item.image} onChange={handlerChange} type="text" name="image" placeholder="画像" required />
                    <input value={item.description} onChange={handlerChange} type="text" name="description" rows="15" placeholder="商品説明" required />
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem