import { useState, useEffect } from "react";

export function useTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/api/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { topics, loading, error };
}

function TopicList() {
  const { topics, loading, error } = useTopics();
  
  if (loading) return <p>It's running..</p>;
  if (error) return <p>Error {error}</p>;
  if (topics.length === 0) return <p>Not Found</p>;

  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.id}>
          <a href={topic.url}>{topic.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default TopicList;