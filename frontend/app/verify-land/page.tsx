"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
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

const Page = () => {
  // const { slug } = useParams();
  const [approve, setApprove] = useState(false);
  const [click, setClick] = useState(false);

  const approveDocument = () => {
    setClick(true);
    setApprove(true);
  };

  const rejectDocument = () => {
    setClick(true);
  };

  const files = [
    "https://lawbhoomi.com/wp-content/uploads/2024/09/Model_Sale_Deed.pdf",
    "https://industries.cg.gov.in/pdf/ModelCodeofContract/Sale%20Deed.pdf",
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Verify Land Document - Land Deed
      </h1>
      <p className="text-lg mb-6">
        Verify the authenticity of the land deed document uploaded by the user
      </p>

      <Card className="flex gap-4 container p-4">
        <div>
          <iframe
            title="Document"
            src={`https://docs.google.com/viewer?url=${
              files[Math.floor(Math.random() * files.length)]
            }&embedded=true`}
            height={600}
            width={800}
            className="rounded-lg"
          ></iframe>
        </div>
        <div>
          <Link
            href={files[Math.floor(Math.random() * files.length)]}
            target="_blank"
            className="text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
            download={true}
          >
            Open Document in new tab
          </Link>

          <div className="my-4">
            <h2 className="my-2">Actions</h2>
            <div className="flex space-x-4 my-4">
              {click ? (
                approve ? (
                  <span>Document Approved. You may now close this tab</span>
                ) : (
                  <span>Document Rejected. You may now close this tab</span>
                )
              ) : (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-green-500 hover:bg-green-500 text-white">
                        Approve
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will approve the
                          document, for the fire department to asess further
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className="bg-green-500 hover:bg-green-500 text-white"
                            onClick={approveDocument}
                          >
                            Approve
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button variant={"destructive"} onClick={rejectDocument}>
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
