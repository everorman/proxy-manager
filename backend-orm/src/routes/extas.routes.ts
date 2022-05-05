
import { MetaController } from "../controller/MetaController";

export const ExtrasRoutes = [
  {
    method: "post",
    route: "/extras/rotate",
    controller: MetaController,
    action: "rotate",
    check: []
  }

]