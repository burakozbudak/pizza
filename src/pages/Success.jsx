import React from "react";
import { useLocation } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const { state } = useLocation();

  // State kontrolü ve fallback değerler
  const order = state || {
    name: "Belirtilmedi",
    size: "Belirtilmedi",
    toppings: [],
    notes: "",
    fastDelivery: false,
    totalPrice: 0,
  };

  // Toppings için null kontrolü
  const toppingsText = order.toppings?.join(", ") || "Malzeme seçilmedi";

  return (
    <div className="success-container">
      <h1>TEBRİKLER!</h1>
      <h2>SİPARİŞİNİZ ALINDI!</h2>

      <div className="order-summary">
        <h3>Sipariş Özeti</h3>
        <p>
          <strong>İsim:</strong> {order.name}
        </p>
        <p>
          <strong>Boyut:</strong> {order.size}
        </p>
        <p>
          <strong>Malzemeler:</strong> {toppingsText}
        </p>
        {order.notes && (
          <p>
            <strong>Notlar:</strong> {order.notes}
          </p>
        )}
        {order.fastDelivery && (
          <p>
            <strong>Hızlı Teslimat:</strong> Evet (+30 TL)
          </p>
        )}
        <p>
          <strong>Toplam Fiyat:</strong> {order.totalPrice} TL
        </p>
      </div>
    </div>
  );
};

export default Success;
