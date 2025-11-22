import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    try {
      const response = await axios.post(newUrl, data);
      console.log("Backend response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      }
      else {
        alert(response.data.message || "Erro ao fazer login")
      }
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response) {
        // O backend respondeu com um erro
        console.error("Resposta do backend:", error.response.data);
        alert(error.response.data.message || "Erro ao fazer login. Tente novamente.");
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error("Sem resposta do servidor");
        alert("Servidor não está respondendo. Verifique se o backend está rodando.");
      } else {
        // Algo aconteceu ao configurar a requisição
        console.error("Erro:", error.message);
        alert("Erro ao processar requisição: " + error.message);
      }
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & pripavacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")} >Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup