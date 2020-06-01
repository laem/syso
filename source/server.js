const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.dev.js')
const compiler = webpack(config)
const history = require('connect-history-api-fallback')

const { watchDottedNames } = require('./scripts/dottednames')
watchDottedNames()

const rewrite = basename => ({
	from: new RegExp(`^/${basename}/(.*)$|^/${basename}$`),
	to: `/${basename}.html`
})

app.get('/', function(req, res) {
	res.redirect('/futureco/journée')
})

app.use(
	history({
		rewrites: ['infrance', 'mon-entreprise', 'futureco'].map(rewrite)
	})
)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
		hot: true
	})
)

app.use(require('webpack-hot-middleware')(compiler))

app.listen(8080, function() {
	// eslint-disable-next-line no-console
	console.log('Mon-entreprise listening on port 8080!\n')
})
