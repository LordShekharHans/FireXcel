"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>आवेदन प्राप्त</h1>
      <p>आपका आवेदन सफलतापूर्वक प्राप्त हो गया है।</p>
      <p>
        आवेदन आईडी: <span className="font-bold">F6/DFS/MS/{id}</span>
      </p>
      <div className="flex gap-4 flex-wrap py-4">
        <Button asChild>
          <Link href={`/user/applicant/application/documents/${id}`}>
            दस्तावेज़ जमा करने के लिए आगे बढ़ें
          </Link>
        </Button>
        <Button asChild>
          <Link href="/user/applicant/application">सभी अनुप्रयोग देखें</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
