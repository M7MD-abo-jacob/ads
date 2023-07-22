import { Col, Row } from 'react-bootstrap';

function Home() {
  return (
    <>
      <section className="position-relative">
        <img
          src="code-future.jpg"
          alt="hero"
          style={{ width: '100%', minHeight: '300px' }}
        />
        <div className="hero-overlay position-absolute start-0 end-0 top-0 bottom-0 d-flex flex-column align-items-center justify-content-center bg-light bg-gradient bg-opacity-50 text-primary px-3">
          <h1 className="display-1 fw-bold">Lorem, ipsum dolor.</h1>
          <p className="text-black fw-bolder">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            deleniti unde et tempore animi consequatur saepe quidem, asperiores
            assumenda, quos error tempora dolorum adipisci sed.
          </p>
        </div>
      </section>
      <br />
      <section className="mt-5">
        <h3 className="mb-4">Some of our services</h3>
        <Row>
          {[1, 2, 3, 4].map((i) => (
            <Col sm={6} lg={3} key={i}>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="placeholder"
              />
              <p className="text-center mt-2">Some text..</p>
            </Col>
          ))}
        </Row>
      </section>
      <br />
      <br />
    </>
  );
}

export default Home;
