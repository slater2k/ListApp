module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 13337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '22c9adfea1b7f6b86aa927dadce010d4'),
    },
  },
});
