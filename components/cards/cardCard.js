import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { addCardToCollection, deleteCardFromCollection, updateCard } from '../../api/cardData';
import { useAuth } from '../../utils/context/authContext';

function CardCard({
  cardObj, onUpdate, collectionId,
}) {
  const deleteThisCard = () => {
    if (window.confirm(`Delete ${cardObj.name}?`)) {
      deleteCardFromCollection(cardObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleAdd = () => {
    // e.preventDefault();
    if (!cardObj.firebaseKey) {
      const payload = { ...cardObj, collectionId, uid: user.uid };
      addCardToCollection(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCard(patchPayload).then(() => {
          router.push(`/collections/${firebaseKey}`);
        });
      });
    }
  };

  // console.warn('hi', cardObj);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={cardObj.imageUrl} alt={cardObj.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{cardObj.name}</Card.Title>
        <Card.Text>{cardObj.text}</Card.Text>
        <Button onClick={handleAdd}> Add Card to Collection</Button>
        <Button onClick={deleteThisCard}> Remove Card</Button>
      </Card.Body>
    </Card>
  );
}

CardCard.propTypes = {
  cardObj: PropTypes.shape({
    name: PropTypes.string,
    text: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  collectionId: PropTypes.string.isRequired, // Prop type validation for collectionId
};

export default CardCard;
