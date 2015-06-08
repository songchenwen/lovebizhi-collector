# Lovebizhi Collector

This is a nodejs script that uses [lovebizhi](https://www.lovebizhi.com) apis to collect wallpapers, and auto change wallpapers for OS X. [Chinese Post](https://songchenwen.github.io/tech/2015/06/07/lovebizhi-collector/)

## Usage

If you haven't installed nodejs, you can use [Homebrew](http://brew.sh) to install it.

~~~ bash
brew install node
~~~

1. Clone this script. 
2. `node install` to install all the dependencies.
3. Add a new file `config`. 
4. Put `OUTPATH="/path/to/your/folder/for/wallpapers"` in `config`.

The following shell commands will do all the work above. You just need to change "/path/to/your/folder/for/wallpapers" to the absolute path in which you want to store your collected wallpapers.

~~~ bash
OUTPATH="/path/to/your/folder/for/wallpapers"
mkdir lovebizhi-collecor
cd lovebizhi-collecor
git clone "https://github.com/songchenwen/lovebizhi-collector.git" .
npm install
touch config
echo "OUTPATH=\"$OUTPATH\"" > config
~~~

Then you can run `run.sh` to begin collectting the wallpapers.

~~~ bash
sh run.sh
~~~

## Auto Start

There is a shell script you can use to add a `LaunchAgent` to the OS X system to auto run the collector at an interval.

~~~ bash
sh add_launch_agent.sh
~~~

## Configuration

You can edit the following lines in `index.js` to configure this script.

~~~ javascript
var categories = [API.categories.landscape, API.categories.plant];
var screenWidth = 2560;
var screenHeight = 1600;
var maxFileCount = 100;
~~~

The available catetories are listed below:

- `API.categories.moviestar`
- `API.categories.landscape`
- `API.categories.beauty`
- `API.categories.plant`
- `API.categories.animal`
- `API.categories.game`
- `API.categories.cartoon`
- `API.categories.festival`
- `API.categories.car`
- `API.categories.food`
- `API.categories.sport`
