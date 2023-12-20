import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getAllCardsFromDatabase } from '../../../api/cardData';
import CardCard from '../../../components/cards/cardCard';

export default function AddCard() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [databaseCards, setDatabaseCards] = useState([]);
  const [showingCards, setShowingCards] = useState([]);

  useEffect(() => {
    getAllCardsFromDatabase().then(setDatabaseCards);
  }, []);

  useEffect(() => {
    setShowingCards(databaseCards);
  }, [databaseCards]);

  const handleSearch = (e) => {
    const searchResults = databaseCards.filter((card) => card.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setShowingCards(searchResults);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '25%' }}>
        {/* <Form.Label>S</Form.Label> */}
        <Form.Control
          type="search"
          placeholder="Search Cards"
          className="me-2"
          aria-label="Search"
          onChange={handleSearch}
        />
      </Form.Group>
      <div className="d-flex flex-wrap">
        {showingCards.map((card) => <CardCard collectionId={firebaseKey} cardObj={card} />)}
      </div>
    </>
  );
}

//
