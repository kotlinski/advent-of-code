import parse from 'node-html-parser';

export function parseProblemDescription(html: string): string {
  const parsed_html = parse(html);

  const articles = parsed_html.getElementsByTagName('article');
  return articles.reduce((output, article) => {
    output += article;
    return output;
  }, '');
}

export function pascalName(verbose_header: string) {
  return verbose_header.replaceAll(' ', '').split(':')[1].split('-')[0];
}

export function parseSolverName(html: string): string {
  const task_description = parseProblemDescription(html);
  const parsed_html = parse(task_description);
  const verbose_header = parsed_html.getElementsByTagName('h2')[0].toString();
  return pascalName(verbose_header);
}
