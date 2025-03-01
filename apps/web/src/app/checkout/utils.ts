import { CartItem } from "./types";

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.product_price * item.quantity,
    0,
  );
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("id-ID");
}
