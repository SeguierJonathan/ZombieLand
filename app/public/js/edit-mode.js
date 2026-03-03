

function toggleEdit(id) {

    console.log(id);

    const cardId = document.getElementById(id);

    const views = cardId.querySelectorAll(".view");
    const edits = cardId.querySelectorAll(".edit");

    views.forEach(view => {
        view.classList.toggle("hidden");
    });

    edits.forEach(edit => {
        edit.classList.toggle("hidden");
    });

    console.log("views :", views);
    console.log("edits :", edits);

}
