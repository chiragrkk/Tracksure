import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { UserCog } from "lucide-react"
import { defaultUser } from "@schemas/userSchema"

interface UserCardProps {
  userInfo: defaultUser
  onSubmit: (uid: string, role: string, rfID: string, sensorID: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ userInfo, onSubmit }) => {
  const [role, setRole] = useState<string | null>(null)
  const [rfid, setRfid] = useState<string>("")
  const [sensor, setSensor] = useState<string>("")

  const handleButtonClick = () => {
    if (role) {
      onSubmit(userInfo.uid, role, rfid, sensor);
    }
  }

  return (
    <Card className="h-[200px] overflow-y-auto mx-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{userInfo.name}</CardTitle>
        <UserCog className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm font-medium">{userInfo.email}</div>
        <Select onValueChange={(value) => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="consumer">Consumer</SelectItem>
            <SelectItem value="transporter">Transporter</SelectItem>
          </SelectContent>
        </Select>
        {role === "transporter" && (
          <>
            <Input placeholder="RFID" value={rfid} onChange={(e) => setRfid(e.target.value)} />
            <Input placeholder="SENSOR" value={sensor} onChange={(e) => setSensor(e.target.value)} />
          </>
        )}
        <Button className="w-full" onClick={handleButtonClick}>
          Set User
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserCard
