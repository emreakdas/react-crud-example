import React from "react";

function Thead({ theads }) {
  return (
    <thead>
      <tr>
        {theads.map((item, key) => (
          <th key={key} className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
