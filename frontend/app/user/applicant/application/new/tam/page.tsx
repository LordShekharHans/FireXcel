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
        <h1 className="text-2xl font-bold">நோசி விண்ணப்பப் படிவம்</h1>
        <p>தயவுசெய்து அனைத்து புலங்களையும் நிரப்பவும்</p>
  
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
                  `/user/applicant/application/new/success/ta?id=${response?.application?.applicationId}`
                );
              } else {
              }
            }}
          >
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">பொது</h2>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  பிரிவு <span className="text-red-500">*</span>
                </Label>
  
                <Select name="division" required>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="உங்கள் பிரிவை தேர்ந்தெடுக்கவும்" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CENTRAL">மத்திய</SelectItem>
                    <SelectItem value="SOUTH">தெற்கு</SelectItem>
                    <SelectItem value="EAST">கிழக்கு</SelectItem>
                    <SelectItem value="WEST">மேற்கு</SelectItem>
                    <SelectItem value="SOUTH WEST">தெற்கு மேற்கு</SelectItem>
                    <SelectItem value="NORTH WEST">வடமேற்கு</SelectItem>
                  </SelectContent>
                </Select>
              </div>
  
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    பயன்பாட்டு வகை <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">
                    (UBBL 2016 இன் பிரிவு 1.4.75 படி)
                  </p>
                </Label>
                <Select name="typeOfOccupancy" required>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="பயன்பாட்டின் வகையைத் தேர்ந்தெடுக்கவும்" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential Buildings">
                      குடியிருப்பு கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Educational Buildings">
                      கல்வி கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Institutional Buildings">
                      நிறுவனம் கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Assembly Buildings">
                      கூட்டத்தொகுப்பு கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Business Buildings">
                      வணிக கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Mercantile Buildings">
                      வாணிக கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Industrial Buildings">
                      தொழில்துறை கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Storage Buildings">
                      சேமிப்பு கட்டடங்கள்
                    </SelectItem>
                    <SelectItem value="Hazardous Building">
                      ஆபத்தான கட்டடங்கள்
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
  
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    கட்டடத்தின் உயரம் <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(மீட்டர்களில்)</p>
                </Label>
                <Input
                  type="number"
                  name="heightOfBuilding"
                  required
                  placeholder="கட்டடத்தின் உயரத்தை உள்ளிடவும்"
                  className="w-80"
                />
              </div>
              <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மாடிகள் எண்ணிக்கை <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(நிலத்தடியில் உள்ளவற்றையும் சேர்த்து)</p>
    </Label>
    <Input
      type="number"
      name="numberOfFloors"
      required
      placeholder="மாடிகள் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலத்தடி வரம்பிலான பகுதி <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(சதுர மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="coveredAreaGroundFloor"
      required
      placeholder="நிலத்தடி வரம்பிலான பகுதியை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        வழக்கமான மாடி பகுதி <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(சதுர மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="typicalFloorArea"
      required
      placeholder="வழக்கமான மாடி பகுதியை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலத்தடிகளின் எண்ணிக்கை <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfBasements"
      placeholder="நிலத்தடிகளின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலத்தடி மாடி பகுதி <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(சதுர மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="basementFloorArea"
      placeholder="நிலத்தடி மாடி பகுதியை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மொத்த வரம்பிலான பகுதி <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">
        (நிலத்தடிகள் மற்றும் நிலத்தடி பகுதிகளை உட்படுத்தி, சதுர மீட்டர்களில்)
      </p>
    </Label>
    <Input
      type="number"
      name="totalCoveredArea"
      placeholder="மொத்த வரம்பிலான பகுதியை உள்ளிடவும்"
      className="w-80"
    />
  </div>
  </div>
  <hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    கட்டடத்திற்கான அணுகல் (UBBL 2016 இன் பிரிவு 8.2/7.13.3 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        சாலையின் அகலம் <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="roadWidth"
      required
      placeholder="சாலையின் அகலத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நுழைவாயில் அகலம் <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="gateWidth"
      required
      placeholder="நுழைவாயில் அகலத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        உள்சாலை அகலம் <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="internalRoadWidth"
      required
      placeholder="உள்சாலை அகலத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        கட்டட வரம்பிலிருந்து உள்சாலையின் தூரம்{" "}
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="distanceFromBuildingLine"
      required
      placeholder="கட்டட வரம்பிலிருந்து தூரத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    வெளியேறும் வழிகள், வகை மற்றும் அமைப்பு (UBBL 2016 இன் பிரிவு 7.8 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பயண தூரம் <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="travelDistance"
      required
      placeholder="பயண தூரத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        கடைசி பயண தூரம் <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="deadEndTravelDistance"
      required
      placeholder="கடைசி பயண தூரத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="space-y-4">
    <h3 className="font-medium underline underline-offset-4">
      மேல்தளங்களின் படிக்கட்டுகள் எண்ணிக்கை (UBBL 2016 இன் பிரிவு 7.10.1 படி)
    </h3>
    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          மேல்தளங்கள் <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfStaircasesUpperFloors"
        required
        placeholder="மேல்தளங்களின் படிக்கட்டுகள் எண்ணிக்கையை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          நிலத்தடி <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfStaircasesBasements"
        required
        placeholder="நிலத்தடிக்கான படிக்கட்டுகள் எண்ணிக்கையை உள்ளிடவும்"
        className="w-80"
      />
    </div>
  </div>

  <div className="space-y-4">
    <h3 className="font-medium underline underline-offset-4">
      படிக்கட்டின் அகலம் (UBBL 2016 இன் பிரிவு 8.4.3 படி)
    </h3>
    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          மேல்தளங்கள் <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(மீட்டர்களில்)</p>
      </Label>
      <Input
        type="number"
        name="widthOfStaircaseUpperFloors"
        required
        placeholder="மேல்தளங்களுக்கான படிக்கட்டின் அகலத்தை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          நிலத்தடி <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(மீட்டர்களில்)</p>
      </Label>
      <Input
        type="number"
        name="widthOfStaircaseBasements"
        required
        placeholder="நிலத்தடிக்கான படிக்கட்டின் அகலத்தை உள்ளிடவும்"
        className="w-80"
      />
    </div>
  </div>
</div>
<hr />
<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">படிக்கட்டின் ஏற்பாடு</Label>
    <Checkbox name="provisionOfStaircase" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>அக்னி கோபுரம் (Fire Tower)</span>
      <p className="text-gray-500">(UBBL 2016 இன் பிரிவு 1.4.46 /9.3.13 படி)</p>
    </Label>
    <Checkbox name="fireTower" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        தொடர்ச்சியான படிக்கட்டுகள் (மாடிக்கு) எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(UBBL 2016 இன் பிரிவு 7.11(m) படி)</p>
    </Label>
    <Input
      type="number"
      name="numberOfContinuousStaircasesToTerrace"
      required
      placeholder="மாடிக்கு தொடர்ச்சியான படிக்கட்டுகள் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        வளைவு அகலம் (Ramp Width) <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">
        (UBBL 2016 இன் பிரிவு 7.10.2 படி, மீட்டர்களில்)
      </p>
    </Label>
    <Input
      type="number"
      name="rampWidth"
      placeholder="வளைவு அகலத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    வெளியேறும் வழிகளின் பாதுகாப்பு (UBBL 2016 இன் பிரிவு 7.5 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>அக்னி சோதனை வால்வு (Fire Check Door)</span>
      <p className="text-gray-500">
        (UBBL 2016 இன் பிரிவு 8.4.5 (c) படி)
      </p>
    </Label>
    <Checkbox name="fireCheckDoor" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>அழுத்த நிலைப்படுத்தல் (Pressurization)</span>
      <p className="text-gray-500">(UBBL 2016 இன் பிரிவு 9.3.2 படி)</p>
    </Label>
    <Checkbox name="pressurization" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        միջանցքի அகலம் (Width of Corridor) <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">
        (UBBL 2016 இன் பிரிவு 7.11.2 & 8.4.8 படி, மீட்டர்களில்)
      </p>
    </Label>
    <Input
      type="number"
      name="widthOfCorridor"
      required
      placeholder="மிட்சாமலை அகலத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        கதவு அளவுகள் (அகலம் x உயரம்){" "}
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">
        (UBBL 2016 இன் பிரிவு 7.12/7.23 படி, மீட்டர்களில்)
      </p>
    </Label>
    <Input
      type="number"
      name="doorSizeWidth"
      required
      placeholder="கதவின் அகலத்தை உள்ளிடவும்"
      className="w-40"
    />
    x
    <Input
      type="number"
      name="doorSizeHeight"
      required
      placeholder="கதவின் உயரத்தை உள்ளிடவும்"
      className="w-40"
    />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    பிரிவாக்கம் (Compartmentation) (UBBL 2016 இன் பிரிவு 8.4.6 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பிரிவின் அளவு <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(சதுர மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="compartmentSize"
      required
      placeholder="பிரிவின் அளவை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மேல்தளங்களில் பயன்மிக்க தீ பிரிவுகள் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfFireCompartmentsUpperFloors"
      required
      placeholder="முதன்மைத் தளங்களில் உள்ள தீப் பிரிவுகளின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலத்தடியில் உள்ள தீப் பிரிவுகளின் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfFireCompartmentsBasements"
      required
      placeholder="நிலத்தடியில் உள்ள தீப் பிரிவுகளின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பிரிவாக்கம் வகை <span className="text-red-500">*</span>
      </span>
    </Label>
    <Select name="typeOfCompartmentation" required>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="பிரிவாக்கத்தின் வகையைத் தேர்ந்தெடுக்கவும்" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="By Fire resisting wall of 02 hrs rating">
          02 மணி நேர மதிப்பீடு கொண்ட தீ எதிர்ப்பு சுவர்
        </SelectItem>
        <SelectItem value="By Fire curtain of 02 hrs rating">
          02 மணி நேர மதிப்பீடு கொண்ட தீ پردவு
        </SelectItem>
        <SelectItem value="By water curtain">தண்ணீர் پردவு</SelectItem>
        <SelectItem value="Fire Dampers">தீ தடை</SelectItem>
        <SelectItem value="Fire check door">தீ சோதனை கதவு</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">புகை மேலாண்மை அமைப்பு</h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        புகை மேலாண்மை அமைப்பு வகை <span className="text-red-500">*</span>
      </span>
    </Label>
    <Select name="smokeManagementSystem" required>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="புகை மேலாண்மை அமைப்பின் வகையைத் தேர்ந்தெடுக்கவும்" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="MECHANICAL">இயந்திர</SelectItem>
        <SelectItem value="NATURAL">இயற்கை</SelectItem>
        <SelectItem value="COMBINED">இணைந்த</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">நிலத்தடி பகுதியில் ஏர் மாற்றம்</Label>
    <Checkbox name="basementAirChanges" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">மேல்தள பகுதிகளில் ஏர் மாற்றம்</Label>
    <Checkbox name="upperFloorsAirChanges" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">கீழ்மட்டத்தில் தகுந்த காற்றோட்டம்</Label>
    <Checkbox name="freshAirSupplyAtBottomLevel" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      மேல்மட்டத்தில் புகை வெளியேற்றம்
    </Label>
    <Checkbox name="exhaustAirDischargeAtCeilingLevel" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">காற்று குளைகள் ஏற்பாடு</Label>
    <Checkbox name="provisionOfFreshAirCutOuts" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">புகை காற்று வெளியேற்றம்</Label>
    <Checkbox name="provisionOfExhaustAirCutOuts" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      காற்றோட்ட கணக்கீடுகள் மற்றும் வரைபடங்கள்
      <span className="text-red-500">*</span>
    </Label>
    <Textarea
      name="ventilationCalculationsWithDrawing"
      required
      placeholder="காற்றோட்ட கணக்கீடுகள் மற்றும் வரைபடங்களை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">தீ அணைப்பான் (Fire Extinguishers)</h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ஒவ்வொரு தளத்திலும் மொத்த எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="fireExtinguishersTotalNumbersEachFloor"
      required
      placeholder="ஒவ்வொரு தளத்திலும் தீ அணைப்பான் மொத்த எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    முதலுதவி குழாய்கள் (First-aid Hose Reels) (UBBL 2016 இன் பிரிவு 9.3.9 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">படிக்கட்டுகளின் அருகில் உள்ள இடம்</Label>
    <Checkbox name="firstAidHoseReelsLocationNearStairs" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ஒவ்வொரு தளத்திற்கான மொத்த எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="firstAidHoseReelsTotalNumberEachFloor"
      required
      placeholder="ஒவ்வொரு தளத்திற்கான குழாய்களின் மொத்த எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    தானியங்கி தீ கண்டறியும் மற்றும் எச்சரிக்கும் அமைப்பு (UBBL 2016 இன்
    பிரிவு 9.3.9 & IS 2189 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        கண்டறிபவர் வகை <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="text"
      name="automaticFireDetectionAndAlarmingSystemTypeOfDetectors"
      required
      placeholder="தீ கண்டறிபவர் வகையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">ம falso ceiling க்குப் மேலே கண்டறிபவர்</Label>
    <Checkbox name="detectorAboveFalseCeiling" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      வாள்வாய் மற்றும் காற்றோட்ட குழாய்களில் கண்டறிபவர்
    </Label>
    <Checkbox name="provisionOfDetectorsInDuctShaft" value="true" />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    தானியங்கி தணிப்பு அமைப்பு (Automatic Sprinkler System) 
    (UBBL 2016 இன் பிரிவு 9.3.9 & IS 15105 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ஒற்றை அமைப்பில் மொத்த தணிப்பு தலையின் எண்ணிக்கை (தகவல் மதிப்பீடு){" "}
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(IS-15105 படி)</p>
    </Label>
    <Input
      type="number"
      name="automaticSprinklerSystemTotalNumberOfSprinklerHead"
      required
      placeholder="மொத்த தணிப்பு தலையின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலத்தடி பகுதியில் தணிப்பு தலையின் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="basement"
      required
      placeholder="நிலத்தடி பகுதியில் உள்ள தணிப்பு தலையின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மேல்தள பகுதியில் தணிப்பு தலையின் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="upperFloor"
      required
      placeholder="மேல்தள பகுதியில் உள்ள தணிப்பு தலையின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">False Ceiling க்குக் கீழே தணிப்பு</Label>
    <Checkbox name="sprinklerAboveFalseCeiling" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      IS 15105 படி கணக்கீடுகள் மற்றும் வரைபடங்கள்
    </Label>
    <Checkbox name="calculationsAsPerIS15105WithDrawings" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">அக்னி சேவை நுழைவாயில் (Fire Services Inlet)</Label>
    <Checkbox name="fireServicesInlet" value="true" />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    உள்நாட்டு ஹைட்ரண்ட் (Internal Hydrants) (IS 3844 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ரிசர்/டவுன் காமர் அளவு <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மில்லிமீட்டரில்)</p>
    </Label>
    <Input
      type="number"
      name="internalHydrantsSizeOfRiserDownComer"
      required
      placeholder="ரிசர்/டவுன் காமரின் அளவை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ஒவ்வொரு தளத்திலும் ஹைட்ரண்ட்களின் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfHydrantsPerFloor"
      required
      placeholder="ஒவ்வொரு தளத்திலும் ஹைட்ரண்ட்களின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">படிக்கட்டுகளின் அருகில் உள்ள இடம்</Label>
    <Checkbox name="locationNearToStaircase" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      ஒவ்வொரு ஹைட்ரண்ட் வால்வின் அருகே குழாய் பெட்டிகள்
    </Label>
    <Checkbox name="hoseBoxesNearEachLandingValve" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">அக்னி சேவை நுழைவாயில்</Label>
    <Checkbox name="fireServicesInlet" value="true" />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    வெளிநாட்டு ஹைட்ரண்ட் (Yard Hydrants) (IS 13039 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மொத்த ஹைட்ரண்ட்களின் எண்ணிக்கை{" "}
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="yardHydrantsTotalNumber"
      required
      placeholder="மொத்த ஹைட்ரண்ட்களின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        இரண்டு ஹைட்ரண்ட்களின் இடையிலான தூரம்{" "}
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="distanceBetweenTwoYardHydrants"
      required
      placeholder="இரண்டு ஹைட்ரண்ட்களின் இடையிலான தூரத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        குழாய் பெட்டிகளின் எண்ணிக்கை <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfHoseBox"
      required
      placeholder="குழாய் பெட்டிகளின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>

<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    பம்பிங் அமைப்பு (Pumping Arrangements) 
    (UBBL 2016 இன் பிரிவு 9.3.9 படி)
  </h2>

  <div className="space-y-4">
    <h3 className="font-medium underline underline-offset-4">தரையை நிலை</h3>
    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>பம்ப் அறையின் இருப்பிடம்</span>
      </Label>
      <Input
        type="text"
        name="pumpingArrangementsGroundLevelLocationOfPumpRoom"
        placeholder="பம்ப் அறையின் இருப்பிடத்தை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          மெயின் பம்பின் வெளியீடு (LPM){" "}
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="dischargeOfMainPump"
        required
        placeholder="மெயின் பம்பின் வெளியீட்டை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          மெயின் பம்பின் உயரம் (Head){" "}
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(மீட்டர்களில்)</p>
      </Label>
      <Input
        type="number"
        name="headOfMainPump"
        required
        placeholder="மெயின் பம்பின் உயரத்தை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          மெயின் பம்ப்களின் எண்ணிக்கை{" "}
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfMainPumps"
        required
        placeholder="மெயின் பம்ப்களின் எண்ணிக்கையை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ஜாக்கி பம்ப் வெளியீடு (LPM){" "}
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="jockeyPumpOutput"
        required
        placeholder="ஜாக்கி பம்பின் வெளியீட்டை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ஜாக்கி பம்ப் உயரம் (Head){" "}
          <span className="text-red-500">*</span>
        </span>
        <p className="text-gray-500">(மீட்டர்களில்)</p>
      </Label>
      <Input
        type="number"
        name="jockeyPumpHead"
        required
        placeholder="ஜாக்கி பம்பின் உயரத்தை உள்ளிடவும்"
        className="w-80"
      />
    </div>

    <div className="flex items-center gap-4">
      <Label className="space-y-2 w-1/3">
        <span>
          ஜாக்கி பம்ப்களின் எண்ணிக்கை{" "}
          <span className="text-red-500">*</span>
        </span>
      </Label>
      <Input
        type="number"
        name="numberOfJockeyPumps"
        required
        placeholder="ஜாக்கி பம்ப்களின் எண்ணிக்கையை உள்ளிடவும்"
        className="w-80"
      />
    </div>
    <div className="flex items-center gap-4">
  <Label className="space-y-2 w-1/3">
    <span>
      ஸ்டாண்ட்பை பம்ப் அவுட்புட் (LPM)
      <span className="text-red-500">*</span>
    </span>
  </Label>
  <Input
    type="number"
    name="standbyPumpOutput"
    required
    placeholder="ஸ்டாண்ட்பை பம்ப் அவுட்புட் உள்ளிடவும்"
    className="w-80"
  />
</div>

<div className="flex items-center gap-4">
  <Label className="space-y-2 w-1/3">
    <span>
      ஸ்டாண்ட்பை பம்ப் ஹெட்ஸ்
      <span className="text-red-500">*</span>
    </span>
    <p className="text-gray-500">(மீட்டரில்)</p>
  </Label>
  <Input
    type="number"
    name="standbyPumpHead"
    required
    placeholder="ஸ்டாண்ட்பை பம்ப் ஹெட்ஸ் உள்ளிடவும்"
    className="w-80"
  />
</div>

<div className="flex items-center gap-4">
  <Label className="space-y-2 w-1/3">
    <span>தரைவிலிருந்து பம்ப் ஹவுஸ் வரை நேரடி அணுகல்</span>
  </Label>
  <Checkbox
    name="directAccessToPumpHouseFromGroundLevel"
    value="true"
  />
</div>
</div>

<div className="space-y-4">
  <h3 className="font-medium underline underline-offset-4">
    மேல்மாடி நிலை
  </h3>
  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பம்பின் வெளியேற்றம் (LPM)
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="terraceLevelDischargeOfPump"
      required
      placeholder="பம்பின் வெளியேற்றத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பம்பின் ஹெட்
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(மீட்டரில்)</p>
    </Label>
    <Input
      type="number"
      name="headOfThePump"
      required
      placeholder="பம்பின் ஹெட் உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>
</div>
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    தீயணைப்புக்கான தனி நீர் சேமிப்பு (UBBL 2016 வினவுகோள் 9.3.9 & IS 15105 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        அடிக்கடி குழியின் இடம்
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="text"
      name="captiveWaterStorageForFirefightingLocationOfUndergroundTank"
      required
      placeholder="அடிக்கடி குழியின் இடத்தை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        அடிக்கடி குழியின் கொள்ளளவு
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(லிட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="undergroundTankCapacity"
      required
      placeholder="அடிக்கடி குழியின் கொள்ளளவை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>கணிணி இணைப்பை அகற்று</span>
    </Label>
    <Checkbox name="drawOffConnection" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>தீயணைப்பு சேவையின் இன்லெட்</span>
    </Label>
    <Checkbox name="fireServiceInlet" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>குழிக்கு அணுகல்</span>
    </Label>
    <Checkbox name="accessToTank" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        மேல்மாடி குழியின் கொள்ளளவு
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(லிட்டர்களில்)</p>
    </Label>
    <Input
      type="number"
      name="overheadTankCapacity"
      required
      placeholder="மேல்மாடி குழியின் கொள்ளளவை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ஆய்வுக்காக ஏணி</span>
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 7.10.3 படி)
      </p>
    </Label>
    <Checkbox name="ladderForInspection" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>குழிகளின் குறுக்கு பிரிவு வரைபடம்</span>
    </Label>
    <Checkbox name="crossSectionDrawingOfTanks" value="true" />
  </div>
</div>
<hr />

<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>வெளியேறும் சிக்னல்கள்</span>
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 7.11 (r) படி)
      </p>
    </Label>
    <Checkbox name="exitSignage" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>ஸ்டாண்ட்‌பை மின்சாரம்</span>
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 8.5.3 படி)
      </p>
    </Label>
    <Checkbox name="standbyPowerSupply" value="true" />
  </div>
</div>

<hr />

<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    லிப்ட்களின் ஏற்பாடுகள் (UBBL 2016 வினவுகோள் 8.4.4/9.3.3 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        பயணிகளுக்கான லிப்ட் எண்ணிக்கை
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfPassengerLifts"
      required
      placeholder="பயணிகளுக்கான லிப்ட்களின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        கார் லிப்ட்களின் எண்ணிக்கை
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfCarLifts"
      required
      placeholder="கார் லிப்ட்களின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        தீயணைப்பு லிப்ட்களின் எண்ணிக்கை
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="numberOfFireLifts"
      required
      placeholder="தீயணைப்பு லிப்ட்களின் எண்ணிக்கையை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>தீயணைப்பாளர் அடிப்படை ஸ்விட்ச்</span>
    </Label>
    <Checkbox name="firemansGroundingSwitch" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      லிப்ட் ஷாஃப்ட் காற்றழுத்தம்
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 8.4.4 (m) படி)
      </p>
    </Label>
    <Checkbox name="pressurizationOfLiftShaft" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      லிப்ட் லாபி காற்றழுத்தம்
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 8.4.4 (m) படி)
      </p>
    </Label>
    <Checkbox name="pressurizationOfLiftLobby" value="true" />
  </div>
</div>
<hr />
<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    தஞ்ச இடம் (UBBL 2016 வினவுகோள் 9.3.6 / 9.3.7 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        நிலைகள் / மாடிகள்
        <span className="text-red-500">*</span>
      </span>
    </Label>
    <Input
      type="number"
      name="refugeAreaLevels"
      required
      placeholder="நிலைகள் அல்லது மாடிகளை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>
        ஒவ்வொரு நிலையிலும் உள்ள பகுதி
        <span className="text-red-500">*</span>
      </span>
      <p className="text-gray-500">(சதுர மீட்டரில்)</p>
    </Label>
    <Input
      type="number"
      name="refugeAreaAtEachLevel"
      required
      placeholder="ஒவ்வொரு நிலையிலும் உள்ள பகுதியை உள்ளிடவும்"
      className="w-80"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>சமீபத்திய ஏணி அல்லது நிலைத்தொடுக்கு நேரடி அணுகல்</span>
    </Label>
    <Checkbox name="directAccessToNearestStaircase" value="true" />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>தீயணைப்பு சரிபார்ப்பு மாடி</span>
      <p className="text-gray-500">
        (UBBL 2016 வினவுகோள் 9.3.8 படி)
      </p>
    </Label>
    <Checkbox name="fireCheckFloor" value="true" />
  </div>
</div>
<hr />


<div className="space-y-4">
  <h2 className="text-lg font-semibold">
    தீ கட்டுப்பாட்டு அறை (UBBL 2016 வினவுகோள் 9.3.10 / 9.3.14 படி)
  </h2>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>தரைக் கதவு அருகே முக்கிய நுழைவின் இடம்</span>
    </Label>
    <Checkbox
      name="fireControlRoomNearEntranceGroundFloor"
      value="true"
    />
  </div>

  <div className="flex items-center gap-4">
    <Label className="space-y-2 w-1/3">
      <span>தீ பாதுகாப்பு அதிகாரியின் ஏற்பாடு</span>
      <p className="text-gray-500">(UBBL 2016 வினவுகோள் 9.3.14 படி)</p>
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
        சிறப்பு தீ பாதுகாப்பு அமைப்புகள்
      </span>
      <p className="text-gray-500">(தேவைப்பட்டால்)</p>
    </Label>
    <Textarea
      name="specialFireProtectionSystems"
      placeholder="சிறப்பு தீ பாதுகாப்பு அமைப்புகளை உள்ளிடவும்"
      className="w-80"
    />
  </div>
</div>

<hr />

<div>
  <Button type="submit">விண்ணப்பத்தை சமர்ப்பிக்கவும்</Button>
</div>
</form>
      </div>
    </div>
  );
};

export default Page;




    
  