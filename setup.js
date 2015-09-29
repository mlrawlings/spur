global.__SERVER__ = true
global.__BROWSER__ = false
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var r = require('rethinkdb')
  , config = require('./common/config')
  , connection
  , db = config.rethink.db

r.connect(config.rethink).then(function(conn) {
	console.log(1)
	connection = conn
}).then(function() {
	console.log(2)
	if(process.argv[2] == 'drop') {
		return r.dbDrop(db).run(connection).catch(function() {})
	}
}).then(function() {
	console.log(3)
	return r.dbCreate(db).run(connection).catch(function() {})
}).then(function() {
	console.log(4)
	return r.tableCreate('users').run(connection)
}).then(function() {
	console.log(5)
	return r.tableCreate('events').run(connection)
}).then(function() {
	return r.table('events').indexCreate('locationIndex', { geo:true }).run(connection)
}).then(function() {
	connection.close()
})