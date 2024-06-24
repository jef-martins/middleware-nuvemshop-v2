

export interface PaymentIntegration {
    store_id: string;
    token: string;
    name: string;
    public_name: string;
    description: string;
    logo_urls: {
      '400x120': string;
      '160x100': string;
    };
    configuration_url: string;
    support_url: string;
    rates_url: string;
    checkout_js_url: string;
    supported_currencies: string[];
    supported_payment_methods: {
      payment_method_type: string;
      payment_methods: string[];
      installments?: {
        min_installment_value: {
          currency: string;
          value: string;
        }[];
        specification: {
          installments: number;
          interest_rate: string;
          applies_to: string[];
        }[];
      };
    }[];
    rates: {
      payment_method_type: string;
      rates_definition: {
        percent_fee: string;
        flat_fee?: {
          value: string;
          currency: string;
        };
        plus_tax?: boolean; // tornando opcional
        days_to_withdraw_money: number;
      }[];
    }[];
    checkout_payment_options: {
      id: string;
      name: string;
      description: string;
      logo_url: string;
      supported_billing_countries: string[];
      supported_payment_method_types: string[];
      integration_type: string;
    }[];
    features: string[];
    enabled: boolean;
    authentication?: any;
  }
  