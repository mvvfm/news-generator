module.exports = generate = () => {
	const fs = require('fs');
	const Mustache = require('Mustache')

	const templateFile = "template.html"
	const outputFile = "output.html"
	
	var data = JSON.parse(fs.readFileSync('kraj.json', 'utf8'))
	var tematDnia = data.slice(0, 2)
	var elseDnia = data.slice(3, 5)
	
	var gospodarka = JSON.parse(fs.readFileSync('gospodarka.json', 'utf8')).slice(0, 3)
	
	var swiat = JSON.parse(fs.readFileSync('swiat.json', 'utf8')).slice(0, 1)
	
	Date.prototype.today = function () { 
		return ((this.getDate() < 10)?"0":"") + this.getDate() +"."+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"."+ this.getFullYear();
	}
	var currentDate = new Date().today()
	
	var template = fs.readFileSync(templateFile, 'utf8')
	Mustache.parse(template)
	var rendered = Mustache.render(template, {tematDnia: tematDnia, elseDnia: elseDnia, gospodarka: gospodarka, swiat: swiat, currentDate: currentDate});
	
	fs.writeFileSync(outputFile, rendered, 'utf8')
	
	//console.log('generated')
}