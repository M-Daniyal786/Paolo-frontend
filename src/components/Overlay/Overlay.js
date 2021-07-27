const getOverlayColor = (type) => {
  switch (type) {
    case "Legal":
      return "Green";
    case "Illegal":
      return "red";
    default:
      break;
  }
};

const Overlay = ({ type }) => {
  const color = getOverlayColor(type);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
};

export default Overlay;