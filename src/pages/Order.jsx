// src/pages/Order.js
import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form"; // useWatch eklendi
import { useHistory } from "react-router-dom";
import axios from "axios";
import useOrderForm from "../../hooks/useOrderForm"; // Custom hook
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
  const { calculatePrice } = useOrderForm(); // Fiyat hesaplama hook'u
  const formValues = useWatch({ control }); // Form değerlerini real-time izle

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://reqres.in/api/pizza",
        {
          name: data.name,
          size: data.size,
          toppings: data.toppings,
          notes: data.notes,
          fastDelivery: data.fastDelivery,
          totalPrice: calculatePrice(data), // Fiyat API'ye ekleniyor
        },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      history.push({
        pathname: "/success",
        state: res.data,
      });
    } catch (err) {
      console.error("Sipariş hatası:", err);
    }
  };

  return (
    <div className="order-container">
      <h2>Lezzetli Pizza</h2>
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
          <p>Fiyat: {calculatePrice(formValues)} TL</p> {/* Real-time fiyat */}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="submit-button"
        >
          SİPARİŞ VER
        </button>
      </form>
    </div>
  );
};

export default Order;
