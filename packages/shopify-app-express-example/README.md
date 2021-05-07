use localtunnel to get a static tunnel url

then copy that url to the HOST_URL param in env

then yarn start

# shopify-app-express-example

## Setup

1. Start a tunnel

    ```bash
    yarn start:tunnel
    ```
1. Copy the HTTPs public URL (e.g. `https://<id>.ngrok.io`)
1. Add public URL to `.env.local` variable `HOST_URL`
1. Add to Shopify app URLs
    * *App URL* is `https://<id>.ngrok.io/shopify/auth/start`
    * *Allowed redirection URL* is `https://<id>.ngrok.io/shopify/auth/complete`
1. Start the app
    
    ```bash
    yarn start
    ```