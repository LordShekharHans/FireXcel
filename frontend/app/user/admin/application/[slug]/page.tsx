import { Button } from "@/components/ui/button";
import axios from "axios";
import DocumentSection from "./Document";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Reject from "./Reject";
import { Suspense } from "react";
const cookies = require("next/headers").cookies;

type ApplicationStatus = {
  applicationStatusId: number;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

type Document = {
  documentId: string;
  applicationId: number;
  documentType: string;
  documentPath: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
};

type User = {
  userId: number;
  name: string;
  email: string;
  phone: string | null;
  roleId: number;
  createdAt: string;
  updatedAt: string;
};

type ApplicationForm = {
  applicationFormId: number;
  applicationId: number;
  division: string;
  typeOfOccupancy: string;
  heightOfBuilding: string;
  numberOfFloors: number;
  coveredAreaGroundFloor: string;
  typicalFloorArea: string;
  numberOfBasements: number;
  basementFloorArea: string;
  totalCoveredArea: string;
  roadWidth: string;
  gateWidth: string;
  internalRoadWidth: string;
  distanceFromBuildingLine: string;
  travelDistance: string;
  deadEndTravelDistance: string;
  numberOfStaircasesUpperFloors: number;
  numberOfStaircasesBasements: number;
  widthOfStaircaseUpperFloors: string;
  widthOfStaircaseBasements: string;
  provisionOfStaircase: boolean;
  fireTower: boolean;
  numberOfContinuousStaircasesToTerrace: number;
  rampWidth: string;
  fireCheckDoor: boolean;
  pressurization: boolean;
  widthOfCorridor: string;
  doorSizeWidth: string;
  doorSizeHeight: string;
  compartmentSize: string;
  numberOfFireCompartmentsUpperFloors: number;
  numberOfFireCompartmentsBasements: number;
  typeOfCompartmentation: string;
  smokeManagementSystem: string;
  basementAirChanges: boolean;
  upperFloorsAirChanges: boolean;
  freshAirSupplyAtBottomLevel: boolean;
  exhaustAirDischargeAtCeilingLevel: boolean;
  provisionOfFreshAirCutOuts: boolean;
  provisionOfExhaustAirCutOuts: boolean;
  ventilationCalculationsWithDrawing: string;
  fireExtinguishersTotalNumbersEachFloor: number;
  firstAidHoseReelsLocationNearStairs: boolean;
  firstAidHoseReelsTotalNumberEachFloor: number;
  automaticFireDetectionAndAlarmingSystemTypeOfD: string;
  detectorAboveFalseCeiling: boolean;
  provisionOfDetectorsInDuctShaft: boolean;
  manuallyOperatedElectricFireAlarm: boolean;
  publicAddressSystem: boolean;
  automaticSprinklerSystemTotalNumberOfSprinkler: number;
  sprinklerAboveFalseCeiling: boolean;
  internalHydrantsSizeOfRiserDownComer: number;
  numberOfHydrantsPerFloor: number;
  locationNearToStaircase: boolean;
  hoseBoxesNearEachLandingValve: boolean;
  fireServicesInlet: boolean;
  yardHydrantsTotalNumber: number;
  distanceBetweenTwoYardHydrants: string;
  numberOfHoseBox: number;
  pumpingArrangementsGroundLevelLocationOfPumpRo: string;
  dischargeOfMainPump: string;
  headOfMainPump: string;
  numberOfMainPumps: number;
  jockeyPumpOutput: string;
  jockeyPumpHead: string;
  numberOfJockeyPumps: number;
  standbyPumpOutput: string;
  standbyPumpHead: string;
  directAccessToPumpHouseFromGroundLevel: boolean;
  terraceLevelDischargeOfPump: string;
  headOfThePump: string;
  captiveWaterStorageForFirefightingLocationOfUn: string;
  undergroundTankCapacity: string;
  drawOffConnection: boolean;
  fireServiceInlet: boolean;
  accessToTank: boolean;
  overheadTankCapacity: string;
  ladderForInspection: boolean;
  crossSectionDrawingOfTanks: string | null;
  exitSignage: boolean;
  numberOfPassengerLifts: number;
  numberOfCarLifts: number;
  numberOfFireLifts: number;
  firemansGroundingSwitch: boolean;
  pressurizationOfLiftShaft: boolean;
  pressurizationOfLiftLobby: boolean;
  standbyPowerSupply: boolean;
  refugeAreaLevels: string;
  refugeAreaAtEachLevel: string;
  directAccessToNearestStaircase: boolean;
  fireCheckFloor: boolean;
  fireControlRoomNearEntranceGroundFloor: boolean;
  provisionOfFireSafetyOfficer: boolean;
  specialFireProtectionSystems: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

type Application = {
  application: {
    applicationId: number;
    userId: number;
    inspectionId?: number | null;
    applicationStatusId: number;
    createdAt: string;
    updatedAt: string;
    application_form: ApplicationForm;
    application_status: ApplicationStatus;
    documents: Document[];
    user: User;
  };
};

interface Inspector {
  userId: number;
  name: string;
  email: string;
  phone: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  inspector: {
    inspectorId: number;
    userId: number;
    region: string;
    assignedAdminId: number;
    experience: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

const approveApplication = async (id: number) => {
  "use server";
  const token = cookies().get("fdmtoken")?.value;

  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/${id}`,
    {
      status: 4,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const token = cookies().get("fdmtoken")?.value;

  const { data } = await axios.get<Application>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/${params?.slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const application = data?.application;

  const { data: inspectors } = await axios.get<Inspector[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/inspectors`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Application #{application?.applicationId}
      </h1>

      <div className="space-y-4 my-4">
        <div>
          <h2 className="text-lg font-semibold">Applicant Information</h2>
          <p>Name: {application?.user.name}</p>
          <p>Email: {application?.user.email}</p>
          <p>Phone: {application?.user.phone}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Application Form</h2>

          <div className="prose">
            <p>Division: {application?.application_form.division}</p>
            <p>
              Type of Occupancy: {application?.application_form.typeOfOccupancy}
            </p>
            <p>
              Height of Building:{" "}
              {application?.application_form.heightOfBuilding}
            </p>
            <p>
              Number of Floors: {application?.application_form.numberOfFloors}
            </p>
            <p>
              Covered Area Ground Floor:{" "}
              {application?.application_form.coveredAreaGroundFloor}
            </p>
            <p>
              Typical Floor Area:{" "}
              {application?.application_form.typicalFloorArea}
            </p>
            <p>
              Number of Basements:{" "}
              {application?.application_form.numberOfBasements}
            </p>
            <p>
              Basement Floor Area:{" "}
              {application?.application_form.basementFloorArea}
            </p>
            <p>
              Total Covered Area:{" "}
              {application?.application_form.totalCoveredArea}
            </p>
            <p>Road Width: {application?.application_form.roadWidth}</p>
            <p>Gate Width: {application?.application_form.gateWidth}</p>
            <p>
              Internal Road Width:{" "}
              {application?.application_form.internalRoadWidth}
            </p>
            <p>
              Distance from Building Line:{" "}
              {application?.application_form.distanceFromBuildingLine}
            </p>
            <p>
              Travel Distance: {application?.application_form.travelDistance}
            </p>
            <p>
              Dead End Travel Distance:{" "}
              {application?.application_form.deadEndTravelDistance}
            </p>
            <p>
              Number of Staircases Upper Floors:{" "}
              {application?.application_form.numberOfStaircasesUpperFloors}
            </p>
            <p>
              Number of Staircases Basements:{" "}
              {application?.application_form.numberOfStaircasesBasements}
            </p>
            <p>
              Width of Staircase Upper Floors:{" "}
              {application?.application_form.widthOfStaircaseUpperFloors}
            </p>
            <p>
              Width of Staircase Basements:{" "}
              {application?.application_form.widthOfStaircaseBasements}
            </p>
            <p>
              Provision of Staircase:{" "}
              {application?.application_form.provisionOfStaircase}
            </p>
            <p>Fire Tower: {application?.application_form.fireTower}</p>
            <p>
              Number of Continuous Staircases to Terrace:{" "}
              {
                application?.application_form
                  .numberOfContinuousStaircasesToTerrace
              }
            </p>
            <p>Ramp Width: {application?.application_form.rampWidth}</p>
            <p>
              Fire Check Door: {application?.application_form.fireCheckDoor}
            </p>
            <p>
              Pressurization: {application?.application_form.pressurization}
            </p>
            <p>
              Width of Corridor: {application?.application_form.widthOfCorridor}
            </p>
            <p>
              Door Size Width: {application?.application_form.doorSizeWidth}
            </p>
            <p>
              Door Size Height: {application?.application_form.doorSizeHeight}
            </p>
            <p>
              Compartment Size: {application?.application_form.compartmentSize}
            </p>
            <p>
              Number of Fire Compartments Upper Floors:{" "}
              {
                application?.application_form
                  .numberOfFireCompartmentsUpperFloors
              }
            </p>
            <p>
              Number of Fire Compartments Basements:{" "}
              {application?.application_form.numberOfFireCompartmentsBasements}
            </p>
            <p>
              Type of Compartmentation:{" "}
              {application?.application_form.typeOfCompartmentation}
            </p>
            <p>
              Smoke Management System:{" "}
              {application?.application_form.smokeManagementSystem}
            </p>
            <p>
              Basement Air Changes:{" "}
              {application?.application_form.basementAirChanges}
            </p>
            <p>
              Upper Floors Air Changes:{" "}
              {application?.application_form.upperFloorsAirChanges}
            </p>
            <p>
              Fresh Air Supply at Bottom Level:{" "}
              {application?.application_form.freshAirSupplyAtBottomLevel}
            </p>
            <p>
              Exhaust Air Discharge at Ceiling Level:{" "}
              {application?.application_form.exhaustAirDischargeAtCeilingLevel}
            </p>
            <p>
              Provision of Fresh Air Cut Outs:{" "}
              {application?.application_form.provisionOfFreshAirCutOuts}
            </p>
            <p>
              Provision of Exhaust Air Cut Outs:{" "}
              {application?.application_form.provisionOfExhaustAirCutOuts}
            </p>
            <p>
              Ventilation Calculations with Drawing:{" "}
              {application?.application_form.ventilationCalculationsWithDrawing}
            </p>
            <p>
              Fire Extinguishers Total Numbers Each Floor:{" "}
              {
                application?.application_form
                  .fireExtinguishersTotalNumbersEachFloor
              }
            </p>
            <p>
              First Aid Hose Reels Location Near Stairs:{" "}
              {
                application?.application_form
                  .firstAidHoseReelsLocationNearStairs
              }
            </p>
            <p>
              First Aid Hose Reels Total Number Each Floor:{" "}
              {
                application?.application_form
                  .firstAidHoseReelsTotalNumberEachFloor
              }
            </p>
            <p>
              Automatic Fire Detection and Alarming System Type of D:{" "}
              {
                application?.application_form
                  .automaticFireDetectionAndAlarmingSystemTypeOfD
              }
            </p>
            <p>
              Detector Above False Ceiling:{" "}
              {application?.application_form.detectorAboveFalseCeiling}
            </p>
            <p>
              Provision of Detectors in Duct Shaft:{" "}
              {application?.application_form.provisionOfDetectorsInDuctShaft}
            </p>{" "}
            <p>
              Manually Operated Electric Fire Alarm:{" "}
              {application?.application_form.manuallyOperatedElectricFireAlarm}
            </p>
            <p>
              Public Address System:{" "}
              {application?.application_form.publicAddressSystem}
            </p>
            <p>
              Automatic Sprinkler System Total Number of Sprinkler:{" "}
              {
                application?.application_form
                  .automaticSprinklerSystemTotalNumberOfSprinkler
              }
            </p>
            <p>
              Sprinkler Above False Ceiling:{" "}
              {application?.application_form.sprinklerAboveFalseCeiling}
            </p>
            <p>
              Internal Hydrants Size of Riser Down Comer:{" "}
              {
                application?.application_form
                  .internalHydrantsSizeOfRiserDownComer
              }
            </p>
            <p>
              Number of Hydrants Per Floor:{" "}
              {application?.application_form.numberOfHydrantsPerFloor}
            </p>
            <p>
              Location Near to Staircase:{" "}
              {application?.application_form.locationNearToStaircase}
            </p>
            <p>
              Hose Boxes Near Each Landing Valve:{" "}
              {application?.application_form.hoseBoxesNearEachLandingValve}
            </p>
            <p>
              Fire Services Inlet:{" "}
              {application?.application_form.fireServicesInlet}
            </p>
            <p>
              Yard Hydrants Total Number:{" "}
              {application?.application_form.yardHydrantsTotalNumber}
            </p>
            <p>
              Distance Between Two Yard Hydrants:{" "}
              {application?.application_form.distanceBetweenTwoYardHydrants}
            </p>
            <p>
              Number of Hose Box:{" "}
              {application?.application_form.numberOfHoseBox}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Documents</h2>

          <DocumentSection documents={application?.documents} />
        </div>

        {application?.applicationStatusId === 5 && (
          <div>
            <h2 className="text-lg font-semibold">Assign Inspector</h2>

            <form
              className="flex gap-4 flex-wrap my-4"
              action={async (e: FormData) => {
                "use server";

                const tempForm = Object.fromEntries(e);
                // console.log(tempForm);

                try {
                  const { data: assignInspectorData } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/create-inspection`,
                    {
                      applicationId: Number(application?.applicationId),
                      inspectorId: Number(tempForm.inspectorId),
                      inspectionDate: tempForm.inspectionDate,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  revalidatePath(`/user/admin/action`);
                  redirect(`/user/admin/action`);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <Input
                type="hidden"
                name="applicationId"
                value={application?.applicationId}
                required
              />

              <Select required name="inspectorId">
                <SelectTrigger className="w-1/5">
                  <SelectValue placeholder="Choose an Inspector" />
                </SelectTrigger>
                <SelectContent>
                  {inspectors
                    .sort(
                      (a, b) => b.inspector.experience - a.inspector.experience
                    )
                    .map((inspector) => (
                      <SelectItem
                        key={inspector.inspector?.inspectorId}
                        value={inspector.inspector?.inspectorId.toString()}
                      >
                        <div className="flex justify-between items-center gap-2 w-full">
                          <p className="flex-1">{inspector?.name}</p>
                          <p>
                            <Badge
                              className={
                                inspector?.inspector?.experience >= 4
                                  ? "bg-green-600 text-white"
                                  : inspector?.inspector?.experience >= 2
                                  ? "bg-yellow-600 text-white"
                                  : undefined
                              }
                              variant={
                                inspector?.inspector?.experience >= 4
                                  ? "outline"
                                  : inspector?.inspector?.experience >= 2
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {inspector?.inspector?.experience}
                              <Star size={16} />
                            </Badge>
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                name="inspectionDate"
                className="w-1/5"
                required
              />

              <Button type="submit">Assign</Button>
            </form>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold">Actions</h2>

          <div className="flex gap-4 my-4">
            {(application?.applicationStatusId === 2 ||
              application?.applicationStatusId === 3) && (
              <>
                <Button variant={"outline"} asChild>
                  <Link href="/user/admin/action">Back</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Approve</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will approve the preliminary application. The
                        applicant will be eligible to apply for FSC in future
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction>
                        <form
                          action={async () => {
                            "use server";
                            await approveApplication(
                              application?.applicationId
                            );

                            revalidatePath("/user/admin/action");
                            redirect("/user/admin/action");
                          }}
                        >
                          <button type="submit">Approve Stage 1</button>
                        </form>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Suspense>
                  <Reject id={application?.applicationId} />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
