// src/hooks/useOrderForm.js
const useOrderForm = () => {
  const calculatePrice = (formData) => {
    const basePrice = 50; // Temel pizza fiyatı
    const toppingPrice = formData.toppings.length * 5; // Her malzeme 5 TL
    const fastDeliveryPrice = formData.fastDelivery ? 30 : 0; // Hızlı teslimat 30 TL
    return basePrice + toppingPrice + fastDeliveryPrice;
  };

  return { calculatePrice };
};

export default useOrderForm;
