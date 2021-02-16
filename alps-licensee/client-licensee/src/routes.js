import SignInSide from "views/SignInSlide";
import Dashboard from "./views/Dashboard";
import LicensorDetails from "./views/LicensorDetails";
import Payments from "./views/Payments";
import SmartLicense from "./views/SmartLicense";
import Devices from "./views/Devices"

var routes = [
  {
    path: "",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: SignInSide,
    layout: "/login",
  },
  {
    path: "/dashboard",
    name: "Overview",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/licensee",
  },
  {
    path: "/devices",
    name: "Devices",
    icon: "nc-icon nc-tile-56",
    component: Devices,
    layout: "/licensee",
  },

  {
    path: "/payments",
    name: "Payments",
    icon: "nc-icon nc-money-coins",
    component: Payments,
    layout: "/licensee",
  },
  {
    path: "/licenses",
    name: "Active Licenses",
    icon: "nc-icon nc-vector",
    component: null,
    layout: "/licensee",
  },

  {
    path: "/licensor-det",
    name: "Licensors Details",
    icon: "nc-icon nc-single-02",
    component: LicensorDetails,
    layout: "/licensee",
  },
  {
    path: "/smart-license",
    name: "Smart License",
    icon: "nc-icon nc-layout-11",
    component: SmartLicense,
    layout: "/licensee",
  },
];
export default routes;
