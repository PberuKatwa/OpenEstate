// import "./SignUp.css"

import { useState } from "react"
import axios from "axios";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const SignupForm = function () {

  const [formData, setFormData] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]= useState< string | null >(null)

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async function (event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    try {

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:3636/auth/register`,
        {
          firstName:formData.firstName,
          lastName:formData.lastName,
          password:formData.password,
          email:formData.email
        }
      )

      console.log("Form submitted to backend", response.data)

      alert(`Successfully signed up`)
    } catch (error) {
      console.error(`Error in handling submitting`, error)
      setError(`${error}`)
    } finally {
      setIsLoading(false)
    }



  }


  return (
    <div className="auth-container">
      <h2>Create an Account</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="firstName" >First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" >Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required></input>
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          ></input>
        </div>

        <button
          type="submit"
          disabled={isLoading}

        >{ isLoading ? "Signinggg up ....." : "sign up" }</button>

      </form>
    </div>
  )
}
