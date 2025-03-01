export interface CartItem {
  cart_item_id: number;
  quantity: number;
  product: {
    product_id: number;
    product_name: string;
    product_price: number;
    product_img?: { url: string }[];
  };
}

export interface Address {
  address_id: number;
  street: string;
  city: string;
  province: string;
}
