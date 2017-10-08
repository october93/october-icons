import fs from "fs"

const codepointStart = 7000000
let svg_icons = []
let glyph_map = {}

fs.readdir( "./src", (err, files) => {
	if( err ) {
			console.error( "Could not list the directory.", err )
			process.exit( 1 )
	}

	console.log("Processing svgs:")

	var counter = 0

	files.forEach((file, index) => {
		if (file.endsWith(".svg")){
			let prefix = ""

			if (counter >= 0 && counter < 10) {
				prefix = "00"
			} else if (counter < 100) {
				prefix = "0"
			}

			const newName = prefix + counter + file.substring(3)

			fs.renameSync("./src/" + file, "./src/" + newName)
			console.log(file)
			counter++
		}
	})

})
