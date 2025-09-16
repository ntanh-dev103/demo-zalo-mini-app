export const finalTotalState = selector({
  key: "finalTotal",
  get: ({ get }) => {
    const subtotal = get(totalPriceState);
    const shipping = get(shippingMethodState);
    const coupon = get(couponState);

    // shipping fee
    let shippingFee = 0;
    if (shipping === "express") shippingFee = 30000;

    // discount
    let discount = 0;
    if (coupon) {
      if (coupon.discountType === "percent") {
        discount = (subtotal * coupon.value) / 100;
      } else {
        discount = coupon.value;
      }
    }

    return {
      subtotal,
      shippingFee,
      discount,
      total: subtotal + shippingFee - discount,
    };
  },
});