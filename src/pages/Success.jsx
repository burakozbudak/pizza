import React from "react";
import { useLocation } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="success-container">
      <h1>TEBRİKLER!</h1>
      <h2>SİPARİŞİNİZ ALINDI!</h2>

      {state && (
        <div className="order-summary">
          <h3>Sipariş Özeti</h3>
          <p>
            <strong>İsim:</strong> {state.name}
          </p>
          <p>
            <strong>Boyut:</strong> {state.size}
          </p>
          <p>
            <strong>Malzemeler:</strong> {state.toppings.join(", ")}
          </p>
          {state.notes && (
            <p>
              <strong>Notlar:</strong> {state.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Success;
