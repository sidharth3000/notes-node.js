const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
	return 'Your notes...'
}

const addNote = function (title, body) {
	const notes = loadNotes()
	const duplicate = notes.find(function (note) {
		return note.title === title
	})

	if (duplicate.length === 0) {
		notes.push({
		title: title,
		body: body
	}); 

	console.log(chalk.green.inverse('new node added'))

	}else {
		console.log(chalk.red.inverse('Title already exists!'))
	}

	saveNotes(notes)
	
}

const saveNotes = function (notes) {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = function () {

	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch(e) {
		return []
	}	
}

const removeNote = function (title) {
	const notes = loadNotes()
	const duplicate = notes.filter(function (note){
		return note.title !== title 
	})

	saveNotes(duplicate)
	

	if(duplicate.length !== notes.length)
	{
		console.log(chalk.green.inverse(title + ' removed'))	
	}else {
		console.log(chalk.red.inverse('Title not found'))
	}
}

const list = function () {
	console.log(chalk.blue.inverse('your notes\' titles'))

	const notes = loadNotes()
	notes.forEach(function (note){
		console.log(note.title  )
	})
}

const read = function (title) {
	const notes = loadNotes()
	const req = notes.find(function (note){
		return note.title === title
	})

	if (req) {
		console.log(chalk.blue.inverse(req.title))
		console.log(req.body)
	}else{
		console.log(chalk.red.inverse('not found!'))
	}
}


module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	list: list,
	read: read
}