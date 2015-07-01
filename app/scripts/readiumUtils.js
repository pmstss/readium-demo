/*global require, LookUp, ReadiumSDK*/
/*jshint globalstrict: true*/

'use strict';

require(['Readium'],
    function (Readium) {

        LookUp.ReadiumUtils.createInstance = function (options) {
            var readerOptions = {
                el: options.el,
                mathJaxUrl: 'scripts/mathjax/MathJax.js'
            };

            var readiumOptions = {
                /*jsLibRoot: module.config().jsLibRoot || './scripts/zip/',*/
                openBookOptions: {}
            };

            var readium = new Readium(readiumOptions, readerOptions);



            readium.reader.updateSettings({
                syntheticSpread: 'auto',
                scroll: 'auto'
            });

            /*EpubReaderMediaOverlays.init(readium);*/

            readium.openPackageDocument(options.url, function (packageDocument, options) {
                console.log('### packageDocument: %o', packageDocument);

                packageDocument.generateTocListDOM(function (dom) {
                    console.log('### generateTocListDOM - dom: %o', dom);
                });

                var metadata = options.metadata;
                console.log('### options: %o, metadata: %o', options, metadata);
            }/*, openPageRequest*/);


            console.log('### end of createInstance');

            return readium;
        };
    });