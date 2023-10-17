import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type PropsType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

const FullPizza: React.FC = () => {
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

  if (!pizza) {
    return <>"Загрузка..."</>;
  }

  return (
    <div>
      <div className='container'>
        <div className='pizza-block'>
          <img className='pizza-block__image' src={pizza?.imageUrl} alt={pizza?.imageUrl} />
          <h4 className='pizza-block__title'>{pizza?.title} </h4>

          <div className='cart__bottom'>
            <Link to='/' className='button button--outline button--add go-back-btn'>
              <svg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7 13L1 6.93015L6.86175 1'
                  stroke='#D3D3D3'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'></path>
              </svg>

              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
