import { RootProvider } from "@/components/RootProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
};

export default App;
