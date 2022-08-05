function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">BadBank</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/CreateAccount/"
                data-toggle="tooltip"
                title="Create a new account"
              >
                Create Account
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/signin/"
                data-toggle="tooltip"
                title="Login to your account"
              >
                Sign In/Out
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/balance/"
                data-toggle="tooltip"
                title="Check your current balance"
              >
                Balance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/deposit/"
                data-toggle="tooltip"
                title="Deposit funds into your account"
              >
                Deposit
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/withdraw/"
                data-toggle="tooltip"
                title="Withdraw funds from your account"
              >
                Withdraw
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/aboutus/"
                data-toggle="tooltip"
                title="Learn about Bad Bank"
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/"
                data-toggle="tooltip"
                title="Navigate to the home page"
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
