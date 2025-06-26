async function postData(query, form) {
  const res = await fetch(`http://localhost:50000/${query}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form)
  });

  if (res.headers.get("Content-Type")?.includes("application/json")) {
    return await res.json();
  } else {
    return null;
  }
}

export default postData;