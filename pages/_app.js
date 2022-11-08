import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  let themes = ["light", "dark", "synthwave", "cyberpunk"];
  const [theme, setTheme] = useState("cyberpunk");
  return (
    <div data-theme={theme}>
      <Navbar themes={themes} theme={theme} setTheme={setTheme} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
