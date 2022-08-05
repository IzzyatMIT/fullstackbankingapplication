function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " field must be completed!");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label == "password" && field.length < 8) {
      setStatus(label + " must contain at least 8 characters!");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label == "confirmPassword") {
      if (password != confirmPassword) {
        setStatus("Passwords must match!");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
    }
    return true;
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!validate(username, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!validate(confirmPassword, "confirmPassword")) return;

    const newUser = {
      name: username,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    // console.log(newUser);
    console.log(JSON.stringify(newUser));

    await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((err) => {
      console.error(err);
      return;
    });

    // ctx.users.push({ username, email, password, balance: 0 });

    // const url = `http://localhost:5000/api/signup`;
    // (async () => {
    //   const res = await fetch(url);
    //   const data = await res.json;
    //   console.log(data);
    // })();
    setShow(false);
  }

  function clearForm() {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="username"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            Confirm Password
            <br />
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              disabled={!email && !name && !password}
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Account Created!</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
