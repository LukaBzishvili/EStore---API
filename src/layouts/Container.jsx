const Container = ({ children }) => {
  return (
    <div className="max-w-screen-2xl flex flex-row items-center justify-evenly flex-wrap gap-[50px] overflow-hidden">
      {children}
    </div>
  );
};

export default Container;
