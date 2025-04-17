// Tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = {
  top: document.getElementById("topTab"),
  search: document.getElementById("searchTab"),
  about: document.getElementById("aboutTab")
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    Object.keys(tabContents).forEach((key) => {
      tabContents[key].classList.remove("active");
    });
    tabContents[target].classList.add("active");
  });
});

// Search Anime
const form = document.getElementById("animeForm");
const animeInput = document.getElementById("animeInput");
const resultDiv = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = animeInput.value.trim();
  if (query) fetchAnime(query);
});

clearBtn.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  animeInput.value = "";
});

animeInput.addEventListener("keyup", (e) => {
  if (e.key !== "Enter" && animeInput.value.length >= 3) {
    resultDiv.innerHTML = "<p>Hint: Press search to see result.</p>";
  }
});

function fetchAnime(query) {
  fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length > 0) {
        displayAnime(data.data[0]);
      } else {
        resultDiv.innerHTML = "<p>No anime found.</p>";
      }
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    });
}

function displayAnime(anime) {
  resultDiv.innerHTML = `
    <h2>${anime.title}</h2>
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="margin-top:15px; border-radius:12px; max-width:100%;">
    <p><strong>Japanese Title:</strong> ${anime.title_japanese}</p>
    <p><strong>Type:</strong> ${anime.type}</p>
    <p><strong>Status:</strong> ${anime.status}</p>
    <p><strong>Episodes:</strong> ${anime.episodes}</p>
    <p><strong>Score:</strong> ${anime.score}</p>
    <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
  `;
}

// Top Anime Manual Data
function showTopAnime(id) {
  const animeData = {
    frieren: {
      title: "Sousou no Frieren",
      type: "TV",
      status: "Currently Airing",
      episodes: 28,
      score: 8.9,
      synopsis: "A mage from the hero party journeys through the world long after their victory, meeting new people and discovering new meaning to life and magic.",
      img: "https://cdn.myanimelist.net/images/anime/1010/138006.jpg"
    },
    fma: {
      title: "Fullmetal Alchemist: Brotherhood",
      type: "TV",
      status: "Finished Airing",
      episodes: 64,
      score: 9.1,
      synopsis: "Two brothers seek the Philosopher's Stone to restore their bodies after a failed alchemy experiment.",
      img: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg"
    },
    steins: {
      title: "Steins;Gate",
      type: "TV",
      status: "Finished Airing",
      episodes: 24,
      score: 9.0,
      synopsis: "A self-proclaimed mad scientist discovers time travel and finds himself in a web of danger and conspiracy.",
      img: "https://cdn.myanimelist.net/images/anime/5/73199.jpg"
    }
  };

  const a = animeData[id];
  document.getElementById("topAnimeInfo").innerHTML = `
    <h3>${a.title}</h3>
    <p><strong>Type:</strong> ${a.type}</p>
    <p><strong>Status:</strong> ${a.status}</p>
    <p><strong>Episodes:</strong> ${a.episodes}</p>
    <p><strong>Score:</strong> ${a.score}</p>
    <p><strong>Synopsis:</strong> ${a.synopsis}</p>
    <img src="${a.img}" alt="${a.title}" style="margin-top:15px; border-radius:12px; max-width:100%;">
  `;
}
