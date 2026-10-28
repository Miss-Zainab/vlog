const API = "http://localhost:5000/api/blogs";

const handle = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const getBlogs = (search = "") =>
  fetch(`${API}?search=${encodeURIComponent(search)}`).then(handle);

export const getBlog = (id) => fetch(`${API}/${id}`).then(handle);

export const createBlog = (blog) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  }).then(handle);

export const updateBlog = (id, blog) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  }).then(handle);

export const deleteBlog = (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" }).then(handle);
