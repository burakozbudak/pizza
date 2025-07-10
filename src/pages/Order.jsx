import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Order.css";

const Order = () => {
  // State tanımlamaları
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const [notes, setNotes] = useState("");
  const history = useHistory();

  // Malzeme seçenekleri
  const toppingOptions = [
    "Pepperoni",
    "Mantar",
    "Soğan",
    "Sucuk",
    "Jalapeno",
    "Ananas",
    "Mısır",
    "Zeytin",
  ];

  // Form gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://reqres.in/api/pizza",
        {
          name,
          size,
          toppings,
          notes,
        },
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );

      history.push({
        pathname: "/success",
        state: res.data,
      });
    } catch (err) {
      console.error("Sipariş hatası:", err);
    }
  };

  // Malzeme seçimini yönetme
  const handleToppingChange = (topping) => {
    if (toppings.includes(topping)) {
      setToppings(toppings.filter((t) => t !== topping));
    } else {
      if (toppings.length < 10) {
        setToppings([...toppings, topping]);
      }
    }
  };

  // Form validasyon kontrolü
  const isFormValid = name.length >= 3 && size && toppings.length >= 4;

  return (
    <div className="order-container">
      <h2>Position Absolute Acı Pizza</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>İsim</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength="3"
            required
          />
          {name.length > 0 && name.length < 3 && (
            <p className="error">En az 3 karakter giriniz</p>
          )}
        </div>

        <div className="form-group">
          <label>Boyut Seç</label>
          {["Küçük", "Orta", "Büyük"].map((option) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name="size"
                value={option}
                checked={size === option}
                onChange={() => setSize(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Ek Malzemeler (En az 4)</label>
          <div className="toppings-container">
            {toppingOptions.map((topping) => (
              <div key={topping}>
                <input
                  type="checkbox"
                  id={topping}
                  checked={toppings.includes(topping)}
                  onChange={() => handleToppingChange(topping)}
                />
                <label htmlFor={topping}>{topping}</label>
              </div>
            ))}
          </div>
          {toppings.length < 4 && toppings.length > 0 && (
            <p className="error">En az 4 malzeme seçmelisiniz</p>
          )}
        </div>

        <div className="form-group">
          <label>Sipariş Notu</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
          />
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-button">
          SİPARİŞ VER
        </button>
      </form>
    </div>
  );
};

export default Order;
