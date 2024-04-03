const ItemCardImage = ({ imageUrl, name }) => {
  return (
    <img
      style={{
        width: "100%",
        objectFit: "cover",
        maxHeight: "200px",
      }}
      src={imageUrl}
      alt={name}
    />
  );
};


export default ItemCardImage;