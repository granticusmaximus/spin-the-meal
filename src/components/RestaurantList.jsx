import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import { ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'restaurants'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRestaurants(items);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'restaurants', id));
    } catch (err) {
      console.error('Error deleting restaurant:', err);
    }
  };

  return (
    <ListGroup>
      {restaurants.map((r) => (
        <ListGroupItem key={r.id} className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{r.name}</strong>{' '}
            {r.category && <Badge color="secondary">{r.category}</Badge>}
          </div>
          <Button size="sm" color="danger" onClick={() => handleDelete(r.id)}>
            Delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default RestaurantList;