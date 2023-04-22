document.addEventListener("DOMContentLoaded", function () {
	// Use buttons to toggle between views
	document
		.querySelector("#inbox")
		.addEventListener("click", () => load_mailbox("inbox"));
	document
		.querySelector("#sent")
		.addEventListener("click", () => load_mailbox("sent"));
	document
		.querySelector("#archived")
		.addEventListener("click", () => load_mailbox("archive"));
	document.querySelector("#compose").addEventListener("click", compose_email);
	document.querySelector("#form-submit").addEventListener("click", send_email);

	// By default, load the inbox
	load_mailbox("inbox");
});

function compose_email() {
	// Show compose view and hide other views
	document.querySelector("#emails-view").style.display = "none";
	document.querySelector("#email-view").style.display = "none";
	document.querySelector("#compose-view").style.display = "block";

	// Clear out composition fields
	document.querySelector("#compose-recipients").value = "";
	document.querySelector("#compose-subject").value = "";
	document.querySelector("#compose-body").value = "";
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	document.querySelector("#emails-view").style.display = "block";
	document.querySelector("#email-view").style.display = "none";
	document.querySelector("#compose-view").style.display = "none";

	const emailsViewElement = document.querySelector("#emails-view");

	// Show the mailbox name
	emailsViewElement.innerHTML = `<h3>${
		mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
	}</h3><p id="success" style="color: green;"></p>`;

	fetch(`/emails/${mailbox}`)
		.then((response) => response.json())
		.then((emails) => {
			// Print emails
			console.log(emails);

			// ... do something else with emails ...
			emails.forEach((email, idx) => {
				emailsViewElement.innerHTML = emailsViewElement.innerHTML.concat(
					"",
					`
					<div data-index=${idx} class="email-entry card p-2" style="border-color: black; border-radius: 0; ${
						email.read && "background-color: lightgray;"
					}">
						<div class="d-flex justify-content-between align-items-center">
							<div class="d-flex align-items-center" style="gap: 20px;">
								<p class="card-title" style="font-weight: 700;">${email.sender}</p>
								<p class="card-text">${email.subject}</p>
							</div>
							<p class="card-text"><small class="text-body-secondary">${
								email.timestamp
							}</small></p>
						</div>
					</div>
				`
				);
			});

			document.querySelectorAll(".email-entry").forEach((email) => {
				email.addEventListener("click", () => {
					view_email(emails[email.dataset.index]);
				});
			});
		});
}

function send_email(e) {
	e.preventDefault();
	const recipients = document.querySelector("#compose-recipients").value;
	const subject = document.querySelector("#compose-subject").value;
	const body = document.querySelector("#compose-body").value;

	recipients.replace(" ", ", ");

	fetch("/emails", {
		method: "POST",
		body: JSON.stringify({
			recipients,
			subject,
			body,
		}),
	})
		.then((response) => response.json())
		.then((result) => {
			if (result.error) {
				setMessageTimeout("#error", result.error);
			} else {
				document.querySelector("#error").innerHTML = "";
				document.querySelector("#sent").click();
				setMessageTimeout("#success", result.message);
			}
		});
}

function view_email(email) {
	document.querySelector("#emails-view").style.display = "none";
	document.querySelector("#email-view").style.display = "block";
	document.querySelector("#compose-view").style.display = "none";

	document.querySelector("#email-view").innerHTML = `
		<p><b>From:</b> ${email.sender}</p>
		<p><b>To:</b> ${email.recipients.join(", ")}</p>
		<p><b>Subject:</b> ${email.subject}</p>
		<p><b>Timestamp:</b> ${email.timestamp}</p>
		<button class="reply btn btn-sm btn-outline-primary">Reply</button>
		${
			email.sender !== document.querySelector("h2").innerHTML
				? email.archived
					? `<button class="archive btn btn-sm btn-outline-primary">Unarchive</button>`
					: `<button class="archive btn btn-sm btn-outline-primary">Archive</button>`
				: ""
		}
		<hr />
		<p>${email.body}</p>
	`;

	document
		.querySelector(".reply")
		.addEventListener("click", () => reply_email(email));

	document.querySelectorAll(".archive").forEach((button) => {
		button.addEventListener("click", () => {
			archive_email(email);
		});
	});

	fetch(`/emails/${email.id}`, {
		method: "PUT",
		body: JSON.stringify({
			read: true,
		}),
	});
}

function archive_email(email) {
	fetch(`emails/${email.id}`, {
		method: "PUT",
		body: JSON.stringify({
			archived: !email.archived,
		}),
	}).then((res) => {
		document.querySelector("#inbox").click();
	});
}

function reply_email(email) {
	compose_email();

	document.querySelector("#compose-recipients").value = email.sender;
	document.querySelector("#compose-subject").value = email.subject.startsWith(
		"Re: "
	)
		? email.subject
		: `Re: ${email.subject}`;
	document.querySelector(
		"#compose-body"
	).value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
}

// Helper functions
function setMessageTimeout(selector, message) {
	document.querySelector(selector).innerHTML = message;
	setTimeout(() => {
		document.querySelector(selector).innerHTML = "";
	}, 5000);
}
