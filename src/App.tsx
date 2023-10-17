import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import { Home } from "./pages/Home";
import { Loading } from "./pages/Loading";
import { MainLayout } from "./components/MainLayout";
import { Suspense, lazy } from "react";

const Cart = lazy(() => import(/* webpackChunkName: "[Cart]" */ "./pages/Cart"));
const FullPizza = lazy(() => import(/* webpackChunkName: "[FullPizza]" */ "./pages/FullPizza"));
const NotFound = lazy(() => import(/* webpackChunkName: "[NotFound]" */ "./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='/pizza/:id'
          element={
            <Suspense fallback={<Loading />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
