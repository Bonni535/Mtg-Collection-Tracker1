import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, CardCard } from 'react-bootstrap';
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

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setCollectionDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getCardsFromCollection(firebaseKey).then(setCollectionCards);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        {collectionDetails?.image
          ? <Image src={collectionDetails.image} alt={collectionDetails.name} style={{ width: '300px' }} /> : ''}
      </div>
      Description:
      <p>{collectionDetails?.description || ''}</p>
      {collectionCards.map((card) => <CardCard isDatabaseCard={false} collectionId={firebaseKey} cardObj={card} />)}
      <hr />
      <Button onClick={handleClick}>Add a Card</Button>
    </div>
  );
}
