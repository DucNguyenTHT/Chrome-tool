console.clear();
localStorage.setItem('counter', 0);
AutoInputTheContent(document.getElementById('region-main'));
Submit(document.getElementsByClassName('controls'));
Submit2(document.getElementsByClassName('confirmation-buttons')[1]);
Submit2(document.getElementsByClassName('mod_quiz-next-nav')[1]);
Submit2(
	document.getElementsByClassName('singlebutton')[0].children[0].children[2],
);
let data = [];
SaveCorrectAnswer(document.getElementsByClassName('questionflagsaveform'));
function AutoInputTheContent(element) {
	var counter = parseInt(Math.random() * 4);
	if (element && element.children[1].children[1].children[0]) {
		const TableDom = element.children[1].children[1].children[0].childNodes;
		TableDom.forEach((element) => {
			if (element.className && element.className !== 'submitbtns') {
				let Quest = element.children[1].children[0].children[2].innerText;
				let HasQuest = sessionStorage.getItem(Quest);
				let ListAnswer =
					element.children[1].children[0].children[3].children[1];
				console.log(Quest); // câu hỏi
				if (HasQuest) {
					ListAnswer.childNodes.forEach((element) => {
						if (element.className && element.className) {
							console.log('\t' + element.innerText);
							let TextValue = element.innerText.split('.')[1].trim();
							if (TextValue === HasQuest) {
								element.firstChild.checked = true;
							}
						}
					});
				} else {
					ListAnswer.childNodes.forEach((element) => {
						if (element.className && element.className) {
							console.log('\t' + element.innerText);
						}
					});
					ListAnswer.children[counter].firstChild.checked = true;
				}
			}
		});
		TableDom.forEach((element) => {
			if (element.className && element.className === 'submitbtns') {
				if (element.childNodes.length < 2) {
					element.firstChild.click();
				} else {
					element.children[1].click();
				}
			}
		});
	}
}

function Submit(element) {
	if (element[1] && element[1].children[0].children[0].children[6]) {
		console.log(element[1].children[0].children[0].children[6].click());
	}
}
function Submit2(element) {
	if (element) {
		element.click();
	}
}

function SaveCorrectAnswer(element) {
	if (element[0]) {
		const TableDom = element[0].firstChild.childNodes;
		TableDom.forEach((element) => {
			if (element.className && element.className !== 'submitbtns') {
				let Quest = element.children[1].children[0].children[2].innerText;
				let ListAnswer =
					element.children[1].children[0].children[3].children[1];
				ListAnswer.childNodes.forEach((element) => {
					if (element.classList && element.classList.contains('correct')) {
						let Answer = element.innerText.split('.')[1].trim();
						data.push({ Quest, Answer });
					}
				});
			}
		});
		for (let i = 0; i < data.length; i++) {
			sessionStorage.setItem(data[i].Quest, data[i].Answer);
		}
		localStorage.setItem('counter', counter + 1);
	}
}
