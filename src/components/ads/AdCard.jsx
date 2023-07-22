import { useState } from 'react';
import { Button, ButtonGroup, Card, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDeleteAdMutation } from '../../api/adsApi';

function AdCard({ ad, index }) {
  const user = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [mutate, { isLoading, isSuccess, error }] = useDeleteAdMutation();
  const handleDeleteAd = async () => {
    try {
      const token = user.token;
      const res = await mutate({ id: ad.id, bearerToken: token });
      if (res.status === 1) {
        toast.success('Ad deleted successfully.');
      } else {
        toast.error('Ooops! something went wrong!');
        console.log('res', res);
      }
    } catch (error) {
      toast.error('Ooops! something went wrong!');
      console.log('error', error);
    }
  };

  return (
    <Card
      tabIndex="0"
      key={index}
      className={`bg-dark text-white grid-item ${
        index % 3 === 0
          ? index % 6 === 0
            ? 'large-item'
            : 'another large-item'
          : 'small-item'
      }`}>
      <Card.Img src="/images.jpg" alt="Card image" />
      <Card.ImgOverlay className="ad-card d-flex flex-column justify-content-between">
        <Card.Title>
          {ad.title_en}
          {index}
        </Card.Title>
        <Card.Text>{ad.description_en}</Card.Text>
        <Card.Text>Valid until: {ad.valid_to}</Card.Text>
        <Card.Footer className="">
          <ButtonGroup className="w-100">
            <Link
              to={`/ads/edit/${ad.id}`}
              state={ad}
              className="btn btn-primary">
              edit
            </Link>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card.ImgOverlay>
      {/* ==================== AD DELETE MODAL ==================== */}
      <Modal
        key={`modal${index}`}
        centered
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete ad?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this advertisement?
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Button disabled>
              <Spinner />
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDeleteAd()}>
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default AdCard;
