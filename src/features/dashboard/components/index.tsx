import DashboardSummaryCards from "@/features/dashboard/components/dashboard-summary-cards";
import DashboardCharts from "@/features/dashboard/components/dashboard-charts";

const Dashboard = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto pb-10 -mt-24">
      <DashboardSummaryCards />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
