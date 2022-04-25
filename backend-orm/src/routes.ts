import { AuthRoutes } from "./routes/auth.routes";
import { SitesRoutes } from "./routes/sites.routes"
import { UserRoutes } from "./routes/user.routes";


export const Routes = [
  ...SitesRoutes,
  ...UserRoutes,
  ...AuthRoutes
  ];