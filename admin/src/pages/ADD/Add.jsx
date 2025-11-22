import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Log dos dados antes de enviar
        console.log("📤 Dados a serem enviados:", {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            hasImage: !!image
        });

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)

        try {
            console.log("🌐 Enviando requisição para:", `${url}/api/food/add`);
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log("✅ Resposta do servidor:", response.data);

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                });
                setImage(false)
                toast.success(response.data.message)
            }
            else {
                console.error("❌ Erro do servidor:", response.data);
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            console.error("📋 Error response:", error.response?.data);

            // Mostrar erros de validação se existirem
            if (error.response?.data?.errors) {
                console.error("🔍 Erros de validação:", error.response.data.errors);
                error.response.data.errors.forEach(err => toast.error(err));
            } else {
                const errorMsg = error.response?.data?.message || "Error adding food item";
                toast.error(errorMsg);
                console.error("💬 Mensagem de erro:", errorMsg);
            }
        }
    }


    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id='image'
                        hidden required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" onChange={onChangeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>

        </div>
    )
}

export default Add