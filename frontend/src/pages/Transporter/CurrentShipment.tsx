import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/transporter/Sidebar";
import CurrentShipment from "@components/transporter/CurrentShipment";

const CurrentShipments = () => {

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full w-full items-center justify-center">
            <CurrentShipment />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default CurrentShipments;
