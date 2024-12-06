import React, { useState } from 'react';

const Slider = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);

         
    };

    return (
        <div>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={handleChange}
            />
            <p>Value: {value}</p>
            
        </div>
    );
};

export default Slider;