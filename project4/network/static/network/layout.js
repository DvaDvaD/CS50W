document.addEventListener("DOMContentLoaded", () => {
	const postContainers = document.querySelectorAll(".post-container");
	postContainers.forEach(addEditingFunctionality);
	postContainers.forEach(addLikingFunctionality);
});

const addEditingFunctionality = (cnt) => {
	const btn = cnt.querySelector(".btn-sm");
	const contentBox = cnt.querySelector(".post-content");
	const form = cnt.querySelector("form");

	btn.onclick = (e) => {
		e.preventDefault();
		btn.classList.add("d-none");

		const contentP = cnt.querySelector(".post-content > p");
		let content = contentP.innerHTML;
		contentBox.innerHTML = `
			<textarea>${content}</textarea>
		`;

		const saveBtn = document.createElement("button");
		saveBtn.className = "btn btn-primary btn-sm";
		saveBtn.innerHTML = "Save";
		form.append(saveBtn);
		saveBtn.onclick = () => {
			const inputBox = contentBox.querySelector("textarea");
			const input = inputBox.value;
			contentBox.innerHTML = `
				<p>${input}</p>
			`;
			saveBtn.remove();

			const csrfToken = document.querySelector(
				"input[name='csrfmiddlewaretoken']"
			).value;
			fetch(`/posts/${cnt.dataset.id}`, {
				method: "PUT",
				headers: {
					"X-CSRFToken": csrfToken,
				},
				body: JSON.stringify({
					input,
				}),
			});

			btn.classList.remove("d-none");
		};
	};
};

const addLikingFunctionality = (cnt) => {
	const likeButton = cnt.querySelector(".like-button");
	likeButton.onclick = () => {
		const liked = likeButton.classList.contains("btn-danger");
		const csrfToken = document.querySelector(
			"input[name='csrfmiddlewaretoken']"
		).value;
		fetch(`/posts/${cnt.dataset.id}`, {
			method: "PUT",
			headers: {
				"X-CSRFToken": csrfToken,
			},
			body: JSON.stringify({
				liked,
			}),
		}).then((res) => {
			likeButton.classList.toggle("btn-danger");
			likeButton.classList.toggle("btn-outline-danger");
			const p = likeButton.querySelector("p");
			let likeCount = parseInt(p.innerHTML[1]);
			p.innerHTML = `❤${liked ? likeCount - 1 : likeCount + 1}`;
		});
	};
};
