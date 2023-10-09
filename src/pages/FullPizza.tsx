import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type PropsType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export const FullPizza = () => {
  const [pizza, setPizza] = useState<PropsType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://65060aa5ef808d3c66f0c4dc.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert("error");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id]);

  // if (!pizza) {
  //   return "Загрузка...";
  // }

  return (
    <div>
      <div className='container'>
        <div className='pizza-block'>
          <img className='pizza-block__image' src={pizza?.imageUrl} alt={pizza?.imageUrl} />
          <h4 className='pizza-block__title'>{pizza?.title} </h4>
        </div>
      </div>
    </div>
  );
};
