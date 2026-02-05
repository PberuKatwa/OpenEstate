import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./login.css"

const initialState = {
  email: '',
  password:''
}

export const LoginForm = function () {

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = function (event:React.ChangeEvent<HTMLInputElement>) {
    try {
      const { name, value } = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]:value
      }) )

    } catch (error) {
      console.error(`Error in handling exent change`, error)
    }
  }

  const handleSubmit = async function (event:React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {

      setIsLoading(true)
      const response = await login(formData.email, formData.password)
      alert(`Successfully logged in`)
      navigate("/dashboard")

    } catch (error) {
      console.error(`Error in handling submit`, error);
      setError(`${error}`);
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>


        <button
          type="submit"
          disabled={isLoading}
        >{ isLoading ? "logging in ....." : "log in" }</button>

      </form>
    </div>
  )
}
