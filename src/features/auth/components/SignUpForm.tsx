

export const SignupForm = function () {
  return (
    <div className="auth-container">
      <h2>create an account</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" name="email" required></input>
        </div>
      </form>
    </div>
  )
}
