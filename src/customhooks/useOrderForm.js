// src/customhooks/useOrderForm.js
const useOrderForm = () => {
  const calculatePrice = (formData) => {
    const basePrices = {
      'Küçük': 40,
      'Orta': 50,
      'Büyük': 60
    };

    const toppingPrice = 5;
    const fastDeliveryFee = 30;

    return (
      (basePrices[formData.size] || 50) + 
      ((formData.toppings?.length || 0) * toppingPrice) + 
      (formData.fastDelivery ? fastDeliveryFee : 0)
    );
  };

  return { calculatePrice };
};

export default useOrderForm;
