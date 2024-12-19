export const useMyScrollSpy = ({ scrollTo }) => {
  setTimeout(() => {
    const section = document.getElementById(scrollTo);
    if (section) {
      const sectionY =
        section.getBoundingClientRect().top + window.pageYOffset - 200;
      window.scrollTo({ top: sectionY, behavior: "smooth" });
    }
  }, 300);
};
