const key = "a3afdd9f";
const page = document.querySelector(".page");
const menuBar = document.querySelector(".menu-bar");
const titleLeft = document.querySelectorAll(".titleLeft");
const navBar = document.querySelector(".navbar");
const pageLeft = document.querySelector(".page-left");
const searchInput = document.querySelector("#input");
const searchIcon = document.querySelector("#searchIcon");
const cards = document.querySelector("#cards");
const sign = document.querySelector("#sign");
const modal = document.querySelector("#modal");
const inputs = document.querySelectorAll(".signINput");
const cancelBtn = document.querySelector("#cancelBtn");
const okBtn = document.querySelector("#okBtn");
const favBtn = document.querySelector("#favBtn");
const likeBtn = document.querySelector("#likeBtn");
const favPage = document.querySelector(".favPage");
const likePage = document.querySelector(".likePage");
const favContent = document.querySelector(".favContent");
const likeContent = document.querySelector(".likeContent");
const backBtn = document.querySelector(".back");
const backLike = document.querySelector("#backLike");

const globalData = [];
async function getMovie() {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&s=${searchInput.value}`
    );
    const data = await res.json();

    data.Search.forEach((item) => {
      item.isFavorite = false;
      item.isLiked = false;
    });
    globalData.length = 0;
    globalData.push(...data.Search);
    
    cards.innerHTML = "";
    cards.innerHTML += data.Search.map((item, index) => {
      return `
         <div class="card">
      <figure class="photo">
        <img
          src="${item.Poster}"
          alt="${item.Title}"
        />
      </figure>
      <div class="content">
        <div>
          <h4 class="title">${item.Title}</h4>
          <p class="year">Year: ${item.Year}</p>
        </div>
        <span>
          <!-- 'data-index' düzgün təyin edildi -->
          <i class="fav fa-solid fa-bookmark" data-index="${index}"></i>
          <i class="like fa-solid fa-heart" data-index="${index}"></i>
        </span>
      </div>
    </div>
    </div>
           `;
    }).join("");

    const fav = document.querySelectorAll(".fav");
    const like = document.querySelectorAll(".like");

    fav.forEach((favIcon) => {
      favIcon.style.fontSize = "24px";
      favIcon.style.marginRight = "14px";
      favIcon.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const movie = globalData[index];
        if (movie) {
          movie.isFavorite = !movie.isFavorite;
          e.target.style.color = movie.isFavorite ? "green" : "white";
        }
      });
    });

    like.forEach((likeIcon) => {
      likeIcon.style.fontSize = "24px";
      likeIcon.style.marginRight = "14px";
      likeIcon.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const movie = globalData[index];
        if (movie) {
          movie.isLiked = !movie.isLiked;
          e.target.style.color = movie.isLiked ? "red" : "white";
        }
      });
    });
    searchInput.value = "";
  } catch (err) {
    console.log(err);
    alert("Something went wrong. Please try again later.");
  }
}

// EVENTS
searchInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getMovie();
  }
});
searchIcon.addEventListener("click", () => {
  getMovie();
});
sign.addEventListener("click", () => {
  modal.classList.remove("modal-hidden");
  modal.classList.add("modal");
});
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("modal");
  modal.classList.add("modal-hidden");
});
okBtn.addEventListener("click", () => {
  let allValid = true;
  inputs.forEach((input) => {
    const errorMsg = input.nextElementSibling;
    errorMsg.textContent = "";
    if (input.value.trim() === "") {
      allValid = false;
      errorMsg.textContent = "Zəruri";
    }
  });
  if (allValid) {
    modal.classList.remove("modal");
    modal.classList.add("modal-hidden");
  }
});

menuBar.addEventListener("click", () => {
  if (pageLeft.style.width === "80px") {
    pageLeft.style.width = "250px";
    titleLeft.forEach((item) => {
      item.style.display = "flex";
    });
  } else {
    pageLeft.style.width = "80px";
    titleLeft.forEach((item) => {
      item.style.display = "none";
    });
  }
});

favBtn.addEventListener("click", () => {
  favPage.style.display = "block";
  likePage.style.display = "none";
  page.style.display = "none";
  const favMovies = globalData.flat().filter((item) => item.isFavorite);
  favContent.innerHTML = favMovies
    .map((item) => {
      return `
          <div class="card">
            <figure class="photo">
              <img src="${item.Poster}" alt="${item.Title}" />
            </figure>
            <div class="content">
              <div>
                <h4 class="title">${item.Title}</h4>
                <p class="year">Year: ${item.Year}</p>
              </div>
            </div>
          </div>
        `;
    })
    .join("");
});

likeBtn.addEventListener("click", () => {
  likePage.style.display = "block";
  favPage.style.display = "none";
  page.style.display = "none";
  const likedMovies = globalData.flat().filter((item) => item.isLiked);
  likeContent.innerHTML = likedMovies
    .map((item) => {
      return `
        <div class="card">
          <figure class="photo">
            <img src="${item.Poster}" alt="${item.Title}" />
          </figure>
          <div class="content">
            <div>
              <h4 class="title">${item.Title}</h4>
              <p class="year">Year: ${item.Year}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
});

backBtn.addEventListener("click", () => {
  favPage.style.display = "none";
  page.style.display = "flex";
});
backLike.addEventListener("click", () => {
  likePage.style.display = "none";
  page.style.display = "flex";
  console.log("a");
  
});
