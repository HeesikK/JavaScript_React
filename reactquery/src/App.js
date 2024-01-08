import logo from "./logo.svg";
import "./App.css";
import { worker } from "./__mock__/browser";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
function App() {
  worker.start();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
