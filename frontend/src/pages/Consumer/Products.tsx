import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/consumer/Sidebar";
import ProductCard from "@components/consumer/ProductsPage";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs, setDoc, doc, where, updateDoc } from "firebase/firestore";
import app from "@services/firebase";
import { useAuthUser } from "@hooks/useAuthUser";
import { Product } from "@schemas/productSchema";
import toast from "react-hot-toast";
import { defaultUser } from "@schemas/userSchema";

const History = () => {
  const db = getFirestore(app);
  const { user, userInfo } = useAuthUser();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      if (user) {
        const productsQuery = query(
          collection(db, "products"),
        );
        const querySnapshot = await getDocs(productsQuery);
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push(data as Product);
        });
        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const assignTransporter = async (shipmentID: string) => {
    try {
      const transporterRef = collection(db, "transporters");
      const availableTransportersQuery = query(transporterRef, where("isAvailable", "==", true));
      const availableTransportersSnapshot = await getDocs(availableTransportersQuery);
      if (!availableTransportersSnapshot.empty) {
        const transporterDoc = availableTransportersSnapshot.docs[0];
        const transporterData = transporterDoc.data();
        const transporterID = transporterData.transporterID;
        await updateDoc(transporterDoc.ref, { isAvailable: false, currentShipmentID: shipmentID });
        return transporterID;
      } else {
        // TODO: Queue shipment
        console.log("No transporters available. Shipment will be queued.");
      }
    } catch (error) {
      console.error("Error assigning transporter: ", error);
    }
  };

  const handleBuy = async (productID: string, quantity: number) => {
    try {
      const productRef = collection(db, "products");
      const productQuery = query(productRef, where("productID", "==", productID));
      const productSnapshot = await getDocs(productQuery);  
      const productData = productSnapshot.docs[0].data() as Product;
      const price = productData.price;
      const totalPrice = price * quantity;

      productData.quantity -= quantity;

      const orderRef = doc(collection(db, "orders"));
      const orderID = orderRef.id;
      const shipmentRef = doc(collection(db, "shipments"));
      const shipmentID = shipmentRef.id;

      const sellerRef = collection(db, "users");
      const sellerQuery = query(sellerRef, where("uid", "==", productData.sellerID));
      const sellerSnapshot = await getDocs(sellerQuery);
      const sellerData = sellerSnapshot.docs[0].data() as defaultUser;

      const orderData = {
        orderID,
        consumerID: userInfo!.uid,
        sellerID: productData.sellerID,
        productID,
        quantity,
        price: totalPrice,
        delivered: false,
        createdAt: new Date(),
        shipmentID,
      };

      const transporterID = await assignTransporter(shipmentID);
      const shipmentData = {
        shipmentID,
        orderID,
        transporterID,
        productID,
        consumerID: userInfo!.uid,
        sellerID: productData.sellerID,
        source: sellerData.address,
        destination: userInfo!.address,
        trackingDetails: [],
        status: "pending",
        deliveredDate: null,
      };
      await setDoc(doc(db, "orders", orderID), orderData);
      await setDoc(doc(db, "shipments", shipmentID), shipmentData);
      await updateDoc(productSnapshot.docs[0].ref, { quantity: productData.quantity });

      toast.success("Order placed successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error buying product: ", error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, [user, db]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4">
              {/* Display Products */}
              <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-6 my-2 mx-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.productID}
                      name={product.name}
                      image={product.imageURL}
                      price={product.price}
                      quantity={product.quantity}
                      onBuy={(quantity) => handleBuy(product.productID, quantity)}
                    />
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default History;
