import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/transporter/Sidebar";
import SH from "@components/transporter/ShipmentHistory";

const ShipmentHistory = () => {

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 my-4">
                <SH />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default ShipmentHistory ;
