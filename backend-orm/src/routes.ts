import { UserRoutes } from "./routes/user.routes";
import { SitesRoutes } from "./routes/sites.routes"


export const Routes = [
  ...SitesRoutes,
  ...UserRoutes
  ];