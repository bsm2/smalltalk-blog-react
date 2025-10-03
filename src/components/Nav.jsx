import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Logout from "./Logout";

export default function Nav() {
  const { user } = useAuth();
  return (
    <>
      <div className="navbar fixed top-0 w-full z-50 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="navbar-start">
          <Link
            to={"/"}
            className="ml-6 font-extrabold font-serif text-2xl tracking-tight bg-gradient-to-l from-gray-700 via-gray-600 to-gray-400 text-transparent bg-clip-text hover:text-gray-400 hover:bg-none hover:bg-clip-border transition-colors duration-300"
          >
            SmallTalk
          </Link>
        </div>

        <div className="navbar-end mx-2">
          {!user && (
            <Link
              to={"/login"}
              className="btn bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:scale-95 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl"
            >
              Sign in
            </Link>
          )}

          {user && (
            <div className="flex flex-row items-center gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded-xl z-10 mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <li>
                    <p className="mb-2 cursor-default hover:none ">
                      {"Hi, " + user?.displayName}
                    </p>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
              <p className="text-md text-gray-600 dark:text-gray-300 whitespace-nowrap hidden md:block">
                {user.displayName}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
