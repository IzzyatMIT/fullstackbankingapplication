const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const NavLink = ReactRouterDOM.NavLink;

function Card(props) {
  function classes() {
    const bg = ' bg-dark';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: '18rem' }}>
      <div className="card-header bg-danger text-dark font-weight-bold">
        {props.header}
      </div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
