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
   * Create a donation.  Then create a Stripe checkout session for said donation
   *
   * @return {Object}
   */
  async create(ctx) {
    if (!ctx.state.user) {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        message: "You must be logged in to make a donation",
      };
      return;
    }

    // Create donation entry
    const userInput = ctx.request.body;
    let entity = {};
    // TODO validation
    entity.price = userInput.price;
    entity.points = 69; // TODO convert price to points here
    entity.user_id = ctx.state.user.id;

    entity = await strapi.services.donation.create(entity);
    const donation = sanitizeEntity(entity, { model: strapi.models.donation });

    // Create checkout on Stripe
    const price = donation.price;
    const YOUR_DOMAIN = "http://listapp.glhf.lol/";
    const SUCCESS_URL = `${YOUR_DOMAIN}/thank-you`;
    const CANCEL_URL = `${YOUR_DOMAIN}/cancel`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "ListApp Donation",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      metadata: {
        donation_id: donation.id,
      },
    });

    // return checkout session id
    return {
      checkout_session: session.id,
      donation,
      price,
      callbacks: {
        success: SUCCESS_URL,
        cancel: CANCEL_URL
      }};
  },

  async stripeWebhook(ctx) {
    const payload = ctx.request.body[unparsed];
    const sig = ctx.request.headers["stripe-signature"];

    let event;

    // Verify the request came from Stripe
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

    // Handlers
    if (event.type === "checkout.session.completed") {
      const donationId = event.data.object.metadata.donation_id;
      await strapi.services.donation.update({ id: donationId }, { confirmed_on: Date.now() });

      return { success: true, donation_id: donationId };
    }

    return { success: false, message: `No handler for event ${event.type}`};
  },
};
