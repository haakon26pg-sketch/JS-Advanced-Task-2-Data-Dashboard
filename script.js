// Formål - Lage en liste der det er mulig å logge inn musikk, filmer og spill og kunne gi de vurderinger.

// dom elements

const mediaForm = document.querySelector("#mediaForm");
const mediaContainer = document.querySelector("#mediaContainer");
const totalEntries = document.querySelector("#totalEntries");

// media library array

let mediaLibrary = [];

// add new media

mediaForm.addEventListener("submit", (event) => {
    event.preventDefault();


// retrieve form information
const formData = new FormData(mediaForm);

// convert form data into object
const { title, category, rating, status, review } =
Object.fromEntries(formData, entries());

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

console.log(mediaLibrary);

// update library display
renderLibrary();

// clear form
mediaForm.reset();


});