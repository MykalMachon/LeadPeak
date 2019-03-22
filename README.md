# Leadpeak

### What is Leadpeak

Leadpeak is a desktop application that allows for rapid lead generation based on location and business type.
This is especially useful when trying to generate leads for a physical goods or service company : For example,
a house keeping or janitorial services company that only serves a specific region.

To use Leadpeak you'll need to have both a google maps API key and a Hunter.io API key.
Both of which can be gotten for free as of right now.

### Getting Started With Leadpeak

1. Install and Open the application and navigate to settings.
2. Paste in your gmaps and hunter.io API Keys
3. Get to peaking for leads :tada:

### Building Leadpeak for Distribution

There are some custom steps that have to be completed currently to ensure leadpeak works on windows

1. Run `npm run react-build`
2. Enter the `index.html` file in the react build folder
3. Ensure that all links are _relative links_ i.e `./some/folder/help.txt` **not** `/some/folder/help.txt`
4. Run npm run `electron-build`
5. See the dist folder for the platforms executables files
6. Code signing instructions will come down the line
