import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside>
      <nav>
        <NavLink to="/manage"></NavLink>
      </nav>
    </aside>
  );
}
export default SideBar;
