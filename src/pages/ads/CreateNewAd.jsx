import { useEffect, useReducer, useState } from 'react';
import { Button, ButtonGroup, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useCreateAdMutation, useGetStoresQuery } from '../../api/adsApi';
import { useSelector } from 'react-redux';
import AdForm from '../../components/ads/AdForm';

const adTypes = ['image', 'link', 'store'];

// get today's date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const initialState = {
  title_ar: '',
  title_en: '',
  description_ar: '',
  description_en: '',
  tag: '',
  valid_to: formattedDate,
  store_id: '0',
  link: '',
  image: null,
};

function CreateNewAd() {
  const user = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const handleAdTypeSelect = (role) => {
    setSelectedType(role);
    setStep(2);
  }; // handles role buttons click

  return (
    <>
      <section className="p-2 p-md-5">
        <div className={`d-grid ${step === 1 ? 'active-step p-3' : ''}`}>
          <CreateAdStepOne onSelectType={handleAdTypeSelect} />
        </div>
        <div className={`d-grid ${step === 2 ? 'active-step p-3' : ''}`}>
          <CreateAdStepTwo
            setStep={setStep}
            selectedType={selectedType}
            user={user}
          />
        </div>
      </section>
    </>
  );
}

export default CreateNewAd;

function CreateAdStepOne({ onSelectType }) {
  return (
    <div className="grid-inner w-100 mx-auto text-center">
      <h2 className="fs-1 fw-bold">Choose an advertisement type</h2>
      <Row
        as="ul"
        className="list-unstyled d-flex justify-content-center align-items-center mx-auto">
        {adTypes.map((type) => (
          <Col as="li" key={type} xs={12} md={10} lg={4} className="p-3">
            <Button
              variant="primary"
              size="lg"
              className="w-100 text-capitalize "
              onClick={() => onSelectType(type.toLowerCase())}>
              {type}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function CreateAdStepTwo({ setStep, selectedType, user }) {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const [createAd, { isLoading, error, isSuccess, isError }] =
    useCreateAdMutation();
  const { data: getStores, isLoading: storesLoading } = useGetStoresQuery(
    user.token,
  );
  const [stores, setStores] = useState([]);
  const getAllStores = async () => {
    if (!storesLoading) {
      const res = await getStores;
      setStores(res?.data?.data);
    }
  };
  useEffect(() => {
    getAllStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(reducerState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const token = user.token;
      const res = await createAd({ ad: formData, bearerToken: token });
      console.log('res: ', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="grid-inner">
      create a new {selectedType} advertisement.
      <AdForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        selectedType={selectedType}
      />
      {/* <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title_ar">title_ar</Form.Label>
          <Form.Control
            required
            id="title_ar"
            type="text"
            size="lg"
            value={reducerState.title_ar}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'title_ar',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="title_en" className="mb-3">
          <Form.Label>title_en</Form.Label>
          <Form.Control
            required
            type="text"
            size="lg"
            value={reducerState.title_en}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'title_en',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="description_ar" className="mb-3">
          <Form.Label>description_ar</Form.Label>
          <Form.Control
            required
            type="text"
            size="lg"
            value={reducerState.description_ar}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'description_ar',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="description_en" className="mb-3">
          <Form.Label>description_en</Form.Label>
          <Form.Control
            required
            type="text"
            size="lg"
            value={reducerState.description_en}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'description_en',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="tag" className="mb-3">
          <Form.Label>tag</Form.Label>
          <Form.Control
            required
            type="text"
            size="lg"
            value={reducerState.tag}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'tag',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="valid_to" className="mb-3">
          <Form.Label>valid_to</Form.Label>
          <Form.Control
            required
            type="date"
            size="lg"
            min={formattedDate}
            value={reducerState.valid_to}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'valid_to',
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control
            // required
            type="file"
            size="lg"
            value={undefined}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE',
                value: e.target.files[0],
                key: 'image',
              });
            }}
          />
        </Form.Group>
        {selectedType === 'image' || selectedType === 'link' ? (
          // in case of image or link
          <>
            <Form.Group controlId="link" className="mb-3">
              <Form.Label>Your link</Form.Label>
              <Form.Control
                required
                type="text"
                size="lg"
                value={reducerState.link}
                // value={reducerState.image}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE',
                    value: e.target.value,
                    key: 'link',
                  });
                }}
              />
            </Form.Group>
          </>
        ) : (
          // in case of store
          <>
            <Form.Group controlId="formSelectLg" className="mb-3">
              <Form.Label>Choose a store</Form.Label>
              <Form.Select aria-label="Default select example">
                {stores &&
                  stores?.map((store) => (
                    <option key={store.id} value={store.store_name}>
                      {store.store_name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </>
        )}
        <ButtonGroup className="w-100 my-3">
          <Button variant="secondary" onClick={() => setStep(1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit
            {isLoading && <Spinner />}
          </Button>
        </ButtonGroup>
      </Form> */}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'DELETE':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
