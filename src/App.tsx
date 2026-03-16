import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { Box, CssBaseline } from "@mui/material";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import { Toaster } from "sonner";
import ReduxProvider from "./hooks/utils/ReduxProvider";

function App() {
  return (
    <>
      {/* <RouterProvider router={Routes}/> */}

      <ThemeProvider theme={theme}>
        {/* <CssBaseline/> */}
        {/* <LandingPage/> */}
        {/* <Navbar/> */}
        {/* <MenuPage/> */}
        {/* <BlogPage/> */}

        {/* <Footer/> */}
        <CssBaseline />

        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          {/* <RouterProvider router={router} />
          <Toaster position="top-right" richColors /> */}
          <ReduxProvider>
        <Toaster position='top-right' richColors closeButton/>
        <RouterProvider router={router} />
      </ReduxProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
