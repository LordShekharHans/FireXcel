"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Plus, UserMinus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Inspector {
  userId: number;
  name: string;
  email: string;
  inspector: {
    inspectorId: number;
    assignedAdminId: number;
    region: "CENTRAL" | "EAST" | "WEST" | "SOUTH" | "SOUTH WEST" | "NORTH WEST";
  };
}

const Page = () => {
  const [inspectors, setInspectors] = useState<Inspector[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newInspector, setNewInspector] = useState({
    name: "",
    email: "",
    password: "",
    region: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/inspectors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setInspectors(response?.data);
    };

    fetchData();
  }, []);

  const handleCreateInspector = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/create-inspector`,
        {
          ...newInspector,
          assignedAdminId: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      setInspectors([...inspectors, data?.user]);
      setNewInspector({ name: "", email: "", password: "", region: "" });

      toast({
        title: "Inspector Added",
        description: "Inspector has been successfully added.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to add inspector. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReleaseInspector = async (inspectorId: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/release-inspector/${inspectorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setInspectors(
        inspectors.filter(
          (inspector) => inspector?.inspector?.inspectorId !== inspectorId
        )
      );
      toast({
        title: "Inspector Released",
        description: "Inspector has been successfully released.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to release inspector. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredInspectors = inspectors.filter((inspector) =>
    inspector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Inspectors</h1>
      <p className="text-foreground">Manage assigned inspectors</p>

      <div className="flex justify-between items-center mb-4 py-4">
        <Input
          placeholder="Search inspectors"
          className="w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4">
              <Plus className="mr-2" /> Add Inspector
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Inspector</SheetTitle>
              <SheetDescription>
                Add a new inspector to the system.
              </SheetDescription>
            </SheetHeader>
            <form className="my-4" onSubmit={(e) => handleCreateInspector(e)}>
              <Label>Inspector Name</Label>
              <Input
                placeholder="Name"
                className="mb-2"
                type="text"
                value={newInspector.name}
                onChange={(e) =>
                  setNewInspector({ ...newInspector, name: e.target.value })
                }
                required
              />
              <Label>Inspector Email</Label>
              <Input
                placeholder="Email"
                className="mb-2"
                type="email"
                value={newInspector.email}
                onChange={(e) =>
                  setNewInspector({ ...newInspector, email: e.target.value })
                }
                required
              />
              <Label>Inspector Password</Label>
              <Input
                placeholder="Password"
                className="mb-2"
                type="password"
                value={newInspector.password}
                onChange={(e) =>
                  setNewInspector({ ...newInspector, password: e.target.value })
                }
                required
              />

              <Label>Inspector Region</Label>
              <Select
                name="region"
                required
                onValueChange={(value) => {
                  setNewInspector({ ...newInspector, region: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose the region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CENTRAL">CENTRAL</SelectItem>
                  <SelectItem value="SOUTH">SOUTH</SelectItem>
                  <SelectItem value="EAST">EAST</SelectItem>
                  <SelectItem value="WEST">WEST</SelectItem>
                  <SelectItem value="SOUTH WEST">SOUTH WEST</SelectItem>
                  <SelectItem value="NORTH WEST">NORTH WEST</SelectItem>
                </SelectContent>
              </Select>

              <SheetClose asChild>
                <Button type="submit" className="mt-4">
                  Add Inspector
                </Button>
              </SheetClose>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Region</th>
              <th className="py-2 px-4 border-b">Release</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspectors.map((inspector) => (
              <tr key={inspector.userId}>
                <td className="py-2 px-4 border-b">{inspector.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  {inspector.email}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {inspector.inspector.region}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="secondary">
                        <UserMinus className="mr-2 h-4 w-4 text-red-600" />{" "}
                        Release
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will release the inspector from your
                          jurisdiction.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            onClick={async () => {
                              await handleReleaseInspector(
                                inspector?.inspector?.inspectorId
                              );
                            }}
                          >
                            Release Inspector
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
