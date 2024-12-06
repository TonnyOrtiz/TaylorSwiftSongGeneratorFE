import React from 'react';

const Slider = ({ temperature, setTemperature }) => {
  const handleChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  return (
    <div>
      <input class = "slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={temperature}
        onChange={handleChange}
      />
      <p>Value: {temperature.toFixed(2)}</p>
    </div>
  );
};

export default Slider;
