"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

type Document = {
  documentId: string;
  applicationId: number;
  documentType: string;
  documentPath: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
};

const docref = [
  {
    name: "Aadhar Card",
    help: "",
    key: "aadhar_card",
  },
  {
    name: "PAN Card",
    help: "",
    key: "pan_card",
  },
  {
    name: "Reference letter from local authority",
    help: "",
    key: "reference_letter",
  },
  {
    name: "Approved layout plan with letter of competent authority",
    help: "In case of government buildings",
    key: "govt_buildings",
  },
  { name: "Key and layout plan", help: "", key: "key_layout" },
  {
    name: "Architectural plans duly marked with fire and life safety systems",
    help: "",
    key: "architectural_plans",
  },
  { name: "Section & Elevation", help: "", key: "section_elevation" },
  {
    name: "Automatic sprinkler system drawings along with calculations as per IS 15105",
    help: "wherever required",
    key: "sprinkler_system",
  },
  {
    name: "Smoke management drawings, lift / staircase pressurization, along with calculations as per NBC",
    help: "wherever required",
    key: "smoke_management",
  },
];

const DocumentSection = ({ documents }: { documents: Document[] }) => {
  const [docs, setDocs] = useState<Document[]>(documents);

  return (
    <div className="flex flex-col gap-4">
      {docs.map((document) => (
        <div
          key={document.documentId}
          className="flex items-center justify-between"
        >
          <p>{docref.find((doc) => doc.key === document.documentType)?.name}</p>
          <div className="flex gap-2">
            <Button variant={"outline"} asChild>
              <Link href={document.documentPath} target="_blank">
                View
              </Link>
            </Button>
            {document?.isApproved ? (
              <Button variant={"secondary"}>Approved</Button>
            ) : (
              <Button
                onClick={async () => {
                  try {
                    setDocs(
                      docs.map((doc) => {
                        if (doc.documentId === document.documentId) {
                          return {
                            ...doc,
                            isApproved: true,
                          };
                        }
                        return doc;
                      })
                    );

                    await axios.patch(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/approve/${document.documentId}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "auth_token"
                          )}`,
                        },
                      }
                    );
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Approve
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentSection;
