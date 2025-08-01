document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("meter"); // your canvas element
  const valueField = document.getElementById("meter-value");
  if (!target) {
    console.error("Canvas element with id 'meter' not found.");
    return;
  }
  const isColored = target.getAttribute("data-colored") === "true";

  const opts = {
    angle: -0.29,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
      length: 0.31,
      strokeWidth: 0.02,
      color: "#FF553C",
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: "#FF553C",
    colorStop: "#FF553C",
    strokeColor: "#F6F6F6",
    generateGradient: true,
    highDpiSupport: true,
  };
  if (isColored) {
    opts.percentColors = [
      [0.0, "#FF0000"], // red
      [0.5, "#FFFF00"], // yellow
      [1.0, "#00FF00"], // green
    ];
  }

  let gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 100;
  gauge.setMinValue(0);
  gauge.animationSpeed = isColored ? 50 : 32;
  gauge.setTextField(valueField);

  const initialValue = parseInt(target.getAttribute("data-value"), 10) || 0;
  const redirectUrl = target.getAttribute("data-redirect");

  updateGauge(initialValue, redirectUrl);

  function updateGauge(value, redirectUrl) {
    gauge.set(value);
    valueField.textContent = value;
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3500);
    }
  }
});
