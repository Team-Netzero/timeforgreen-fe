async function postData(query) {
  const response = await fetch("http://localhost:5500/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: `mutation { ${query} }`
    })
  });

  const result = await response.json();

  return result;
}

export default postData;