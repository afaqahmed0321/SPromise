import React from 'react'

function object() {
    const obj =
    {
        "amount": 20000, 
        "amount_captured": 20000, 
        "amount_refunded": 0, 
        "application": null, 
        "application_fee": null, 
        "application_fee_amount": null, 
        "balance_transaction": "txn_3OhtNfDdHAQGCvEv3R9rp731", 
        "billing_details": {
            "address": {
                "city": null, 
                "country": null, 
                "line1": null, 
                "line2": null, 
                "postal_code": null, 
                "state": null}, 
            "email": null, 
            "name": null, 
            "phone": null
        }, 
        "calculated_statement_descriptor": 
        "Stripe", "captured": true, 
        "created": 1707482435, 
        "currency": "usd", 
        "customer": null, 
        "description": "Developers Sin Subscription", 
        "destination": null, 
        "dispute": null, 
        "disputed": false, 
        "failure_balance_transaction": null, 
        "failure_code": null, 
        "failure_message": null, 
        "fraud_details": { }, 
        "id": "ch_3OhtNfDdHAQGCvEv35lj57WK", 
        "invoice": null, 
        "livemode": false, 
        "metadata": { }, 
        "object": "charge", 
        "on_behalf_of": null, 
        "order": null, 
        "outcome": {
            "network_status": "approved_by_network", 
            "reason": null, 
            "risk_level": "normal", 
            "risk_score": 5, 
            "seller_message": "Payment complete.", 
            "type": "authorized"
        }, 
        "paid": true, 
        "payment_intent": null, 
        "payment_method": "card_1OhtNeDdHAQGCvEvjtq4Os4H", 
        "payment_method_details": {
            "card": {
                "amount_authorized": 20000, 
                "brand": "visa", 
                "checks": [Object], 
                "country": "US", 
                "exp_month": 4, 
                "exp_year": 2024, 
                "extended_authorization": [Object], 
                "fingerprint": "uenV1FQkVbelRSvC", 
                "funding": "credit", 
                "incremental_authorization": [Object], 
                "installments": null, 
                "last4": "4242", 
                "mandate": null, 
                "multicapture": [Object], 
                "network": "visa", 
                "network_token": [Object], 
                "overcapture": [Object], 
                "three_d_secure": null, 
                "wallet": null
            }, 
            "type": "card"
        }, 
        "receipt_email": null, 
        "receipt_number": null, 
        "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xT2ZmZlhEZEhBUUdDdkV2KMS6mK4GMgbiKDtli-I6LBZgtVdk3PL0d5iv-8eMOhgOUJjLwiON3gGoW00onJxzSniPiuEOggATGJHR", 
        "refunded": false, 
        "review": null, 
        "shipping": null, 
        "source":{
            "address_city": null, 
            "address_country": null, 
            "address_line1": null, 
            "address_line1_check": null, 
            "address_line2": null, 
            "address_state": null, 
            "address_zip": null, 
            "address_zip_check": null, 
            "brand": "Visa", 
            "country": "US", 
            "customer": null, 
            "cvc_check": "pass",
            "dynamic_last4": null, 
            "exp_month": 4, 
            "exp_year": 2024, 
            "fingerprint": "uenV1FQkVbelRSvC", 
            "funding": "credit", 
            "id": "card_1OhtNeDdHAQGCvEvjtq4Os4H", 
            "last4": "4242", 
            "metadata": {}, 
            "name": null, 
            "object": "card", 
            "tokenization_method": null, 
            "wallet": null
        }, 
        "source_transfer": null, 
        "statement_descriptor": null, 
        "statement_descriptor_suffix": null, 
        "status": "succeeded", 
        "transfer_data": null, 
        "transfer_group": null
    }
  return (
    <div>
      
    </div>
  )
}

export default object
