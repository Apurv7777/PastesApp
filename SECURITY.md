# Security Improvements

## 1. Supabase Security (Critical)
Creating the `pastes` table makes it public by default. To secure it, you must enable **Row Level Security (RLS)**.

1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Navigate to the **SQL Editor**.
3.  Open the file `supabase_rls.sql` from this project.
4.  Copy the contents and paste them into the SQL Editor.
5.  Click **Run**.

*Note: Since your app currently doesn't have User Authentication (Login), these policies allow "Anonymous" access. This prevents "service_role" unrestricted access but still allows users of your site to read/write. For true security (per-user data), you would need to implement Supabase Auth.*

## 2. Gemini API Security
Your `VITE_GEMINI_API_KEY` is exposed in the browser. This is standard for client-side apps but carries risk.

**To secure this key:**
1.  Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2.  Find your API Key.
3.  Click **Edit API key**.
4.  Under **Application restrictions**, select **Websites**.
5.  Add your domains:
    *   `http://localhost:5173/*` (for local development)
    *   `https://your-app-name.vercel.app/*` (your production URL)
6.  Click **Save**.

This ensures that even if someone steals your key, they cannot use it from their own website.
