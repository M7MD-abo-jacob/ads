import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../api/userApi';
import { toast } from 'react-toastify';
import { clearUser } from '../../store/slices/userSlice';
import { DropdownButton, NavLink, Navbar } from 'react-bootstrap';

function SigninButton({ className }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const data = await logout(user.token).unwrap();
      if (data?.status === 1) {
        toast.success('logged out successfully!');
        sessionStorage.clear('user');
        dispatch(clearUser(null));
      } else {
        toast.error('logged out unsuccessfully!');
      }
    } catch (error) {
      toast.error('logged out unsuccessfully!');
      console.log(error);
    }
  };
  return (
    <div className={className}>
      {user?.user ? (
        <div className="d-flex">
          <Navbar.Text>
            Welcome{' '}
            <span className="text-primary">
              {user?.user?.name.split(' ')[0]}
            </span>
          </Navbar.Text>
          <DropdownButton variant="link" drop="down" title="">
            <DropdownItem
              className=""
              disabled={isLoading}
              onClick={() => handleLogout()}>
              Logout
            </DropdownItem>
          </DropdownButton>
        </div>
      ) : (
        <NavLink to="/login" className="btn btn-primary">
          sign in
        </NavLink>
      )}
    </div>
  );
}

export default SigninButton;
