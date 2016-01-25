# Happy or Not

This project is a demo to show how to use https://www.projectoxford.ai/.  You will need to obtain a key for the Emotion API [here](https://www.projectoxford.ai/Subscription).  See below for how to set environment key for windows or mac/linux.

You can find a demo at http://happyornot.azurewebsites.net/. 

Prefer Python?  Check out this [sample in Python](https://github.com/jsturtevant/happy-or-not-django).

##Set up 
1. First install GraphicsMagick (or Image Magick.  I found GraphicsMagic was easier to set up on windows)
2. Clone this repo
3. Open a terminal or cmd prompt
3. Install dependencies: ```npm install```
4. Set Oxford API Key in environment ([mac/linux](#Set-Environment-Variable-on-mac) or [windows](#Set-Environment-Variable-on-Windows))
5. Start server: ```npm start```
6. Browse to localhost:3000 to see the application in action

## Installing GraphicMagick
Uses GM module which requires setup of GraphicsMagick or ImageMagick: https://github.com/aheckmann/gm

## Set Environment Variable on Windows
1. Open cmd prompt
2. Type ```set OXFORD_KEY=<your key>```  

If you want to set the environment key permanently you can use [setx](http://ss64.com/nt/setx.html): ```setx OXFORD_KEY <your key>```

## Set Environment Variable on Mac
1. Open terminal 
2. Type ```export OXFORD_KEY=<your key>```

If you want to [set the environment key permanently](http://stackoverflow.com/questions/22502759/mac-os-x-10-9-setting-permanent-environment-variables)  you set them in your ```.bashrc``` profile on linux and on mac set them in ```.bash_profile```.