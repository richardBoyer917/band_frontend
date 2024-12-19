const HeaderWrapper = ({ content }) => (
  <header className="scrollWrapper">
    <div className="headerScroll">
      <div className="container">{content}</div>
    </div>
  </header>
);

export default HeaderWrapper;
