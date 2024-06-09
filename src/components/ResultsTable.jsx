import React from "react";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import Th from "./Th";
import Td from "./Td";

const ResultsTable = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <Th>Логин</Th>
          <Th>Имя</Th>
          <Th>Фамилия</Th>
          <Th>Правильных ответов</Th>
          <Th>Дата</Th>
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
