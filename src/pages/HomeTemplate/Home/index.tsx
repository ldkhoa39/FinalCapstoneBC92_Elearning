import Hero from "../Home/Hero"; 

const Home = () => {
  return (
    <>
      <Hero />
      {/* danh sách khóa học sẽ nằm ở đây */}
      <div className="container mx-auto py-10">
        <h2 className="text-accent-cyan text-2xl font-bold px-4">KHÓA HỌC PHỔ BIẾN</h2>
      </div>
    </>
  );
};

export default Home;