# Leadpeak

### Getting Started With Leadpeak

1. Install and Open the application and navigate to settings.
2. Paste in your gmaps and hunter.io API Keys

### Building Leadpeak for Distribution

There are some custom steps that have to be completed currently to ensure leadpeak works on windows

1. Run `npm run react-build`
2. Enter the `index.html` file in the react build folder
3. Ensure that all links are _relative links_ i.e './some/folder/help.txt' **not** '/some/folder/help.txt
4. Run npm run `electron-build`
5. See the dist folder for your executables
