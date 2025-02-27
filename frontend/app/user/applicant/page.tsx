"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { ApplicationList } from "./application/components/ApplicationList";

const ApplicantDashboard = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-slate-600" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Apply For Nocs</h1>

      <div className="flex-col md:flex-col lg:flex gap-5 mx-4 py-5 w-64">
        <Button asChild className="mb-5">
          <Link href="/user/applicant/application/new">Apply for NOC</Link>
        </Button>

        <Button asChild className="mb-5">
          <Link href="/user/applicant/application/new/hi">
            एनओसी के लिए आवेदन करें
          </Link>
        </Button>

        <Button asChild className="mb-5">
          <Link href="/user/applicant/application/new/pun">
            ਐਨਓਸੀ ਲਈ ਅਰਜ਼ੀ ਕਰੋ
          </Link>
        </Button>

        <Button asChild className="mb-5">
          <Link href="/user/applicant/application/new/tam">
            ஏன்ஒசிக்கு விண்ணப்பிக்கவும்
          </Link>
        </Button>

      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Previous Applications</h1>
          <p className="text-muted-foreground">View all your submitted applications</p>
        </div>
        <ApplicationList />
      </div>
    </div>
  );
};

export default ApplicantDashboard;
