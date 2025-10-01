import { Link } from "react-router";

export default function Post(props) {
  const {post, user, handleDelete} = props;
  return (
    <div>
      <li className="mb-10 ms-4" key={post.id}>
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {new Date(post.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <div className="flex flex-col md:flex-row">
          <img
            src={post.image_url}
            alt="Sample"
            className="w-screen h-auto md:w-50 rounded-xl object-cover shadow-lg mt-5"
          />

          <div className="mt-3 md:mx-5 flex  flex-col">
            <h3 className="text-xl mb-2 font-bold text-gray-900 dark:text-white">
              {post.title}
            </h3>
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              {post.description}
            </p>

            <div className="mt-auto flex  items-center justify-between">
              <div className="flex items-center gap-3">
                {/* <img
                        src="https://imgproxy.fourthwall.com/kA9CnEOAxIrzy-JouR_mYba1h92uSjT2A6J1lEU3QHE/w:1920/sm:1/enc/ausUH5dzrMa3pl4d/p7NLtegFwqGKJNqc/VQh-fR-X_JgcB9iy/Et81tJnIxrM7enVV/c8LKjmsSg6kAPlWh/4Vxki8iKOjyNjcC5/xCLlQOr02cwAC8vH/D_JEBX31gp6Ks7p1/hiSWEFZXfw5hv9sf/sNV2di35GmS8rWzP/HSGB44Os-rx2ak9B/RNi40K8p0WC2P2LV/B0Iz5mwliO853JaW/uL9QZgOrSD4Dtn3O/9vP-_HZGA80"
                        alt="Author"
                        className="w-10 h-10 rounded-full object-cover border hover:scale-190"
                      />
                       */}
                <div className="self-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="0.3"
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>

                <span className="text-md font-semibold text-gray-600 dark:text-gray-300">
                  {post.author}
                </span>
              </div>

              {user?.displayName === post.author && (
                <div className="flex gap-2">
                  <Link
                    to={`posts/${post.id}`}
                    className="cursor-pointer hover:scale-150"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cursor-pointer hover:scale-150"
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
