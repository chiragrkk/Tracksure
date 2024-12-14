import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/seller/Sidebar";
import ProductCard from '@components/seller/ProductsPage';
import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import app from "@services/firebase";
import { useAuthUser } from "@hooks/useAuthUser";
import { Product } from "@schemas/productSchema";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@lib/utils"

const History = () => {
  const db = getFirestore(app);
  const { user } = useAuthUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false); // State to manage the dialog box visibility
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    temperatureRange: { min: 0, max: 0 },
    humidityRange: { min: 0, max: 0 },
    // expiryDate: undefined,
    expiryDate: new Date(),
    imageURL: "",
  });

  const fetchProducts = async () => {
    try {
      if (user) {
        const productsQuery = query(
          collection(db, "products"),
          where("sellerID", "==", user.uid)
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

  const handleRemove = async (productID: string) => {
    try {
      const productDocRef = doc(db, "products", productID);
      await deleteDoc(productDocRef);
      toast.success("Product removed successfully.");
      fetchProducts(); // Ensure the list is refreshed after removal
    } catch (error) {
      console.error("Error removing product: ", error);
      toast.error("Failed to remove product.");
    }
  };

  const handleSave = async (productID: string, quantity: number, price: number) => {
    try {
      const productDocRef = doc(db, "products", productID);
      await updateDoc(productDocRef, {
        quantity: quantity,
        price: price,
        updatedAt: new Date()
      });
      fetchProducts();
      toast.success("Product updated successfully.");  
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error("Failed to update product.");
    }
  };

  const handleCreateProduct = async () => {
    try {
      if (user) {
        const docRef = await addDoc(collection(db, "products"), {
          ...newProduct,
          sellerID: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Set the generated product ID to the product record
        await updateDoc(docRef, {
          productID: docRef.id,
        });

        fetchProducts();
        setOpen(false); // Close dialog after saving the product
        toast.success("Product created successfully.");
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      toast.error("Failed to create product.");
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
              <div className="flex justify-end mb-4">
                {/* Open Dialog to add new product */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>Add New Product</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Product Name */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Product Name</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>

                      {/* Price */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>

                      {/* Quantity */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>

                      {/* Temperature Range */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="temperatureRange" className="text-right">Temperature Range</Label>
                        <div className="col-span-3 flex gap-2">
                          <Input
                            type="number"
                            value={newProduct.temperatureRange.min}
                            onChange={(e) => setNewProduct({ ...newProduct, temperatureRange: { ...newProduct.temperatureRange, min: Number(e.target.value) } })}
                            placeholder="Min"
                          />
                          <Input
                            type="number"
                            value={newProduct.temperatureRange.max}
                            onChange={(e) => setNewProduct({ ...newProduct, temperatureRange: { ...newProduct.temperatureRange, max: Number(e.target.value) } })}
                            placeholder="Max"
                          />
                        </div>
                      </div>

                      {/* Humidity Range */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="humidityRange" className="text-right">Humidity Range</Label>
                        <div className="col-span-3 flex gap-2">
                          <Input
                            type="number"
                            value={newProduct.humidityRange.min}
                            onChange={(e) => setNewProduct({ ...newProduct, humidityRange: { ...newProduct.humidityRange, min: Number(e.target.value) } })}
                            placeholder="Min"
                          />
                          <Input
                            type="number"
                            value={newProduct.humidityRange.max}
                            onChange={(e) => setNewProduct({ ...newProduct, humidityRange: { ...newProduct.humidityRange, max: Number(e.target.value) } })}
                            placeholder="Max"
                          />
                        </div>
                      </div>

                      {/* Expiry Date */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expiryDate" className="text-right">Expiry Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !newProduct.expiryDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {newProduct.expiryDate ? format(newProduct.expiryDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newProduct.expiryDate}
                              onSelect={(e) => setNewProduct({ ...newProduct, expiryDate: e })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Image URL */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageURL" className="text-right">Image URL</Label>
                        <Input
                          id="imageURL"
                          value={newProduct.imageURL}
                          onChange={(e) => setNewProduct({ ...newProduct, imageURL: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="button" onClick={handleCreateProduct}>
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

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
                      onRemove={() => handleRemove(product.productID)}
                      onSave={(quantity, price) => handleSave(product.productID, quantity, price)}
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
