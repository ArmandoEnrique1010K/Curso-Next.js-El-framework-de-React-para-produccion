// Para crear este tipado, realiza una petición de tipo GET a:
// https://api.sandbox.paypal.com/v2/checkout/orders/<ID_TRANSACTION>
// Reemplaza <ID_TRANSACTION> con el ID de la ultima que haz realizado
// transactionId se encuentra en la base ded atos, tabla Order

// Copia la respuesta de la petición, pulsa F1 en el IDE y escribe
// 'Paste JSON as Code', escribele un nombre al tipado principal como
// PaypalOrderStatusResponse

// Si no tienes la extension abre el siguiente enlace: https://app.quicktype.io/
// y pega ahi el código copiado para tener el tipado, asegurate de elegir
// el lenguaje de TypeScript

export interface PaypalOrderStatusResponse {
  id: string;
  intent: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Payer {
  name: PayerName;
  email_address: string;
  payer_id: string;
  address: PayerAddress;
}

export interface PayerAddress {
  country_code: string;
}

export interface PayerName {
  given_name: string;
  surname: string;
}

export interface PaymentSource {
  paypal: PaypalClass;
}

export interface PaypalClass {
  email_address: string;
  account_id: string;
  account_status: string;
  name: PayerName;
  address: PayerAddress;
}

export interface PurchaseUnit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  // Añade esta propiedad para guardar el ID de la orden (desde la base de datos)
  invoice_id: string;
  shipping: Shipping;
  payments: Payments;
}

export interface Amount {
  currency_code: string;
  value: string;
}

export interface Payee {
  email_address: string;
  merchant_id: string;
}

export interface Payments {
  captures: Capture[];
}

export interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  invoice_id: string;
  links: Link[];
  create_time: Date;
  update_time: Date;
}

export interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

export interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

export interface Shipping {
  name: ShippingName;
  address: ShippingAddress;
}

export interface ShippingAddress {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface ShippingName {
  full_name: string;
}
