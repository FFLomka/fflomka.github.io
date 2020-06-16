let input = document.getElementById('text')
let result = document.getElementById('result')
let temps = ""

setInterval(edit, 100)

function edit(){
	if (temps == input.value) return
	temps = input.value
	let temp = input.value
	temp = temp.replace(/(?:\r\n|\r|\n)/g, '<br>')
	temp = temp.replaceAll('[b]','<b>')
	temp = temp.replaceAll('[/b]','</b>')
	temp = temp.replaceAll('[h1]','<h1>')
	temp = temp.replaceAll('[/h1]','</h1>')
	temp = temp.replaceAll('[i]','<i>')
	temp = temp.replaceAll('[/i]','</i>')
	temp = temp.replaceAll('[u]','<u>')
	temp = temp.replaceAll('[/u]','</u>')
	temp = temp.replaceAll('[strike]','<span class="strike">')
	temp = temp.replaceAll('[/strike]','</span>')
	temp = temp.replaceAll('[spoiler]','<span class="spoiler">')
	temp = temp.replaceAll('[/spoiler]','</span>')
	temp = img(temp)
	temp = url(temp)
	temp = temp.replaceAll('ː', ':')
	temp = temp.replace(/:[a-z0-9_-]+:/gi, x => {
		x = x.replaceAll(':', '')
		return '<img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/' + x + '" alt=":' + x + ':" class="emoji">'
	})

	result.innerHTML = temp
}

function img(t){
	let temp = t.split('[img]')
	temp.forEach((element, index, array) => {
		element = element.split('[/img]')
		if (element.length > 1) {
			element[0] = '<img src="' + element[0] + '">'
			array[index] = element.join('')
		}
	})
	temp = temp.join('')
	return temp
}

function url(t){
	let temp = t.split('[/url]')
	temp.forEach((element, index, array) => {
		element = element.split('[url=')
		if (element.length > 1) {
			element[1] = element[1].split(']')
			if (element[1].length > 1) {
				let link = element[1][0].match("((http|https):\/\/)?(www.)?([a-z0-9-]+\.)+[a-z]{2,6}")
				link = link[0]
				element[1] = `<a href="https://steamcommunity.com/linkfilter/?url=${element[1][0]}"> ${element[1][1]}</a>${link.indexOf('steamcommunity') == -1 ? '<span class="link">[' + link + ']</span>' : ''}`
			}
			array[index] = element.join('')
		}
	})
	temp = temp.join('')
	return temp
}


String.prototype.replaceAll = function(search, replace) {
	return this.split(search).join(replace)
}

//https://steamcommunity-a.akamaihd.net/economy/emoticon/emojiname