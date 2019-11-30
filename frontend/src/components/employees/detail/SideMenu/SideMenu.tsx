import React from 'react';

import { Panel, Flex } from '../../../shared/layout';
import { Menu, MenuItem, MenuLink } from '../../../shared/layout/Panel/modules/Menu';
import { ActiveLink } from '../../../shared/misc';

/* Props - <SideMenu />
============================================================================= */
type Props = {
  employee?: any;
};

/* <SideMenu />
============================================================================= */
const SideMenu: React.FunctionComponent<Props> = ({ employee }) => {
  if (employee) {
    return (
      <Flex flexDirection="column">
        <Panel title="Základné údaje" isPadded={false} mb="s6">
          <Menu>
            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/personal`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Osobné informácie</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/company`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Firemné informácie</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/permanent_address`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Trvalá adresa</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/subsidiary_address`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Prechodná adresa</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/contact`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Kontakt</MenuLink>}
              </ActiveLink>
            </MenuItem>
          </Menu>
        </Panel>

        <Panel title="Mzdové údaje" isPadded={false}>
          <Menu>
            <MenuItem>
              <ActiveLink
                href="/employees/[id]/wage/[formType]"
                as={`/employees/${employee?.id}/wage/employment`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Pracovný pomer</MenuLink>}
              </ActiveLink>
            </MenuItem>
          </Menu>
        </Panel>
      </Flex>
    );
  } else {
    return (
      <Panel title="Základné údaje" isPadded={false} mb="s6">
        <Menu>
          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/personal`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Osobné informácie</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/company`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Firemné informácie</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/permanent_address`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Trvalá adresa</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/subsidiary_address`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Prechodná adresa</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/contact`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Kontakt</MenuLink>}
            </ActiveLink>
          </MenuItem>
        </Menu>
      </Panel>
    );
  }
};

export default SideMenu;
