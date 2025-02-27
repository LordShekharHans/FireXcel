"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>Application Received</h1>
      <p>Your application has been received successfully.</p>
      <p>
        Application ID: <span className="font-bold">F6/DFS/MS/{id}</span>
      </p>
      <div className="flex gap-4 flex-wrap py-4">
        <Button asChild>
          <Link href={`/user/applicant/application/documents/${id}`}>
            Proceed to Submit Documents
          </Link>
        </Button>
        <Button asChild>
          <Link href="/user/applicant/application">View All Applications</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
