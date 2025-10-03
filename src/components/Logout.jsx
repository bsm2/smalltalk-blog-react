import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <button
        onClick={handleSignOut}
        className=" bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:scale-103 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-sm"
      >
        Sign out
      </button>
    </>
  );
}
