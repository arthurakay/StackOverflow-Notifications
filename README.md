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

## Tests

...well there aren't (m)any. Yet.

`lintroller` is used to verify that some code passes JSHint (namely `background.js`), but the JSX code
will eventually need to be linted as well (via `eslint`, once that is supported).

    cp hooks/pre-commit .git/hooks/
    chmod 777 .git/hooks/pre-commit

This will run `lintroller` before every commit, keeping our code clean!