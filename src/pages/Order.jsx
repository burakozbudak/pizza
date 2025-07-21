// src/pages/Order.jsx
import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useOrderForm from "../customhooks/useOrderForm";
import "./Order.css";

const Order = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      size: "",
      toppings: [],
      notes: "",
      fastDelivery: false,
    },
  });
  const history = useHistory();
  const { calculatePrice } = useOrderForm();
  const formValues = useWatch({ control });
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: data.name || "Misafir",
        size: data.size || "Orta",
        toppings: data.toppings || [],
        notes: data.notes || "",
        fastDelivery: data.fastDelivery || false,
        totalPrice: calculatePrice(data) || 50,
      };

      const res = await axios.post("https://reqres.in/api/pizza", payload, {
        headers: { "x-api-key": "reqres-free-v1" },
      });

      history.push({
        pathname: "/success",
        state: res.data,
      });
    } catch (err) {
      console.error(
        "Sipariş hatası:",
        err.response ? err.response.data : err.message
      );
      const errorMessage =
        err.response?.status === 500
          ? "Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin."
          : "Sipariş sırasında bir hata oluştu. Lütfen bilgileri kontrol edin.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-container">
      <h2>Lezzetli Pizza</h2>
      {submitError && <div className="error-message">{submitError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>İsim</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "İsim gereklidir",
              minLength: { value: 3, message: "En az 3 karakter giriniz" },
            }}
            render={({ field }) => (
              <input type="text" {...field} placeholder="İsminizi girin" />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Boyut Seç</label>
          <Controller
            name="size"
            control={control}
            rules={{ required: "Boyut seçimi gereklidir" }}
            render={({ field }) => (
              <>
                {["Küçük", "Orta", "Büyük"].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      {...field}
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </>
            )}
          />
          {errors.size && <p className="error">{errors.size.message}</p>}
        </div>

        <div className="form-group">
          <label>Ek Malzemeler (En az 4)</label>
          <div className="toppings-container">
            {[
              "Pepperoni",
              "Mantar",
              "Soğan",
              "Sucuk",
              "Jalapeno",
              "Ananas",
              "Mısır",
              "Zeytin",
            ].map((topping) => (
              <div key={topping}>
                <Controller
                  name="toppings"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length >= 4 || "En az 4 malzeme seçmelisiniz",
                  }}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id={topping}
                      checked={field.value.includes(topping)}
                      onChange={(e) => {
                        const newToppings = e.target.checked
                          ? [...field.value, topping]
                          : field.value.filter((t) => t !== topping);
                        field.onChange(newToppings);
                      }}
                    />
                  )}
                />
                <label htmlFor={topping}>{topping}</label>
              </div>
            ))}
          </div>
          {errors.toppings && (
            <p className="error">{errors.toppings.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Sipariş Notu</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows="4"
                placeholder="Eklemek istediğiniz notlar"
              />
            )}
          />
        </div>

        <div className="form-group">
          <label>
            <Controller
              name="fastDelivery"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />{" "}
            Hızlı Teslimat (+30 TL)
          </label>
          <p>Fiyat: {calculatePrice(formValues)} TL</p>
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
        </button>
      </form>
    </div>
  );
};

export default Order;
