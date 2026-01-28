// import "./SignUp.css"

import { useState } from "react"

export const SignupForm = function () {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = function (event: React.FormEvent) {
    event.preventDefault();
    console.log("Form submitted fr",formData)
  }


  return (
    <div className="auth-container">
      <h2>Kim Katwa</h2>
      <form>

        <div className="form-group">
          <label htmlFor="firstName" >First Name</label>
          <input
            type="firstName"
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
            type="lastName"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={ (event) => setLastName(event.target.value) }
            required></input>
        </div>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={ (event) => setEmail(event.target.value) }
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
            onChange={ (event) => setPassword(event.target.value) }
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.confirmPassword}
            onChange={ (event) => setPassword(event.target.value) }
            required
          ></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
