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
          <ActiveLink href="/employees/[id]/other" passHref>
            {isActive => <MenuLink isActive={isActive}>Ostatné</MenuLink>}
          </ActiveLink>
        </MenuItem>
      </Menu>
    </Panel>
  );
};

export default SideMenu;
