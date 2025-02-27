"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Reject = ({ id }: { id: number }) => {
  const token = localStorage.getItem("auth_token");
  const [remarks, setRemarks] = useState("");

  const rejectApplication = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reject/${id}`,
        {
          newStatus: 9,
          newRemarks: remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Application rejected");
    } catch (error) {
      alert("Error in rejecting application");
    }
  };

  return (
    <div className="gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Reject</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Reject Application</SheetTitle>
            <SheetDescription>
              Reject the application with remarks
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Application ID
              </Label>
              <Input id="id" value={id} className="col-span-3" disabled />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Remarks
              </Label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => {
                  if (remarks === "") {
                    alert("Remarks cannot be empty");
                    return;
                  }

                  console.log("Rejecting application");
                  rejectApplication();
                }}
              >
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Reject;
