# 🌤️ Real-Time Weather Setup Guide

## Professional Weather Data for University Explorer

Your university platform now includes **REAL-TIME WEATHER DATA** to help students make informed decisions about campus locations and climate conditions.

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Free API Key
- Visit: https://openweathermap.org/api
- Click "Sign Up" (it's free!)
- Verify your email
- Go to "API Keys" section
- Copy your API key

### 2. Configure Your Environment
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your API key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
```bash
npm run dev
```

## 📊 What You Get

### ✅ **Real-Time Data for All 26 Universities:**
- **Live Temperature** - Current conditions for each campus
- **Weather Conditions** - Sunny, cloudy, rainy, etc.
- **Humidity & Wind** - Complete atmospheric data
- **Automatic Updates** - Fresh data every 10 minutes
- **Smart Caching** - Fast performance with intelligent fallbacks

### 🎯 **Business Value:**
- **Student Decision Making** - Real weather helps choose universities
- **Seasonal Planning** - Students see actual climate conditions
- **Professional Credibility** - Live data shows platform quality
- **User Engagement** - Interactive, real-time information

## 🔧 Technical Features

### **Intelligent Fallbacks:**
- If API fails, uses South African climate patterns
- Geographic-based weather estimation
- Seasonal adjustments (summer/winter)
- No broken experiences

### **Performance Optimized:**
- 10-minute caching per location
- Batch API calls for efficiency
- Error handling with graceful degradation
- Loading states and refresh buttons

### **Free Tier Limits:**
- **1,000 API calls/day** (more than enough)
- **60 calls/minute** rate limit
- Covers all 26 universities multiple times per day

## 🌍 Coverage

**All South African Provinces:**
- Western Cape (Cape Town, Stellenbosch)
- Gauteng (Johannesburg, Pretoria)
- KwaZulu-Natal (Durban, Richards Bay)
- Eastern Cape (Port Elizabeth, Mthatha)
- Free State (Bloemfontein)
- Limpopo (Polokwane, Thohoyandou)
- North West (Potchefstroom)
- Mpumalanga (Nelspruit)
- Northern Cape (Kimberley)

## 🎉 Ready to Go!

Once configured, your university explorer will show:
- 🌡️ **Live temperatures** for each campus
- ☀️ **Current conditions** (sunny, cloudy, etc.)
- 💧 **Real humidity levels**
- 💨 **Wind speeds**
- 🔄 **Refresh buttons** for instant updates
- ⚡ **Status indicators** (Live/Cached/Loading)

Your students now have **professional-grade weather data** to make informed decisions about their university choices! 🎓🌤️