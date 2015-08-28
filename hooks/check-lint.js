//Assumes the script is run from the module's root
process.chdir('hooks');

var LintRoller = require('lintroller');

var config = {
    verbose          : false,
    stopOnFirstError : false,

    //only check JS files
    regex : /\.(js)$/i,

    //recursively include JS files in these folders
    filepaths        : [
        '../background/'
    ],

    //but ignore anything in these folders
    exclusions       : [

    ],

    linters : [
        {
            type    : 'jsHint',
            options : {
                esnext : true
            }
        }
    ]
};

try {
    LintRoller.init(config);
}
catch (e) {
    console.log('\nAn error has been caught:\n\n');
    console.log(e);
    process.exit(1);
}