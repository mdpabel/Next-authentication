import { logout } from '../../actions/logout';

const Logout = () => {
  return (
    <form action={logout}>
      <button type='submit'>Logout</button>
    </form>
  );
};

export default Logout;
