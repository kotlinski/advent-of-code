import { readFileSync } from 'fs';
import path from 'path';
import HeadersInit = NodeJS.fetch.HeadersInit;

function getHeaders(): HeadersInit {
  const cookie_path = path.resolve(__dirname, './../../../cookie');
  const session_value = readFileSync(cookie_path)
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
  return result.text();
}
export async function fetchHtmlTaskDescription(year: number, day: number): Promise<string> {
  const result = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  console.log(`https://adventofcode.com/${year}/day/${day}`);

  return result.text();
}
