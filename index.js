const fs = require('fs');

let sub = process.argv[2] || 'JujutsuKaisen';

async function main() {
  console.log("Getting info for subreddit: " + sub);

  // 1. fetch about info
  let res = await fetch("https://www.reddit.com/r/" + sub + "/about.json", {
    headers: { "User-Agent": "student-cli-activity" }
  });

  let info;
  if (res.status === 200) {
    let data = await res.json();
    info = data.data;

    console.log("\n=== Subreddit Info ===");
    console.log("Name: " + info.display_name_prefixed);
    console.log("Subscribers: " + info.subscribers);
    console.log("Description: " + info.public_description);
  } else {
    console.log("Error: status code is not 200");
    return;
  }

  // 2. fetch rules
  let resRules = await fetch("https://www.reddit.com/r/" + sub + "/about/rules.json", {
    headers: { "User-Agent": "student-cli-activity" }
  });

  let rules;
  if (resRules.status === 200) {
    let data = await resRules.json();
    rules = data.rules;

    console.log("\n=== Subreddit Rules ===");
    for (let i = 0; i < rules.length; i++) {
      console.log((i + 1) + ". " + rules[i].short_name);
    }
  } else {
    console.log("Error: status code is not 200");
    return;
  }

  // 3. fetch top 10 posts
  let resTop = await fetch("https://www.reddit.com/r/" + sub + "/top.json?limit=10&t=all", {
    headers: { "User-Agent": "student-cli-activity" }
  });

  let posts;
  if (resTop.status === 200) {
    let data = await resTop.json();
    posts = data.data.children;

    console.log("\n=== Top 10 Posts ===");
    for (let i = 0; i < posts.length; i++) {
      let p = posts[i].data;
      console.log((i + 1) + ". [" + p.ups + " upvotes] " + p.title);
    }
  } else {
    console.log("Error: status code is not 200");
    return;
  }

  // generate simple html page
  let html = "<!DOCTYPE html>\n<html>\n<head>\n";
  html += "  <title>Subreddit " + info.display_name_prefixed + "</title>\n";
  html += '  <link rel="stylesheet" href="style.css">\n';
  html += "</head>\n<body>\n";
  html += "  <h1>Subreddit: " + info.display_name_prefixed + "</h1>\n";

  html += '  <div class="box">\n';
  html += "    <h2>About</h2>\n";
  html += "    <p><strong>Subscribers:</strong> " + info.subscribers + "</p>\n";
  html += "    <p><strong>Description:</strong> " + info.public_description + "</p>\n";
  html += "  </div>\n";

  html += '  <div class="box">\n';
  html += "    <h2>Rules</h2>\n";
  html += "    <ol>\n";
  for (let i = 0; i < rules.length; i++) {
    html += "      <li>" + rules[i].short_name + "</li>\n";
  }
  html += "    </ol>\n";
  html += "  </div>\n";

  html += '  <div class="box">\n';
  html += "    <h2>Top 10 Posts</h2>\n";
  html += "    <ol>\n";
  for (let i = 0; i < posts.length; i++) {
    let p = posts[i].data;
    html += "      <li>[" + p.ups + " upvotes] " + p.title + "</li>\n";
  }
  html += "    </ol>\n";
  html += "  </div>\n";

  html += "</body>\n</html>\n";

  fs.writeFileSync("index.html", html);
  console.log("\nWrote output to index.html");
}

main();
