export function mockAdventHtml(): string {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en-us">\n' +
    '<head>\n' +
    '<meta charset="utf-8"/>\n' +
    '<title>Day 9 - Advent of Code 2022</title>\n' +
    '<link rel="stylesheet" type="text/css" href="/static/style.css?31"/>\n' +
    '<link rel="stylesheet alternate" type="text/css" href="/static/highcontrast.css?1" title="High Contrast"/>\n' +
    '<link rel="shortcut icon" href="/favicon.png"/>\n' +
    "<script>window.addEventListener('click', function(e,s,r){if(e.target.nodeName==='CODE'&&e.detail===3){s=window.getSelection();s.removeAllRanges();r=document.createRange();r.selectNodeContents(e.target);s.addRange(r);}});</script>\n" +
    '</head>' +
    '<body>\n' +
    '<header><div><h1 class="title-global"><a href="/">Advent of Code</a></h1><nav><ul><li><a href="/2022/about">[About]</a></li><li><a href="/2022/events">[Events]</a></li><li><a href="https://teespring.com/stores/advent-of-code" target="_blank">[Shop]</a></li><li><a href="/2022/settings">[Settings]</a></li><li><a href="/2022/auth/logout">[Log Out]</a></li></ul></nav><div class="user">kotlinski <span class="star-count">16*</span></div></div><div><h1 class="title-event">&nbsp;&nbsp;&nbsp;<span class="title-event-wrap">0xffff&amp;</span><a href="/2022">2022</a><span class="title-event-wrap"></span></h1><nav><ul><li><a href="/2022">[Calendar]</a></li><li><a href="/2022/support">[AoC++]</a></li><li><a href="/2022/sponsors">[Sponsors]</a></li><li><a href="/2022/leaderboard">[Leaderboard]</a></li><li><a href="/2022/stats">[Stats]</a></li></ul></nav></div></header>\n' +
    '\n' +
    '<div id="sidebar">\n' +
    '<div id="sponsor"><div class="quiet">Our <a href="/2022/sponsors">sponsors</a> help make Advent of Code possible:</div><div class="sponsor"><a href="https://www.assured.se/careers" target="_blank" onclick="if(ga)ga(\'send\',\'event\',\'sponsor\',\'sidebar\',this.href);" rel="noopener">Assured</a> - Från chip till skepp, bitar till bilar. Vi testar din säkerhet, vi säkrar din kod. Your career Assured.</div></div>\n' +
    '</div><!--/sidebar-->\n' +
    '\n' +
    '<main>\n' +
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
    '</article>\n' +
    '<p>To begin, <a href="9/input" target="_blank">get your puzzle input</a>.</p>\n' +
    '<form method="post" action="9/answer"><input type="hidden" name="level" value="1"/><p>Answer: <input type="text" name="answer" autocomplete="off"/> <input type="submit" value="[Submit]"/></p></form>\n' +
    '<p>You can also <span class="share">[Share<span class="share-content">on\n' +
    '  <a href="https://twitter.com/intent/tweet?text=%22Rope+Bridge%22+%2D+Day+9+%2D+Advent+of+Code+2022&amp;url=https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F9&amp;related=ericwastl&amp;hashtags=AdventOfCode" target="_blank">Twitter</a>\n' +
    "  <a href=\"javascript:void(0);\" onclick=\"var ms; try{ms=localStorage.getItem('mastodon.server')}finally{} if(typeof ms!=='string')ms=''; ms=prompt('Mastodon Server?',ms); if(typeof ms==='string' && ms.length){this.href='https://'+ms+'/share?text=%22Rope+Bridge%22+%2D+Day+9+%2D+Advent+of+Code+2022+%23AdventOfCode+https%3A%2F%2Fadventofcode%2Ecom%2F2022%2Fday%2F9';try{localStorage.setItem('mastodon.server',ms);}finally{}}else{return false;}\" target=\"_blank\">Mastodon</a\n" +
    '></span>]</span> this puzzle.</p>\n' +
    '</main>\n' +
    '\n' +
    '<!-- ga -->\n' +
    '<script>\n' +
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
    '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
    'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n" +
    "ga('create', 'UA-69522494-1', 'auto');\n" +
    "ga('set', 'anonymizeIp', true);\n" +
    "ga('send', 'pageview');\n" +
    '</script>\n' +
    '<!-- /ga -->\n' +
    '</body>\n' +
    '</html>\n'
  );
}
