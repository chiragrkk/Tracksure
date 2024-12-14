import { useEffect, useState } from "react";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import Sidebar from "@components/admin/Sidebar";
import UserCard from "@components/admin/Usercard";
import app from "@services/firebase";
import { collection, query, where, getDocs, getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { defaultUser } from "@schemas/userSchema";
import toast from "react-hot-toast";

const Users = () => {
  const db = getFirestore(app);
  const [users, setUsers] = useState<defaultUser[]>([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = async (uid: string, role: string, rfID?: string, sensorID?: string) => {
    try {
      const userDoc = doc(db, "users", uid);
      const updateData: Record<string, string> = { role };
      if (rfID) updateData.rfID = rfID;
      if (sensorID) updateData.sensorID = sensorID;
      await updateDoc(userDoc, updateData);
      if (role === "transporter") {
        const transporterRef = collection(db, "transporters");
        const transporterDoc = doc(transporterRef);
        await setDoc(transporterDoc, { transporterID: uid, isAvailable: true });
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "unassigned"));
        const querySnapshot = await getDocs(q);
        const users: defaultUser[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as defaultUser);
        });
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-4">
            {loading ? (
              <div>Loading...</div>
            ) : users.length > 0 ? (
              users.map((user) => (
                <UserCard key={user.uid} userInfo={user} onSubmit={onSubmit} />
              ))
            ) : (
              <div>No unassigned users found</div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Users;
