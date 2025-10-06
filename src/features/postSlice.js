import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, push, ref, remove, update } from "firebase/database";
import { db } from "../services/firebase";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  oldPosts: [],
  editedPost: null,
  deletedPost: null,
  loading: false,
};

export const fetchPosts = createAsyncThunk("get_posts", async () => {
  const postsRef = ref(db, "posts");
  const snapshot = await get(postsRef);

  if (snapshot.exists()) {
    let postsArray = Object.entries(snapshot.val()).map(([id, value]) => ({
      id,
      ...value,
    }));
    postsArray = postsArray.sort((a, b) => b.createdAt - a.createdAt);
    return postsArray;
  } else {
    return [];
  }
});

export const deletePost = createAsyncThunk("delete_post", async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await remove(ref(db, `posts/${id}`));
  return id;
});

export const updatePost = createAsyncThunk(
  "update_post",
  async ({ id, data }) => {
    await update(ref(db, "posts/" + id), {
      ...data,
      updatedAt: Date.now(),
    });
    return id;
  }
);

export const createPost = createAsyncThunk(
  "create_post",
  async ({ data, user }) => {
    const postsRef = ref(db, "posts");
    await push(postsRef, {
      title: data.title,
      description: data.description,
      image_url: data.image_url,
      author: user.displayName,
      createdAt: Date.now(),
    });
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.oldPosts = [...state.posts];
        let newPosts = [...state.posts];
        newPosts = newPosts.filter((el) => el.id != action.meta.arg);
        state.posts = newPosts;
        toast.success("Post deleted successfully");
      })
      .addCase(deletePost.rejected, (state) => {
        state.posts = [...state.oldPosts];
        toast.dismiss();
        toast.error("Failed to delete post");
      })
      .addCase(createPost.pending, (state, action) => {
        const { data, user } = action.meta.arg;
        const tempPost = {
          id: "temp-" + Date.now(),
          ...data,
          author: user.displayName,
          createdAt: Date.now(),
          isPending: true,
        };
        state.posts = [tempPost, ...state.posts];
        toast.success("Post added successfully!");
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log(action);
        toast.error("Error happened while adding post");
      })
      .addCase(updatePost.pending, () => {
        // state.oldPosts = [...state.posts];
        // const { id, data } = action.meta.arg;
        // const updated = {
        //   id,
        //   ...data,
        // };
        // state.posts = state.posts.map((post) =>
        //   post.id === updated.id ? { ...updated } : post
        // );
        toast.success("Post updated successfully!");
      })
      .addCase(updatePost.rejected, () => {
        // state.posts = [...state.oldPosts];
        toast.error("Error happened while updating post");
      });
  },
});

export default postSlice.reducer;
