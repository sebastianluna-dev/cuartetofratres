import "./pillar.comp.css";

interface PillarProps {
  index: number;
  title: string;
  text: string;
}

// One of the three columns under the introduction. On desktop they share a
// top rule and are separated by hairlines; on the phone each becomes a card
// in a horizontal strip, with its number.
export function Pillar({ index, title, text }: PillarProps) {
  return (
    <li className="pillar">
      <span className="pillar__index" aria-hidden="true">
        0{index + 1}
      </span>
      <h3 className="pillar__title">{title}</h3>
      <p className="pillar__text">{text}</p>
    </li>
  );
}
