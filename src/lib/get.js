async function getData(query) {
  const res = await fetch(`http://localhost:50000/${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const result = await res.json();

  return result;
}

export default getData;