From [reddit](https://www.reddit.com/r/adventofcode/comments/ebr7dg/2019_day_17_solutions/)

> I spent way too much time trying to figure out a clever way to solve part 2 programatically, and in the end decided to simply brute-force it. I basically generated all possible patterns (length 1 to up to the length where the ascii representation was shorter than 20 characters) and then simply tried removing any combination of three patterns from the list of required moves. All combinations which consumed the list completely were then turned into routines, so I could check, if the ascii length of the routine was less than 20 characters. The first valid routine was then fed into the IntCode interpreter.

> One problem I found, was pretty weird though. If I disabled the live video feed, the program would crash when it tried to access an invalid memory address (3878). When I enabled the feed, the program worked fine however and I got the correct solution in the end.

> I had the same crash... When reading from memory you need to default to a 0. That solves the crash (at least for me)
