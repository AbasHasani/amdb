import Content from "../../../components/HoverContent";

const Page = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-5">
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <Content key={i} />
          ))}
      </div>
    </div>
  );
};

export default Page;
