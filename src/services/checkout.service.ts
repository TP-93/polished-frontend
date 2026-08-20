/** Cart totals and order placement. */
import type { CartItem, OrderConfirmation, OrderDraft } from "./types";

export const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
export const SHIPPING_COST_CENTS = 495;

export const paymentMethods = [
  { id: "ideal", label: "iDEAL" },
  { id: "bancontact", label: "Bancontact" },
  { id: "card", label: "Credit card" },
  { id: "paypal", label: "PayPal" },
  { id: "klarna", label: "Klarna" },
];

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export function cartShipping(items: CartItem[]) {
  const subtotal = cartSubtotal(items);
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;
  return SHIPPING_COST_CENTS;
}

export function cartTotal(items: CartItem[]) {
  return cartSubtotal(items) + cartShipping(items);
}

export async function placeOrder(
  draft: OrderDraft,
  items: CartItem[],
): Promise<OrderConfirmation> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const suffix = Math.floor(100000 + Math.random() * 899999);
  return {
    orderNumber: `JC-${suffix}`,
    totalCents: cartTotal(items),
  };
}
