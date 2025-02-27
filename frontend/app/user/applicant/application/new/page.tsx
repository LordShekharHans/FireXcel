import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import submitApplicationForm from "@/app/actions/submitApplicationForm";
import { redirect } from "next/navigation";

type ApplicationForm = {
  division: ["CENTRAL", "EAST", "WEST", "SOUTH", "SOUTH WEST", "NORTH WEST"];
  typeOfOccupancy: [
    "Residential Buildings",
    "Educational Buildings",
    "Institutional Buildings",
    "Assembly Buildings",
    "Business Buildings",
    "Mercantile Buildings",
    "Industrial Buildings",
    "Storage Buildings",
    "Hazardous Building"
  ];
  heightOfBuilding: number;
  numberOfFloors: number;
  coveredAreaGroundFloor: number;
  typicalFloorArea: number;
  numberOfBasements: number;
  basementFloorArea: number;
  totalCoveredArea: number;
  roadWidth: number;
  gateWidth: number;
  internalRoadWidth: number;
  distanceFromBuildingLine: number;
  numberOfExits: number;
  travelDistance: number;
  deadEndTravelDistance: number;
  numberOfStaircasesUpperFloors: number;
  numberOfStaircasesBasements: number;
  widthOfStaircaseUpperFloors: number;
  widthOfStaircaseBasements: number;
  provisionOfStaircase: boolean;
  fireTower: boolean;
  numberOfContinuousStaircasesToTerrace: number;
  rampWidth: number;
  fireCheckDoor: boolean;
  pressurization: boolean;
  widthOfCorridor: number;
  doorSizeWidth: number;
  doorSizeHeight: number;
  compartmentSize: number;
  numberOfFireCompartmentsUpperFloors: number;
  numberOfFireCompartmentsBasements: number;
  typeOfCompartmentation: string;
  smokeManagementSystem: ["MECHANICAL", "NATURAL", "COMBINED"];
  basementAirChanges: number;
  upperFloorsAirChanges: number;
  freshAirSupplyAtBottomLevel: boolean;
  exhaustAirDischargeAtCeilingLevel: boolean;
  provisionOfFreshAirCutOuts: boolean;
  provisionOfExhaustAirCutOuts: boolean;
  ventilationCalculationsWithDrawing: string;
  fireExtinguishersTotalNumbersEachFloor: number;
  firstAidHoseReelsLocationNearStairs: boolean;
  firstAidHoseReelsTotalNumberEachFloor: number;
  automaticFireDetectionAndAlarmingSystemTypeOfDetectors: string;
  detectorAboveFalseCeiling: boolean;
  provisionOfDetectorsInDuctShaft: boolean;
  manuallyOperatedElectricFireAlarm: boolean;
  publicAddressSystem: boolean;
  automaticSprinklerSystemTotalNumberOfSprinklerHead: number;
  sprinklerAboveFalseCeiling: boolean;
  internalHydrantsSizeOfRiserDownComer: number;
  numberOfHydrantsPerFloor: number;
  locationNearToStaircase: boolean;
  hoseBoxesNearEachLandingValve: boolean;
  fireServicesInlet: boolean;
  yardHydrantsTotalNumber: number;
  distanceBetweenTwoYardHydrants: number;
  numberOfHoseBox: number;
  pumpingArrangementsGroundLevelLocationOfPumpRoom: string;
  dischargeOfMainPump: number;
  headOfMainPump: number;
  numberOfMainPumps: number;
  jockeyPumpOutput: number;
  jockeyPumpHead: number;
  numberOfJockeyPumps: number;
  standbyPumpOutput: number;
  standbyPumpHead: number;
  numberOfStandbyPumps: number;
  directAccessToPumpHouseFromGroundLevel: boolean;
  terraceLevelDischargeOfPump: number;
  headOfThePump: number;
  captiveWaterStorageForFirefightingLocationOfUndergroundTank: string;
  undergroundTankCapacity: number;
  drawOffConnection: boolean;
  fireServiceInlet: boolean;
  accessToTank: boolean;
  overheadTankCapacity: number;
  ladderForInspection: boolean;
  crossSectionDrawingOfTanks: string;
  exitSignage: boolean;
  numberOfPassengerLifts: number;
  numberOfCarLifts: number;
  numberOfFireLifts: number;
  firemansGroundingSwitch: boolean;
  pressurizationOfLiftShaft: boolean;
  pressurizationOfLiftLobby: boolean;
  standbyPowerSupply: boolean;
  refugeAreaLevels: string;
  refugeAreaAtEachLevel: number;
  directAccessToNearestStaircase: boolean;
  fireCheckFloor: boolean;
  fireControlRoomLocation: string;
  provisionOfFireSafetyOfficer: boolean;
  specialFireProtectionSystems: string;
};

type ApplicationResponse = {
  message: string;
  application?: {
    applicationId: number;
    userId: number;
    applicationStatusId: number;
    updatedAt: string;
    createdAt: string;
    inspectionId: number | null;
  };
};

const Page = async () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">NOC Application Form</h1>
      <p>Please fill all the fields</p>

      <hr className="my-4" />

      <div>
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            "use server";

            const formEntries = Object.fromEntries(formData.entries());
            const data: ApplicationForm =
              formEntries as unknown as ApplicationForm;

            const response: ApplicationResponse = await submitApplicationForm(
              data
            );

            if (response?.application) {
              redirect(
                `/user/applicant/application/new/success?id=${response?.application?.applicationId}`
              );
            } else {
            }
          }}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">General</h2>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Division <span className="text-red-500">*</span>
              </Label>

              <Select name="division" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Choose your division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CENTRAL">CENTRAL</SelectItem>
                  <SelectItem value="SOUTH">SOUTH</SelectItem>
                  <SelectItem value="EAST">EAST</SelectItem>
                  <SelectItem value="WEST">WEST</SelectItem>
                  <SelectItem value="SOUTH WEST">SOUTH WEST</SelectItem>
                  <SelectItem value="NORTH WEST">NORTH WEST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Type of Occupancy <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (As per clause 1.4.75 of UBBL 2016)
                </p>
              </Label>
              <Select name="typeOfOccupancy" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Choose the type of occupancy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential Buildings">
                    Residential Buildings
                  </SelectItem>
                  <SelectItem value="Educational Buildings">
                    Educational Buildings
                  </SelectItem>
                  <SelectItem value="Institutional Buildings">
                    Institutional Buildings
                  </SelectItem>
                  <SelectItem value="Assembly Buildings">
                    Assembly Buildings
                  </SelectItem>
                  <SelectItem value="Business Buildings">
                    Business Buildings
                  </SelectItem>
                  <SelectItem value="Mercantile Buildings">
                    Mercantile Buildings
                  </SelectItem>
                  <SelectItem value="Industrial Buildings">
                    Industrial Buildings
                  </SelectItem>
                  <SelectItem value="Storage Buildings">
                    Storage Buildings
                  </SelectItem>
                  <SelectItem value="Hazardous Building">
                    Hazardous Building
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Height of Building <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="heightOfBuilding"
                required
                placeholder="Enter the height of the building"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Number of Floors <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(Including basement)</p>
              </Label>
              <Input
                type="number"
                name="numberOfFloors"
                required
                placeholder="Enter the number of floors"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Covered Area of Ground Floor{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In square meters)</p>
              </Label>
              <Input
                type="number"
                name="coveredAreaGroundFloor"
                required
                placeholder="Enter the covered area of the ground floor"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Typical Floor Area <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In square meters)</p>
              </Label>
              <Input
                type="number"
                name="typicalFloorArea"
                required
                placeholder="Enter the typical floor area"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Number of Basements <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfBasements"
                placeholder="Enter the number of basements"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Basement Floor Area <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In square meters)</p>
              </Label>
              <Input
                type="number"
                name="basementFloorArea"
                placeholder="Enter the basement floor area"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Total Covered Area <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (Including stilt and basements, in square meters)
                </p>
              </Label>
              <Input
                type="number"
                name="totalCoveredArea"
                placeholder="Enter the total covered area"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Access to building (As per clause 8.2/7.13.3 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Road Width <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="roadWidth"
                required
                placeholder="Enter the road width"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Gate Width <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="gateWidth"
                required
                placeholder="Enter the gate width"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Width of Internal Road <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="internalRoadWidth"
                required
                placeholder="Enter the internal road width"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Distance of the internal road from building line{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="distanceFromBuildingLine"
                required
                placeholder="Enter the distance from building line"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Number, Width, Type & Arrangement of Exits (As per clause 7.8 of
              UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Travel Distance <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="travelDistance"
                required
                placeholder="Enter the travel distance"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Dead End Travel Distance{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="deadEndTravelDistance"
                required
                placeholder="Enter the dead end travel distance"
                className="w-80"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                No of Staircases (As per clause 7.10.1 of UBBL 2016)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Upper Floors <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesUpperFloors"
                  required
                  placeholder="Enter the number of staircases for upper floors"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Basements <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesBasements"
                  required
                  placeholder="Enter the number of staircases for basements"
                  className="w-80"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                Width of staircase (As per clause 8.4.3 of UBBL 2016)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Upper Floors <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meters)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseUpperFloors"
                  required
                  placeholder="Enter the width of staircase for upper floors"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Basements <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meters)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseBasements"
                  required
                  placeholder="Enter the width of staircase for basements"
                  className="w-80"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">Provision of Staircase</Label>
              <Checkbox name="provisionOfStaircase" value="true" />
            </div>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Fire Tower</span>
                <p className="text-gray-500">
                  (As per clause 1.4.46 /9.3.13 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="fireTower" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No. of continuous staircases to terrace.
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (As per clause 7.11(m) of UBBL 2016)
                </p>
              </Label>
              <Input
                type="number"
                name="numberOfContinuousStaircasesToTerrace"
                required
                placeholder="Enter the number of continuous staircases to terrace"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Ramp Width
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (As per clause 7.10.2 of UBBL 2016, in meters)
                </p>
              </Label>
              <Input
                type="number"
                name="rampWidth"
                placeholder="Enter the ramp width"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Protection of Exits (As per clause 7.5 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Fire Check Door</span>
                <p className="text-gray-500">
                  (As per clause 8.4.5 (c) of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="fireCheckDoor" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Pressurization</span>
                <p className="text-gray-500">
                  (As per clause 9.3.2 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="pressurization" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Width of Corridor <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (As per clause 7.11.2 & 8.4.8 of UBBL 2016, In meters)
                </p>
              </Label>
              <Input
                type="number"
                name="widthOfCorridor"
                required
                placeholder="Enter the width of corridor"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Door Size (Width x Height){" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (As per clause 7.12/7.23of UBBL 2016, In meters)
                </p>
              </Label>
              <Input
                type="number"
                name="doorSizeWidth"
                required
                placeholder="Enter width"
                className="w-40"
              />
              x
              <Input
                type="number"
                name="doorSizeHeight"
                required
                placeholder="Enter height"
                className="w-40"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Compartmentation (As per clause 8.4.6 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Compartment Size <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(Area in square meters)</p>
              </Label>
              <Input
                type="number"
                name="compartmentSize"
                required
                placeholder="Enter the compartment size"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No of fire compartments at Upper floor{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsUpperFloors"
                required
                placeholder="Enter the number of fire compartments for upper floors"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No of fire compartments at Basement Level{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsBasements"
                required
                placeholder="Enter the number of fire compartments for basements"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Type of Compartmentation
                  <span className="text-red-500">*</span>
                </span>
              </Label>

              <Select name="typeOfCompartmentation" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Choose the type of compartmentation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="By Fire resisting wall of 02 hrs rating">
                    By Fire resisting wall of 02 hrs rating
                  </SelectItem>
                  <SelectItem value="By Fire curtain of 02 hrs rating">
                    By Fire curtain of 02 hrs rating
                  </SelectItem>
                  <SelectItem value="By water curtain">
                    By water curtain
                  </SelectItem>
                  <SelectItem value="Fire Dampers">Fire Dampers</SelectItem>
                  <SelectItem value="Fire check door">
                    Fire check door
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Smoke Management System</h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Type of Smoke Management System
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Select name="smokeManagementSystem" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Choose the type of smoke management system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MECHANICAL">MECHANICAL</SelectItem>
                  <SelectItem value="NATURAL">NATURAL</SelectItem>
                  <SelectItem value="COMBINED">COMBINED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Basement Air Changes</span>
                <p className="text-gray-500">(12 ACPH)</p>
              </Label>

              <Checkbox name="basementAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Upper Floors Air Changes</span>
                <p className="text-gray-500">(12 ACPH)</p>
              </Label>

              <Checkbox name="upperFloorsAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Fresh Air Supply at Bottom Level
              </Label>
              <Checkbox name="freshAirSupplyAtBottomLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Exhaust Air Discharge at Ceiling Level
              </Label>
              <Checkbox name="exhaustAirDischargeAtCeilingLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Provision of Fresh Air Cut Outs
              </Label>
              <Checkbox name="provisionOfFreshAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Provision of Exhaust Air Cut Outs
              </Label>
              <Checkbox name="provisionOfExhaustAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Ventilation Calculations with Drawing
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="ventilationCalculationsWithDrawing"
                required
                placeholder="Enter the ventilation calculations with drawing"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Fire Extinguishers</h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Total numbers on each floor{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="fireExtinguishersTotalNumbersEachFloor"
                required
                placeholder="Enter the total numbers on each floor"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              First-aid hose reels (As per clause 9.3.9 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Location near stairs</span>
              </Label>
              <Checkbox
                name="firstAidHoseReelsLocationNearStairs"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Total no of each floor <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="firstAidHoseReelsTotalNumberEachFloor"
                required
                placeholder="Enter the total number of each floor"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Automatic Fire Detection and Alarming System (As per clause 9.3.9
              of UBBL 2016 & IS 2189)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Type of Detectors <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="text"
                name="automaticFireDetectionAndAlarmingSystemTypeOfDetectors"
                required
                placeholder="Enter the type of detectors"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Detector above False Ceiling
              </Label>
              <Checkbox name="detectorAboveFalseCeiling" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Provision of Detectors in Duct, Shaft, etc.
              </Label>
              <Checkbox name="provisionOfDetectorsInDuctShaft" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Manually Operated Electric Fire Alarm (MOEFA)</span>
                <p className="text-gray-500">
                  (As per clause 9.3.9 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="manuallyOperatedElectricFireAlarm" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Public Address System</span>
                <p className="text-gray-500">
                  (As per clause 9.3.9 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="publicAddressSystem" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Automatic Sprinkler System (As per clause 9.3.9 of UBBL 2016 & IS
              15105)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Total number of sprinkler head in one installation (approx.)
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(As per IS-15105)</p>
              </Label>
              <Input
                type="number"
                name="automaticSprinklerSystemTotalNumberOfSprinklerHead"
                required
                placeholder="Enter the total number of sprinkler head"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Basement
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="basement"
                required
                placeholder="Enter the number of sprinkler head in basement"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Upper Floor
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="upperFloor"
                required
                placeholder="Enter the number of sprinkler head in upper floor"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Sprinkler above false ceiling
              </Label>
              <Checkbox name="sprinklerAboveFalseCeiling" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Calculations as per IS 15105 with drawings
              </Label>
              <Checkbox
                name="calculationsAsPerIS15105WithDrawings"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">Fire Services Inlet</Label>
              <Checkbox name="fireServicesInlet" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Internal hydrants (As per IS 3844)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Size of Riser/Down Comer{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In mm)</p>
              </Label>
              <Input
                type="number"
                name="internalHydrantsSizeOfRiserDownComer"
                required
                placeholder="Enter the size of riser/down comer"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Number of Hydrants per Floor{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfHydrantsPerFloor"
                required
                placeholder="Enter the number of hydrants per floor"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Location near to staircase
              </Label>
              <Checkbox name="locationNearToStaircase" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Hose Boxes near each landing valve
              </Label>
              <Checkbox name="hoseBoxesNearEachLandingValve" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">Fire Services Inlet</Label>
              <Checkbox name="fireServicesInlet" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Yard Hydrants (As per IS 13039)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Total number of yard hydrants{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="yardHydrantsTotalNumber"
                required
                placeholder="Enter the total number of yard hydrants"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Distance between two yard hydrants{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In meters)</p>
              </Label>
              <Input
                type="number"
                name="distanceBetweenTwoYardHydrants"
                required
                placeholder="Enter the distance between two yard hydrants"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Number of hose box <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfHoseBox"
                required
                placeholder="Enter the number of hose box"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Pumping Arrangements (As per clause 9.3.9 of UBBL 2016)
            </h2>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                Ground level
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>Location of pump room</span>
                </Label>
                <Input
                  type="text"
                  name="pumpingArrangementsGroundLevelLocationOfPumpRoom"
                  placeholder="Enter the location of pump room"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Discharge of main pump
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(liter per minute)</p>
                </Label>
                <Input
                  type="number"
                  name="dischargeOfMainPump"
                  required
                  placeholder="Enter the discharge of main pump"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Head of main pump
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meter)</p>
                </Label>
                <Input
                  type="number"
                  name="headOfMainPump"
                  required
                  placeholder="Enter the head of main pump"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Number of main pumps
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfMainPumps"
                  required
                  placeholder="Enter the number of main pumps"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Jockey pump output (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="jockeyPumpOutput"
                  required
                  placeholder="Enter the jockey pump output"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Jockey pump head
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meter)</p>
                </Label>
                <Input
                  type="number"
                  name="jockeyPumpHead"
                  required
                  placeholder="Enter the jockey pump head"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Number of Jockey Pumps
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfJockeyPumps"
                  required
                  placeholder="Enter the number of jockey pumps"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Standby pump output (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="standbyPumpOutput"
                  required
                  placeholder="Enter the standby pump output"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Standby pump head
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meter)</p>
                </Label>
                <Input
                  type="number"
                  name="standbyPumpHead"
                  required
                  placeholder="Enter the standby pump head"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>Direct access to pump house from ground level</span>
                </Label>
                <Checkbox
                  name="directAccessToPumpHouseFromGroundLevel"
                  value="true"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                Terrace Level
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Discharge of pump (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="terraceLevelDischargeOfPump"
                  required
                  placeholder="Enter the discharge of pump"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    Head of the pump
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(In meter)</p>
                </Label>
                <Input
                  type="number"
                  name="headOfThePump"
                  required
                  placeholder="Enter the head of the pump"
                  className="w-80"
                />
              </div>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Captive water storage for firefighting (As per clause 9.3.9of UBBL
              2016& IS 15105)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Location of underground tank
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="text"
                name="captiveWaterStorageForFirefightingLocationOfUndergroundTank"
                required
                placeholder="Enter the location of underground tank"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Underground tank capacity
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In Liters)</p>
              </Label>
              <Input
                type="number"
                name="undergroundTankCapacity"
                required
                placeholder="Enter the underground tank capacity"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Draw off connection</span>
              </Label>
              <Checkbox name="drawOffConnection" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Fire Service Inlet</span>
              </Label>
              <Checkbox name="fireServiceInlet" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Access to tank</span>
              </Label>
              <Checkbox name="accessToTank" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Overhead tank capacity
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In Liters)</p>
              </Label>
              <Input
                type="number"
                name="overheadTankCapacity"
                required
                placeholder="Enter the overhead tank capacity"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Ladder for inspection</span>
                <p className="text-gray-500">
                  (As per clause 7.10.3 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="ladderForInspection" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Cross section drawing of tanks</span>
              </Label>
              <Checkbox name="crossSectionDrawingOfTanks" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Exit Signage</span>
                <p className="text-gray-500">
                  (As per clause 7.11 (r) of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="exitSignage" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Standby power supply</span>
                <p className="text-gray-500">
                  (As per clause 8.5.3 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="standbyPowerSupply" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Provision of lifts (As per clause 8.4.4/9.3.3 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No of passenger lifts
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfPassengerLifts"
                required
                placeholder="Enter the number of passenger lifts"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No of car lifts
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfCarLifts"
                required
                placeholder="Enter the number of car lifts"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  No. of fire lifts
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireLifts"
                required
                placeholder="Enter the number of fire lifts"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Fireman&apos;s grounding switch</span>
              </Label>
              <Checkbox name="firemansGroundingSwitch" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Pressurization of lift shaft
                <p className="text-gray-500">
                  (As per clause 8.4.4 m of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="pressurizationOfLiftShaft" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                Pressurization of lift lobby
                <p className="text-gray-500">
                  (As per clause 8.4.4 m of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="pressurizationOfLiftLobby" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Refuge Area (As per clause 9.3.6/ 9.3.7 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Levels / Floors
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="refugeAreaLevels"
                required
                placeholder="Enter the levels/floors"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Area at each Level
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(In sq mt.)</p>
              </Label>
              <Input
                type="number"
                name="refugeAreaAtEachLevel"
                required
                placeholder="Enter the area at each level"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Direct access to nearest staircase</span>
              </Label>
              <Checkbox name="directAccessToNearestStaircase" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Fire check floor</span>
                <p className="text-gray-500">
                  (As per clause 9.3.8 of UBBL 2016)
                </p>
              </Label>
              <Checkbox name="fireCheckFloor" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Fire control room (9.3.10/ 9.3.14 of UBBL 2016)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Location near main entrance at ground floor</span>
              </Label>
              <Checkbox
                name="fireControlRoomNearEntranceGroundFloor"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>Provision of fire safety officer</span>
                <p className="text-gray-500">(9.3.14 of UBBL 2016)</p>
              </Label>
              <Checkbox
                name="provisionOfFireSafetyOfficer"
                defaultChecked={false}
                value="true"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  Special fire protection systems for protection of special
                  risks
                </span>
                <p className="text-gray-500">(if any)</p>
              </Label>
              <Textarea
                name="specialFireProtectionSystems"
                placeholder="Enter the special fire protection systems"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
