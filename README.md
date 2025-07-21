# 🌿 EcoBuddy

**EcoBuddy** is a lightweight, AI-powered web app that helps individuals log their daily eco-friendly actions, earn “Green Points,” and redeem them for real-world rewards like tree-planting credits and eco-product discounts. Built with Supabase, MGX, and Claude AI, EcoBuddy is designed to promote sustainable living across Kenya and East Africa in a gamified, accessible way.

---

## 🚀 Live Demo
👉 (https://ecobuddy-23lw44edr-leah-sigana.vercel.app)

---

## ✨ Features

- 🔐 **User Auth:** Sign up / log in securely using Supabase Auth
- 📅 **Log Daily Eco-Actions:** Simple, chat-style interface to track behavior
- 🎯 **Green Points System:** Users earn points for every logged eco-action
- 🏆 **Rewards Page:** Redeem points for planting trees or discounts from green businesses
- 🤖 **AI Eco Assistant:** Chatbot delivers localized, actionable climate tips using Claude AI
- 📊 **Dashboard:** View point balance, eco-action history, and impact streaks

---

## 🌍 Why It Matters

Kenya and East Africa face serious climate challenges — from deforestation to plastic pollution. EcoBuddy transforms climate awareness into daily behavior change, using gamification and personalization to engage youth, urban residents, and rural communities alike.

---

## 🔧 Tech Stack

| Tech        | Use Case                       |
|-------------|--------------------------------|
| Supabase    | Auth, Database, Real-time logs |
| MGX / Rork  | UI components & app design     |
| Cursor AI   | Code generation and productivity |
| Claude AI   | Climate tips and prompt flows  |
| Bolt.new    | Fast deployment platform       |

---

## 🧠 AI Prompt Design (Claude)

Prompt Template:
> "You are EcoBuddy, a friendly AI assistant for climate action in Kenya. Provide one simple, actionable eco tip relevant to the user's context. Keep it casual and encouraging."

Example:
> “Today, try reusing a plastic container instead of throwing it away. Small changes, big impact 🌍”

---

## 💰 Monetization Model

1. **Freemium:** Basic access for individuals, premium dashboards for schools or NGOs
2. **Partner Listings:** Eco-friendly brands pay to be featured in the rewards store
3. **Affiliate Discounts:** Points redeemable for brand-linked promotions
4. **Sponsored Tips:** Businesses can sponsor AI tips (“Today’s tip by XYZ Solar”)

---

## 🧪 Running Locally

```bash
# Clone the repository
git clone https://github.com/lsigana/ecobuddy-app.git
cd ecobuddy

# Install dependencies
npm install

# Start the app
npm run dev

#Folder Structure
/ecobuddy
│
├── /public              # Static assets
├── /src
│   ├── /components      # UI components (Dashboard, Logger, Rewards, Chatbot)
│   ├── App.jsx
│   └── main.jsx
├── supabase-config.js   # Supabase client setup
├── .env
├── package.json
└── README.md

Note: The name 'EcoBuddy' is used for demonstration purposes only. This is an independently developed project created during the Vibe Coding Hackathon with no affiliation to any existing brand or entity.