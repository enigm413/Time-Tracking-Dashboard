# Time Tracking Dashboard

A responsive time tracking dashboard built with HTML, CSS, and vanilla JavaScript. This project features a dynamic data visualization system with async data fetching from JSON, interactive time period switching, and a sophisticated grid-based layout that adapts seamlessly across all devices.

## Preview

The dashboard displays an interactive personal time tracking interface featuring:

- User profile card with selectable time periods (Daily, Weekly, Monthly)
- Six activity tracking cards with color-coded categories
- Dynamic data loading from JSON file
- Real-time content updates when switching time periods
- Custom SVG icons for each activity type
- Smooth hover effects and interactive states
- Fully responsive grid layout across all devices

### Project Preview

![Project Preview](./Images/screenshots/desktop-preview.png)

## Features

- 🎨 Modern, dark-themed dashboard design
- 📱 Fully responsive across 5 breakpoints (Desktop, Small Laptop, Large Tablet, Small Tablet, Mobile)
- 🔄 Dynamic data loading with Fetch API and async/await
- 📊 Three time period views (Daily, Weekly, Monthly)
- 💫 Smooth CSS transitions and hover effects
- 🔤 Google Fonts integration (Rubik)
- ♿ Semantic HTML structure
- 🎯 State management for active time period tracking
- 📦 Lightweight vanilla JavaScript (no frameworks)
- 🎨 Color-coded activity categories with SVG icons
- 📈 Template literals for dynamic HTML generation
- 🖱️ Interactive card hover states

## Technologies Used

- HTML5
- CSS3 (CSS Grid & Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Rubik)
- JSON for data storage
- Fetch API
- Async/Await

## Project Structure

```
project-root/
│
├── index.html              # Main HTML file
├── Stylesheets/
│   ├── style.css           # Main stylesheet
│   └── query.css           # Responsive media queries
├── script.js               # JavaScript functionality
├── data.json               # Time tracking data
├── README.md               # Project Documentation
└── Images/
    ├── image-jeremy.png             # User profile photo
    ├── icon-work.svg                # Work activity icon
    ├── icon-play.svg                # Play activity icon
    ├── icon-study.svg               # Study activity icon
    ├── icon-exercise.svg            # Exercise activity icon
    ├── icon-social.svg              # Social activity icon
    ├── icon-self-care.svg           # Self care activity icon
    ├── icon-ellipsis.svg            # Menu icon
    └── screenshots/
        ├── desktop-preview.png      # Desktop screenshot
        ├── large-tablet-preview.png # Large tablet screenshot
        ├── small-tablet-preview.png # Small tablet screenshot
        └── mobile-preview.png       # Mobile screenshot
```

## Usage

The dashboard functionality works automatically:

1. On page load, displays "Weekly" time data by default
2. Click "Daily" to view yesterday's tracked hours
3. Click "Weekly" to view last week's tracked hours
4. Click "Monthly" to view last month's tracked hours
5. All six activity cards update dynamically
6. Hover over cards for interactive visual feedback

No additional configuration required!

## Design Specifications

### Colors

#### Background & Cards

- **Page Background**: `hsl(226, 43%, 10%)` - Very dark blue
- **Card Background**: `hsl(235, 46%, 20%)` - Dark desaturated blue
- **Card Hover**: `hsl(236, 35%, 30%)` - Lighter blue on hover
- **Profile Card**: `hsl(246, 80%, 60%)` - Bright blue violet

#### Activity Card Colors

- **Work**: `hsl(15, 100%, 70%)` - Light red/orange
- **Play**: `hsl(195, 74%, 62%)` - Soft cyan
- **Study**: `hsl(348, 100%, 68%)` - Light red
- **Exercise**: `hsl(145, 58%, 55%)` - Lime green
- **Social**: `hsl(264, 64%, 52%)` - Violet
- **Self Care**: `hsl(43, 84%, 65%)` - Soft orange

#### Text Colors

- **Primary Text**: `#fff` - White
- **Inactive Tags**: `hsl(235, 45%, 61%)` - Desaturated blue
- **Active Tag**: `#fff` - White
- **Previous Time**: `hsl(236, 100%, 87%)` - Very pale blue

### Typography

- **Font Family**: Rubik (Google Fonts)
- **Base Font Size**: 16px (1.6rem)
- **Profile Name**: 44px (4.4rem), weight: 100
- **Dashboard Title**: 16px (1.6rem), weight: 300
- **Card Title**: 18px (1.8rem), weight: 500
- **Current Time**: 56px (5.6rem), weight: 100
- **Previous Time**: 16px (1.6rem), weight: 400
- **Tags**: 18px (1.8rem)

### Layout

#### Desktop (>1260px)

- **Grid Columns**: 4 equal columns
- **Max Width**: 1120px (112rem)
- **Gap**: 20px (2rem)
- **Profile Card**: Spans 2 rows vertically
- **Card Padding**: 24px 28px (2.4rem 2.8rem)

#### Small Laptop (≤1260px)

- **Max Width**: 1040px (104rem)
- **HTML Font Size**: 56.25% (9px base)
- **Profile Card Padding**: 28px 20px 36px
- **Tags Gap**: 20px (2rem)

#### Large Tablet (≤1000px)

- **Grid Columns**: 3 equal columns
- **HTML Font Size**: 50% (8px base)
- **Profile Card**: Full width, horizontal layout
- **Profile Image**: 128px (12.8rem)
- **Tags**: Horizontal row layout

#### Small Tablet (≤870px)

- **Grid Columns**: 2 equal columns
- **Page Padding**: 0 20px (0 2rem)
- **Profile Image**: 96px (9.6rem)
- **Profile Name**: 32px (3.2rem)
- **Text Wrapper**: Horizontal layout
- **Current Time**: 48px (4.8rem)

#### Mobile (≤670px)

- **Grid Columns**: 1 column (full stack)
- **Profile Image**: 80px (8rem)
- **Profile Name**: 28px (2.8rem)
- **Vertical layout for all elements**

### Card Specifications

- **Border Radius**: 20px (2rem)
- **Activity Icon Size**: 64px
- **Activity Icon Position**: Top right, 20px from edge
- **Profile Image Border**: 2px solid white
- **Background Icon Offset**: -4px from top, 20px from right

## JavaScript Functionality

### Data Fetching & Dynamic Rendering

```javascript
// Async function to fetch JSON data
async function getData(val) {
  const fetchData = await fetch("data.json");
  const data = await fetchData.json();
  return data[val];
}

// Dynamic card generation
async function setCard({ title, timeframes }) {
  const card = `<div class="time-tracking-card">
    <div class="title-wrapper">
      <p class="card-title">${title}</p>
      <button class="btn">
        <img src="Images/icon-ellipsis.svg" alt="dotted button" class="dotted-btn" />
      </button>
    </div>
    <div class="text-wrapper">
      <p class="tracked-time">${timeframes[currentTag].current}hrs</p>
      <p class="prev-tracked-time">${timeframeText} - ${timeframes[currentTag].previous}hrs</p>
    </div>
  </div>`;
  return card;
}

// Render all activity cards
async function renderCards() {
  cardWrapperEls.forEach(async (cardWrapperEl, index) => {
    const userData = await getData(index);
    const timeTrackingCard = await setCard(userData);
    cardWrapperEl.innerHTML = timeTrackingCard;
  });
}
```

**Features:**

- Async/await for clean asynchronous code
- Fetch API for JSON data retrieval
- Template literals for dynamic HTML
- Dynamic content injection with innerHTML
- State-based rendering

### State Management

```javascript
let currentTag = "weekly";
let prevTagEl = weeklyTagEl;
let timeframeText = "Last Week";

function handleTag(currentTagEl) {
  currentTag = currentTagEl.id;
  timeframeText =
    currentTag === "daily" ? "Yesterday" : `Last ${currentTag.slice(0, -2)}`;
  currentTagEl.classList.add("tag--selected");
  prevTagEl.classList.remove("tag--selected");
  prevTagEl = currentTagEl;
  renderCards();
}
```

**Features:**

- Track active time period
- Dynamic timeframe text generation
- Previous tag tracking for cleanup
- Class-based active state styling

## Data Structure

The `data.json` file contains time tracking information:

```json
[
  {
    "title": "Work",
    "timeframes": {
      "daily": { "current": 5, "previous": 7 },
      "weekly": { "current": 32, "previous": 36 },
      "monthly": { "current": 103, "previous": 128 }
    }
  }
]
```

**Structure:**

- Array of 6 activity objects
- Each has title and timeframes
- Three periods: daily, weekly, monthly
- Current and previous hours for each

## Responsive Breakpoints

The dashboard uses five carefully planned breakpoints:

1. **Desktop**: Above 1260px - Full 4-column grid layout
2. **Small Laptop**: 1000px - 1260px - Adjusted font sizes and spacing
3. **Large Tablet**: 870px - 1000px - 3-column grid, horizontal profile
4. **Small Tablet**: 670px - 870px - 2-column grid layout
5. **Mobile**: Below 670px - Single column stack

## Accessibility Features

- Semantic HTML with `<section>` and `<article>` elements
- Alt text for all images and icons
- Keyboard accessible interactive elements (tags)
- Sufficient color contrast for readability
- Focus states on clickable tags
- Descriptive button labels
- List semantics for time period options

## Key CSS Techniques Used

- **CSS Grid**: Complex 4-column layout with row spanning
- **Flexbox**: Card content and profile layout alignment
- **REM Units**: Scalable, accessible typography (62.5% base)
- **Media Queries**: Five responsive breakpoints in separate file
- **Background Images**: SVG icon positioning with custom offsets
- **Hover Effects**: Card background transitions and icon filters
- **Border Radius**: Consistent rounded corners (20px)
- **Filter Effects**: Brightness and invert on icon hover

## Key JavaScript Features

- **Async/Await**: Modern asynchronous programming pattern
- **Fetch API**: JSON data retrieval from local file
- **Template Literals**: Dynamic HTML string generation
- **Array Methods**: forEach for iterating card elements
- **DOM Manipulation**: Dynamic innerHTML updates
- **Event Listeners**: Click handlers for time period tags
- **State Management**: Tracking active period and previous selection
- **String Methods**: Dynamic text with slice and ternary operators
- **ES6 Syntax**: Arrow functions, const/let declarations

## Credits

This project is a solution for a Frontend Mentor challenge, designed to help improve front-end coding skills through practical dashboard development with async JavaScript, data fetching, and complex responsive layouts.

## License

This project is open source and available for personal and educational use.

---

**Built with ❤️ using HTML, CSS, Vanilla JavaScript, Async/Await, and modern web development practices**
