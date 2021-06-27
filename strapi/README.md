# Strapi API

## Getting Up and Running 🏃

```
npm install && npm run start
```

## Deployment 🚀

This API is ran through pm2.  Run `pm2 list` in order to see if it is running.

NGINX is used as a reverse proxy to forward any requests from listapp-api.glhf.lol to Strapi

1. SSH onto the server
2. `cd /var/www/ListApp`
3. `git pull`
4. `npm i` (Optional step, only needed if dependencies are expected to update)
5. `pm2 restart ListApp`
