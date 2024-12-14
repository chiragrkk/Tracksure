import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/seller/Sidebar";
import ShipmentHistory from '@components/seller/ShipmentHistory';

const History = () => {

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full w-full items-center justify-center">
            <ShipmentHistory />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default History ;
