document.addEventListener("DOMContentLoaded", () => {
	try {
		const newPostForm = document.querySelector("#newPostForm");
		newPostForm.addEventListener("submit", handleFormSubmit);
	} catch (err) {}

	// fetchLatestPosts();
});

const handleFormSubmit = (e) => {
	const post = document.querySelector("#post");
	if (!post.value) {
		e.preventDefault();
		const message = document.querySelector("#message");
		message.innerHTML = `
			<div class="alert alert-danger alert-dismissible fade show" role="alert">
				Must contain at least one character
				<button
					type="button"
					class="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		`;
		return;
	}
};
// 	const csrfToken = document
// 		.querySelector("#newPostForm")
// 		.querySelector('input[name="csrfmiddlewaretoken"]').value;

// 	fetch("new_post", {
// 		method: "POST",
// 		body: post.value,
// 		headers: {
// 			"X-CSRFToken": csrfToken,
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then((data) => {
// 			post.value = "";
// 			add_post(data.post);
// 			const posts = document.querySelector("#posts");
// 			const postHeight = posts.children[0].getBoundingClientRect().height;
// 			const newPost = posts.children[0];
// 			newPost.style.setProperty("padding", "0", "important");
// 			newPost.style.height = 0;
// 			setTimeout(() => {
// 				newPost.style.height = `${postHeight}px`;
// 				newPost.style.padding = "1rem";
// 			}, 300);
// 		});
// };

// const fetchLatestPosts = () => {
// 	console.log("fetch");
// 	fetch("posts")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			data.forEach(add_post);
// 		});
// };

// const add_post = (post) => {
// 	const postE = document.createElement("div");
// 	postE.className = "border rounded p-3 mb-2";
// 	postE.innerHTML = `
// 		<h5><a href="/profile/${post.poster.id}">${post.poster.username}</a></h5>
// 		<p>${post.content}</p>
// 		<small class="text-black-50">${new Date(post.created)}</small>
// 		<p>❤${post.likes}</p>
// 	`;
// 	document.querySelector("#posts").prepend(postE);
// };
