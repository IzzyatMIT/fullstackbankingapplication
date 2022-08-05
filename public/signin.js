function SignIn() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label + ' field must be completed!');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  async function handleCreate(e) {
    e.preventDefault();
    let jsonMessage;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;

    const userLogin = {
      email: email,
      password: password,
    };

    // console.log(newUser);
    console.log(JSON.stringify(userLogin));

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    })
      .then((message) => {
        jsonMessage = message.json();

        console.log(jsonMessage);
        return jsonMessage;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
    ctx.users.pop();
    // ctx.users.push(userLogin);
    console.log(response);
    console.log(response.message.name);
    console.log(response.token);
    ctx.users.push({
      name: response.message.name,
      balance: response.message.balance,
      email: response.message.email,
      token: response.token,
    });
    console.log(ctx.users[0]);

    // const url = `http://localhost:5000/api/signup`;
    // (async () => {
    //   const res = await fetch(url);
    //   const data = await res.json;
    //   console.log(data);
    // })();
    setShow(false);
  }

  function clearForm() {
    setEmail('');
    setPassword('');
    ctx.users.pop();
    setShow(true);
  }

  function signOut() {
    ctx.users.pop();
    setShow(false);
  }

  return (
    <Card
      bgcolor="primary"
      header="Sign in"
      status={status}
      body={
        show ? (
          <>
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
            <button type="submit" className="btn btn-danger " onClick={signOut}>
              LOG OUT
            </button>
            <button
              type="submit"
              className="btn btn-light float-right"
              disabled={!email && !password}
              onClick={handleCreate}
            >
              Log In
            </button>
          </>
        ) : (
          <>
            <h5>Logged In!</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Log in to different account?
            </button>
          </>
        )
      }
    />
  );
}
