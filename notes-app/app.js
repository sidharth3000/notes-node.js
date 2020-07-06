const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')

yargs.command({
	command: 'add',
	describe: 'add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.addNote(argv.title, argv.body)
	}
})

yargs.command({
	command: 'remove',
	describe: 'revove a new note',
	title: {
		describe: 'Note title',
		demandOption: true,
		type: 'string'
	},
	handler: function(argv) {
		notes.removeNote(argv.title)
	}
})

yargs.command({
	command: 'list',
	describe: 'list a new note',
	handler: function() {
		notes.list()
	}
})

yargs.command({
	command: 'read',
	describe: 'read a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.read(argv.title)
	}
})

yargs.parse()
