let contacts = JSON.parse(
    localStorage.getItem("chattlyContacts") || "[]"
);

function showAuth() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("auth").classList.remove("hidden");
}

function login() {
    let name = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please complete all fields.");
        return;
    }

    localStorage.setItem("chattlyUser", name);
    localStorage.setItem("chattlyEmail", email);

    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("homeName").textContent = "Hello, " + name;
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = email;

    renderContacts();
}

function navigate(page) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");

    window.scrollTo(0, 0);
}

function addContact() {
    let name = document.getElementById("contactName").value.trim();
    let number = document.getElementById("contactNumber").value.trim();

    if (!name || !number) {
        alert("Enter a name and phone number.");
        return;
    }

    contacts.push({name, number});

    localStorage.setItem(
        "chattlyContacts",
        JSON.stringify(contacts)
    );

    document.getElementById("contactName").value = "";
    document.getElementById("contactNumber").value = "";

    renderContacts();
}

function renderContacts() {
    let list = document.getElementById("contactList");
    let chats = document.getElementById("chatList");

    list.innerHTML = "";
    chats.innerHTML = "";

    contacts.forEach((contact, index) => {
        list.innerHTML += `
            <div class="feature">
                <h3>👤 ${escapeHTML(contact.name)}</h3>
                <p>${escapeHTML(contact.number)}</p>
                <button onclick="deleteContact(${index})">
                    Delete
                </button>
            </div>
        `;

        chats.innerHTML += `
            <div class="feature">
                <h3>👤 ${escapeHTML(contact.name)}</h3>
                <p>${escapeHTML(contact.number)}</p>
                <button onclick="alert('Live messaging will be connected in the next development phase.')">
                    Open Chat
                </button>
            </div>
        `;
    });
}

function deleteContact(index) {
    contacts.splice(index, 1);

    localStorage.setItem(
        "chattlyContacts",
        JSON.stringify(contacts)
    );

    renderContacts();
}

function newContact() {
    navigate("contacts");
}

const ideas = {
    "Business ideas": [
        "Create a personalised gift business.",
        "Build a digital learning platform.",
        "Start a creative design studio."
    ],
    "School projects": [
        "Design a smart classroom model.",
        "Create a recycling awareness project.",
        "Build an interactive learning website."
    ],
    "Creative content": [
        "Create a series about everyday life lessons.",
        "Start a storytelling channel.",
        "Create a digital art exhibition."
    ],
    "Technology ideas": [
        "Build a student productivity app.",
        "Create a community learning platform.",
        "Design an AI-powered study assistant."
    ],
    "Life improvement": [
        "Create a personal goal tracker.",
        "Start a daily gratitude journal.",
        "Build a healthy study routine."
    ]
};

function generateIdea() {
    let type = document.getElementById("ideaType").value;
    let options = ideas[type];

    let idea = options[
        Math.floor(Math.random() * options.length)
    ];

    document.getElementById("ideaResult").innerHTML =
        "<h3>Your new idea ✨</h3>" + idea;
}

function feeling(mood) {
    const responses = {
        Happy: "That's lovely! Take time to appreciate the good moments.",
        Sad: "It's okay to have difficult days. You deserve kindness and support.",
        Stressed: "Pause for a moment. Take a few gentle breaths and focus on one thing at a time.",
        Confused: "You don't need every answer right now. Give yourself time to think."
    };

    document.getElementById("calmResponse").textContent =
        responses[mood];
}

function comfort() {
    let thought = document.getElementById("thoughts").value.trim();

    if (!thought) {
        alert("Write something first.");
        return;
    }

    document.getElementById("calmResponse").textContent =
        "Thank you for putting your thoughts into words. You deserve patience and understanding. Consider sharing what you're going through with someone you trust, too.";

}

function saveJournal() {
    let text = document.getElementById("journal").value.trim();

    if (!text) return;

    let notes = JSON.parse(
        localStorage.getItem("chattlyNotes") || "[]"
    );

    notes.push(text);

    localStorage.setItem("chattlyNotes", JSON.stringify(notes));

    document.getElementById("journal").value = "";

    showNotes();
}

function showNotes() {
    let notes = JSON.parse(
        localStorage.getItem("chattlyNotes") || "[]"
    );

    document.getElementById("savedNotes").innerHTML =
        notes.map(note =>
            `<div class="feature">${escapeHTML(note)}</div>`
        ).join("");
}

function escapeHTML(value) {
    let div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

function logout() {
    localStorage.removeItem("chattlyUser");
    localStorage.removeItem("chattlyEmail");

    location.reload();
}

window.onload = function() {
    let user = localStorage.getItem("chattlyUser");

    if (user) {
        document.getElementById("welcome").classList.add("hidden");
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");

        document.getElementById("homeName").textContent = "Hello, " + user;
        document.getElementById("profileName").textContent = user;
        document.getElementById("profileEmail").textContent =
            localStorage.getItem("chattlyEmail") || "";

        renderContacts();
    }

    showNotes();
};