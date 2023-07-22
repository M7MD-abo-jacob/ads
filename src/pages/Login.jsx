import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Form, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { BiLogOutCircle, BiLogInCircle } from 'react-icons/bi';
import { useLoginMutation } from '../api/userApi';
import { setUser } from '../store/slices/userSlice';
import roles from '../data/roles.json';

function LoginPage() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('123456789011');
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const [step, setStep] = useState(1);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setStep(2);
  }; // handles role buttons click
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('account_type', selectedRole);
    try {
      if (!phone) {
        // focus phone field
        toast.error('enter a valid number');
      } else if (!password) {
        toast.error('enter a valid password');
      }
      if (password.length < 6) {
        toast.error('password is too short');
      } else {
        const res = await login(formData).unwrap();
        dispatch(setUser(res.data));
        sessionStorage.setItem('user', JSON.stringify(res.data));
        toast.success(`Welcome ${res.data.user.name}`);
      }
    } catch (error) {
      if (error.data?.message) {
        toast.error(error.data.message);
        console.log(error);
      } else {
        toast.error('something went wrone!');
        console.log(error);
      }
    }
  };

  const { user } = useSelector((state) => state.user);
  if (user) {
    return <Navigate to={user.role_id === 2 ? '/ads' : '/'} replace />;
  }

  return (
    <section className="py-5 p-md-5">
      <div className={`d-grid ${step === 1 ? 'active-step' : ''}`}>
        <LoginStepOne onSelectRole={handleRoleSelection} />
      </div>
      <div className={`d-grid ${step === 2 ? 'active-step' : ''}`}>
        <LoginStepTwo
          setStep={setStep}
          selectedRole={selectedRole}
          onLogin={handleLogin}
          handleLogin={handleLogin}
          isLoading={isLoading}
          phone={phone}
          setPhone={setPhone}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
    </section>
  );
}

export default LoginPage;

function LoginStepOne({ onSelectRole }) {
  const handleSelectRole = (role) => {
    onSelectRole(role);
  };

  return (
    <div className="grid-inner">
      <h1 className="display-1 fw-bold text-center text-uppercase">
        Log in as
      </h1>
      <Row as="ul" className="list-unstyled">
        {Object.keys(roles).map((role) => (
          <Col as="li" key={role} xs={12} sm={6} className="p-3">
            <Button
              key={role}
              variant="primary"
              size="lg"
              className="w-100 text-capitalize py-4 fs-1 bg-gradient"
              onClick={() => handleSelectRole(role.toLowerCase())}>
              {role}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function LoginStepTwo({
  setStep,
  selectedRole,
  handleLogin,
  isLoading,
  phone,
  setPhone,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <form
      onSubmit={handleLogin}
      className="grid-inner col-12 col-lg-8 mx-auto px-lg-5">
      <h2 className="text-capitalize display-4 fw-bold">
        {selectedRole} login
      </h2>
      <div className="form-group mt-3">
        <label htmlFor="inputPhone">Phone number</label>
        <input
          type="text"
          className="form-control"
          id="inputPhone"
          aria-describedby="phoneHelp"
          placeholder="Enter phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="inputPassword">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          id="inputPassword"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Form.Group className="mt-3">
        <Form.Check
          inline
          type="checkbox"
          className=""
          label="Show Password"
          id="inputcheck"
          placeholder="Password"
          value={showPassword}
          onChange={(e) => setShowPassword((prev) => !prev)}
        />
      </Form.Group>
      <ButtonGroup className="w-100 my-3">
        <Button
          variant="secondary"
          className="py-3 fs-5 bg-gradient d-flex align-items-center justify-content-center"
          onClick={() => setStep(1)}>
          <BiLogOutCircle className="mx-2 fs-2 " />
          back
        </Button>
        <Button
          type="submit"
          className="py-3 fs-5 bg-gradient d-flex align-items-center justify-content-center"
          disabled={isLoading}>
          <BiLogInCircle className="mx-2 fs-2 " />
          Login{isLoading && <Spinner className="mx-2" />}
        </Button>
      </ButtonGroup>
    </form>
  );
}
