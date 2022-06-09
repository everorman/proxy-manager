import { AuthRoutes } from "./routes/auth.routes";
import { ExtrasRoutes } from "./routes/extas.routes";
import { ProxyRoutes } from "./routes/proxies.routes";
import { SitesRoutes } from "./routes/sites.routes"
import { UserRoutes } from "./routes/user.routes";


export const Routes = [
  ...SitesRoutes,
  ...UserRoutes,
  ...AuthRoutes,
  ...ExtrasRoutes,
  ...ProxyRoutes
  ];