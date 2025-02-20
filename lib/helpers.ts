function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function isGalaxyS() {
  const userAgent = navigator.userAgent.toLowerCase();
  const galaxySRegex = /samsung.*sm-g(?:9|95|96|97|98|99)/i;
  return galaxySRegex.test(userAgent);
}

function isPC() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
  ];

  // Check if the user agent doesn't contain any mobile keywords
  const notMobile = !mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Check if it's not a tablet (based on screen size)
  const notTablet = window.innerWidth > 1024 || window.innerHeight > 1024;

  return notMobile && notTablet;
}

const isIOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    /iphone|ipad|ipod/.test(userAgent) ||
    (userAgent.includes("mac") && "ontouchend" in document)
  );
};

const isSafari = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    userAgent.includes("safari") &&
    !userAgent.includes("chrome") &&
    !userAgent.includes("android")
  );
};

function randomHSLA() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  const a = (Math.random() * 0.48).toFixed(2);
  return {
    hsla: `hsla(${h}, ${s}%, ${l}%, ${a})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

const toPascalCase = (str: string) => {
  // Input validation
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  if (str.trim().length === 0) {
    throw new Error("Input string cannot be empty");
  }

  // Handle special cases
  if (str.indexOf("_") === -1) {
    // If there are no underscores, just capitalize the first letter
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Split the string by underscores and handle each word
  return str
    .split("_")
    .map((word) => {
      // Handle empty segments
      if (word.length === 0) return "";

      // Special handling for acronyms (optional)
      if (word.toUpperCase() === word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      // Normal case: capitalize first letter, lowercase rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

const chunkArray = (arr: any[], size: number) => {
  if (size <= 0) throw new Error("Chunk size must be a positive integer");
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

export {
  isMobile,
  isGalaxyS,
  isPC,
  isIOS,
  isSafari,
  randomHSLA,
  toPascalCase,
  chunkArray,
};
