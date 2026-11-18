// Formål - Lage en liste der det er mulig å logge inn musikk, filmer og spill og kunne gi de vurderinger.

// dom elements

const mediaForm = document.querySelector("#mediaForm");
const mediaContainer = document.querySelector("#mediaContainer");
const totalEntries = document.querySelector("#totalEntries");

// media library array

let mediaLibrary = JSON.parse(
    localStorage.getItem("mediaLibrary") || "[]"
);

function saveLibrary () {
    localStorage.setItem(
        "mediaLibrary",
        JSON.stringify(mediaLibrary)
    );
}

// add new media

mediaForm.addEventListener("submit", (event) => {
    event.preventDefault();

// retrieve form information
const formData = new FormData(mediaForm);

// convert form data into object
const { title, category, rating, status, review } =
Object.fromEntries(formData.entries());


console.log("Title", title);
console.log("Review:", review);
console.log("All form data", [...formData.entries()]);

// create new media entry
const newMedia = {
    id: crypto.randomUUID(),
    title: title.trim(),
    category,
    rating: Number(rating),
    status,
    review: review.trim(),
    dateAdded: new Date().toISOString()
};

// add new entry to array
mediaLibrary.push(newMedia);

// save updated array

saveLibrary();

console.log(mediaLibrary);

// update library display
renderLibrary();

// clear form
mediaForm.reset();


});

// render media library

function renderLibrary () {

    const cards = mediaLibrary.map(
        ({ title, category, rating, status, review}) => {

            // create card
            const card = document.createElement("article");
            card.classList.add("media-card");

            // media title
            const heading = document.createElement("h3");
            heading.textContent = title;

            // media info
            const details = document.createElement("p");
            details.textContent =
            `${category} | ${status} | ${rating}/10`;

            // media review
            const reviewText = document.createElement("p");
            reviewText.textContent = review || "No review yet.";

            // add content to card
            card.append(heading, details, reviewText);

            return card;
        }
    );

    // display cards
    mediaContainer.replaceChildren(...cards);

    // update total entries
    totalEntries.textContent = mediaLibrary.length;
}

// initialize app

renderLibrary();