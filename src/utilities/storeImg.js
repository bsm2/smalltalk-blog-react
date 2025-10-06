export default async function storeImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const resData = await res.json();
  return resData.data.url;
}
