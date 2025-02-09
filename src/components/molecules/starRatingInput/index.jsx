import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRatingInput = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer transition-colors ${
            (hover || rating) >= star ? "text-yellow-500" : "text-gray-300"
          }`}
          size={24}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            setRating(star);
            onRate(star);
          }}
        />
      ))}
    </div>
  );
};

export default StarRatingInput;
