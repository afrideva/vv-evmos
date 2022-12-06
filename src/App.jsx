// export default () => 'apptest'
// import { ThemeProvider } from "@mui/material/styles";
// import Header from "@afrideva/ui/layout/Header";
// import theme from "@/styles/theme";
// import Footer from "@afrideva/ui/layout/Footer";
// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: 1000 * 60 * 2, // 2 minutes // 24 hours
//       // cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
//       networkMode: "offlineFirst",
//       refetchOnWindowFocus: false,
//       retry: 0,
//     },
//     mutations: {
//       networkMode: "offlineFirst",
//     },
//   },
// });
import React, { useEffect,useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "@afrideva/ui/comp/toast/index.jsx";
import GlobalPlaybar from "@afrideva/ui/comp/GlobalPlaybar";
// export const navLinks = [
//   {
//     title: "STE Home",
//     path: "/",
//     // element: <Home />,
//   },
// ];
// function TopNav({ navLinks }) {
//   return (
//     <div>
//       {navLinks.map(({ title, path }, i) => (
//         <a key={title} href={path}>
//           <button>{title}</button>
//         </a>
//       ))}
//     </div>
//   );
// }
function App({ navLinks,Header }) {
  let nav = useNavigate();

  // <ThemeProvider theme={theme}>
  //   <QueryClientProvider client={queryClient}>
  //     <SnackbarProvider maxSnack={3}>
  //       <Header navLinks={navLinks} />
  //       <Outlet />
  //     </SnackbarProvider>
  //   </QueryClientProvider>
  // </ThemeProvider>
  return (
    <div>
      <Header/>
      <ToastContainer />
      <Outlet />
      <div className="fixed bottom-0 w-full">

      <GlobalPlaybar />
      </div>
    </div>
  );
}

export default App;
