import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CompelxList } from "./components/ComplexList.tsx";
import { ComplexDetails as ComplexDetailsOptimistic } from "./components/ComplexDetailsOptimistic.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ComplexDetails } from "./components/ComplexDetails.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          gap: 20,
        }}
      >
        <CompelxList />
        <ComplexDetailsOptimistic id="1" />
        <ComplexDetailsOptimistic id="2" />
        <ComplexDetails id="3" />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
