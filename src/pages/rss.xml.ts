import { getCollection } from 'astro:content';

export async function GET() {
  const allAnswers = await getCollection('answers');
  const sortedAnswers = allAnswers.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const siteURL = new URL('https://spellbee.me');
  const latestDate = sortedAnswers[0]?.data.date || new Date();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SpellBeeMe - Daily Spelling Bee Answers</title>
    <link>${siteURL}</link>
    <atom:link href="${siteURL}rss.xml" rel="self" type="application/rss+xml" />
    <description>Daily answers for the NY Times Spelling Bee puzzle</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    ${sortedAnswers.map(answer => {
      const date = new Date(answer.data.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return `
    <item>
      <title>Spelling Bee Answer - ${formattedDate}</title>
      <link>${siteURL}answers/${answer.slug}</link>
      <guid>${siteURL}answers/${answer.slug}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description><![CDATA[
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Pangrams:</strong> ${answer.data.pangrams.length}</p>
        ${answer.data.pangrams.length > 0 ? `
        <p><strong>Found Pangrams:</strong></p>
        <ul>
          ${answer.data.pangrams.map((p: string) => `<li>${p}</li>`).join('\n          ')}
        </ul>
        ` : ''}
        <p><a href="${siteURL}answers/${answer.slug}">View full answer</a></p>
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
