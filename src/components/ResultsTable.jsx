import React from "react";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import Th from "./Th";
import Td from "./Td";
import Button from "../ui/Button";
import sortDescImg from "../assets/sort_desc.svg";
import sortAscImg from "../assets/sort_asc.svg";

const ResultsTable = (props) => {
  return (
    <table className="min-w-full table-fixed">
      <thead>
        <tr>
          <Th>Логин</Th>
          <Th>Имя</Th>
          <Th>Фамилия</Th>
          <Th className="min-w-[270px]">
            <div className="flex justify-center">
              <Button
                className={
                  "flex gap-2 rounded-sm bg-neutral-200 text-black hover:bg-neutral-300"
                }
                onClick={props.onScoreClick}
              >
                <span>Правильных ответов</span>
                {props.scoreOrder !== "" && (
                  <img
                    src={props.scoreOrder === "DESC" ? sortDescImg : sortAscImg}
                  />
                )}
              </Button>
            </div>
          </Th>
          <Th className="min-w-[185px]">
            <div className="flex justify-center">
              <Button
                className={
                  "flex gap-2 rounded-sm bg-neutral-200 text-black hover:bg-neutral-300"
                }
                onClick={props.onDateClick}
              >
                <span>Дата</span>
                {props.dateOrder !== "" && (
                  <img
                    src={props.dateOrder === "DESC" ? sortDescImg : sortAscImg}
                  />
                )}
              </Button>
            </div>
          </Th>
          <Th>Подробнее</Th>
        </tr>
      </thead>
      <tbody>
        {props.results.map((result, index) => (
          <tr key={index}>
            <Td>{result.login}</Td>
            <Td>{result.firstName}</Td>
            <Td>{result.secondName}</Td>
            <Td>{result.score}</Td>
            <Td>{formatDate(result.passedAt)}</Td>
            <Td>
              {
                <Link
                  className="text-blue-500 hover:underline"
                  to={"/test/result/" + result.resultId}
                >
                  Перейти
                </Link>
              }
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
