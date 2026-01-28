import { useState } from "react";

const initialState = {
  email: '',
  password:''
}

const loginForm = function () {

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, isLoading] = useState(false);

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

  const handleSubmit = function (event:React.FormEvent) {
    event.preventDefault()
    try {

    } catch (error) {
      console.error(`Error in handling submit`, error)
      setError(`${error}`)
    } finally {
      isLoading(false)
    }
  }


  return (
    <div className="login-container">
      <h2>Create an Account</h2>

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
        >{ isLoading ? "Signinggg up ....." : "sign up" }</button>

      </form>
    </div>
  )
}
