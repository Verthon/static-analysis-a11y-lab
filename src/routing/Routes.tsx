import { type JSX, lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";

import { routesConfig } from "./routesConfig";
import { PageLoader } from "../design-system/PageLoader/PageLoader";

type LazyComponent = React.LazyExoticComponent<() => JSX.Element>;

const HomePage: LazyComponent = lazy(
  () => import(/* webpackChunkName: "home-page" */ "../HomePage")
);

const ContactPage: LazyComponent = lazy(
  () => import(/* webpackChunkName: "contact-page" */ "../contact/ContactPage")
);

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routesConfig.home} element={<HomePage />} />
        <Route path={routesConfig.contact} element={<ContactPage />} />
      </Route>
    </Routes>
  </Suspense>
);
