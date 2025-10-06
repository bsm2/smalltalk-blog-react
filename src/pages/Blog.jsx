import { useEffect, useState } from "react";
import { Link } from "react-router";
import { confirmToast } from "../components/ConfirmToast";
import Skeleton from "../components/Skeleton";
import { useAuth } from "../hooks/useAuth";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "../features/postSlice";

export default function Blog() {
  const itemsCount = 12;
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { loading, posts } = useSelector((state) => state.data);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(posts.length / itemsCount);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  let start = (currentPage - 1) * itemsCount;
  let end = start + itemsCount;
  let paginatedData = posts.slice(start, end);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    confirmToast("Are you sure you want to delete this post?", async () => {
      console.log(id);
      dispatch(deletePost(id));
    });
  };

  const changePage = (p) => {
    setCurrentPage(p);
  };

  if (loading) {
    return <Skeleton />;
  }

  if (paginatedData.length == 0) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center mt-45 px-4">
        <img
          className="max-w-full h-auto object-contain"
          src="/No-Posts--Streamline-Bruxelles.png"
          alt="Empty state"
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-10 md:pt-5 md:m-7 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ol className="relative border-s border-gray-300 dark:border-gray-700 m-10">
          {paginatedData.map((el) => (
            <Post
              key={el.id}
              post={el}
              user={user}
              handleDelete={handleDelete}
            />
          ))}
        </ol>
      </div>
      <div className="flex my-5 justify-center items-center flex-column flex-wrap md:flex-row pt-4">
        {pages.length > 1 && (
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 ">
            <li className="px-3">
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="flex hover:scale-120 items-center justify-center disabled:hover:cursor-auto disabled:hover:scale-100 cursor-pointer disabled:hover:bg-gray-400 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:text-gray-600 px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
              </button>
            </li>
            {pages.map((p) => (
              <li key={p} className="mx-1.5">
                <button
                  key={p}
                  onClick={() => changePage(p)}
                  className={`hover:scale-120 flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                    ${
                      currentPage == p
                        ? "bg-gray-300 dark:bg-gray-700 "
                        : "bg-white dark:bg-gray-800"
                    } dark:hover:text-white`}
                >
                  {p}
                </button>
              </li>
            ))}
            <li className="px-3">
              <button
                disabled={currentPage === pages.length}
                onClick={() => changePage(currentPage + 1)}
                className="flex hover:scale-120  items-center justify-center disabled:hover:cursor-auto cursor-pointer disabled:hover:bg-gray-400 disabled:bg-gray-400 disabled:text-gray-600 disabled:hover:text-gray-600 disabled:hover:scale-100 px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        )}
      </div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center
               bg-gray-800 text-white shadow-lg
               hover:scale-110 hover:bg-gray-700 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {user && (
        <Link
          to="/posts/create"
          className="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center
                 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                 shadow-lg border border-white dark:border-gray-900
                 hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      )}
    </>
  );
}
