<style lang="scss" scoped>
.cta {
  position: absolute;
  margin: auto;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  left: 12vw;
  top: 28vh;

  @media screen and (max-width: 768px) {
    top: unset;
    bottom: 32px;
    left: 50vw;
    transform: translateX(-50%);
  }
}

.cta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.16);
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
}

.cta span {
  position: relative;
  font-family: "Ubuntu", sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #234567;

  @media screen and (max-width: 768px) {
    font-size: var(--base-ft-size);
  }
}

.cta svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #234567;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.cta:hover:before {
  width: 100%;
  background: rgba(0, 0, 0, 0.24);
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active {
  transform: scale(0.95);
}
</style>

<template>
  <button class="cta">
    <span>Scrollez horizontalement</span>
    <svg width="15px" height="10px" viewBox="0 0 13 10">
      <path d="M1,5 L11,5"></path>
      <polyline points="8 1 12 5 8 9"></polyline>
    </svg>
  </button>
</template>
