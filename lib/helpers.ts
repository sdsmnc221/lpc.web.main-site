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

export { isMobile, isGalaxyS, isPC };
