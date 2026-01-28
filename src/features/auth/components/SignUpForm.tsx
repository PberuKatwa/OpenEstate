// import "./SignUp.css"

import { useState } from "react"

export const SignupForm = function () {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData(function (prevData) {

    });

  }

  const handleSubmit = function (event: React.FormEvent) {
    event.preventDefault();
    console.log("Form submitted fr",{email,password})
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
            value={firstName}
            onChange={ (event) => setFirstName(event.target.value) }
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" >Last Name</label>
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={ (event) => setLastName(event.target.value) }
            required></input>
        </div>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
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
            value={password}
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
            value={password}
            onChange={ (event) => setPassword(event.target.value) }
            required
          ></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
