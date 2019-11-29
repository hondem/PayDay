import React from 'react';

import { Panel } from '../../../shared/layout';
import { Menu, MenuItem, MenuLink } from '../../../shared/layout/Panel/modules/Menu';
import { ActiveLink } from '../../../shared/misc';

/* <SideMenu />
============================================================================= */
const SideMenu: React.FunctionComponent = () => {
  return (
    <Panel title="Úprava profilu" isPadded={false}>
      <Menu>
        <MenuItem>
          <ActiveLink href="/employees/[id]" passHref>
            {isActive => <MenuLink isActive={isActive}>Osobné informácie</MenuLink>}
          </ActiveLink>
        </MenuItem>

        <MenuItem>
          <ActiveLink href="/employees/[id]/professional" passHref>
            {isActive => <MenuLink isActive={isActive}>Firemné informácie</MenuLink>}
          </ActiveLink>
        </MenuItem>

        <MenuItem>
          <ActiveLink href="/employees/[id]/contact" passHref>
            {isActive => <MenuLink isActive={isActive}>Kontakt</MenuLink>}
          </ActiveLink>
        </MenuItem>

        <MenuItem>
          <ActiveLink href="/employees/[id]/permanentaddress" passHref>
            {isActive => <MenuLink isActive={isActive}>Trvalá adresa</MenuLink>}
          </ActiveLink>
        </MenuItem>

        <MenuItem>
          <ActiveLink href="/employees/[id]/subsidiaryaddress" passHref>
            {isActive => <MenuLink isActive={isActive}>Prechodná adresa</MenuLink>}
          </ActiveLink>
        </MenuItem>
      </Menu>
    </Panel>
  );
};

export default SideMenu;
