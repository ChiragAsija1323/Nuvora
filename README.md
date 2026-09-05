# MarginMind: AI Sales Agent (Razorpay AI Buildathon)

## Track 1: AI Growth & Agentic Commerce

MarginMind is not just a chat bot—it's an **Economic Optimization Engine**. 

When a customer objects to a price during checkout (e.g., "Too expensive"), standard AI bots simply hand out flat discounts, destroying merchant margins. 

MarginMind negotiates on **value**, not just price. It dynamically constructs bundles (adding high-value, low-cost accessories) to save the sale while strictly enforcing merchant economics.

### Core Architecture: "The LLM Proposes, The Policy Engine Disposes"
1. **The Intelligence (Gemini 1.5 Flash):** The LLM parses the customer's intent, reads the product catalog, and generates 3 candidate bundles.
2. **The Policy Engine:** A deterministic backend rules engine evaluates the LLM's candidates. It instantly rejects any candidate that violates the **Margin Floor** or **Max Bundle Limits**.
3. **The Scorer:** The remaining valid candidates are scored based on **Expected Profit** (Margin × Conversion Probability Heuristic). The highest scoring candidate is selected.
4. **The Checkout (Razorpay):** The backend re-validates the offer to prevent front-end tampering, then dynamically generates a Razorpay Payment Link.

### Features
* **Nuvora Storefront:** A premium, dark-mode mock ecommerce store.
* **MarginMind Chat Widget:** A conversational negotiation interface.
* **Merchant Control Room:** A real-time audit dashboard. This is the killer feature for B2B trust. It shows exactly *why* the AI rejected or approved a specific candidate bundle.

---

## How to Run Locally

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Rename `.env.example` to `.env.local` and add your keys:
   ```env
   GEMINI_API_KEY=your_gemini_key
   RAZORPAY_KEY_ID=your_razorpay_test_key
   RAZORPAY_KEY_SECRET=your_razorpay_test_secret
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Test the Flow:**
   * Open **[localhost:3000](http://localhost:3000)** (The Storefront). Click "Too Expensive?" and ask for ₹10,000 off.
   * Open **[localhost:3000/admin](http://localhost:3000/admin)** (The Merchant Dashboard) in a separate tab to watch the AI's internal decision-making process in real-time.
