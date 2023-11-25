import { useRouter } from 'next/router';

export default function AddCard() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <>
      <h1>{firebaseKey}</h1>
        {/* database.map((card) => {
            return <Card collectionId={firebaseKey} card={card} />
        }) */}
    </>
  );
}
