import { parse } from 'node-html-parser';

export function parseProblemDescription(html: string): string {
  const parsed_html = parse(html);
  const articles = parsed_html.querySelectorAll('.day-desc');
  return articles.reduce((output, article) => {
    output += article.toString();
    return output;
  }, '');
}

export function pascalName(verbose_header: string) {
  const words_in_header = verbose_header
    .split(':')[1]
    .split('-')[0]
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1));
  return words_in_header.join('');
}

export function parseSolverName(html: string): string {
  const task_description = parseProblemDescription(html);
  const parsed_html = parse(task_description);
  return parsed_html.getElementsByTagName('h2')[0].toString();
}
