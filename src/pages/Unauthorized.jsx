import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate('/');

  return (
    <section className="mt-5">
      <h1 className="fw-bold">Unauthorized!</h1>
      <p className="fs-5">You do not have access to the requested page.</p>
      <div className="flexGrow">
        <Button onClick={goBack}>Go to home page</Button>
      </div>
    </section>
  );
}

export default Unauthorized;
