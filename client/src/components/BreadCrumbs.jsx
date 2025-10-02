import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
const BreadCrumb = ({ name, category }) => {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:productId/:name", breadcrumb: name },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <nav>
      {breadcrumbs.map(
        ({ match, breadcrumb }, index) =>
          match.route && (
            <span className="text-sm capitalize" key={match.pathname}>
              <NavLink
                to={match.pathname}
                end
                className={({ isActive }) =>
                  isActive ? "text-[#505050] cursor-default" : "hover:text-main"
                }
              >
                {breadcrumb}
              </NavLink>
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          )
      )}
    </nav>
  );
};

export default BreadCrumb;
