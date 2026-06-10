import { useState } from "react";

function MultiSelectDropdown({ label, options, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const handleChange = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border rounded px-4 py-2"
      >
        {label} ▼
      </button>

      {open && (
        <div
          className="
      absolute
      bg-white
      border
      rounded
      shadow
      p-3
      z-50
      w-48
      "
        >
          {options.map((option) => (
            <label
              key={option}
              className="
      flex
      gap-2
      py-1
      "
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => {
                  handleChange(option);
                }}
              />

              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
