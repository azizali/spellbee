import { getCollection } from 'astro:content';

export async function GET() {
  const allSolutions = await getCollection('solutions');
  const sortedSolutions = allSolutions.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const siteURL = new URL('https://spellbeeme.com');
  const latestDate = sortedSolutions[0]?.data.date || new Date();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SpellBeeMe - Daily Spelling Bee Solutions</title>
    <link>${siteURL}</link>
    <atom:link href="${siteURL}rss.xml" rel="self" type="application/rss+xml" />
    <description>Daily solutions for the NY Times Spelling Bee puzzle</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    ${sortedSolutions.map(solution => {
      const date = new Date(solution.data.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return `
    <item>
      <title>Spelling Bee Solution - ${formattedDate}</title>
      <link>${siteURL}solutions/${solution.slug}</link>
      <guid>${siteURL}solutions/${solution.slug}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description><![CDATA[
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Pangrams:</strong> ${solution.data.pangrams.length}</p>
        ${solution.data.pangrams.length > 0 ? `
        <p><strong>Found Pangrams:</strong></p>
        <ul>
          ${solution.data.pangrams.map((p: string) => `<li>${p}</li>`).join('\n          ')}
        </ul>
        ` : ''}
        <p><a href="${siteURL}solutions/${solution.slug}">View full solution</a></p>
      ]]></description>
    </item>
      `;
    }).join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
