import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { db } from "../services/firebase";
import { ref as dbRef, push, get, update } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function PostForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadType, setUploadType] = useState("url");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setLoadingPrev(true);
    setIsInvalid(false);
    const file = e.target.files?.length > 0 ? e.target.files[0] : null;
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else if (e.target.value) {
      setPreview(e.target.value);
    } else {
      setPreview(null);
    }
    setLoadingPrev(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await get(dbRef(db, "posts/" + id));
        if (res.exists()) {
          setLoadingPrev(true);
          const post = res.val();
          reset(post);
          setPreview(post.image_url);
          setLoadingPrev(false);
        }
      } catch (err) {
        toast.error("Failed to load post");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (uploadType == "upload") {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        const resData = await res.json();
        data.image_url = resData.data.url;
      }

      if (id) {
        await update(dbRef(db, "posts/" + id), {
          ...data,
          updatedAt: Date.now(),
        });
        toast.success("Post Updated successfully!");
      } else {
        const postsRef = dbRef(db, "posts");
        await push(postsRef, {
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          author: user.displayName,
          createdAt: Date.now(),
        });
        toast.success("Post added successfully!");
      }

      navigate("/");
    } catch (err) {
      toast.error("Error happened");
      console.log(err);
    }
  };

  const handelInvalid = () => {
    setIsInvalid(true);
    setLoadingPrev(false);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="relative top-10 m-10 mb-20 space-y-6 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
          >
            Title
          </label>
          <input
            {...register("title", {
              required: true,
              minLength: 5,
              maxLength: 50,
            })}
            aria-invalid={errors.title ? "true" : "false"}
            type="text"
            id="title"
            placeholder="Enter title..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-900 
                     text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {errors.title?.type === "required" && (
            <Error message={"Title is required"} />
          )}
          {errors.title?.type === "minLength" && (
            <Error message={"Title must be 5 chars or more"} />
          )}
          {errors.title?.type === "maxLength" && (
            <Error message={"Title must be less than 25 chars"} />
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: true,
              minLength: 10,
              maxLength: 700,
            })}
            aria-invalid={errors.description ? "true" : "false"}
            id="description"
            placeholder="Write your content here..."
            rows="5"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-900 
                     text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
          {errors.description?.type === "required" && (
            <Error message={"Description is required"} />
          )}
          {errors.description?.type === "minLength" && (
            <Error message={"Description must be 10 chars or more"} />
          )}
          {errors.description?.type === "maxLength" && (
            <Error message={"Description must be less than 200 chars"} />
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            URL
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary bg-gray-600 dark:bg-gray-800"
            checked={uploadType === "upload"}
            onChange={(e) => setUploadType(e.target.checked ? "upload" : "url")}
          />
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Upload
          </span>
        </div>

        {uploadType == "url" && (
          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Image URL
            </label>
            <input
              {...register("image_url", {
                required: uploadType !== "url" ? false : true,
                pattern: {
                  value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                  message: "Invalid URL format",
                },
              })}
              aria-invalid={errors.image_url ? "true" : "false"}
              type="text"
              id="image_url"
              placeholder="Enter Image URL..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-900 
                     text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onChange={(e) => {
                handleImageChange(e);
                register("image_url").onChange(e);
              }}
            />
            {errors.image_url?.type === "required" && (
              <Error message={"Image URL is required"} />
            )}
            {errors.image_url?.type === "pattern" && (
              <Error message={errors.image_url?.message} />
            )}
          </div>
        )}
        {uploadType == "upload" && (
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
               bg-gray-50 dark:bg-gray-900
               text-gray-900 dark:text-gray-100 
               file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 
               file:text-sm file:font-semibold 
               file:bg-blue-600 file:text-white 
               hover:file:bg-blue-700 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              {...register("image", {
                required: !id && uploadType === "upload" ? true : false,
              })}
              onChange={(e) => {
                handleImageChange(e);
                register("image").onChange(e);
              }}
            />
            {errors.image?.type == "required" && (
              <Error message={"Image is required"} />
            )}
          </div>
        )}

        <div className="mt-4 flex justify-center items-center">
          {loadingPrev && (
            <span className="loading loading-spinner loading-xs mt-20"></span>
          )}
          {isInvalid && (
            <div className="flex items-center">
              <img
                src="/2932881-200.png"
                alt="Invalid"
                className="w-50 h-50 object-cover"
              />
              <span className="text-black font-medium">Invalid image</span>
            </div>
          )}
          {!loadingPrev && !isInvalid && preview && (
            <img
              onError={handelInvalid}
              onLoad={() => setLoadingPrev(false)}
              src={preview}
              alt="Preview"
              className="w-auto h-100 object-cover rounded-xl border border-gray-300 dark:border-gray-700 shadow-md"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          {!id && (
            <button
              onClick={() => {
                setPreview(null);
                setIsInvalid(false);
                setLoadingPrev(false);
              }}
              type="reset"
              className="btn px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 
                text-gray-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className={`btn px-6 py-2 rounded-2xl font-semibold shadow-md transition-transform 
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white"
                    }`}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : !id ? (
              "Post"
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
