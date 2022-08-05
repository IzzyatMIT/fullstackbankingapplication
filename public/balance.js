function Balance() {
  const [show, setShow] = React.useState(true);
  const [balance, setBalance] = React.useState('');
  const ctx = React.useContext(UserContext);
  let updatedBalance;

  async function handleBalance(e) {
    e.preventDefault();

    let checkBalance = {
      email: ctx.users[0].email,
    };
    updatedBalance = await fetch('/api/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + ctx.users[0].token,
      },
      body: JSON.stringify(checkBalance),
    })
      .then((newBalance) => newBalance.json())
      .catch((err) => {
        console.error(err);
        return;
      });
    console.log(updatedBalance);
    ctx.users[0].balance = updatedBalance.balance;
    setBalance(ctx.users[0].balance);
    setShow(false);
  }

  return (
    <Card
      bgcolor="primary"
      header="Balance"
      body={
        show ? (
          <>
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleBalance}
            >
              Click to chek your current balance.
            </button>
            <h1>{ctx.users[0].name}</h1>
          </>
        ) : (
          <>
            <h5>Current Balance:</h5>
            <br />
            <h1> {balance} </h1>
          </>
        )
      }
    />
  );
}
