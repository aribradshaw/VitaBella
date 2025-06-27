const fs = require('fs');
const { parseStringPromise } = require('xml2js');

const xml = fs.readFileSync('src/app/blog/VBBlog.xml', 'utf-8');

parseStringPromise(xml, { explicitArray: false })
  .then(result => {
    let posts = result.data.post;
    if (!posts) posts = [];
    if (!Array.isArray(posts)) posts = [posts];
    // Remove empty or invalid posts
    posts = posts.filter(p => p && p.Title && p.Slug);
    fs.writeFileSync('src/app/blog/VBBlog.json', JSON.stringify(posts, null, 2));
    console.log('Converted XML to JSON!');
  })
  .catch(err => {
    console.error('Error parsing XML:', err);
  });
