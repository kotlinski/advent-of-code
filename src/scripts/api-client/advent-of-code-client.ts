import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import filenamifyUrl from 'filenamify-url';
import HeadersInit = NodeJS.fetch.HeadersInit;

function getHeaders(): HeadersInit {
  const cookie_path = path.resolve(__dirname, './../../../cookie');
  const session_value = readFileSync(cookie_path)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, '');
  const cookie = `session=${session_value}`;
  return { cookie };
}

async function fetchUrl(url: string, skip_cache = false): Promise<string> {
  const cache_file = path.resolve(__dirname, `./cache/${filenamifyUrl(url)}`);
  if (existsSync(cache_file) && !skip_cache) {
    console.log(`Found cache: ${url}`);
    return readFileSync(cache_file).toString();
  }
  console.log(`Fetching data from: ${url}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  });
  const result_text = await result.text();
  writeFileSync(cache_file, result_text);
  return result_text;
}

export async function getTaskInputData(year: number, day: number): Promise<string> {
  return fetchUrl(`https://adventofcode.com/${year}/day/${day}/input`);
}
export async function getHtmlTaskDescription(year: number, day: number): Promise<string> {
  return fetchUrl(`https://adventofcode.com/${year}/day/${day}`, true);
}
