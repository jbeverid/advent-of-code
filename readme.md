#Advent of Code (AoC)

## What is Advent of Code
[Advent of Code](https://adventofcode.com/) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.

You don't need a computer science background to participate - just a little programming knowledge and some problem solving skills will get you pretty far. Nor do you need a fancy computer; every problem has a solution that completes in at most 15 seconds on ten-year-old hardware.

## Getting Started:
Go ahead and fork/clone this repository.  Don't feel the need to submit pull requests for your solutions since others will want to solve these problems on their own.  

If you are excited to share your awesome solution, add it to Slack, but wait at least until 8 AM EST the next day to share your solution. Spoiler tags are still recommended since we want to give everyone an opportunity to solve the problem.

Navigate to the directory where you cloned the code base from there run these commands:
```shell
npm install
node index.js --day={day-of-month}
```

For example, if I wanted to run the solution for December 17th, I would do:
```shell
node index.js --day=17
```

The applications is divided into three main areas:
- Problems (`problems` folder) - Usually some file explaining the problem that needs to be solved.
- Inputs (`inputs` folder) - Any data needed for solving the problem.
- Solutions (`solutions` folder) - This is your area to write code.

To add your solution, simply add code to the file `solutions/2022/2022-12-{day}.js` file.

##System Requirements
To run this use [NodeJs 14+](https://nodejs.org/en/download/).  This may work all the way down to NodeJs 9, but 14+ is recommended.  Additionally, some sort of good IDE like Visual Studio Code or WebStorm.

##FAQs
**Q: What programming language should I use?**<br />
A: You can use any programming language you like for AoC  This project, is a NodeJs application (JavaScript) using JavaScript modules.

**Q: What are some helpful resources for solving these problems**<br />
A: There are plenty of good resources:
- [Advent of Code Subreddit](https://www.reddit.com/r/adventofcode/)
- [Wes Bos - ES6 Course](https://es6.io/)
- For everything else, [Stackoverflow](https://stackoverflow.com/)

