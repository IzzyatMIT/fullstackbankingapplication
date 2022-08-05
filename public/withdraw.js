function Withdraw() {
  const [status, setStatus] = React.useState('');
  const [withdraw, setWithdraw] = React.useState('');
  const ctx = React.useContext(UserContext);

  async function handleWithdraw(e) {
    e.preventDefault();
    if (!validate(withdraw)) return;

    let newWithdraw = {
      email: ctx.users[0].email,
      amount: withdraw,
    };
    const updatedBalance = await fetch('/api/withdrawls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + ctx.users[0].token,
      },
      body: JSON.stringify(newWithdraw),
    })
      .then((newBalance) => console.log(newBalance.json()))
      .catch((err) => {
        console.error(err);
        return;
      });
    ctx.users[0].balance = updatedBalance;

    setStatus('$' + withdraw + ' successfully withdrawn');
    setTimeout(() => setStatus(''), 3000);
    setWithdraw('');
  }

  function validate(field) {
    if (isNaN(field)) {
      setStatus('Error: Withdrawl amount must be a number!');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (field < 0) {
      setStatus('Error: Cannot withdraw negative amount!');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }
  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      text={<></>}
      body={
        <>
          Withdraw:
          <input
            type="input"
            className="form-control"
            id="withdraw"
            placeholder="Input withdrawl amount"
            value={withdraw}
            onChange={(e) => setWithdraw(e.currentTarget.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!withdraw}
            onClick={handleWithdraw}
          >
            Submit Withdrawl
          </button>
          <h1>{ctx.users[0].name}</h1>
        </>
      }
    />
  );
}
