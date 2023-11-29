import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        {collectionDetails?.image
          ? <Image src={collectionDetails.image} alt={collectionDetails.name} style={{ width: '300px' }} /> : ''}
      </div>
      Description:
      <p>{collectionDetails?.description || ''}</p>
      {collectionCards?.map((card) => <CardCard onUpdate={onUpdate} isDatabaseCard={false} collectionId={firebaseKey} cardObj={card} />)}
      <hr />
      <Button onClick={handleClick}>Add a Card</Button>
    </div>
  );
}
