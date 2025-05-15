import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Button, Alert } from 'reactstrap'; //changes

const RestaurantWheel = () => {
  const canvasRef = useRef(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'restaurants'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setRestaurantList(data);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    drawWheel();
  }, [restaurantList, angle]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || restaurantList.length === 0) return;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const step = (2 * Math.PI) / restaurantList.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle);

    const colors = ['#ffcc00', '#ff6666', '#66ccff', '#66ff66', '#cc99ff', '#ff9966', '#99ffff', '#ff6699'];

    restaurantList.forEach((r, i) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, i * step, (i + 1) * step);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.save();
      ctx.rotate(i * step + step / 2);
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(r.name, radius - 10, 0);
      ctx.restore();
    });

    ctx.restore();
    // Draw pointer
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.moveTo(0, -radius + 10);
    ctx.lineTo(-10, -radius + 30);
    ctx.lineTo(10, -radius + 30);
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.restore();
  };

  const spinWheel = () => {
    if (restaurantList.length === 0 || spinning) return;

    setSpinning(true);
    const spinTime = 3000;
    const spins = 5;
    const finalAngle = Math.random() * 2 * Math.PI;
    const totalAngle = 2 * Math.PI * spins + finalAngle;
    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / spinTime, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentAngle = easedProgress * totalAngle;
      setAngle(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const segment = Math.floor(
          ((2 * Math.PI - (currentAngle % (2 * Math.PI))) / (2 * Math.PI)) * restaurantList.length
        ) % restaurantList.length;
        setSelectedRestaurant(restaurantList[segment].name);
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="text-center mt-5">
      <canvas ref={canvasRef} width={300} height={300} style={{ border: '2px solid #ccc' }} />
      <div className="mt-4">
        <Button color="success" onClick={spinWheel} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin the Wheel!'}
        </Button>
      </div>
      {selectedRestaurant && (
        <Alert color="info" className="mt-3">
          🎉 You're eating at: <strong>{selectedRestaurant}</strong>
        </Alert>
      )}
    </div>
  );
};

export default RestaurantWheel;