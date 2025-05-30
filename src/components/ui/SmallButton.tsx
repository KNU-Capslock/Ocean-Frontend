const SmallButton = ({ ...props }) => {
  return (
    <button
      {...props}
      className={
        "flex px-4 py-1 text-sm cursor-pointer  font-bold items-center justify-center text-black bg-white rounded-2xl shadow-2xl "
      }
    >
      {props.children}
    </button>
  );
};

export default SmallButton;
