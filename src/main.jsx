import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import TrustMap from "./app.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TrustMap />
    <Analytics />
  </StrictMode>
);
