import React from "react";

const OptionsTag = ({ label }: { label: string }) => {
  return (
    <div className="p-2 bg-gray-200 text-gray-700 rounded">
      <p>{label}</p>
    </div>
  );
};

export default OptionsTag;
