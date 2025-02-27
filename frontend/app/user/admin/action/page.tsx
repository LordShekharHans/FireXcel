import axios from "axios";
import ActionBody from "./ActionBody";
const cookies = require("next/headers").cookies;

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

type ApplicationsResponse = {
  applications: Application[];
};

export const revalidate = 10;

const Page = async () => {
  const token = cookies().get("fdmtoken")?.value;

  const { data } = await axios.get<ApplicationsResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Action Center</h1>
      <p>Application Action Center</p>

      <div className="py-4">
        <ActionBody applications={data?.applications} />
      </div>
    </div>
  );
};

export default Page;
