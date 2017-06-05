const Nightmare = require('nightmare')
const fs = require('fs')
const DATA = [{
	url: "http://aszdziennik.pl/c/109,kraj",
	file: 'kraj.json'
},
{
	url: "http://aszdziennik.pl/c/115,zycie",
	file: 'gospodarka.json'
},
{
	url: "http://aszdziennik.pl/c/111,swiat",
	file: 'swiat.json'
}]

const crawler = function() {
	const run = async (url, fileName) => {
		const nightmare = new Nightmare({ show: false })

		try {
			await nightmare
				.goto(url)
				.wait('.col-sm-8')

			var result = await nightmare
				.evaluate(() => {
					var elements = document.querySelectorAll('.cat__posts.list-unstyled > li > .cat__post .cat__post__box--text')

					var items = [].map.call(elements, d => {
						var r = {
							title: d.querySelector('.cat__post__title').innerText,
							text: d.querySelector('.cat__post__lead').innerText,
							date: d.querySelector('.cat__post__info > .post-date').innerText,
							url: d.querySelector('a.cat__post__title').attributes['href'].value
						}
						return r
					})
					//console.log(items);
					return items
				})

			if (result) {
				// console.log(fileName);
				await nightmare.end()
				fs.writeFileSync(fileName, JSON.stringify(result))
				// await fs.writeFile(fileName, JSON.stringify(result))
			}
		} catch (e) {
			console.error(e)
		}
		//console.log(result);
	}
	return {
		crawl: () => Promise.all(DATA.map(x => run(x.url, x.file)))
	}
}()

module.exports = crawler