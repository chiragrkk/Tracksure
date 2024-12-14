import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/consumer/Sidebar";
import { useAuthUser } from "@hooks/useAuthUser";
import ProductsCard from '@components/consumer/ProductsCard';
import HistoryCard from "@components/consumer/HistoryCard";
import TrackingCard from "@components/consumer/TrackingCard";

const Dashboard = () => {
  const { userInfo } = useAuthUser();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
              <h1 className="text-6xl font-bold text-white text-center px-4">
                HELLO, {userInfo?.name}!
              </h1>
            </div>
            <div className="flex-1 p-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 my-4">
                <ProductsCard />
                <HistoryCard />
                <TrackingCard />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard;
