# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Here is a professional, high-impact `README.md` for your **Foodi** project. It is designed to look attractive on GitHub and provides all the technical details a developer would need.

---

# 🍴 Foodi - Professional Food Delivery App

**Foodi** is a modern, full-stack food ordering platform built for performance and user experience. It features a seamless shopping cart, real-time order processing via **Appwrite**, professional **Razorpay** payment integration, and automated **PDF receipt generation**.

---

## 🚀 Features

* **🛒 Advanced Cart System:** Add, remove, and update item quantities with persistent storage.
* **💳 Razorpay Integration:** Secure, professional payment gateway supporting UPI, Cards, and Netbanking.
* **📄 PDF Receipts:** Automatically generates a branded PDF receipt upon successful payment using `jsPDF`.
* **🔐 Secure Authentication:** User login and signup powered by **Appwrite**.
* **📱 Fully Responsive:** Beautifully crafted UI using **Material UI (MUI)** with a premium Dark Theme.
* **⚡ State Management:** Robust logic handling using **Redux Toolkit** and **Async Thunks**.

---

## 🛠️ Tech Stack

| Frontend | Backend (BaaS) | Payments | Utilities |
| --- | --- | --- | --- |
| **React 18** | **Appwrite** | **Razorpay** | **jsPDF** |
| **Redux Toolkit** | Databases | Checkout SDK | **AutoTable** |
| **Material UI** | Auth & Storage | INR Support | **Sonner (Toasts)** |

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI (Buttons, Modals, Navbar)
├── pages/               # Main Views (CartPage, Menu, Home)
├── hooks/
│   ├── redux-toolkit/   # Slices (cart.slice, order.slice, auth.slice)
│   └── utils/           # razorpayHandler.ts, generateReceipt.ts
├── lib/                 # appwrite.config.ts
└── App.tsx              # Routing & Provider Setup

```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/foodi.git
cd foodi

```

### 2. Install dependencies

```bash
npm install

```

### 3. Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=your_project_id
VITE_APPWRITE_DATABASE=your_database_id
VITE_RAZORPAY_KEY_ID=rzp_test_SJDLECuCowUuFj

```

### 4. Razorpay SDK

Ensure you have the Razorpay script in your `index.html`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

```

---

## 💳 Payment Flow Logic

1. **Place Order:** Appwrite creates a document with `status: "pending"`.
2. **Payment:** Razorpay Gateway opens.
3. **Verification:** On success, `updateOrderStatus` thunk changes status to `"completed"`.
4. **Documentation:** `generateReceipt` triggers a local PDF download for the user.
5. **Finalize:** Redux `clearCart` is dispatched, and the user is navigated home.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 👨‍💻 Developed by

**Mrinmoy Ghosh** *React.js Developer | Kolkata, India*

---

Would you like me to help you write a **License** file or a **Contributing Guide** to go along with this?