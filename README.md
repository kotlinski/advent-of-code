# Advent of Code

Advent of code: https://adventofcode.com/

Each day from first to 25th of December has a new problem to solve, with an additional part 2 problem as a bonus.
Every problem has example data, but the problem should be solved with a personal set of data. The output will typically be a number or a sequence of numbers/characters.

| YEAR                                                                                         | 🌟  |
| -------------------------------------------------------------------------------------------- | :-: |
| [2015](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2015) |  4  |
| [2016](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2016) |  4  |
| [2017](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2017) |  4  |
| [2018](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2018) |  4  |
| [2019](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2019) |  4  |
| [2020](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2020) |  4  |
| [2021](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2021) | 20  |
| [2022](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2022) | 16  |
| [2023](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/2023) | 22  |

## Prerequisite

1. Sign in on [advent of code](https://adventofcode.com/).
2. Find where the browser stores your session cookie.
   a. In Chrome: press F12 -> Application -> Cookies -> session -> find a value of 128 hexadecimals
3. Create a file named `cookie` in the project root dir and put your session cookie from the site

```sh
$ echo your_session_cookie_token > cookie
```

## Run scripts

The two scripts in this project _creates a new solver for the new task_ and _runs the task solver with the proper input_.

### create a new solver from boilerplate

This script will create a folder and a solver with template code for the given year and date.

```sh
$ yarn run init-solver 2022 1
> https://adventofcode.com/2022/day/9
> ✨ Done in 1.19s.
```

### run the solver with personal puzzle input

The script will use your session cookie and fetch your personal input data for the given year and day.

Run in a terminal `npm run day [year] [day]` or add a `+` sign in the end for part two.

```sh
$ yarn run solve 2022 1
> The answer is 7746

$ yarn run solve 2022 1+
> The answer is 2604
```

### Cred

Was inspired by @atme's [advent-of-code](https://github.com/atme/advent-of-code-2021) repo for fetching the input data.

[![CodeQL](https://github.com/kotlinski/advent-of-code/actions/workflows/codeql.yml/badge.svg)](https://github.com/kotlinski/advent-of-code/actions/workflows/codeql.yml)
