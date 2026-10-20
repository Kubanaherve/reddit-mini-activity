let sub = process.argv[2] || 'JujutsuKaisen';

async function main() {
  console.log("Getting info for subreddit: " + sub);

  // 1. fetch about info
  let res = await fetch("https://www.reddit.com/r/" + sub + "/about.json", {
    headers: { "User-Agent": "student-cli-activity" }
  });

  if (res.status === 200) {
    let data = await res.json();
    let info = data.data;

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

  if (resRules.status === 200) {
    let data = await resRules.json();
    let rules = data.rules;

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

  if (resTop.status === 200) {
    let data = await resTop.json();
    let posts = data.data.children;

    console.log("\n=== Top 10 Posts ===");
    for (let i = 0; i < posts.length; i++) {
      let p = posts[i].data;
      console.log((i + 1) + ". [" + p.ups + " upvotes] " + p.title);
    }
  } else {
    console.log("Error: status code is not 200");
    return;
  }
}

main();
