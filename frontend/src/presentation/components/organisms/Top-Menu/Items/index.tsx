import { ArrowForwardIcon } from "@chakra-ui/icons";
import { makeLogoutUseCase } from "main/application/modules/auth/use-cases";

import { SCREEN_ROUTES } from "presentation/routes";

interface MenuItems {
  label: string;
  icon: JSX.Element;
  routeToRedirect?: string;
  action?: (...args: any) => Promise<void>;
}

export const MenuItems: Array<MenuItems> = [
  {
    label: "Logout",
    icon: <ArrowForwardIcon />,
    routeToRedirect: SCREEN_ROUTES.LOGIN,
    action: async () => {
      const logoutUseCase = makeLogoutUseCase();
      return await logoutUseCase.execute();
    },
  },
];
