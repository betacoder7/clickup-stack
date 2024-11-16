import { useState } from 'react';
import Switch from '@mui/material/Switch'; // Import MUI Switch component

// Custom Switch Component
function SwitchItem({ name, size, defaultChecked }) {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleToggle = (event) => {
        setIsChecked(event.target.checked);
        console.log(isChecked, name, "ischecked");

    };

    return (
        <div className="">
            <Switch
                checked={isChecked}
                onChange={handleToggle}
                size={size}
            />
        </div>
    );
}

export default SwitchItem;