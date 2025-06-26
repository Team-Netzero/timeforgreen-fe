async function getData(query) {
  const res = await fetch("http://localhost:5500/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: `query { ${query} }`
    })
  });

  const result = await res.json();

  if (result.errors) {
    console.error("GraphQL Error:", result.errors);
    throw new Error(result.errors[0]?.message || "GraphQL request failed");
  }

  return result.data;
}

export default getData;