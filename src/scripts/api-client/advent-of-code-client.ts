import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import filenamifyUrl from 'filenamify-url';
const dirname = import.meta.dirname;

function getHeaders(): Headers {
  const cookie_path = path.resolve(dirname, './../../../cookie');
  const session_value = readFileSync(cookie_path)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, '');
  const cookie = `session=${session_value}`;
  return new Headers({ cookie });
}

async function fetchUrl(url: string, skip_cache = false): Promise<string> {
  const cache_folder = path.resolve(dirname, `./cache`);
  const cache_file = `${cache_folder}/${filenamifyUrl(url)}`;
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
  mkdirSync(cache_folder, { recursive: true });
  writeFileSync(cache_file, result_text);
  return result_text;
}

export async function getTaskInputData(year: number, day: number): Promise<string> {
  return fetchUrl(`https://adventofcode.com/${year}/day/${day}/input`);
}
export async function getHtmlTaskDescription(year: number, day: number): Promise<string> {
  return fetchUrl(`https://adventofcode.com/${year}/day/${day}`);
}
