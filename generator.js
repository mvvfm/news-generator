//import generate from './templ'
const templateGenerator = require('./templ')
const crawler = require('./crawler')

var run = async () => {
    await crawler.crawl()
    console.log('.')
    templateGenerator()
    console.log('.')
}

run()   