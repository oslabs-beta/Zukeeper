import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootContainer: any = document.getElementById("root") as HTMLElement;
const root: any = createRoot(rootContainer);

root.render(<App />);
