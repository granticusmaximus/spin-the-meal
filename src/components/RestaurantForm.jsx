import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await addDoc(collection(db, 'restaurants'), {
        name,
        category,
        createdAt: Timestamp.now(),
      });
      setName('');
      setCategory('');
    } catch (err) {
      console.error('Error adding restaurant:', err);
    }
  };

  return (
    <Form inline onSubmit={handleSubmit} className="mb-3">
      <FormGroup className="me-2">
        <Label for="restaurantName" hidden>Name</Label>
        <Input
          id="restaurantName"
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="me-2">
        <Label for="category" hidden>Category</Label>
        <Input
          id="category"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" type="submit">Add</Button>
    </Form>
  );
};

export default RestaurantForm;