export const PAYMENT_PROVIDER = {
    name: "Payco Payments",
    public_name: "Payco Payments",
    description: "Simples, Rápido, Seguro, PAYCO.",
    logo_urls: {
        "400x120": "https://avatars.githubusercontent.com/u/146895694?v=4",
        "160x100": "https://avatars.githubusercontent.com/u/146895694?v=4"
    },
    configuration_url: "https://dash.payments.payco.com.br/configuracoes",
    support_url: "https://payments.payco.com.br/suporte",
    rates_url: "https://payments.payco.com.br/taxas",
    checkout_js_url: "https://mypayments.com/checkout.min.js",
    supported_currencies: ["BRL"],
    supported_payment_methods: [
        {
            payment_method_type: "credit_card",
            payment_methods: ["visa", "mastercard", "amex", "diners"]
        }
    ],
    rates: [
        {
            payment_method_type: "credit_card",
            rates_definition: [
                {
                    percent_fee: "1.89",
                    days_to_withdraw_money: 30
                },
            ]
        }
    ],
    checkout_payment_options: [
        {
            id: "mypayments_transparent_card",
            name: "Cartão de Crédito",
            description: "Pague com cartão de crédito em até 12x com a Payco.",
            logo_url: "https://cdn.mypayments.com/apps/tiendanube/logo.png",
            supported_billing_countries: ["BR"],
            supported_payment_method_types: ["credit_card"],
            integration_type: "transparent"
        },
        {
            id: "mypayments_transparent_offline",
            name: "Boleto",
            description: "Pague com boleto bancário e receba desconto de 10%.",
            logo_url: "https://cdn.mypayments.com/apps/tiendanube/logo.png",
            supported_billing_countries: ["BR"],
            supported_payment_method_types: ["boleto"],
            integration_type: "transparent"
        },
    ],
    features: ["transparent_checkout"],
    enabled: true,
}
