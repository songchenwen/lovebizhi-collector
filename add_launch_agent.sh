#!/bin/sh

CDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

LAUNCHAGENTPATH="$HOME/Library/LaunchAgents/com.songchenwen.lovebizhicollector.plist"

if [[ ! -f "$LAUNCHAGENTPATH" ]]; then

touch "$LAUNCHAGENTPATH"
cat "$CDIR/launchagent.temp" | sed "s|DIRPATH|$CDIR|" > "$LAUNCHAGENTPATH"
launchctl load "$LAUNCHAGENTPATH"

fi
