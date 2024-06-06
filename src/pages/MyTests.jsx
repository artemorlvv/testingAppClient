import React, { useEffect, useState } from "react";
import { authApi } from "../api";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const MyTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await authApi.get(
          "/api/test/my",
          {},
          { withCredentials: true },
        );
        setTests(res.data.tests);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const onShare = async (id) => {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + "/test/" + id,
      );
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <p className="text-xl">Мои тесты</p>
      <Link to={"/test/create"} className="self-start">
        <Button className={"flex w-full items-center gap-1"}>
          <span className="text-xl">+</span>Новый
        </Button>
      </Link>
      {tests.length ? (
        <div className="">
          <table className="border-collapse border border-neutral-400">
            <thead>
              <tr>
                <th className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                  id
                </th>
                <th className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                  Название
                </th>
                <th className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                  Ссылка
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                    {test.id}
                  </td>
                  <td className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                    {test.title}
                  </td>
                  <td className="border border-neutral-400 px-[0.8em] py-[0.4em]">
                    <Button onClick={() => onShare(test.id)}>
                      {copiedId === test.id ? "Скопировано" : "Поделиться"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default MyTests;
