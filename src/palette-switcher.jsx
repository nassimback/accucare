import { useEffect, useState } from "react";
import { Check } from "@phosphor-icons/react";
import "./palette-switcher.css";
const palettes = [
  {
    id: "ocean",
    name: "Ocean blue",
    colors: ["#2463A6", "#172E49", "#F1F5FA"],
  },
  { id: "plum", name: "Soft plum", colors: ["#795374", "#342B3C", "#F8F3F6"] },
  {
    id: "clay",
    name: "Warm terracotta",
    colors: ["#A8553B", "#3D302A", "#FAF4EB"],
  },
];
export default function PaletteSwitcher() {
  const [selected, setSelected] = useState("ocean");
  useEffect(() => {
    let value = "ocean";
    try {
      const saved = localStorage.getItem("accucare-palette");
      if (palettes.some((p) => p.id === saved)) value = saved;
    } catch {}
    setSelected(value);
    document.documentElement.dataset.palette = value;
    const sync = (e) => {
      if (
        e.key === "accucare-palette" &&
        palettes.some((p) => p.id === e.newValue)
      ) {
        setSelected(e.newValue);
        document.documentElement.dataset.palette = e.newValue;
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function choose(id) {
    setSelected(id);
    document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem("accucare-palette", id);
    } catch {}
  }
  return (
    <aside
      className="palette-picker is-open"
      aria-label="Website colour palette preview"
    >
          <div
            className="palette-options"
            role="group"
            aria-label="Choose a colour palette"
          >
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => choose(p.id)}
                aria-pressed={selected === p.id}
                aria-label={`Use ${p.name} palette`}
                title={`${p.name}: ${p.colors.join(", ")}`}
              >
                <span
                  className="palette-swatch"
                  style={{
                    background: `conic-gradient(${p.colors[0]} 0 45%,${p.colors[1]} 45% 75%,${p.colors[2]} 75% 100%)`,
                  }}
                >
                  {selected === p.id && <Check size={15} weight="bold" />}
                </span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
      <span className="palette-sr" role="status">
        {palettes.find((p) => p.id === selected)?.name} palette selected
      </span>
    </aside>
  );
}
