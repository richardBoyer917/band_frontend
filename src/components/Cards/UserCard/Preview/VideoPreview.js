import CustomerModal from "../../../Modals";

const VideoPreview = (props) => {
  const { open, setOpen, avatar, name } = props;

  const handleClose = () => setOpen(false);

  const content = (
    <div className="videoPreviewContainer">
      <div className="spaceBetween">
        <p
          className="cardBigTitle"
          style={{ color: "var(--secondaryWhiteColor)" }}
        >
          {name}
        </p>
        <button className="closeButton" onClick={handleClose}>
          <span className="closeIcon">&times;</span>
        </button>
      </div>
      <div>
        <video
          style={{
            width: "100%",
            height: "83%",
            marginTop: "20px",
            borderRadius: "5px",
          }}
          controls
        >
          <source src={avatar} type="video/mp4" />
        </video>
      </div>
    </div>
  );

  return <CustomerModal open={open} setOpen={setOpen} content={content} />;
};

export default VideoPreview;
