# StackOverflow-Notifications
Chrome extension to see when you receive notifications from StackOverflow

https://chrome.google.com/webstore/detail/stackoverflow-notificatio/ndeljpkeimafgobechdfejolnpgcjomi/related

## Dependencies

The UI is built using React, so you'll need to instal the React tools:

    npm install -g react-tools

This will allow you to write JSX code in the `ui/jsx/` folder, with output under `ui/js/` using:

    jsx --watch ui/jsx/ ui/js/

The project also use `grunt` for the build process.

    npm install -g grunt-cli

To build, run the following command:

    grunt

Build outputs to `build/`.