import { useState } from "react";

function CategoryItem({ label, subItems = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="hover:text-orange-500 transition">{label}</button>
      {subItems.length > 0 && open && (
        <div className="absolute top-6 left-0 bg-white border shadow-md rounded-md w-40 z-50">
          {subItems.map((item) => (
            <div
              key={item}
              className="px-4 py-2 text-sm hover:bg-orange-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
