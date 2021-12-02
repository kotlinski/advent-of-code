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

export async function fetchInputData(day: number): Promise<string> {
  const result = await fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return result.text();
}
