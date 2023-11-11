import * as fs from 'fs';
import fetch, { HeadersInit } from 'node-fetch';

function getHeaders(): HeadersInit {
  const session_value = fs
    .readFileSync(`${__dirname}/../../cookie`)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, '');
  const cookie = `session=${session_value}`;
  return { cookie };
}

export async function fetchTaskInputData(year: number, day: number): Promise<string> {
  const result = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    method: 'GET',
    headers: getHeaders(),
  });
  console.log(`https://adventofcode.com/${year}/day/${day}/input`);
  const text = await result.text();
  console.log(`result.text(): ${JSON.stringify(text, null, 2)}`);
  return text;
}
