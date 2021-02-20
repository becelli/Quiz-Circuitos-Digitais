let questionIndex = 1
let hits = 0
let data = []
const totalQuestions = 3
const questionTitle = document.querySelector('#question')
const currentIndex = document.querySelector('#actual-question')
const maxIndex = document.querySelector('#total-questions')
const a1 = document.querySelector('#a1')
const img = document.querySelector('#question-img')
const a2 = document.querySelector('#a2')
const a3 = document.querySelector('#a3')
const a4 = document.querySelector('#a4')
const game = document.querySelector('.game')
const congrats = document.querySelector('#congrats')
const readJSON = async () => {
	await fetch('./database/questions.json')
		.then((res) => res.json())
		.then((jsonData) => {
			data = jsonData[questionIndex - 1]
			currentIndex.innerHTML = questionIndex
			questionTitle.innerHTML = data.question
			if (data.image) img.setAttribute('src', `./assets/questions/${data.image}`)
			a1.innerHTML = data.a1
			a2.innerHTML = data.a2
			a3.innerHTML = data.a3
			a4.innerHTML = data.a4
		})
}

const Answer = (x) => {
	const qIndex = parseInt(questionIndex) + 1
	sessionStorage.setItem('qIndex', qIndex)
	if (x == data.correct) hits++
	sessionStorage.setItem('hits', hits)
	window.location.reload(true)
}

const recoverQuestionIndex = () => {
	const id = sessionStorage.getItem('qIndex')
	const hitsScore = sessionStorage.getItem('hits')
	questionIndex = parseInt(id)
	hits = parseInt(hitsScore)
	if (isNaN(questionIndex)) questionIndex = 1
	if (isNaN(hits)) hits = 0
}
maxIndex.innerHTML = totalQuestions
recoverQuestionIndex()
if (questionIndex <= totalQuestions) readJSON()
else {
	const congratsMsg = document.querySelector('#congrats-message')
	const congratsGif = document.querySelector('#final-gif')
	if (hits >= (totalQuestions / 4) * 3) {
		congratsMsg.style.color = '#3fff3f'
		congratsMsg.innerHTML = `Parabéns, você acertou ${hits} de ${totalQuestions} questões!`
	} else if (hits >= Math.floor(totalQuestions / 2)) {
		congratsMsg.style.color = '#ffdf0f'
		congratsMsg.innerHTML = `Parabéns, você acertou ${hits} de ${totalQuestions} questões!`
		congratsGif.setAttribute('src', './assets/gif/fine.gif')
	} else {
		congratsMsg.style.color = '#ff2f4f'
		congratsMsg.innerHTML = `Você infelizmente apenas acertou ${hits} de ${totalQuestions} questões :( Você talvez se sinta frustado, porém, com mais esforço e dedicação, você chega lá!`
		congratsGif.setAttribute('src', './assets/gif/less.gif')
	}
	game.style.display = 'none'
	congrats.style.display = 'block'
}
