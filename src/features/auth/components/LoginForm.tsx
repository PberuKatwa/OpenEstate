import { useState } from "react";

const loginForm = function () {
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
