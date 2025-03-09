export interface OrderItem {
  order_item_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  product: {
    product_name: string;
    product_price: number;
    product_img?: { image_url: string }[];
  };
}

export interface PaymentProof {
  payment_proof_id: number;
  image_url: string;
  uploaded_at: string;
  status: string;
}

export interface Order {
  order_id: number;
  order_number?: string;
  total_price: number;
  status: string;
  order_date: string;
  order_items: OrderItem[];
  payment_proof?: PaymentProof;
}

export interface OrderCardProps {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onImageClick: (url: string) => void;
}
