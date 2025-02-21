const APILINK =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c500c37d41a61b18c1f24b2856e2e41b&page=1",
  IMG_PATH = "https://image.tmdb.org/t/p/w500",
  SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=c500c37d41a61b18c1f24b2856e2e41b&query=",
  main = document.getElementById("section"),
  form = document.getElementById("form"),
  search = document.getElementById("query"),
  homeButton = document.getElementById("home-button");
function returnMovies(e) {
  (main.innerHTML = '<p class="loading">Loading...</p>'),
    fetch(e)
      .then((e) => e.json())
      .then((e) => {
        if (((main.innerHTML = ""), 0 === e.results.length)) {
          main.innerHTML = '<p class="error">No results found.</p>';
          return;
        }
        main.classList.add("grid-container"),
          e.results.forEach((e) => {
            let t = document.createElement("div");
            t.classList.add("card");
            let a = document.createElement("img");
            a.classList.add("thumbnail"),
              a.setAttribute("loading", "lazy"),
              (a.src = e.poster_path
                ? "https://image.tmdb.org/t/p/w500" + e.poster_path
                : "placeholder.jpg");
            let r = document.createElement("h3");
            r.innerText = e.title;
            let n = document.createElement("p");
            (n.innerText = `⭐ ${e.vote_average}`),
              n.classList.add("rating"),
              t.append(a, r, n),
              main.appendChild(t);
          });
      })
      .catch(() => {
        main.innerHTML =
          '<p class="error">Failed to fetch movies. Please try again later.</p>';
      });
}
returnMovies(APILINK),
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let t = search.value;
    t &&
      ((main.innerHTML = ""),
      returnMovies(
        "https://api.themoviedb.org/3/search/movie?&api_key=c500c37d41a61b18c1f24b2856e2e41b&query=" +
          t
      ),
      (search.value = ""));
  }),
  homeButton.addEventListener("click", (e) => {
    e.preventDefault(), (main.innerHTML = ""), returnMovies(APILINK);
  });
