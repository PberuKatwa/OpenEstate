// import "./SignUp.css"

import { useState } from "react"

export const SignupForm = function () {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = function (event: React.FormEvent) {
    event.preventDefault();
    console.log("Form submitted fr",{email,password})
  }


  return (
    <div className="auth-container">
      <h2>create an account</h2>
      <form>

        <div className="form-group">
          <label htmlFor="firstName" >First Name</label>
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" >Last Name</label>
          <input type="lastName" id="lastName" name="lastName" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" name="email" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"  required></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" id="password" name="password"  required></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
