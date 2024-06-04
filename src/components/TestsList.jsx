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
    <div className="m-2 flex flex-col gap-2">
      {tests.map((test) => (
        <Link
          to={"test/" + test.id}
          key={test.id}
          className="text-blue-600 hover:underline"
        >
          {test.title}
        </Link>
      ))}
    </div>
  );
};

export default TestsList;
