# 🌿 GreenScan


Instantly decode the environmental and nutritional impact of any product with a single, powerful scan. GreenScan bridges the gap between consumer curiosity and transparent product data, wrapped in an elegant, futuristic interface.

### ✨ Live Demo

**https://green-scan-kappa.vercel.app/**

---

<p align="center">
  <img src="https://storage.googleapis.com/agent-tools-public-content/greenscan-result.png" alt="GreenScan Result Card" width="450">
</p>

---

## 🚀 Features

*   **Real-time Barcode & QR Scanning:** Uses your device's camera to create a futuristic "Heads-Up Display" for instant code detection.
*   **Powerful Data Integration:** Fetches comprehensive product data from the global [Open Food Facts](https://openfoodfacts.org/) database.
*   **Color-Coded Eco-Score:** Translates the official `ecoscore_grade` into a clear, color-coded rating: **Sustainable (Green)**, **Partially Sustainable (Yellow)**, or **Not Sustainable (Red)**.
*   **Bombastic & Elegant UI:** A custom-designed "Digital Aurora" theme built with ShadCN UI, featuring glassmorphism, glowing accents, and fluid animations.
*   **Detailed Product Card:** Displays a wealth of information including product image, brand, quantity, ingredients, allergens, and nutritional levels.
*   **Advanced Scanner Controls:** Allows users to switch between available camera devices on the fly.
*   **Copy to Clipboard:** Easily copy the scanned barcode with a single click.

## 🛠️ Technology Stack

| Technology      | Description                                          |
| --------------- | ---------------------------------------------------- |
| **Next.js 14**  | App Router, Server Actions, API Routes.              |
| **React**       | Core UI library.                                     |
| **TypeScript**  | For robust, type-safe code.                          |
| **Tailwind CSS**| Utility-first CSS for rapid, custom styling.         |
| **ShadCN/UI**   | Beautiful, accessible, and unstyled UI components.   |
| **Lucide React**| For clean and elegant icons.                         |
| **@yudiel/react-qr-scanner** | The powerful engine for camera-based barcode detection. |

## ⚙️ How It Works

GreenScan is built on a modern, decoupled architecture that ensures security and performance.

1.  **Frontend (Scanner):** The user scans a barcode using the React component on the `/scan` page.
2.  **Internal API Call:** The scanned code is sent via a `POST` request to our own backend API route (`/api/product-info`).
3.  **Backend API Route:** This secure, server-side route receives the barcode. It then makes a server-to-server call to the Open Food Facts API.
4.  **Data Processing:** The backend processes the massive JSON response from Open Food Facts, extracting only the essential data (name, brand, images, eco-score, etc.) and applying our custom sustainability logic.
5.  **Clean Response:** The backend sends a small, clean, and typed `ProductInfo` object back to the frontend.
6.  **UI Rendering:** The frontend receives the processed data and renders the beautiful, dynamic `ResultDisplay` component.

This prevents exposing any external API logic to the client and allows us to create a clean, purpose-built data structure for our UI.

## 🏁 Getting Started

Follow these steps to get a local copy of GreenScan up and running.

### Prerequisites

*   Node.js (v18.17 or later)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/greenscan.git
    cd greenscan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Next.js for External Images:**
    The project needs to trust the Open Food Facts image domain. Ensure your `next.config.mjs` file includes the following:
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.openfoodfacts.org',
            port: '',
            pathname: '/images/products/**',
          },
        ],
      },
    };

    export default nextConfig;
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

    > **Note:** Camera access requires a secure context. `localhost` is considered secure. If accessing from a different device on your network, you may need to set up an HTTPS tunnel (e.g., using `ngrok`). Your browser will ask for camera permission on the first visit to the `/scan` page—please allow it.

## 📂 Project Structure

Here is a brief overview of the key files in the project:

```
src/
├── app/
│   ├── api/product-info/route.ts  # The powerful backend logic and data processor.
│   ├── components/
│   │   ├── ResultDisplay.tsx     # The bombastic and elegant result card UI.
│   │   └── scanner.tsx           # The wrapper for the @yudiel/react-qr-scanner component.
│   ├── scan/page.tsx             # The main scanning page, orchestrating the UI state (scan, load, result).
│   └── page.tsx                  # The "Digital Aurora" landing page.
├── components/ui/                  # Auto-generated by ShadCN for UI primitives.
└── lib/utils.ts                    # Auto-generated by ShadCN.
```

## 🗺️ Future Roadmap

GreenScan is a living project with an ambitious future. Potential next steps include:

*   **User Accounts & Scan History:** Allow users to sign up and keep a history of their scanned products.
*   **Personalized Insights:** Provide personalized sustainability reports based on a user's scan history.
*   **Product Alternatives:** Suggest more sustainable alternatives to poorly rated products.
*   **Deeper Data Analysis:** Incorporate more data points like packaging materials and supply chain origins.

## ❤️ Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.