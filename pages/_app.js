import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AuthProvider } from "../auth";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
