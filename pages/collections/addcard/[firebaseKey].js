import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllCardsFromDatabase } from '../../../api/cardData';
import CardCard from '../../../components/cards/cardCard';

export default function AddCard() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [databaseCards, setDatabaseCards] = useState([]);

  useEffect(() => {
    getAllCardsFromDatabase().then(setDatabaseCards);
  }, []);

  return (
    <>
      {databaseCards.map((card) => <CardCard collectionId={firebaseKey} cardObj={card} />)}
    </>
  );
}

//
