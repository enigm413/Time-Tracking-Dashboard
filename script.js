// Define Necessary DOM Elements
const cardWrapperEls = document.querySelectorAll(".time-tracking-card-wrapper");
const dailyTagEl = document.querySelector("#daily");
const weeklyTagEl = document.querySelector("#weekly");
const monthlyTagEl = document.querySelector("#monthly");

// Define Necessary Variables
let currentTag = "weekly";
let prevTagEl = weeklyTagEl;
let timeframeText = "Last Week";

//Function To Get Data
async function getData(val) {
  const fetchData = await fetch("data.json");
  const data = await fetchData.json();
  return data[val];
}

//Function To Define Card
async function setCard({ title, timeframes }) {
  const card = `<div class="time-tracking-card">
  <div class="title-wrapper">
    <p class="card-title">${title}</p>
    <button class="btn">
      <img
        src="Images/icon-ellipsis.svg"
        alt="dotted button"
        class="dotted-btn"
      />
    </button>
  </div>

  <div class="text-wrapper">
    <p class="tracked-time">${timeframes[currentTag].current}hrs</p>
    <p class="prev-tracked-time">${timeframeText} - ${timeframes[currentTag].previous}hrs</p>
  </div>
</div>`;
  return card;
}

// Function To Render Cards
async function renderCards() {
  cardWrapperEls.forEach(async (cardWrapperEl, index) => {
    const userData = await getData(index);
    const timeTrackingCard = await setCard(userData);
    cardWrapperEl.innerHTML = timeTrackingCard;
  });
}

//Funtion To Handle Tag
function handleTag(currentTagEl) {
  currentTag = currentTagEl.id;
  timeframeText =
    currentTag === "daily" ? "Yesterday" : `Last ${currentTag.slice(0, -2)}`;
  currentTagEl.classList.add("tag--selected");
  prevTagEl.classList.remove("tag--selected");
  prevTagEl = currentTagEl;
  renderCards();
}

dailyTagEl.addEventListener("click", () => handleTag(dailyTagEl));
weeklyTagEl.addEventListener("click", () => handleTag(weeklyTagEl));
monthlyTagEl.addEventListener("click", () => handleTag(monthlyTagEl));

renderCards();
