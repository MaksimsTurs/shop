import "@/index.scss";

import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux/es/exports";

import store from "./store/store.ts";

import Header from "./pages/ui/header/header.component.tsx";
import Footer from "./pages/ui/footer/footer.component.tsx";

const Home = lazy(() => import("./pages/home.tsx"));

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
