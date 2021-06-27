# ListApp FE ✨

## Getting Up and Running 🏃

```
npm install && npm run start
```

This should pop open anew browser tab and show ListApp ✨

## Development 🛠

There is a config inside `src/config/default.js` where things like the API URL lives.  If you are

doing backend work then you should change the API URL in that config file

## Deployment 🚀

This React FE is built into static HTML and then served using NGINX.  The nginx config for this lives in `/etc/nginx/sites-available/listapp.glhf.lol`

In order to update this you will need to have your SSH added to the server.

1. SSH onto the server
2. `cd /var/www/ListApp`
3. `git pull`
4. `npm i` (Optional step, only needed if dependencies are expected to update)
5. `npm run build`
