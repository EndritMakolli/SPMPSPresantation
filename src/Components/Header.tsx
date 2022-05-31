import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../Style/Header.css";
import { Link } from "react-router-dom";
import { data, HeaderItem } from "./HeaderData";
import { ReactNode } from "react";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"; //student
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"; //academic
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined"; //admin

interface HeaderProps {
  role: string;
}

const checkForRole = (item: HeaderItem, role: string): boolean => {
  return item.roles.includes(role) || item.roles.includes("ALL");
};

export const Header = ({ role }: HeaderProps) => {
  const getHeaderIcon = () => {
    return role === "STUDENT" ? (
      <MenuBookOutlinedIcon />
    ) : role === "ACADEMIC" ? (
      <SchoolOutlinedIcon />
    ) : (
      <SupervisorAccountOutlinedIcon />
    );
  };

  const mapHeaderItems = (data: HeaderItem[]): ReactNode => {
    return data.map((headerItem) => {
      return headerItem.subItems ? (
        <CompositeMenu headerItem={headerItem} role={role} />
      ) : (
        <SingleMenu headerItem={headerItem} role={role} />
      );
    });
  };

  return (
    <ProSidebar>
      <SidebarHeader>
        <h2 id="header-title">
          {getHeaderIcon()}
          {role}
        </h2>
      </SidebarHeader>
      <SidebarContent>{mapHeaderItems(data)}</SidebarContent>
    </ProSidebar>
  );
};

interface MenuProps {
  headerItem: HeaderItem;
  role: string;
}

/**
 * A header item that has no subitems and stands alone.
 * @param headerItem The item to display
 * @param role The user's role, which is then used to conditionally render the item
 * @returns a Menu component, specifically an item in the header
 */

const SingleMenu = ({ headerItem, role }: MenuProps) => {
  return (
    <Menu iconShape="circle" key={headerItem.icon}>
      {checkForRole(headerItem, role) && (
        <MenuItem key={headerItem.title} icon={headerItem.icon}>
          <Link to={headerItem.linkTo}>{headerItem.title}</Link>
        </MenuItem>
      )}
    </Menu>
  );
};

/**
 * A header item that has subitems, a dropdown of sorts.
 * @param headerItem The item to display. Contains more header items which are then mapped accordingly
 * @param role The user's role, which is then used to conditionally render the item
 * @returns a Menu component that is collapsable and contains more items inside
 */

const CompositeMenu = ({ headerItem, role }: MenuProps) => {
  return (
    <Menu iconShape="circle">
      {checkForRole(headerItem, role) && (
        <SubMenu title={headerItem.title} icon={headerItem.icon}>
          {headerItem.subItems?.map((subItem) => {
            return (
              checkForRole(subItem, role) && (
                <MenuItem key={subItem.title} icon={subItem.icon}>
                  <Link to={subItem.linkTo}>{subItem.title}</Link>
                </MenuItem>
              )
            );
          })}
        </SubMenu>
      )}
    </Menu>
  );
};
