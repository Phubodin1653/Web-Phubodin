# Supabase Storage Setup Instructions

## Step 1: Update EmailJS Template
Go to EmailJS Dashboard → Template ID: `template_5n91d5f`

**Replace the entire template with this HTML:**

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px;">
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #666;">A new comment has been received:</p>
    </div>
    
    <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">From:</strong> {{from_name}}
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Message:</strong>
            <p style="margin: 10px 0 0 0; color: #555; line-height: 1.6;">{{message}}</p>
        </div>
        
        {{#if_has image_data}}
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <strong style="color: #333;">Image:</strong>
            <div style="margin-top: 10px;">
                {{#if_not_no_image image_data}}
                <img src="{{image_data}}" style="max-width: 100%; max-height: 300px; border-radius: 4px; border: 1px solid #ddd;" />
                {{else}}
                <p style="color: #999; margin: 0;">No image provided</p>
                {{/if_not_no_image}}
            </div>
        </div>
        {{/if_has}}
    </div>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
        <p style="margin: 0;">This is an automated email from your portfolio comment system.</p>
    </div>
</div>
```

## Step 2: Verify Supabase Credentials

Check your `.env.local` file has:
```
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_key
```

⚠️ **IMPORTANT:** Replace with your actual Supabase project credentials!

## Step 3: Create Storage Bucket (if needed)

In Supabase Dashboard:
1. Go to **Storage** → **Buckets**
2. Create a new bucket named `profile-images` if it doesn't exist
3. Set **Public** access (allows viewing images without authentication)
4. Click **Create bucket**

## How It Works Now

1. User submits comment with image
2. Image is uploaded to Supabase Storage → `/profile-images/timestamp_random.jpg`
3. Supabase returns public URL
4. Email is sent with the image URL (not base64)
5. Email displays the image from the URL
6. Comment shows in the component with image preview

## Image Size Limits
- **Supabase:** 5MB per file (no total limit)
- **Browser upload:** ~100MB (depends on browser)
- **Supported formats:** JPG, PNG, GIF, WebP, etc.

## Troubleshooting

**Images not showing in email:**
- Check Supabase bucket is set to "Public"
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Check browser console for upload errors

**Upload fails:**
- File size > 5MB
- Invalid Supabase credentials
- Bucket doesn't exist or is private

**Email not received:**
- Check EmailJS credentials are correct
- Verify template ID matches (template_5n91d5f)
- Check spam folder

## Gitignore Settings
Ensure your project `.gitignore` includes:
```
# Supabase files
.supabase/
# dist/
```

This prevents sensitive Supabase files from being pushed to your repository.
