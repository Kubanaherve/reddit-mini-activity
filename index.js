let sub = process.argv[2] || 'JujutsuKaisen';

async function main() {
  console.log("Getting info for subreddit: " + sub);

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
  }
}

main();
