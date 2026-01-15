import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside>
      <nav>
        <NavLink to="/manage-properties">Manage Properties</NavLink>
        <NavLink to="/blog">blog</NavLink>
      </nav>
    </aside>
  );
}
export default SideBar;
