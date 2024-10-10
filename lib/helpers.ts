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

export { isMobile, isGalaxyS };
