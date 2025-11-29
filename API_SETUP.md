# AI Expert Chat API Setup Guide

## Overview
The AI Expert Chat uses Groq API for intelligent home improvement recommendations. If the API key is not configured, it falls back to local intelligent responses.

## Setup Instructions

### 1. Get a Groq API Key
- Visit: https://console.groq.com
- Sign up for a free account
- Create a new API key
- Copy your API key

### 2. Configure Environment Variables

#### For Development:
Create a `.env.local` file in the project root:

```
VITE_GROQ_API_KEY=your_actual_groq_api_key_here
```

**Replace `your_actual_groq_api_key_here` with your actual API key from Groq**

#### For Production:
Add environment variable in your hosting platform:
- Vercel: Add to Environment Variables
- Netlify: Add to Build environment variables
- Others: Follow your platform's documentation

### 3. Test the Integration

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:8080
3. Click on "AI Expert Chat" tool
4. Type a question about home improvements
5. You should get AI-powered responses

### 4. Fallback Behavior

If the API key is not configured or invalid, the chat will:
- Use intelligent local responses based on keywords
- Answer questions about kitchens, bathrooms, energy efficiency, landscaping, roofing, budgets, timelines, and contractors
- Provide helpful home improvement recommendations

## Features

The AI Expert Chat can help with:
- **ROI Analysis**: Calculate return on investment for specific improvements
- **Cost Estimation**: Provide budget ranges for projects
- **Timeline Planning**: Suggest project timelines and seasonal considerations
- **Contractor Recommendations**: Help connect with verified contractors
- **Home Improvement Trends**: Share industry best practices and current trends

## Groq API Models
Currently using: `mixtral-8x7b-32768`
- Free tier available
- Excellent for conversational AI
- Fast response times
- No costs for initial usage

## Troubleshooting

**Issue**: Chat returns generic local responses
- **Solution**: Check that `.env.local` is created with correct API key format

**Issue**: "Failed to fetch" errors in console
- **Solution**: Verify API key is correct and valid at https://console.groq.com

**Issue**: Slow responses
- **Solution**: This is normal on free tier. Groq handles thousands of requests per day

## Notes
- API calls are made from the client (frontend)
- Keep your API key private, never commit `.env.local` to git
- `.env.local` is already in `.gitignore`
