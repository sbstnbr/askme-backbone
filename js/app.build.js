({
    name: 'require/almond',
    include: 'main',
    baseUrl: './js',
    out: 'dist/main-built.js',

    paths: {
        text: 'vendor/text',
        modernizr: 'vendor/custom.modernizr',
        jquery: 'vendor/jquery',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        fullcalendar: 'vendor/fullcalendar',
        breakpoints: 'lib/breakpoints'
    }
})
