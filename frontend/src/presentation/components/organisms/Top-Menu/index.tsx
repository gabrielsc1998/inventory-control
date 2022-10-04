import { useRouter } from "next/router";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";

import * as S from "./styles";
import { MenuItems } from "./Items";

const TopMenu = (): JSX.Element => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={S.MenuButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {MenuItems.map(({ label, icon, routeToRedirect }, index) => (
          <MenuItem
            key={`${label.toLowerCase()}-key-${index}`}
            onClick={() => {
              if (routeToRedirect) {
                return router.replace(routeToRedirect);
              }
            }}
            icon={icon}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TopMenu;
