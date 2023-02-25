import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootContainer: any | HTMLElement | null = document.getElementById("root");
const root: any | Element | DocumentFragment = createRoot(rootContainer);

root.render(<App />);
