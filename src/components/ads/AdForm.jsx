import { useEffect, useReducer } from 'react';
import { Button, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetStoresQuery } from '../../api/adsApi';
import { useNavigate } from 'react-router-dom';
import { getDateNow } from '../../lib/util';

const formattedDate = getDateNow();

function AdForm({
  handleSubmit,
  isLoading,
  setReducerState = {},
  state = {},
  selectedType = 'any',
}) {
  const navigate = useNavigate();

  const initialState = {
    title_ar: state?.title_ar || '',
    title_en: state?.title_en || '',
    description_ar: state?.description_ar || '',
    description_en: state?.description_en || '',
    tag: state?.tag || '',
    valid_to: state?.valid_to || formattedDate,
    store_id: state?.store_id || '0',
    link: state?.link || '',
    image: state?.image || null,
  };

  const [reducerState, dispatch] = useReducer(reducer, initialState);
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
  useEffect(() => {
    if (typeof setReducerState === 'function') {
      setReducerState(reducerState);
    }
  }, [state]);

  return (
    <Form onSubmit={handleSubmit}>
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
      {['any', 'link'].includes(selectedType) && (
        <Form.Group controlId="link" className="mb-3">
          <Form.Label>Your link</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            value={reducerState.link}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE',
                value: e.target.value,
                key: 'link',
              });
            }}
          />
        </Form.Group>
      )}
      {['any', 'store'].includes(selectedType) && (
        <Form.Group controlId="formSelectLg" className="mb-3">
          <Form.Label>Choose a store</Form.Label>
          <Form.Select aria-label="Default select example">
            <Stores />
          </Form.Select>
        </Form.Group>
      )}
      <ButtonGroup className="w-100 my-3">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Submit
          {isLoading && <Spinner />}
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default AdForm;

// get stores in a separate component so it doesn't rerender the other component
function Stores() {
  const user = useSelector((state) => state.user);
  const { data, isLoading: storesLoading } = useGetStoresQuery(user.token);

  return (
    <>
      {data &&
        data?.data?.data?.map((store) => (
          <option key={store.id} value={store.store_name}>
            {store.store_name}
          </option>
        ))}
    </>
  );
}
