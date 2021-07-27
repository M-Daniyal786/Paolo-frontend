import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
import Overlay from "../Overlay/Overlay";
import CloseIcon from "@material-ui/icons/Close";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const DragableImage = (props) => {
  const { index, src, alt, selected, onSelect, dropable, onRearrangeImages } =
    props;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.IMAGE,
      item: { id: index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      drop: (item, monitor) => onRearrangeImages(index, item.id),
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <img
        style={{
          opacity: isDragging ? 0.5 : 1,
          filter: isOver ? "blur(5px)" : "blur(0px)",
          border: selected ? "1px solid yellow" : "none",
        }}
        ref={dropable ? drop : drag}
        alt={alt ? alt : `uploaded ${index}`}
        src={src}
        onClick={onSelect}
      />
      {dropable ? (
        <div
          ref={drag}
          style={
            isDragging
              ? {
                  width: "33.3%",
                  height: "100%",
                }
              : {}
          }
          className="dragable-icon"
        >
          <DragHandleIcon fontSize="small" />
        </div>
      ) : null}
    </>
  );
};

export default DragableImage;
