import { createBrowserRouter } from "react-router-dom";
import Inicio from "./Inicio";
import Participantes from "./Participantes";
import Registro from "./Registro";
import Gafete from "./Gafete";
import NotFound from "./NotFound";
import LayoutPublic from "../layout/LayoutPublic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "participantes",
        element: <Participantes />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
      {
        path: "gafete/:id",
        element: <Gafete />,
      },
    ],
  },
]);
