import { mockAdventHtml } from './html-helper';
import { parseProblemDescription, parseSolverName, pascalName } from '../html-parser';

describe('html-parser', () => {
  describe('pascalName', () => {
    type TestCase = { input: string; output: string };
    const cases: TestCase[] = [
      { input: '--- Day 8: Treetop Tree House ---', output: 'TreetopTreeHouse' },
      { input: '--- Day 9: Rope Bridge ---', output: 'RopeBridge' },
      { input: '--- Day 25: Sea Cucumber ---', output: 'SeaCucumber' },
      { input: '--- Day 1: Not Quite Lisp ---', output: 'NotQuiteLisp' },
      { input: '--- Day 1: The Tyranny of the Rocket Equation ---\n', output: 'TheTyrannyOfTheRocketEquation' },
    ];
    describe.each(cases)('$description', ({ input, output }: TestCase) => {
      it('should format to PascalCase', () => {
        const result = pascalName(input);
        expect(result).toEqual(output);
      });
    });
  });
  describe('parseSolverName', () => {
    let html: string;
    beforeAll(() => {
      html = mockAdventHtml();
    });
    it('should format the task name', () => {
      expect(parseSolverName(html)).toEqual('RopeBridge');
    });
  });
  describe('parseProblemDescription', () => {
    let html: string;
    beforeAll(() => {
      html = mockAdventHtml();
    });
    it('should keep the "articles", and skip the rest', () => {
      expect(parseProblemDescription(html)).toEqual(
        '<article class="day-desc"><h2>--- Day 9: Rope Bridge ---</h2><p>This rope bridge creaks as you walk along it. You aren\'t sure how old it is, or whether it can even support your weight.</p>\n' +
          '<p>It seems to support the Elves just fine, though. The bridge spans a gorge which was carved out by the massive river far below you.</p>\n' +
          '<p>You step carefully; as you do, the ropes stretch and twist. You decide to distract yourself by modeling rope physics; maybe you can even figure out where <em>not</em> to step.</p>\n' +
          '<p>Consider a rope with a knot at each end; these knots mark the <em>head</em> and the <em>tail</em> of the rope. If the head moves far enough away from the tail, the tail is pulled toward the head.</p>\n' +
          '<p>Due to nebulous reasoning involving <a href="https://en.wikipedia.org/wiki/Planck_units#Planck_length" target="_blank">Planck lengths</a>, you should be able to model the positions of the knots on a two-dimensional grid. Then, by following a hypothetical <em>series of motions</em> (your puzzle input) for the head, you can determine how the tail will move.</p>\n' +
          '<p><span title="I\'m an engineer, not a physicist!">Due to the aforementioned Planck lengths</span>, the rope must be quite short; in fact, the head (<code>H</code>) and tail (<code>T</code>) must <em>always be touching</em> (diagonally adjacent and even overlapping both count as touching):</p>\n' +
          '<pre><code>....\n' +
          '.TH.\n' +
          '....\n' +
          '\n' +
          '....\n' +
          '.H..\n' +
          '..T.\n' +
          '....\n' +
          '\n' +
          '...\n' +
          '.H. (H covers T)\n' +
          '...\n' +
          '</code></pre>\n' +
          '<p>If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough:</p>\n' +
          '<pre><code>.....    .....    .....\n' +
          '.TH.. -&gt; .T.H. -&gt; ..TH.\n' +
          '.....    .....    .....\n' +
          '\n' +
          '...    ...    ...\n' +
          '.T.    .T.    ...\n' +
          '.H. -&gt; ... -&gt; .T.\n' +
          '...    .H.    .H.\n' +
          '...    ...    ...\n' +
          '</code></pre>\n' +
          "<p>Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:</p>\n" +
          '<pre><code>.....    .....    .....\n' +
          '.....    ..H..    ..H..\n' +
          '..H.. -&gt; ..... -&gt; ..T..\n' +
          '.T...    .T...    .....\n' +
          '.....    .....    .....\n' +
          '\n' +
          '.....    .....    .....\n' +
          '.....    .....    .....\n' +
          '..H.. -&gt; ...H. -&gt; ..TH.\n' +
          '.T...    .T...    .....\n' +
          '.....    .....    .....\n' +
          '</code></pre>\n' +
          '<p>You just need to work out where the tail goes as the head follows a series of motions. Assume the head and the tail both start at the same position, overlapping.</p>\n' +
          '<p>For example:</p>\n' +
          '<pre><code>R 4\n' +
          'U 4\n' +
          'L 3\n' +
          'D 1\n' +
          'R 4\n' +
          'D 1\n' +
          'L 5\n' +
          'R 2\n' +
          '</code></pre>\n' +
          "<p>This series of motions moves the head <em>right</em> four steps, then <em>up</em> four steps, then <em>left</em> three steps, then <em>down</em> one step, and so on. After each step, you'll need to update the position of the tail if the step means the head is no longer adjacent to the tail. Visually, these motions occur as follows (<code>s</code> marks the starting position as a reference point):</p>\n" +
          '<pre><code>== Initial State ==\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          'H.....  (H covers T, s)\n' +
          '\n' +
          '== R 4 ==\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          'TH....  (T covers s)\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          'sTH...\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          's.TH..\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          's..TH.\n' +
          '\n' +
          '== U 4 ==\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          '....H.\n' +
          's..T..\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '....H.\n' +
          '....T.\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '....H.\n' +
          '....T.\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '....H.\n' +
          '....T.\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== L 3 ==\n' +
          '\n' +
          '...H..\n' +
          '....T.\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '..HT..\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '.HT...\n' +
          '......\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== D 1 ==\n' +
          '\n' +
          '..T...\n' +
          '.H....\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== R 4 ==\n' +
          '\n' +
          '..T...\n' +
          '..H...\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '..T...\n' +
          '...H..\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '...TH.\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '....TH\n' +
          '......\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== D 1 ==\n' +
          '\n' +
          '......\n' +
          '....T.\n' +
          '.....H\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== L 5 ==\n' +
          '\n' +
          '......\n' +
          '....T.\n' +
          '....H.\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '....T.\n' +
          '...H..\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '..HT..\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '.HT...\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '......\n' +
          'HT....\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '== R 2 ==\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '.H....  (H covers T)\n' +
          '......\n' +
          's.....\n' +
          '\n' +
          '......\n' +
          '......\n' +
          '.TH...\n' +
          '......\n' +
          's.....\n' +
          '</code></pre>\n' +
          '<p>After simulating the rope, you can count up all of the positions the <em>tail visited at least once</em>. In this diagram, <code>s</code> again marks the starting position (which the tail also visited) and <code>#</code> marks other positions the tail visited:</p>\n' +
          '<pre><code>..##..\n' +
          '...##.\n' +
          '.####.\n' +
          '....#.\n' +
          's###..\n' +
          '</code></pre>\n' +
          '<p>So, there are <code><em>13</em></code> positions the tail visited at least once.</p>\n' +
          '<p>Simulate your complete hypothetical series of motions. <em>How many positions does the tail of the rope visit at least once?</em></p>\n' +
          '</article>',
      );
    });
  });
});
