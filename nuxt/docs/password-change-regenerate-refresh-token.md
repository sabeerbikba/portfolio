1. Open [OAuth Playground](https://developers.google.com/oauthplayground/).
2. On the right side:
   - Check **Use your own OAuth credentials**.
   - Paste your **Client ID** and **Client Secret**.
3. In Step 1 (Select & authorize APIs): enter

   - [https://mail.google.com/](https://mail.google.com/)

Then click **Authorize APIs**.
4. Sign in with your Gmail, grant access.
5. In Step 2, click **Exchange authorization code for tokens**.
- Copy the **Refresh Token**.
6. **Update your environment variables**:
- If running locally → update `.env`  
  ```bash
  REFRESH_TOKEN=your_new_refresh_token
  ```
- If deployed on Vercel (or any host) → go to **Project Settings → Environment Variables** and replace the old `REFRESH_TOKEN` with the new one.  
7. Redeploy your app so the new token is picked up.