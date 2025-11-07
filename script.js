// Var Definitions

pnckey = "q"; //Key used for quickly replacing the tab with a school-safe oneq

//Opens a about:blank tab with either a <iframe> or a <embed>
function aboutBlank(url, type) {
  var urlObj = new window.URL(window.location.href);
  if (url) {
    var win;
    if (win) {
      win.focus();
    } else {
      win = window.open();
      win.document.body.style.margin = "0";
      win.document.body.style.height = "100vh";
      var iframe = win.document.createElement(type);
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.margin = "0";
      iframe.src = url;
      win.document.body.appendChild(iframe);
      win.document.title =
        "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
      var link = win.document.querySelector("link[rel~='icon']");
      if (!link) {
        link = win.document.createElement("link");
        link.rel = "icon";
        win.document.head.appendChild(link);
      }
      link.href = "https://www.ixl.com/ixl-favicon.png";
    }
  }
}

document.head = document.head || document.getElementsByTagName("head")[0];

function changeFavicon(src) {
  var link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}
//Replaces the current tab with the specified url and (usually) overwrites history
function replace(url) {
  window.location.replace(url);
}

// Function to load a game into the game container
function loadGame(gameurl) {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `<embed src="${gameurl}" width="100%" height="100%" frameborder="0"></embed>`;
  document.getElementById("url-input").value = gameurl;
}
//Function ran when index.html is loaded, loads about:blank main.html and replaces parent with ixl.com
function init() {
  str = window.location.href;
  mainpage = str.substring(0, str.lastIndexOf("/")) + "/main.html";
  aboutBlank(mainpage, "embed");
  replace("https://ixl.com");
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
  const gameContainer = document.getElementById("game-container");

  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.mozRequestFullScreen) {
    gameContainer.mozRequestFullScreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  } else if (gameContainer.msRequestFullscreen) {
    gameContainer.msRequestFullscreen();
  }
}
document.onkeydown = (e) => {
  console.log("Keydown");
  switch (e.key) {
    case pnckey:
      e.preventDefault();
      e.stopPropagation();
      replace("https://ixl.com");
  }
};
document.addEventListener('keypress', function(event) {
  // Check if the pressed key is the 'Escape' key (adjust as needed)
  if (event.key === '0') {
    // Attempt to close the current window/tab
    window.close();
  }
});
/**
 * Snow Theme - Add beautiful snowfall effect to any website
 * https://github.com/ddosnotification/snow-theme
 * MIT License
 */
(function() {
    // Create and inject CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .snowflake {
            position: fixed;
            top: -10px;
            color: white;
            font-size: 1em;
            font-family: Arial, sans-serif;
            text-shadow: 0 0 5px rgba(255,255,255,0.7);
            filter: drop-shadow(0 0 10px white);
            cursor: default;
            user-select: none;
            z-index: 999999;
            pointer-events: none;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes snowfall {
            0% {
                transform: translateY(0vh) translateX(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) translateX(20px) rotate(360deg);
            }
        }

        #snow-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
        }
    `;
    document.head.appendChild(styleSheet);

    // Configuration options
    const config = {
        snowflakes: ['❄', '❅', '❆'],      // Snowflake characters
        density: 50,                        // Maximum number of snowflakes
        interval: 200,                      // Interval between snowflake creation (ms)
        minSize: 0.8,                      // Minimum snowflake size
        maxSize: 1.5,                      // Maximum snowflake size
        minDuration: 5,                    // Minimum animation duration (s)
        maxDuration: 15,                   // Maximum animation duration (s)
        wind: 20,                          // Maximum wind effect (px)
        zIndex: 999999                     // z-index for the container
    };

    // Create container for snowflakes
    const container = document.createElement('div');
    container.id = 'snow-container';
    document.body.appendChild(container);

    // Create a single snowflake
    function createSnowflake() {
        if (container.children.length >= config.density) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = config.snowflakes[Math.floor(Math.random() * config.snowflakes.length)];

        // Random properties
        const startPositionX = Math.random() * window.innerWidth;
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
        const windOffset = Math.random() * config.wind;

        // Apply styles
        Object.assign(snowflake.style, {
            left: startPositionX + 'px',
            transform: `scale(${size})`,
            opacity: Math.random() * 0.6 + 0.4,
            animation: `snowfall ${duration}s linear infinite`
        });

        // Add to container and set cleanup
        container.appendChild(snowflake);
        setTimeout(() => snowflake.remove(), duration * 1000);
    }

    // Start snowfall effect
    function startSnowfall() {
        // Create initial batch
        for (let i = 0; i < 10; i++) createSnowflake();
        
        // Continue creating snowflakes
        setInterval(createSnowflake, config.interval);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const snowflakes = container.getElementsByClassName('snowflake');
        for (let flake of snowflakes) {
            if (parseInt(flake.style.left) > window.innerWidth) {
                flake.style.left = Math.random() * window.innerWidth + 'px';
            }
        }
    });

    // Start the effect
    startSnowfall();

    // Expose configuration to window for customization
    window.SnowTheme = {
        config: config,
        container: container,
        start: startSnowfall,
        createSnowflake: createSnowflake
    };
})();