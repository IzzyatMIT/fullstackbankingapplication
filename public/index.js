function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            //            {
            //              name: 'abel',
            //              email: 'abel@mit.edu',
            //              password: 'secret',
            //              balance: 100,
            //            },
          ],
        }}
      >
        <div className="container" style={{ padding: '20px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/signin/" component={SignIn} />
          <Route path="/aboutus/" component={AboutUs} />
          <Route path="/balance/" component={Balance} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById('root'));
