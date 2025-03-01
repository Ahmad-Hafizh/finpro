export interface CartItem {
  cart_item_id: number;
  quantity: number;
  product: {
    product_name: string;
    product_price: number;
    product_img?: { url: string }[];
  };
}

export interface CartItemsListMobileProps {
  cartItems: CartItem[];
  quantities: { [key: number]: number };
  selectedItems: { [key: number]: boolean };
  onUpdateQuantity: (cart_item_id: number, newQuantity: number) => void;
  onDeleteItem: (cart_item_id: number) => void;
  setSelectedItems: (selected: { [key: number]: boolean }) => void;
}

export interface CartItemsListDesktopProps {
  cartItems: CartItem[];
  quantities: { [key: number]: number };
  selectedItems: { [key: number]: boolean };
  onUpdateQuantity: (cart_item_id: number, newQuantity: number) => void;
  onDeleteItem: (cart_item_id: number) => void;
  setSelectedItems: (selected: { [key: number]: boolean }) => void;
}
