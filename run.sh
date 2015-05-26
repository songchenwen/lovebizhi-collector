#!/bin/sh

CDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

OUTPATH="$CDIR/wallpapers"

if [[ -f "$CDIR/config" ]]; then
	source "$CDIR/config"
else
	echo "Make a new file \"config\" and, put OUTPATH=\"/where/to/store/wallpapers\" in it."
fi

/usr/local/bin/node "$CDIR/index.js" "$OUTPATH"

cat "$CDIR/setbackground.scpt" | sed "s|OUTPATH|$OUTPATH|" | osascript
