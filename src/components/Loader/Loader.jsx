import { ThreeDots } from "react-loader-spinner";

const Loader = ({ height = "100vh" }) => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#87d28d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
      wrapperClass=""
    />
  );
};

export default Loader;
