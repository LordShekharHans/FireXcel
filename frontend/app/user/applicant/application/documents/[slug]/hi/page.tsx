"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const documents = [
  {
    name: "भूमि दस्तावेज़",
    help: "",
    key: "land_deed",
  },
  {
    name: "आधार कार्ड",
    help: "",
    key: "aadhar_card",
  },
  {
    name: "PAN कार्ड",
    help: "",
    key: "pan_card",
  },
  {
    name: "स्थानीय प्राधिकरण से संदर्भ पत्र",
    help: "",
    key: "reference_letter",
  },
  {
    name: "प्राधिकृत प्राधिकरण के पत्र के साथ स्वीकृत लेआउट योजना",
    help: "सरकारी भवनों के मामले में",
    key: "govt_buildings",
  },
  { name: "चाबी और लेआउट योजना", help: "", key: "key_layout" },
  {
    name: "आर्किटेक्चरल योजनाएँ जो अग्नि और जीवन सुरक्षा प्रणालियों के साथ उचित रूप से चिह्नित हैं",
    help: "",
    key: "architectural_plans",
  },
  { name: "खंड और ऊँचाई", help: "", key: "section_elevation" },
];

const Page = ({ params }: { params: { slug: number } }) => {
  const router = useRouter();

  const allDocuments = [
    "land_deed",
    "aadhar_card",
    "pan_card",
    "reference_letter",
    "govt_buildings",
    "key_layout",
    "architectural_plans",
    "section_elevation",
  ];

  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleFileUpload = async (
    applicationId: number,
    documentType: string,
    documentPath: string
  ) => {
    setUploadedDocuments((prev) => [...prev, documentType]);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/documents`,
      {
        applicationId,
        documentType,
        documentPath,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check if all documents are uploaded
    if (allDocuments.length !== uploadedDocuments.length) {
      alert("Please upload all documents");
      return;
    }

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/${params?.slug}`,
      {
        status: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );

    // redirect to next page
    router.push(`/user/applicant`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        आवेदन आईडी के लिए दस्तावेज़ अपलोड करें: {params?.slug}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc?.key}
            className="flex justify-between items-center gap-4"
          >
            <Label>
              <span>{doc?.name}</span>
              <p className="text-sm text-gray-600">{doc?.help}</p>
            </Label>
            <div className="w-1/3 space-x-4 text-right">
              {uploadedDocuments.includes(doc?.key) && (
                <span className="text-green-600 text-sm font-semibold">
                  सफल
                </span>
              )}
              <Button asChild>
                <CldUploadButton
                  uploadPreset="ml_default"
                  onSuccess={async (data) =>
                    await handleFileUpload(
                      params?.slug,
                      doc?.key,
                      data?.info?.url
                    )
                  }
                />
              </Button>
            </div>
          </div>
        ))}
        <Button type="submit">जमा करना</Button>
      </form>
    </div>
  );
};

export default Page;
