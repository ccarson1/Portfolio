

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const cards = document.querySelectorAll('.project-card');
for (let c = 0; c < cards.length; c++) {
    cards[c].addEventListener("click", function () {
        id = cards[c].id
        console.log(`ID: ${id} is type ${typeof (id)}`);


        window.location.href = "/project/" + id + "/";
    });
}

