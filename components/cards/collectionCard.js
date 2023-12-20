import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteCollection } from '../../api/collectionData';

function CollectionCard({ collectionObj, onUpdate }) {
  const deleteThisCollection = () => {
    if (window.confirm(`Delete ${collectionObj.name}?`)) {
      deleteCollection(collectionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="collection" style={{ width: '18rem', margin: '50px', backgroundColor: 'white' }}>
      <Card.Img variant="top" src={collectionObj.image} alt={collectionObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title><b>{collectionObj.name}</b></Card.Title>
        <Card.Text>{collectionObj.description}</Card.Text>
        <Link href={`/collections/${collectionObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View Collection</Button>
        </Link>
        <Link href={`/collections/edit/${collectionObj.firebaseKey}`} passHref>
          <Button variant="outline-success">Edit the Collection</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCollection} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  collectionObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CollectionCard;
