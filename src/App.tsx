import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/status/metro")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>WMATA Status FE</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

export default App;
