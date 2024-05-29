import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../api";

const TestsList = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    const fetchTests = async () => {
      const res = await authApi.get("/api/test");
      setTests(res.data);
    };
    fetchTests();
  }, []);
  return (
    <div>
      {tests.map((test) => (
        <Link to={"test/" + test.id}>{test.title}</Link>
      ))}
    </div>
  );
};

export default TestsList;
