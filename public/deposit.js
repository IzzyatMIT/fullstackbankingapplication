function Deposit() {
  const [status, setStatus] = React.useState('');
  const [deposit, setDeposit] = React.useState('');
  const ctx = React.useContext(UserContext);

  async function handleDeposit(e) {
    e.preventDefault();
    if (!validate(deposit)) return;

    let newDeposit = {
      email: ctx.users[0].email,
      amount: deposit,
    };
    const updatedBalance = await fetch('/api/deposits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + ctx.users[0].token,
      },
      body: JSON.stringify(newDeposit),
    })
      .then((newBalance) => console.log(newBalance.json()))
      .catch((err) => {
        console.error(err);
        return;
      });
    ctx.users[0].balance = updatedBalance;

    setStatus('$' + deposit + ' successfully deposited');
    setTimeout(() => setStatus(''), 3000);
    setDeposit('');
  }

  function validate(field) {
    if (isNaN(field)) {
      setStatus('Error: Deposit amount must be a number!');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (field < 0) {
      setStatus('Error: Cannot deposit negative amount!');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }
  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      text={<></>}
      body={
        <>
          Deposit:
          <input
            type="input"
            className="form-control"
            id="deposit"
            placeholder="Input deposit amount"
            value={deposit}
            onChange={(e) => setDeposit(e.currentTarget.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!deposit}
            onClick={handleDeposit}
          >
            Submit Deposit
          </button>
          <h1>{ctx.users[0].name}</h1>
        </>
      }
    />
  );
}
