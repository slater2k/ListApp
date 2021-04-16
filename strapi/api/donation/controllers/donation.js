'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const unparsed = require('koa-body/unparsed.js');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.donation.create(data, { files });
    } else {
      entity = await strapi.services.donation.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.donation });
  },

  /**
   * Create Stripe Checkout for the user based on a donation ID
   *
   * @param {Object} ctx
   */
  async createCheckout(ctx) {
    const donationId = ctx.params.donation_id;
    let donation = await strapi.services.donation.findOne({ id: donationId });

    if (!donation) {
      ctx.response.status = 404;
      ctx.response.message = "Donation does not exist";
      return ctx.response;
    }

    if (donation.confirmed_on != null) {
      // Payment for this donation has already been made
      ctx.response.status = 400; // Bad request
      ctx.response.message = "Payment for this donation has already been made";
      return ctx.response;
    }

    // Strip out private fields and relationships
    donation = sanitizeEntity(donation, { model: strapi.models.donation });

    const price = donation.price;

    const YOUR_DOMAIN = "http://listapp.glhf.lol:13337";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "ListApp Donation"
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      metadata: {
        donation_id: donation.id
      }
    });

    // return checkout session id
    return { checkout_session: session.id, donation, price };
  },

  async stripeWebhook(ctx) {
    const payload = ctx.request.body[unparsed];
    const sig = ctx.request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(err.message)
      ctx.response.status = 400;
      ctx.response.message = `Webhook Error: ${err.message}`;
      return ctx.response;
    }

    if (event.type == "checkout.session.completed") {
      const donationId = event.data.object.metadata.donation_id;

      await strapi.services.donation.update({ id: donationId }, { confirmed_on: Date.now() });
    }

    return { yerd: "yerd" };
  },
};
