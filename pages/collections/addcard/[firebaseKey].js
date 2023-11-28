import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllCardsFromDatabase } from '../../../api/cardData';
import CardCard from '../../../components/cards/cardCard';

export default function AddCard() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [databaseCards, setDatabaseCards] = useState([]);

  useEffect(() => {
    getAllCardsFromDatabase(firebaseKey).then(setDatabaseCards);
  }, []);

  return (
    <>
      <h1>{firebaseKey}</h1>
      {databaseCards && databaseCards.map((card) => <CardCard isDatabaseCard collectionId={firebaseKey} cardObj={card} />)}
    </>
  );
}
