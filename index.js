var builder = require('iconfont-builder');
var path = require('path');
var fs = require('fs');

var codepointStart = 700000

var svg_icons = []

fs.readdir( "./src", function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        }
        console.log("Processing svgs:")
        var counter = 0
        files.forEach( function( file, index ) {
          if (file.endsWith(".svg")){
            svg_icons.push({
              name: "october-icon-" + file.slice(0, -4),
              file: file,
              codepoint: codepointStart + counter
            })
            counter++
            console.log(file)
          }
        } );

        var options = {
            icons: svg_icons,
            src: path.join(__dirname, 'src'),
            fontName: 'october-icons',
            descent: 0,
            dest: path.join(__dirname, 'dist')
        };
        console.log("Generating Fonts")

        builder(options)
            .then( function () {
              console.log("Complete")
            }
          ).catch(function (e) {
              console.error("Error creating font:", e)
            }
);
} );
