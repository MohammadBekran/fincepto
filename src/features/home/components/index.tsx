import HomeSummaryCards from "@/features/home/components/home-summary-cards";
import HomeCharts from "@/features/home/components/home-charts";

const Home = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto pb-10 -mt-24">
      <HomeSummaryCards />
      <HomeCharts />
    </div>
  );
};

export default Home;
