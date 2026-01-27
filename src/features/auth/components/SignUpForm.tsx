// import "./SignUp.css"

export const SignupForm = function () {
  return (
    <div className="auth-container">
      <h2>create an account</h2>
      <form>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" name="email" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"  required></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
