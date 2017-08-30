import path from "path"
import fs from "fs"

let readme_rows = ""

fs.readdir( "./src", (err, files) => {
	if( err ) {
			console.error( "Could not list the directory.", err )
			process.exit( 1 )
	}

	console.log("Processing svgs:")

	files.forEach((file, index) => {
		if (file.endsWith(".svg")){
			const iconName = file.slice(0, -4)
			readme_rows += `|${iconName}|\n`
		}
	})

	let readme_text = `
#October Icons

| Name        |
| ------------- |
${readme_rows}
`

	fs.writeFile(path.join(__dirname, '../README.md'), readme_text, (err) => {
		if (err) throw err
		console.log('Created Readme!')
	})
})
