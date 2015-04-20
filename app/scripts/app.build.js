({
    name: 'require/almond',
    include: 'main',
    baseUrl: './js',
    out: 'dist/main-built.js',

    paths: {
        text: '../bower_components/requirejs-text/text',
        modernizr: '../bower_components/modernizr/modernizr.js',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone'
    }
})
