import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"
import { useRouter } from "next/router"

const UpdateItem = (props) => {
    const router = useRouter()

    const [item, setItem] = useState({
        title: props.singleItem.title,
        price: props.singleItem.price,
        image: props.singleItem.image,
        description: props.singleItem.description
    })

    const handlerSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://nextmarket-nine.vercel.app/api/item/update/${props.singleItem._id}`, {
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
            alert("アイテム編集失敗")
        }
    }

    const handlerChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        })
    }

    const loginUser = useAuth()

    if (loginUser === props.singleItem.email) {
        return (
            <div>
                <h1>アイテム編集</h1>
                <form onSubmit={handlerSubmit}>
                    <input value={item.title} onChange={handlerChange} type="text" name="title" placeholder="アイテム名" required />
                    <input value={item.price} onChange={handlerChange} type="text" name="price" placeholder="価格" required />
                    <input value={item.image} onChange={handlerChange} type="text" name="image" placeholder="画像" required />
                    <input value={item.description} onChange={handlerChange} type="text" name="description" rows="15" placeholder="商品説明" required />
                    <button>更新</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://nextmarket-nine.vercel.app/api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}