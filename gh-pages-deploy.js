var ghpages = require("gh-pages");
var name = require("./package.json");
name = name.name;

ghpages.publish(
  "build",
  {
    repo: `https://${process.env.GH_TOKEN}@github.com/shultztom/${name}.git`,
    silent: true
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Published!");
    }
  }
);
