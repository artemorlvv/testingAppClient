import React, { useEffect, useState } from "react";
import { authApi } from "../api";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const TestStats = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await authApi.get("/api/test/stats/" + id, {
        withCredentials: true,
      });
      setStats(res.data.stats);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading)
    return (
      <div className="flex grow items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex h-min flex-wrap gap-2">
      {stats && stats.length > 0 ? (
        <>
          {stats.map((stat, index) => (
            <div className="flex w-full max-w-[49%] flex-col gap-2 rounded-sm border px-4 py-2">
              <p>{`Задача №${index + 1}`}</p>
              <p className="border-b pb-2">{stat.questionText}</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <p>{`Правильных ответов: ${stat.correctCount}`}</p>
                  <div
                    className="h-6 bg-green-400"
                    style={{
                      width: `${(stat.correctCount / (stat.incorrectCount + stat.correctCount)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="h-6 w-full bg-red-400"
                    style={{
                      width: `${(stat.incorrectCount / (stat.incorrectCount + stat.correctCount)) * 100}%`,
                    }}
                  />
                  <p>{`Не правильных ответов: ${stat.incorrectCount}`}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Статистика не найдена</div>
      )}
    </div>
  );
};

export default TestStats;
