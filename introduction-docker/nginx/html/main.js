const tasksTableBodyEl = document.getElementById("tasks_table_body");
const titleInputEl = document.getElementById("title_input");
const addButtonEl = document.getElementById("add_button");

async function loadTasks() {
	const response = await fetch('/api/tasks');
	const responseBody = await response.json();

	const tasks = responseBody.tasks;

	// 登録後に一覧再表示させる際に既に表示している内容を一旦初期化する
	while (tasksTableBodyEl.firstChild) {
		tasksTableBodyEl.removeChild(tasksTableBodyEl.firstChild)
	}

	tasks.forEach((task) => {
		const titleTdEl = document.createElement('div');
		titleTdEl.classList.add("td");
		titleTdEl.innerText = task.title;

		const createdAtTdEl = document.createElement('div');
		createdAtTdEl.classList.add("td");
		createdAtTdEl.innerText = task.createdAt;

		const trEl = document.createElement('div');
		trEl.classList.add("tr");
		trEl.appendChild(titleTdEl)
		trEl.appendChild(createdAtTdEl)

		tasksTableBodyEl.appendChild(trEl);

	})
}

async function registerTask() {
	const title = titleInputEl.value;
	//console.log(title);
	const requestBody = {
    		title: title
  	}

  	await fetch('/api/tasks', {
    		method: "POST",
    		body: JSON.stringify(requestBody) // 引数をJSON文字列に変換する
  	})

	await loadTasks() // 登録処理を行ったら、一覧表示に反映させる
}


async function main() {
	addButtonEl.addEventListener("click", registerTask)
	await loadTasks();
    	//const response = await fetch('/api/hello');
    	//console.log(response);
    	//const responseBody = await response.json();
    	//console.log(responseBody);
	//const messageEl = document.getElementById('message');

	//messageEl.innerText = responseBody.message
}

main();