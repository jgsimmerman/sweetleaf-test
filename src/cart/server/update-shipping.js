
import Stripe from 'stripe'

export default async function updateShipping({ stripeApiSecret, body, verbose }) {
	
	if(verbose){
		
	}
	const stripe = Stripe(stripeApiSecret)
	if(typeof body === `string`){
		body = JSON.parse(body)
  }
  

	let subtotal = body.order.amount
	let skuMatch = body.order.products.some((product) => product.id === 'sku_GrsjNKjWmiGT87')

	console.log(`Subtotal from updateShipping ${subtotal}`)
	let shippingMethods = []


	let shippingOptions = [
		{
      id: `shipping-0`,
      description: `Standard Shipping`,
      value: (subtotal, /*skuMatch*/) => {
        // if (skuMatch) {
				// 	return 0
				// } else 
				if (subtotal < 1000) {
          return 549
        } else if (subtotal < 3000) {
          return 749
        }
        else if (subtotal < 4500) {
          return 895
        }
        else if (subtotal < 5000) {
          return 995
        }
        else if (subtotal >= 5000) {
          return 0 //1195
        }
        // else if (subtotal > 7501) {
        // 	return 0
        // }
      },
    },
		{
			id: `shipping-1`,
			description: `Express Shipping`,
			value: (subtotal) => {
				if (subtotal < 3000) {
					return 1595
				} else if (subtotal < 4500) {
					return 1795
				} else if (subtotal < 6000) {
					return 1895
				}
				else if (subtotal < 7500) {
					return 2195
				}
				else if (subtotal < 10500) {
					return 3095
				}
				else if (subtotal < 14000) {
					return 3395
				}
				else if (subtotal < 17500) {
					return 4195
				}
				else if (subtotal < 21000) {
					return 4795
				}
				else if (subtotal < 35000) {
					return 5495
				}
				else if (subtotal < 50000) {
					return 6796
				}
				else if (subtotal < 75000) {
					return 7995
				}
				else if (subtotal <= 100000) {
					return 9695
				}
				else if (subtotal > 100000) {
					return 9695
				}
			},
			addInfo: ``,
		},
		{
			id: `shipping-2`,
			description: `Overnight Shipping`,
			value: (subtotal) => {
				if (subtotal < 3000) {
					return 2995
				} else if (subtotal < 4500) {
					return 3295
				} else if (subtotal < 6000) {
					return 3495
				}
				else if (subtotal < 7500) {
					return 3995
				}
				else if (subtotal < 10500) {
					return 5695
				}
				else if (subtotal < 14000) {
					return 5995
				}
				else if (subtotal < 17500) {
					return 7195
				}
				else if (subtotal < 21000) {
					return 8195
				}
				else if (subtotal < 35000) {
					return 8995
				}
				else if (subtotal < 50000) {
					return 10995
				}
				else if (subtotal < 75000) {
					return 12595
				}
				else if (subtotal <= 100000) {
					return 14995
				}
				else if (subtotal > 100000) {
					return 16995
				}
			},
			addInfo: ``,
		},
	]

	
	shippingMethods = shippingOptions.map(option => 		
		option.value(subtotal)
		)
	let ship = JSON.parse(JSON.stringify(shippingMethods))
	let ship0 = ship[0]
	let ship1 = ship[1]
	let ship2 = ship[2]

	// Taxes

	let itemTax = Math.ceil(subtotal*.08)

	let tax0 = Math.ceil(ship0*.08)
  let tax1 = Math.ceil(ship1*.08)
	let tax2 = Math.ceil(ship2*.08)

	
	
	// let avaTax = fetch({
	// 	method:'get',
	// 	url:'https://sandbox-rest.avatax.com/api/v2/taxrates/bypostalcode?country=<COUNTRY>&postalCode=<POSTAL-CODE>',
	// 	headers: {'Authorization': 'Basic ' + <Base64Encoded(AVALARA_ACCOUNT_ID + ':' + AVALARA_LICENSE_KEY)>}
	// })
	// 	.then(function (response) {
	// 		console.log(response.data);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error.response.data);
	// 	});

	// Prepare response
  let response = {
    "order_update": {
      "items": [
        {
          "parent": null,
          "type": "tax",
          "description": "Sales taxes",
          "amount": itemTax,
          "currency": "usd"
        }
      ],
      "shipping_methods": [
        {
          "id": "shipping-0",
          "description": "Standard shipping",
          "amount": ship0,
          "currency": "usd",

          // Optional delivery estimate and tax items:
          // "tax_items": [
          //   {
          //     "parent": "priority_shipping",
          //     "type": "tax",
          //     "description": "Shipping sales taxes",
          //     "amount": tax0,
          //     "currency": "usd"
          //   }
          // ]
        },
        {
          "id": "shipping-1",
          "description": "Express shipping",
          "amount": ship1,
          "currency": "usd",

          // Optional delivery estimate and tax items:
          // "tax_items": [
          //   {
          //     "parent": "express",
          //     "type": "tax",
          //     "description": "Shipping sales taxes",
          //     "amount": tax1,
          //     "currency": "usd"
          //   }
          // ]
        },
        {
          "id": "shipping-2",
          "description": "Overnight shipping",
          "amount": ship2,
          "currency": "usd",

          // Optional delivery estimate and tax items:
          // "tax_items": [
          //   {
          //     "parent": "overnight_shipping",
          //     "type": "tax",
          //     "description": "Shipping sales taxes",
          //     "amount": tax2,
          //     "currency": "usd"
          //   }
          // ]
        },
      ]
    }
  }

  return response
}