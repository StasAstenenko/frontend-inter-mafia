import sprite from "../../icons/sprite.svg";

const Icon = ({ width, height, iconName, className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`${sprite}#${iconName}`} />
    </svg>
  );
};

export default Icon;
