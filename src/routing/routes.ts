import createMainPage from "@/page/create-main-page";
import Component from "component";
import createAuthPage from "@/page/create-auth-page";
import createAboutPage from "../page/create-about-page";

export type Path = {
  title: string;
  getComponent: () => Component;
};

type Routes = { [key: string]: Path };

const routes: Routes = {
  404: {
    getComponent: () => new Component({}),
    title: "404",
  },
  auth: {
    getComponent: () => createAuthPage(),
    title: "Auth",
  },
  about: {
    getComponent: () => createAboutPage(),
    title: "About Us",
  },
  main: {
    getComponent: () => createMainPage(),
    title: "Main",
  },
};

export default routes;
