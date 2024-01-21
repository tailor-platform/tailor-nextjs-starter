"use client";

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  Portal,
} from "@ark-ui/react";
import { AppBar, Text } from "@tailor-platform/design-systems";
import { css } from "@tailor-platform/styled-system/css";
import { Flex, Box } from "@tailor-platform/styled-system/jsx";
import {
  appBar,
  appBarMenuTrigger,
  menu,
} from "@tailor-platform/styled-system/recipes";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {useUser} from "@tailor-platform/client";
import {useCallback} from "react";
import {useAuthUser} from "@/libs/google-firebase-client/firebase";

type HeaderProps = {
  title: string;
}

export const Header = ({title}: HeaderProps) => {
  const classes = appBar();
  const { signOut } = useAuthUser()
  const { dispatchUser, user } = useUser();
  const menuTrigger = appBarMenuTrigger();
  const handleLogout = useCallback( async () => {
    await dispatchUser({type: "delete"});
    await signOut();
  }, [dispatchUser, signOut])
  return (
    <Box bg="accent.fg" borderBottom="1px solid" borderColor="border.default">
      <AppBar bg="accent.fg" border="1px solid" borderColor="border.default">
        <Text className={classes.title}>{title}</Text>
        {(user && user.id !== '') &&
        <Menu>
          <MenuTrigger className={menuTrigger.root}>
            <Flex aria-label="Open" className={menuTrigger.content}>
              <Text>{user?.email}</Text>
              <ChevronDown />
            </Flex>
          </MenuTrigger>
          <Portal>
            <MenuPositioner className={menu()}>
              <MenuContent>
                <MenuItem id="profile" className={css({ color: "blue.600" })}>
                  <Link href={"/account"}>アカウント</Link>
                </MenuItem>
                <MenuItem id="logout" className={css({ color: "red.600" })} onClick={handleLogout}>
                  ログアウト
                </MenuItem>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </Menu>}
      </AppBar>
    </Box>
  );
};
