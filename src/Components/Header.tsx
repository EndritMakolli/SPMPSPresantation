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
import { data } from "./HeaderData";

interface HeaderProps {
  role: string;
}

export const Header = ({ role }: HeaderProps) => {
  return (
    <ProSidebar>
      <SidebarHeader>
        <h2 id="header-title">STUDENT</h2>
      </SidebarHeader>
      <SidebarContent>
        {data.map((headerItem) => {
          return (
            <Menu iconShape="circle">
              {headerItem.role === role ||
                (headerItem.role === "ALL" && (
                  <SubMenu title={headerItem.title} icon={headerItem.icon}>
                    {headerItem.subItems?.map((subItem) => {
                      return (
                        <MenuItem icon={subItem.icon}>
                          <Link to={subItem.linkTo}>{subItem.title}</Link>
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                ))}
            </Menu>
          );
        })}
      </SidebarContent>
    </ProSidebar>
  );
};
