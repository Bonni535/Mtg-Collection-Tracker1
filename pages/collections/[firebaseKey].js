import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CardCard from '../../components/cards/cardCard';
import { getSingleCollection } from '../../api/collectionData';
import { getCardsFromCollection } from '../../api/cardData';

export default function ViewCollection() {
  const [collectionDetails, setCollectionDetails] = useState({});
  const [collectionCards, setCollectionCards] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleClick = () => {
    router.push(`addcard/${firebaseKey}`);
  };

  const onUpdate = () => {
    getCardsFromCollection(firebaseKey).then(setCollectionCards);
  };

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setCollectionDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getCardsFromCollection(firebaseKey).then(setCollectionCards);
  }, [firebaseKey]);

  return (
    <div className="collection-page mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        {collectionDetails?.image
          ? <img src={collectionDetails.image} alt={collectionDetails.name} width="300px" height="600px" /> : ''}
      </div>
      <div className="collection-description">
        <p className="description-title"> <b>Description:</b></p>
        <p className="description-text"><b>{collectionDetails?.description || ''}</b></p>
      </div>
      <div className="collection-cards">
        {collectionCards?.map((card) => <CardCard onUpdate={onUpdate} isDatabaseCard={false} collectionId={firebaseKey} cardObj={card} />)}
      </div>
      <Button className="add-card-btn" onClick={handleClick}>Add a Card</Button>
    </div>
  );
}
