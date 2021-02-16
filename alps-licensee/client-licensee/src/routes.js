import Dashboard from "./views/Dashboard";
import LicensorDetails from "./views/LicensorDetails";
import Payments from "./views/Payments";
import SmartLicense from "./views/SmartLicense";

var routes = [
    {
      path: "/dashboard",
      name: "Overview",
      icon: "nc-icon nc-bank",
      component: Dashboard,
      layout: "/licensee",
    },
  
    {
      path: "/smart-license",
      name: "Smart License",
      icon: "nc-icon nc-layout-11",
      component: SmartLicense,
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
      path: "/payments",
      name: "Payments History",
      icon: "nc-icon nc-tile-56",
      component: Payments,
      layout: "/licensee",
    },
    {
      path: "/licenses",
      name: "Active Licenses",
      icon: "nc-icon nc-vector",
      component: (null),
      layout: "/licensee",
    },
  
  ];
  export default routes;