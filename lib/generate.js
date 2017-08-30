import builder from "iconfont-builder"
import path from "path"
import fs from "fs"

const codepointStart = 7000000
let svg_icons = []
let glyph_map = {}

fs.mkdir("./dist", (err) => {
	if( err && err.code != "EEXIST") {
			console.log( "Could not create directory.", err )
	}
})

fs.readdir( "./src", (err, files) => {
	if( err ) {
			console.error( "Could not list the directory.", err )
			process.exit( 1 )
	}

	console.log("Processing svgs:")

	let counter = 0

	files.forEach((file, index) => {
		if (file.endsWith(".svg")){
			svg_icons.push({
				name: "october-icon-" + file.slice(0, -4),
				file: file,
				codepoint: codepointStart + counter
			})
			glyph_map[file.slice(0, -4)] = codepointStart + counter
			counter++
			console.log(file)
		}
	})

	const options = {
			icons: svg_icons,
			src: path.join(__dirname, '../src'),
			fontName: 'october-icons',
			descent: 0,
			dest: path.join(__dirname, '../dist')
	}

	console.log("Generating Fonts")

	builder(options)
			.then( function () {
				console.log("Complete")
			}
		).catch(function (e) {
			console.error("Error creating font:", e)
		})
	console.log("Generating Glpyhmaps")

	fs.writeFile(path.join(__dirname, '../dist/glyphmap.json'), JSON.stringify(glyph_map), (err) => {
		if (err) throw err
		console.log('Created Glyphmap!')
	})
})
