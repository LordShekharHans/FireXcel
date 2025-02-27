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
      <h1 className="text-2xl font-bold">ਐਨ.ਓ.ਸੀ ਅਪਲੀਕੇਸ਼ਨ ਫਾਰਮ</h1>
      <p>ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਫੀਲਡ ਭਰੋ</p>

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
                `/user/applicant/application/new/success/hi?id=${response?.application?.applicationId}`
              );
            } else {
            }
          }}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">ਸਾਮਾਨੀ</h2>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਵਿਭਾਜਨ <span className="text-red-500">*</span>
              </Label>

              <Select name="division" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="ਆਪਣਾ ਡਿਵੀਜ਼ਨ ਚੁਣੋ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CENTRAL">ਸੈਂਟਰਲ</SelectItem>
                  <SelectItem value="SOUTH">ਦੱਖਣ</SelectItem>
                  <SelectItem value="EAST">ਪੂਰਬ</SelectItem>
                  <SelectItem value="WEST">ਪੱਛਮ</SelectItem>
                  <SelectItem value="SOUTH WEST">ਦੱਖਣ ਪੱਛਮ</SelectItem>
                  <SelectItem value="NORTH WEST">ਉੱਤਰੀ ਪੱਛਮ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਆਕਿਊਪੈਂਸੀ ਦੀ ਕਿਸਮ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(UBBL 2016 ਦੀ ਧਾਰਾ 1.4.75 ਅਨੁਸਾਰ)</p>
              </Label>
              <Select name="typeOfOccupancy" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="ਆਕਿਊਪੈਂਸੀ ਦੀ ਕਿਸਮ ਚੁਣੋ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential Buildings">
                    ਰਿਹਾਇਸ਼ੀ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Educational Buildings">
                    ਸਿੱਖਿਆ ਸੰਬੰਧੀ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Institutional Buildings">
                    ਇਸਟੀਟਿਊਸ਼ਨਲ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Assembly Buildings">
                    ਅਸੈਂਬਲੀ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Business Buildings">
                    ਬਿਜ਼ਨਸ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Mercantile Buildings">
                    ਮਰਕੈਂਟਾਇਲ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Industrial Buildings">
                    ਇੰਡਸਟਰੀਅਲ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Storage Buildings">
                    ਸਟੋਰੇਜ ਇਮਾਰਤਾਂ
                  </SelectItem>
                  <SelectItem value="Hazardous Building">
                    ਹੈਜ਼ਰਡਸ ਇਮਾਰਤ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਇਮਾਰਤ ਦੀ ਉਚਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="heightOfBuilding"
                required
                placeholder="ਇਮਾਰਤ ਦੀ ਉਚਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਮੰਜ਼ਿਲਾਂ ਦੀ ਗਿਣਤੀ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਬੇਸਮੈਂਟ ਸਮੇਤ)</p>
              </Label>
              <Input
                type="number"
                name="numberOfFloors"
                required
                placeholder="ਮੰਜ਼ਿਲਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਜ਼ਮੀਨੀ ਤੱਲ ‘ਤੇ ਕਵਰਡ ਏਰੀਆ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਵਰਗ ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="coveredAreaGroundFloor"
                required
                placeholder="ਜ਼ਮੀਨੀ ਤੱਲ ਤੇ ਕਵਰਡ ਏਰੀਆ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਇੱਕ ਸਧਾਰਣ ਤੱਲ ਦਾ ਏਰੀਆ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਵਰਗ ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="typicalFloorArea"
                required
                placeholder="ਇੱਕ ਵਿਸ਼ੇਸ਼ ਮੰਜ਼ਿਲ ਦਾ ਏਰੀਆ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਬੇਸਮੈਂਟ ਦੀ ਗਿਣਤੀ <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfBasements"
                placeholder="ਬੇਸਮੈਂਟ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਬੇਸਮੈਂਟ ਫਲੋਰ ਏਰੀਆ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਵਰਗ ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="basementFloorArea"
                placeholder="ਬੇਸਮੈਂਟ ਫਲੋਰ ਏਰੀਆ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਕੁੱਲ ਕਵਰਡ ਏਰੀਆ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (ਸਟਿਲਟ ਅਤੇ ਬੇਸਮੈਂਟ ਸਮੇਤ, ਵਰਗ ਮੀਟਰ ਵਿੱਚ)
                </p>
              </Label>
              <Input
                type="number"
                name="totalCoveredArea"
                placeholder="ਕੁੱਲ ਕਵਰਡ ਏਰੀਆ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਭਵਨ ਤੱਕ ਪਹੁੰਚ (UBBL 2016 ਦੀ ਧਾਰਾ 8.2/7.13.3 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਸੜਕ ਦੀ ਚੌੜਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="roadWidth"
                required
                placeholder="ਸੜਕ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਗੇਟ ਦੀ ਚੌੜਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="gateWidth"
                required
                placeholder="ਗੇਟ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਅੰਦਰੂਨੀ ਸੜਕ ਦੀ ਚੌੜਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="internalRoadWidth"
                required
                placeholder="ਅੰਦਰੂਨੀ ਸੜਕ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਭਵਨ ਲਾਈਨ ਤੋਂ ਅੰਦਰੂਨੀ ਸੜਕ ਦੀ ਦੂਰੀ{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="distanceFromBuildingLine"
                required
                placeholder="ਭਵਨ ਲਾਈਨ ਤੋਂ ਦੂਰੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਨਿਕਾਸ ਦੇ ਗਿਣਤੀ, ਕਿਸਮ ਅਤੇ ਬੰਨ੍ਹਤ (UBBL 2016 ਦੀ ਧਾਰਾ 7.8 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਯਾਤਰਾ ਦੀ ਦੂਰੀ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="travelDistance"
                required
                placeholder="ਯਾਤਰਾ ਦੀ ਦੂਰੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਡੈੱਡ ਏਂਡ ਯਾਤਰਾ ਦੂਰੀ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="deadEndTravelDistance"
                required
                placeholder="ਡੈੱਡ ਏਂਡ ਯਾਤਰਾ ਦੂਰੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                ਸੀੜੀਆਂ ਦੀ ਗਿਣਤੀ (UBBL 2016 ਦੀ ਧਾਰਾ 7.10.1 ਅਨੁਸਾਰ)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ਉੱਚੇ ਤੱਲਾਂ <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesUpperFloors"
                  required
                  placeholder="ਉੱਚੇ ਤੱਲਾਂ ਲਈ ਸੀੜੀਆਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ਬੇਸਮੈਂਟ <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesBasements"
                  required
                  placeholder="ਬੇਸਮੈਂਟ ਲਈ ਸੀੜੀਆਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                  className="w-80"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                ਸੀੜੀਆਂ ਦੀ ਚੌੜਾਈ (UBBL 2016 ਦੀ ਧਾਰਾ 8.4.3 ਅਨੁਸਾਰ)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ਉੱਚੇ ਤੱਲਾਂ <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseUpperFloors"
                  required
                  placeholder="ਉੱਚੇ ਤੱਲਾਂ ਲਈ ਸੀੜੀਆਂ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ਬੇਸਮੈਂਟ <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(ਮੀਟਰਾਂ ਵਿੱਚ)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseBasements"
                  required
                  placeholder="ਬੇਸਮੈਂਟ ਲਈ ਸੀੜੀਆਂ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                  className="w-80"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">ਸੀੜੀ ਦੀ ਵਿਵਸਥਾ</Label>
              <Checkbox name="provisionOfStaircase" value="true" />
            </div>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>ਫਾਇਰ ਟਾਵਰ</span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 1.4.46 /9.3.13 ਅਨੁਸਾਰ)
                </p>
              </Label>
              <Checkbox name="fireTower" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਛੱਤ ਤੱਕ ਲਗਾਤਾਰ ਸੀੜੀਆਂ ਦੀ ਗਿਣਤੀ{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 7.11(m) ਅਨੁਸਾਰ)
                </p>
              </Label>
              <Input
                type="number"
                name="numberOfContinuousStaircasesToTerrace"
                required
                placeholder="ਛੱਤ ਤੱਕ ਲਗਾਤਾਰ ਸੀੜੀਆਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਰੈਂਪ ਚੌੜਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 7.10.2 ਅਨੁਸਾਰ, ਮੀਟਰ ਵਿੱਚ)
                </p>
              </Label>
              <Input
                type="number"
                name="rampWidth"
                placeholder="ਰੈਂਪ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਨਿਕਾਸ ਦੀ ਸੁਰੱਖਿਆ (UBBL 2016 ਦੀ ਧਾਰਾ 7.5 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>ਫਾਇਰ ਚੈਕ ਡੋਰ</span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 8.4.5 (c) ਅਨੁਸਾਰ)
                </p>
              </Label>
              <Checkbox name="fireCheckDoor" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>ਪ੍ਰੈਸ਼ਰਾਈਜ਼ੇਸ਼ਨ</span>
                <p className="text-gray-500">(UBBL 2016 ਦੀ ਧਾਰਾ 9.3.2 ਅਨੁਸਾਰ)</p>
              </Label>
              <Checkbox name="pressurization" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਗਲਿਹਰੇ ਦੀ ਚੌੜਾਈ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 7.11.2 & 8.4.8 ਅਨੁਸਾਰ, ਮੀਟਰ ਵਿੱਚ)
                </p>
              </Label>
              <Input
                type="number"
                name="widthOfCorridor"
                required
                placeholder="ਗਲਿਹਰੇ ਦੀ ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਦਰਵਾਜ਼ੇ ਦਾ ਆਕਾਰ (ਚੌੜਾਈ x ਉਚਾਈ){" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 ਦੀ ਧਾਰਾ 7.12/7.23 ਅਨੁਸਾਰ, ਮੀਟਰ ਵਿੱਚ)
                </p>
              </Label>
              <Input
                type="number"
                name="doorSizeWidth"
                required
                placeholder="ਚੌੜਾਈ ਦਰਜ ਕਰੋ"
                className="w-40"
              />
              x
              <Input
                type="number"
                name="doorSizeHeight"
                required
                placeholder="ਉਚਾਈ ਦਰਜ ਕਰੋ"
                className="w-40"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਕਮਪਾਰਟਮੈਂਟੇਸ਼ਨ (UBBL 2016 ਦੀ ਧਾਰਾ 8.4.6 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਕਮਪਾਰਟਮੈਂਟ ਦਾ ਆਕਾਰ <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(ਵਰਗ ਮੀਟਰ ਵਿੱਚ)</p>
              </Label>
              <Input
                type="number"
                name="compartmentSize"
                required
                placeholder="ਕਮਪਾਰਟਮੈਂਟ ਦਾ ਆਕਾਰ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਉੱਚੇ ਤੱਲਾਂ 'ਤੇ ਫਾਇਰ ਕਮਪਾਰਟਮੈਂਟਾਂ ਦੀ ਗਿਣਤੀ{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsUpperFloors"
                required
                placeholder="ਉੱਚੇ ਤੱਲਾਂ ਲਈ ਫਾਇਰ ਕਮਪਾਰਟਮੈਂਟਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਬੇਸਮੈਂਟ 'ਤੇ ਫਾਇਰ ਕਮਪਾਰਟਮੈਂਟਾਂ ਦੀ ਗਿਣਤੀ{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsBasements"
                required
                placeholder="ਬੇਸਮੈਂਟ ਲਈ ਫਾਇਰ ਕਮਪਾਰਟਮੈਂਟਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਕਮਪਾਰਟਮੈਂਟੇਸ਼ਨ ਦੀ ਕਿਸਮ <span className="text-red-500">*</span>
                </span>
              </Label>

              <Select name="typeOfCompartmentation" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="ਕਮਪਾਰਟਮੈਂਟੇਸ਼ਨ ਦੀ ਕਿਸਮ ਚੁਣੋ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="By Fire resisting wall of 02 hrs rating">
                    ਫਾਇਰ ਰਜਿਸਟਿੰਗ ਵਾਲ (02 ਘੰਟੇ ਰੇਟਿੰਗ)
                  </SelectItem>
                  <SelectItem value="By Fire curtain of 02 hrs rating">
                    ਫਾਇਰ ਕਰਟਨ (02 ਘੰਟੇ ਰੇਟਿੰਗ)
                  </SelectItem>
                  <SelectItem value="By water curtain">
                    ਵਾਟਰ ਕਰਟਨ
                  </SelectItem>
                  <SelectItem value="Fire Dampers">ਫਾਇਰ ਡੈਂਪਰ</SelectItem>
                  <SelectItem value="Fire check door">ਫਾਇਰ ਚੈਕ ਡੋਰ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਧੂੰਏ ਦੀ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ (UBBL 2016 ਦੀ ਧਾਰਾ 8.4.7 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਧੂੰਏ ਦੀ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ ਦੀ ਕਿਸਮ{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Select name="smokeManagementSystem" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="ਧੂੰਏ ਦੀ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ ਦੀ ਕਿਸਮ ਚੁਣੋ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MECHANICAL">ਮਕੈਨੀਕਲ</SelectItem>
                  <SelectItem value="NATURAL">ਨੈਚਰਲ</SelectItem>
                  <SelectItem value="COMBINED">ਕੰਬਾਈਨਡ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਬੇਸਮੈਂਟ ਵਿੱਚ ਧੂੰਏ ਦੀ ਅਦਲਾ-ਬਦਲੀ
              </Label>
              <Checkbox name="basementAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਉਪਰਲੇ ਤੱਲਾਂ ਵਿੱਚ ਧੂੰਏ ਦੀ ਅਦਲਾ-ਬਦਲੀ
              </Label>
              <Checkbox name="upperFloorsAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਤਲ ਸਤਰ 'ਤੇ ਤਾਜ਼ੇ ਹਵਾ ਦੀ ਸਪਲਾਈ
              </Label>
              <Checkbox name="freshAirSupplyAtBottomLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਛੱਤ ਦੇ ਸਤਰ 'ਤੇ ਧੂੰਏ ਦੀ ਨਿਕਾਸ
              </Label>
              <Checkbox name="exhaustAirDischargeAtCeilingLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਤਾਜ਼ੇ ਹਵਾ ਲਈ ਕਟਆਉਟ ਦੀ ਵਿਵਸਥਾ
              </Label>
              <Checkbox name="provisionOfFreshAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਧੂੰਏ ਦੀ ਨਿਕਾਸ ਲਈ ਕਟਆਉਟ ਦੀ ਵਿਵਸਥਾ
              </Label>
              <Checkbox name="provisionOfExhaustAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਹਵਾ ਬਦਲਣ ਦੇ ਹਿਸਾਬਾਂ ਨਾਲ ਡਰਾਇੰਗ
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="ventilationCalculationsWithDrawing"
                required
                placeholder="ਹਵਾ ਬਦਲਣ ਦੇ ਹਿਸਾਬਾਂ ਨਾਲ ਡਰਾਇੰਗ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>

          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">ਅੱਗ ਬੁਝਾਏ ਵਾਲੇ ਉਪਕਰਣ</h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਹਰ ਮੰਜ਼ਿਲ ਤੇ ਕੁੱਲ ਗਿਣਤੀ <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="fireExtinguishersTotalNumbersEachFloor"
                required
                placeholder="ਹਰ ਮੰਜ਼ਿਲ ਤੇ ਉਪਕਰਣਾਂ ਦੀ ਕੁੱਲ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>

          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਫਸਟ-ਏਡ ਹੋਜ਼ ਰੀਲਾਂ (UBBL 2016 ਦੀ ਧਾਰਾ 9.3.9 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>ਸੀੜੀਆਂ ਦੇ ਨੇੜੇ ਸਥਿਤੀ</span>
              </Label>
              <Checkbox
                name="firstAidHoseReelsLocationNearStairs"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਹਰ ਤੱਲ 'ਤੇ ਕੁੱਲ ਗਿਣਤੀ <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="firstAidHoseReelsTotalNumberEachFloor"
                required
                placeholder="ਹਰ ਤੱਲ 'ਤੇ ਹੋਜ਼ ਰੀਲਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>
          </div>

          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ਆਟੋਮੈਟਿਕ ਫਾਇਰ ਡਿਟੈਕਸ਼ਨ ਅਤੇ ਅਲਾਰਮਿੰਗ ਪ੍ਰਣਾਲੀ
              (UBBL 2016 ਦੀ ਧਾਰਾ 9.3.9 ਅਤੇ IS 2189 ਅਨੁਸਾਰ)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ਡਿਟੈਕਟਰ ਦੀ ਕਿਸਮ <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="text"
                name="automaticFireDetectionAndAlarmingSystemTypeOfDetectors"
                required
                placeholder="ਡਿਟੈਕਟਰ ਦੀ ਕਿਸਮ ਦਰਜ ਕਰੋ"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਫਾਲਸ ਸੀਲਿੰਗ ਤੋਂ ਉਪਰਲੇ ਡਿਟੈਕਟਰ
              </Label>
              <Checkbox name="detectorAboveFalseCeiling" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ਡਕਟ/ਸ਼ਾਫਟ ਵਿੱਚ ਡਿਟੈਕਟਰ ਦੀ ਵਿਵਸਥਾ
              </Label>
              <Checkbox name="provisionOfDetectorsInDuctShaft" value="true" />
            </div>
          </div>
          <hr />

<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਮੈਨੂਅਲ ਚਲਣ ਵਾਲਾ ਬਿਜਲੀ ਅਗਨਿ ਅਲਾਰਮ (MOEFA)</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.9 ਦੇ ਤਹਿਤ)
      </p>
    </Label>
    <Checkbox name="manuallyOperatedElectricFireAlarm" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਜਨਤਕ ਪਤਾ ਪ੍ਰਣਾਲੀ</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.9 ਦੇ ਤਹਿਤ)
      </p>
    </Label>
    <Checkbox name="publicAddressSystem" value="true" />
  </div>
</div>
<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਸਵੈਚਾਲਿਤ ਸਪ੍ਰਿੰਕਲਰ ਸਿਸਟਮ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.9 ਅਤੇ IS 15105 ਦੇ ਤਹਿਤ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਇੱਕ ਸਥਾਪਨਾ ਵਿੱਚ ਕੁੱਲ ਸਪ੍ਰਿੰਕਲਰ ਹੈਡ ਦੀ ਗਿਣਤੀ (ਲਗਭਗ)
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(IS-15105 ਦੇ ਤਹਿਤ)</p>
    </Label>
    <Input
      type="number"
      name="automaticSprinklerSystemTotalNumberOfSprinklerHead"
      required
      placeholder="ਸਪ੍ਰਿੰਕਲਰ ਹੈਡ ਦੀ ਕੁੱਲ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ਤਹਖਾਨਾ (ਬੇਸਮੈਂਟ)
      <span className="text-red-500">*</span>
    </Label>
    <Input
      type="number"
      name="basement"
      required
      placeholder="ਤਹਖਾਨੇ ਵਿੱਚ ਸਪ੍ਰਿੰਕਲਰ ਹੈਡ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ਉੱਪਰੀ ਮੰਜ਼ਿਲ
      <span className="text-red-500">*</span>
    </Label>
    <Input
      type="number"
      name="upperFloor"
      required
      placeholder="ਉੱਪਰੀ ਮੰਜ਼ਿਲ ਵਿੱਚ ਸਪ੍ਰਿੰਕਲਰ ਹੈਡ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ਝੂਠੀ ਛੱਤ ਦੇ ਉਪਰ ਸਪ੍ਰਿੰਕਲਰ
    </Label>
    <Checkbox name="sprinklerAboveFalseCeiling" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      IS 15105 ਦੇ ਤਹਿਤ ਹਿਸਾਬ ਕਿਤਾਬ ਅਤੇ ਡਰਾਇੰਗਸ
    </Label>
    <Checkbox name="calculationsAsPerIS15105WithDrawings" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">ਅੱਗ ਬੁਝਾਉਣ ਵਾਲੇ ਸੇਵਾ ਇਨਲੇਟ</Label>
    <Checkbox name="fireServicesInlet" value="true" />
  </div>
</div>

<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਅੰਦਰੂਨੀ ਹਾਇਡਰੈਂਟਸ (IS 3844 ਦੇ ਤਹਿਤ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਰਾਈਜ਼ਰ/ਡਾਊਨ ਕਾਮਰ ਦਾ ਆਕਾਰ 
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(ਮਿਲੀਮੀਟਰ ਵਿੱਚ)</p>
    </Label>
    <Input
      type="number"
      name="internalHydrantsSizeOfRiserDownComer"
      required
      placeholder="ਰਾਈਜ਼ਰ/ਡਾਊਨ ਕਾਮਰ ਦਾ ਆਕਾਰ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਹਰ ਮੰਜ਼ਿਲ ਤੇ ਹਾਇਡਰੈਂਟਸ ਦੀ ਗਿਣਤੀ 
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfHydrantsPerFloor"
      required
      placeholder="ਹਰ ਮੰਜ਼ਿਲ ਤੇ ਹਾਇਡਰੈਂਟਸ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਸਿਰੀਆਂ ਦੇ ਨੇੜੇ ਸਥਾਨ</span>
    </Label>
    <Checkbox name="locationNearToStaircase" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਹਰ ਲੈਂਡਿੰਗ ਵਾਲਵ ਦੇ ਨੇੜੇ ਹੋਜ਼ ਬਾਕਸ</span>
    </Label>
    <Checkbox name="hoseBoxesNearEachLandingValve" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਅੱਗ ਬੁਝਾਉਣ ਵਾਲੇ ਸੇਵਾ ਇਨਲੇਟ</span>
    </Label>
    <Checkbox name="fireServicesInlet" value="true" />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਯਾਰਡ ਹਾਇਡਰੈਂਟਸ (IS 13039 ਦੇ ਤਹਿਤ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਯਾਰਡ ਹਾਇਡਰੈਂਟਸ ਦੀ ਕੁੱਲ ਗਿਣਤੀ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="yardHydrantsTotalNumber"
      required
      placeholder="ਯਾਰਡ ਹਾਇਡਰੈਂਟਸ ਦੀ ਕੁੱਲ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਦੋ ਯਾਰਡ ਹਾਇਡਰੈਂਟਸ ਦੇ ਵਿਚਕਾਰ ਦੀ ਦੂਰੀ
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(ਮੀਟਰ ਵਿੱਚ)</p>
    </Label>
    <Input
      type="number"
      name="distanceBetweenTwoYardHydrants"
      required
      placeholder="ਦੋ ਯਾਰਡ ਹਾਇਡਰੈਂਟਸ ਦੇ ਵਿਚਕਾਰ ਦੀ ਦੂਰੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਹੋਜ਼ ਬਾਕਸ ਦੀ ਗਿਣਤੀ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfHoseBox"
      required
      placeholder="ਹੋਜ਼ ਬਾਕਸ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>
</div>

<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਪੰਪਿੰਗ ਪ੍ਰਬੰਧ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.9 ਦੇ ਤਹਿਤ)
  </h2>

  <div className="space-y-4">
    <h3 className="font-medium underline underline-offset-4">ਜਮੀਨੀ ਸਤਰ</h3>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>ਪੰਪ ਰੂਮ ਦਾ ਸਥਾਨ</span>
      </Label>
      <Input
        type="text"
        name="pumpingArrangementsGroundLevelLocationOfPumpRoom"
        placeholder="ਪੰਪ ਰੂਮ ਦਾ ਸਥਾਨ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਮੁੱਖ ਪੰਪ ਦਾ ਡਿਸਚਾਰਜ
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(ਲਿਟਰ ਪ੍ਰਤੀ ਮਿੰਟ)</p>
      </Label>
      <Input
        type="number"
        name="dischargeOfMainPump"
        required
        placeholder="ਮੁੱਖ ਪੰਪ ਦਾ ਡਿਸਚਾਰਜ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਮੁੱਖ ਪੰਪ ਦਾ ਹੈਡ
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(ਮੀਟਰ ਵਿੱਚ)</p>
      </Label>
      <Input
        type="number"
        name="headOfMainPump"
        required
        placeholder="ਮੁੱਖ ਪੰਪ ਦਾ ਹੈਡ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਮੁੱਖ ਪੰਪਾਂ ਦੀ ਗਿਣਤੀ
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfMainPumps"
        required
        placeholder="ਮੁੱਖ ਪੰਪਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਜੌਕੀ ਪੰਪ ਆਉਟਪੁੱਟ (LPM)
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="jockeyPumpOutput"
        required
        placeholder="ਜੌਕੀ ਪੰਪ ਦਾ ਆਉਟਪੁੱਟ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਜੌਕੀ ਪੰਪ ਹੈਡ
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(ਮੀਟਰ ਵਿੱਚ)</p>
      </Label>
      <Input
        type="number"
        name="jockeyPumpHead"
        required
        placeholder="ਜੌਕੀ ਪੰਪ ਦਾ ਹੈਡ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਜੌਕੀ ਪੰਪਾਂ ਦੀ ਗਿਣਤੀ
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfJockeyPumps"
        required
        placeholder="ਜੌਕੀ ਪੰਪਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਸਟੈਂਡਬਾਈ ਪੰਪ ਆਉਟਪੁੱਟ (LPM)
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="standbyPumpOutput"
        required
        placeholder="ਸਟੈਂਡਬਾਈ ਪੰਪ ਦਾ ਆਉਟਪੁੱਟ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਸਟੈਂਡਬਾਈ ਪੰਪ ਹੈਡ
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(ਮੀਟਰ ਵਿੱਚ)</p>
      </Label>
      <Input
        type="number"
        name="standbyPumpHead"
        required
        placeholder="ਸਟੈਂਡਬਾਈ ਪੰਪ ਦਾ ਹੈਡ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>ਜਮੀਨੀ ਸਤਰ ਤੋਂ ਪੰਪ ਹਾਊਸ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ</span>
      </Label>
      <Checkbox
        name="directAccessToPumpHouseFromGroundLevel"
        value="true"
      />
    </div>
  </div>

  <div className="space-y-4">
    <h3 className="font-medium underline underline-offset-4">ਛੱਤ ਸਤਰ</h3>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਪੰਪ ਦਾ ਡਿਸਚਾਰਜ (LPM)
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="terraceLevelDischargeOfPump"
        required
        placeholder="ਛੱਤ ਸਤਰ 'ਤੇ ਪੰਪ ਦਾ ਡਿਸਚਾਰਜ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ਪੰਪ ਦਾ ਹੈਡ
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(ਮੀਟਰ ਵਿੱਚ)</p>
      </Label>
      <Input
        type="number"
        name="headOfThePump"
        required
        placeholder="ਛੱਤ ਸਤਰ 'ਤੇ ਪੰਪ ਦਾ ਹੈਡ ਦਰਜ ਕਰੋ"
        className="w-80"
      />
    </div>
  </div>
</div>

<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਅੱਗ ਬੁਝਾਉਣ ਲਈ ਕੈਪਟਿਵ ਜਲ ਸਟੋਰੇਜ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.9 ਅਤੇ IS 15105 ਦੇ ਤਹਿਤ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਭੂਗਰਭ ਟੈਂਕ ਦਾ ਸਥਾਨ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="text"
      name="captiveWaterStorageForFirefightingLocationOfUndergroundTank"
      required
      placeholder="ਭੂਗਰਭ ਟੈਂਕ ਦਾ ਸਥਾਨ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਭੂਗਰਭ ਟੈਂਕ ਦੀ ਸਮਰੱਥਾ
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(ਲਿਟਰ ਵਿੱਚ)</p>
    </Label>
    <Input
      type="number"
      name="undergroundTankCapacity"
      required
      placeholder="ਭੂਗਰਭ ਟੈਂਕ ਦੀ ਸਮਰੱਥਾ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਡਰਾਅਫ ਕਨੈਕਸ਼ਨ</span>
    </Label>
    <Checkbox name="drawOffConnection" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਅੱਗ ਬੁਝਾਉਣ ਵਾਲੀ ਸੇਵਾ ਇਨਲੇਟ</span>
    </Label>
    <Checkbox name="fireServiceInlet" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਟੈਂਕ ਤੱਕ ਪਹੁੰਚ</span>
    </Label>
    <Checkbox name="accessToTank" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਓਵਰਹੈਡ ਟੈਂਕ ਦੀ ਸਮਰੱਥਾ
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(ਲਿਟਰ ਵਿੱਚ)</p>
    </Label>
    <Input
      type="number"
      name="overheadTankCapacity"
      required
      placeholder="ਓਵਰਹੈਡ ਟੈਂਕ ਦੀ ਸਮਰੱਥਾ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਜਾਂਚ ਲਈ ਸੀੜ੍ਹੀ</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 7.10.3 ਦੇ ਤਹਿਤ)
      </p>
    </Label>
    <Checkbox name="ladderForInspection" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਟੈਂਕਾਂ ਦਾ ਕ੍ਰਾਸ-ਸੈਕਸ਼ਨ ਚਿੱਤਰ</span>
    </Label>
    <Checkbox name="crossSectionDrawingOfTanks" value="true" />
  </div>
</div>

<hr />

<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਨਿਕਾਸ ਸੰਕੇਤ</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 7.11 (r) ਅਨੁਸਾਰ)
      </p>
    </Label>
    <Checkbox name="exitSignage" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਸਟੈਂਡਬਾਈ ਬਿਜਲੀ ਸਪਲਾਈ</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 8.5.3 ਅਨੁਸਾਰ)
      </p>
    </Label>
    <Checkbox name="standbyPowerSupply" value="true" />
  </div>
</div>
<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਲਿਫਟਾਂ ਦਾ ਪ੍ਰਬੰਧ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 8.4.4/9.3.3 ਅਨੁਸਾਰ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਯਾਤਰੀ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfPassengerLifts"
      required
      placeholder="ਯਾਤਰੀ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਕਾਰ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfCarLifts"
      required
      placeholder="ਕਾਰ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਅੱਗ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfFireLifts"
      required
      placeholder="ਅੱਗ ਲਿਫਟਾਂ ਦੀ ਗਿਣਤੀ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਫਾਇਰਮੈਨ ਦਾ ਗ੍ਰਾਉਂਡਿੰਗ ਸਵਿੱਚ</span>
    </Label>
    <Checkbox name="firemansGroundingSwitch" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ਲਿਫਟ ਸ਼ਾਫਟ ਦਾ ਦਬਾਅ
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 8.4.4 m ਅਨੁਸਾਰ)
      </p>
    </Label>
    <Checkbox name="pressurizationOfLiftShaft" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ਲਿਫਟ ਲੌਬੀ ਦਾ ਦਬਾਅ
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 8.4.4 m ਅਨੁਸਾਰ)
      </p>
    </Label>
    <Checkbox name="pressurizationOfLiftLobby" value="true" />
  </div>
</div>
<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਸ਼ਰਨ ਖੇਤਰ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.6/9.3.7 ਅਨੁਸਾਰ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਪੱਧਰ / ਮੰਜ਼ਿਲਾਂ
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="refugeAreaLevels"
      required
      placeholder="ਪੱਧਰ / ਮੰਜ਼ਿਲਾਂ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ਹਰ ਪੱਧਰ ਦਾ ਖੇਤਰਫਲ
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(ਵਰਗ ਮੀਟਰ ਵਿੱਚ)</p>
    </Label>
    <Input
      type="number"
      name="refugeAreaAtEachLevel"
      required
      placeholder="ਹਰ ਪੱਧਰ ਦਾ ਖੇਤਰਫਲ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਨਜ਼ਦੀਕੀ ਸੀੜ੍ਹੀਆਂ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ</span>
    </Label>
    <Checkbox name="directAccessToNearestStaircase" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਅੱਗ ਦੀ ਜਾਂਚ ਮੰਜ਼ਿਲ</span>
      <p className="text-gray-500">
        (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.8 ਅਨੁਸਾਰ)
      </p>
    </Label>
    <Checkbox name="fireCheckFloor" value="true" />
  </div>
</div>
<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    ਅੱਗ ਨਿਯੰਤਰਣ ਕਮਰਾ (UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.10/9.3.14 ਅਨੁਸਾਰ)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਜਮੀਨ ਮੰਜ਼ਿਲ 'ਤੇ ਮੁੱਖ ਪ੍ਰਵੇਸ਼ ਦੁਆਰ ਦੇ ਕੋਲ ਸਥਾਨ</span>
    </Label>
    <Checkbox
      name="fireControlRoomNearEntranceGroundFloor"
      value="true"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ਅੱਗ ਸੁਰੱਖਿਆ ਅਧਿਕਾਰੀ ਦਾ ਪ੍ਰਬੰਧ</span>
      <p className="text-gray-500">(UBBL 2016 ਦੇ ਕਲੌਜ਼ 9.3.14)</p>
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
        ਵਿਸ਼ੇਸ਼ ਜੋਖਮਾਂ ਤੋਂ ਬਚਾਅ ਲਈ ਵਿਸ਼ੇਸ਼ ਅੱਗ ਸੁਰੱਖਿਆ ਪ੍ਰਣਾਲੀਆਂ
      </span>
      <p className="text-gray-500">(ਜੇ ਹੋਵੇ)</p>
    </Label>
    <Textarea
      name="specialFireProtectionSystems"
      placeholder="ਵਿਸ਼ੇਸ਼ ਅੱਗ ਸੁਰੱਖਿਆ ਪ੍ਰਣਾਲੀਆਂ ਦਰਜ ਕਰੋ"
      className="w-80"
    />
  </div>
</div>

<hr />

<div>
  <Button type="submit">ਅਰਜ਼ੀ ਜਮ੍ਹਾ ਕਰੋ</Button>
</div>
</form>
</div>
</div>
);
};

export default Page;

