
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  image: 'image',
  role: 'role',
  emailVerified: 'emailVerified',
  updateAt: 'updateAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  userId: 'userId',
  id: 'id'
};

exports.Prisma.ProfileScalarFieldEnum = {
  profile_id: 'profile_id',
  user_id: 'user_id',
  referred_id: 'referred_id',
  phone: 'phone',
  pfp_url: 'pfp_url'
};

exports.Prisma.ReferralScalarFieldEnum = {
  referral_id: 'referral_id',
  referral_code: 'referral_code',
  profile_id: 'profile_id'
};

exports.Prisma.AddressScalarFieldEnum = {
  address_id: 'address_id',
  street: 'street',
  city: 'city',
  country: 'country',
  profile_id: 'profile_id',
  address_contact: 'address_contact',
  address_name: 'address_name',
  deleted_at: 'deleted_at',
  lat: 'lat',
  lng: 'lng',
  post_code: 'post_code'
};

exports.Prisma.AdminScalarFieldEnum = {
  admin_id: 'admin_id',
  store_id: 'store_id',
  phone: 'phone',
  position: 'position',
  user_id: 'user_id',
  deleted_at: 'deleted_at'
};

exports.Prisma.StoreScalarFieldEnum = {
  store_id: 'store_id',
  store_name: 'store_name',
  store_address: 'store_address',
  city: 'city',
  lat: 'lat',
  lng: 'lng',
  country: 'country',
  isActive: 'isActive'
};

exports.Prisma.StockScalarFieldEnum = {
  stock_id: 'stock_id',
  store_id: 'store_id',
  product_id: 'product_id',
  quantity: 'quantity'
};

exports.Prisma.StockJournalScalarFieldEnum = {
  stock_journal_id: 'stock_journal_id',
  store_id: 'store_id',
  stock_id: 'stock_id',
  quantity: 'quantity',
  type: 'type',
  notes: 'notes',
  created_at: 'created_at',
  product_id: 'product_id',
  stock_result: 'stock_result'
};

exports.Prisma.ProductScalarFieldEnum = {
  product_id: 'product_id',
  product_name: 'product_name',
  product_price: 'product_price',
  product_category_id: 'product_category_id',
  product_description: 'product_description',
  deletedAt: 'deletedAt'
};

exports.Prisma.ProductImgScalarFieldEnum = {
  image_id: 'image_id',
  image_url: 'image_url',
  product_id: 'product_id'
};

exports.Prisma.ProductCategoryScalarFieldEnum = {
  product_category_id: 'product_category_id',
  product_category_name: 'product_category_name',
  deletedAt: 'deletedAt'
};

exports.Prisma.VoucherStoreScalarFieldEnum = {
  voucher_store_id: 'voucher_store_id',
  voucher_store_code: 'voucher_store_code',
  voucher_store_amount_percentage: 'voucher_store_amount_percentage',
  voucher_store_exact_nominal: 'voucher_store_exact_nominal',
  voucher_store_minimum_buy: 'voucher_store_minimum_buy',
  voucher_store_maximum_nominal: 'voucher_store_maximum_nominal',
  voucher_store_startdate: 'voucher_store_startdate',
  voucher_store_enddate: 'voucher_store_enddate',
  created_at: 'created_at',
  admin_responsible: 'admin_responsible',
  store_id: 'store_id'
};

exports.Prisma.VoucherOngkirScalarFieldEnum = {
  voucher_ongkir_id: 'voucher_ongkir_id',
  voucher_ongkir_code: 'voucher_ongkir_code',
  voucher_ongkir_nominal: 'voucher_ongkir_nominal',
  voucher_ongkir_startdate: 'voucher_ongkir_startdate',
  voucher_ongkir_enddate: 'voucher_ongkir_enddate',
  created_at: 'created_at',
  admin_responsible: 'admin_responsible',
  store_id: 'store_id'
};

exports.Prisma.VoucherProductScalarFieldEnum = {
  voucher_product_id: 'voucher_product_id',
  voucher_product_code: 'voucher_product_code',
  voucher_product_startdate: 'voucher_product_startdate',
  voucher_product_enddate: 'voucher_product_enddate',
  created_at: 'created_at',
  admin_responsible: 'admin_responsible',
  product_id: 'product_id'
};

exports.Prisma.DiscountScalarFieldEnum = {
  discount_id: 'discount_id',
  discount_product: 'discount_product',
  discount_amount: 'discount_amount',
  created_at: 'created_at',
  discount_startdate: 'discount_startdate',
  discount_enddate: 'discount_enddate',
  isActive: 'isActive'
};

exports.Prisma.CartScalarFieldEnum = {
  cart_id: 'cart_id',
  created_at: 'created_at',
  profile_id: 'profile_id'
};

exports.Prisma.CartItemScalarFieldEnum = {
  cart_item_id: 'cart_item_id',
  cart_id: 'cart_id',
  product_id: 'product_id',
  quantity: 'quantity'
};

exports.Prisma.OrderScalarFieldEnum = {
  order_id: 'order_id',
  order_number: 'order_number',
  store_id: 'store_id',
  address_id: 'address_id',
  total_price: 'total_price',
  shipping_price: 'shipping_price',
  total_payment: 'total_payment',
  tracking_number: 'tracking_number',
  status: 'status',
  order_date: 'order_date',
  profile_id: 'profile_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  voucher_code: 'voucher_code'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  order_item_id: 'order_item_id',
  order_id: 'order_id',
  product_id: 'product_id',
  quantity: 'quantity',
  price: 'price',
  subtotal: 'subtotal'
};

exports.Prisma.PaymentProofScalarFieldEnum = {
  payment_proof_id: 'payment_proof_id',
  order_id: 'order_id',
  image_url: 'image_url',
  uploaded_at: 'uploaded_at',
  status: 'status'
};

exports.Prisma.OrderCancelScalarFieldEnum = {
  order_cancel_id: 'order_cancel_id',
  order_id: 'order_id',
  reason: 'reason',
  canceled_at: 'canceled_at'
};

exports.Prisma.AdminOrderScalarFieldEnum = {
  admin_order_id: 'admin_order_id',
  admin_id: 'admin_id',
  order_id: 'order_id',
  action: 'action',
  action_time: 'action_time'
};

exports.Prisma.BannerScalarFieldEnum = {
  banner_id: 'banner_id',
  url: 'url',
  image: 'image'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  user: 'user',
  admin: 'admin',
  super_admin: 'super_admin'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  menunggu_pembayaran: 'menunggu_pembayaran',
  menunggu_konfirmasi: 'menunggu_konfirmasi',
  diproses: 'diproses',
  dikirim: 'dikirim',
  pesanan_dikonfirmasi: 'pesanan_dikonfirmasi',
  dibatalkan: 'dibatalkan'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

exports.ActionEnum = exports.$Enums.ActionEnum = {
  konfirmasi_pembayaran: 'konfirmasi_pembayaran',
  kirim_pesanan: 'kirim_pesanan',
  batalkan_pesanan: 'batalkan_pesanan'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Profile: 'Profile',
  Referral: 'Referral',
  Address: 'Address',
  Admin: 'Admin',
  Store: 'Store',
  Stock: 'Stock',
  StockJournal: 'StockJournal',
  Product: 'Product',
  ProductImg: 'ProductImg',
  ProductCategory: 'ProductCategory',
  VoucherStore: 'VoucherStore',
  VoucherOngkir: 'VoucherOngkir',
  VoucherProduct: 'VoucherProduct',
  Discount: 'Discount',
  Cart: 'Cart',
  CartItem: 'CartItem',
  Order: 'Order',
  OrderItem: 'OrderItem',
  PaymentProof: 'PaymentProof',
  OrderCancel: 'OrderCancel',
  AdminOrder: 'AdminOrder',
  Banner: 'Banner'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
