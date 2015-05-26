tell application "System Events"
	set pictures folder of every desktop to "OUTPATH"
	set picture rotation of every desktop to 1
	set change interval of every desktop to 900.0
	set random order of every desktop to true
end tell
