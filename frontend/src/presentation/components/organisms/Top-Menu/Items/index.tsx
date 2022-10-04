import { ArrowForwardIcon } from "@chakra-ui/icons";
import { SCREEN_ROUTES } from "presentation/routes";

interface MenuItems {
  label: string;
  icon: JSX.Element;
  routeToRedirect?: string;
}

export const MenuItems: Array<MenuItems> = [
  {
    label: "Logout",
    icon: <ArrowForwardIcon />,
    routeToRedirect: SCREEN_ROUTES.LOGIN,
  },
];
