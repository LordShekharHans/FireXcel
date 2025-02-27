import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ApplicationStatus = {
  applicationStatusId: number;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

type User = {
  userId: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
};

type Application = {
  applicationId: number;
  userId: number;
  inspectionId?: number | null;
  applicationStatusId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  application_status: ApplicationStatus;
};

const ActionBody = ({ applications }: { applications: Application[] }) => {
  const groupedApplications = applications.reduce((acc, application) => {
    const statusCode = application.application_status.code;
    if (!acc[statusCode]) {
      acc[statusCode] = [];
    }
    acc[statusCode].push(application);
    return acc;
  }, {} as Record<string, Application[]>);

  return (
    <Tabs defaultValue="SUBMITTED" className="w-full">
      <TabsList>
        {Object.keys(groupedApplications)
          .filter(
            (statusCode) =>
              !["PENDING", "NOC APPROVED", "NOC REJECTED", "STAGE 1 APPROVED"].includes(
                statusCode
              )
          )
          .sort(
            (a, b) =>
              groupedApplications[a][0].application_status.applicationStatusId -
              groupedApplications[b][0].application_status.applicationStatusId
          )
          .map((statusCode) => (
            <TabsTrigger key={statusCode} value={statusCode}>
              {groupedApplications[statusCode][0].application_status
                .description || statusCode}
            </TabsTrigger>
          ))}
      </TabsList>

      {Object.keys(groupedApplications).map((statusCode) => (
        <TabsContent
          value={statusCode}
          key={statusCode}
          className="w-full grid grid-cols-3 gap-4"
        >
          {groupedApplications[statusCode].map((application) => (
            <Link
              href={`/user/admin/application/${application.applicationId}`}
              key={application.applicationId}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Application #{application.applicationId}
                  </CardTitle>
                  <CardDescription className="space-x-4">
                    <Badge>
                      {application.application_status.description ||
                        application.application_status.code}
                    </Badge>
                    <Badge variant={"outline"}>
                      {
                        ["URGENT", "DEFAULT", "HIGH"][
                          Math.floor(Math.random() * 3)
                        ]
                      }
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Name: {application.user.name}</p>
                  <p>Email: {application.user.email}</p>
                  <p>
                    Created At: {new Date(application.createdAt).toDateString()}
                  </p>
                  <p>
                    Updated At: {new Date(application.updatedAt).toDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ActionBody;
