document.addEventListener("DOMContentLoaded", () => {
	const button = document.querySelector(".btn.following");
	const userId = button.dataset.id;
	const csrfToken = document.querySelector(
		'input[name="csrfmiddlewaretoken"]'
	).value;
	button.onclick = () => {
		fetch(`/users/${userId}`, {
			method: "PUT",
			body: JSON.stringify({
				[button.innerHTML.toLowerCase()]: true,
			}),
			headers: {
				"X-CSRFToken": csrfToken,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const followers = document.querySelector("#followers-count");
				followers.innerHTML = `${data.followersCount} <b>followers</b>`;
				if (button.innerHTML.toLowerCase() === "unfollow") {
					button.classList.add("btn-primary");
					button.classList.remove("btn-danger");
					button.innerHTML = "Follow";
				} else {
					button.classList.add("btn-danger");
					button.classList.remove("btn-primary");
					button.innerHTML = "Unfollow";
				}
			});
	};
});
