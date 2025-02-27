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
      <h1 className="text-2xl font-bold">एनओसी आवेदन पत्र</h1>
      <p>कृपया सभी फ़ील्ड भरें</p>

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
              // आप यहाँ कोई त्रुटि संदेश प्रदर्शित कर सकते हैं
            }
          }}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">सामान्य</h2>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                विभाजन <span className="text-red-500">*</span>
              </Label>

              <Select name="division" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="अपना विभाजन चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CENTRAL">केंद्रीय</SelectItem>
                  <SelectItem value="SOUTH">दक्षिण</SelectItem>
                  <SelectItem value="EAST">पूर्व</SelectItem>
                  <SelectItem value="WEST">पश्चिम</SelectItem>
                  <SelectItem value="SOUTH WEST">दक्षिण पश्चिम</SelectItem>
                  <SelectItem value="NORTH WEST">उत्तर पश्चिम</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  अधिभोग का प्रकार <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 1.4.75 के अनुसार)
                </p>
              </Label>
              <Select name="typeOfOccupancy" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="अधिभोग का प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential Buildings">
                    आवासीय भवन
                  </SelectItem>
                  <SelectItem value="Educational Buildings">
                    शैक्षिक भवन
                  </SelectItem>
                  <SelectItem value="Institutional Buildings">
                    संस्थागत भवन
                  </SelectItem>
                  <SelectItem value="Assembly Buildings">
                    सभा भवन
                  </SelectItem>
                  <SelectItem value="Business Buildings">
                    व्यापारिक भवन
                  </SelectItem>
                  <SelectItem value="Mercantile Buildings">
                    वाणिज्यिक भवन
                  </SelectItem>
                  <SelectItem value="Industrial Buildings">
                    औद्योगिक भवन
                  </SelectItem>
                  <SelectItem value="Storage Buildings">
                    भंडारण भवन
                  </SelectItem>
                  <SelectItem value="Hazardous Building">
                    खतरनाक भवन
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  इमारत की ऊंचाई <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="heightOfBuilding"
                required
                placeholder="इमारत की ऊंचाई दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  मंजिलों की संख्या <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(बेसमेंट सहित)</p>
              </Label>
              <Input
                type="number"
                name="numberOfFloors"
                required
                placeholder="मंजिलों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  भूतल का कवर्ड एरिया <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(वर्ग मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="coveredAreaGroundFloor"
                required
                placeholder="भूतल का कवर्ड एरिया दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  विशिष्ट फर्श क्षेत्र <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(वर्ग मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="typicalFloorArea"
                required
                placeholder="विशिष्ट फर्श क्षेत्र दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  बेसमेंट की संख्या <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfBasements"
                required
                placeholder="बेसमेंट की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  बेसमेंट फ़्लोर एरिया <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(वर्ग मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="basementFloorArea"
                required
                placeholder="बेसमेंट फ़्लोर एरिया दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  कुल कवर क्षेत्र <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (स्तिल्ट और बेसमेंट सहित, वर्ग मीटर में)
                </p>
              </Label>
              <Input
                type="number"
                name="totalCoveredArea"
                required
                placeholder="कुल कवर क्षेत्र दर्ज करें"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              भवन तक पहुंच (UBBL 2016 के धारा 8.2/7.13.3 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  सड़क की चौड़ाई <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="roadWidth"
                required
                placeholder="सड़क की चौड़ाई दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  गेट की चौड़ाई <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="gateWidth"
                required
                placeholder="गेट की चौड़ाई दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  आंतरिक सड़क की चौड़ाई <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="internalRoadWidth"
                required
                placeholder="आंतरिक सड़क की चौड़ाई दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  भवन लाइन से आंतरिक सड़क की दूरी{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="distanceFromBuildingLine"
                required
                placeholder="भवन लाइन से आंतरिक सड़क की दूरी दर्ज करें"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              निकासों की संख्या, प्रकार और व्यवस्था (UBBL 2016 के धारा 7.8 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  यात्रा दूरी <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="travelDistance"
                required
                placeholder="यात्रा दूरी दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  अंतिम यात्रा दूरी <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="deadEndTravelDistance"
                required
                placeholder="अंतिम यात्रा दूरी दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                सीढ़ियों की संख्या (UBBL 2016 के धारा 7.10.1 के अनुसार)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ऊपरी मंजिलें <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesUpperFloors"
                  required
                  placeholder="ऊपरी मंजिलों के लिए सीढ़ियों की संख्या दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    बेसमेंट <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfStaircasesBasements"
                  required
                  placeholder="बेसमेंट के लिए सीढ़ियों की संख्या दर्ज करें"
                  className="w-80"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                सीढ़ी की चौड़ाई (UBBL 2016 के धारा 8.4.3 के अनुसार)
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    ऊपरी मंजिलें <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseUpperFloors"
                  required
                  placeholder="ऊपरी मंजिलों के लिए सीढ़ी की चौड़ाई दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    बेसमेंट <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="widthOfStaircaseBasements"
                  required
                  placeholder="बेसमेंट के लिए सीढ़ी की चौड़ाई दर्ज करें"
                  className="w-80"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">सीढ़ी का प्रावधान</Label>
              <Checkbox name="provisionOfStaircase" value="true" />
            </div>
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>फायर टावर</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 1.4.46 /9.3.13 के अनुसार)
                </p>
              </Label>
              <Checkbox name="fireTower" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  छत तक लगातार सीढ़ियों की संख्या।
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.11(m) के अनुसार)
                </p>
              </Label>
              <Input
                type="number"
                name="numberOfContinuousStaircasesToTerrace"
                required
                placeholder="छत तक लगातार सीढ़ियों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  रैम्प की चौड़ाई
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.10.2 के अनुसार, मीटर में)
                </p>
              </Label>
              <Input
                type="number"
                name="rampWidth"
                required
                placeholder="रैम्प की चौड़ाई दर्ज करें"
                className="w-80"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              निकासों की सुरक्षा (UBBL 2016 के धारा 7.5 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>फायर चेक दरवाजा</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 8.4.5 (c) के अनुसार)
                </p>
              </Label>
              <Checkbox name="fireCheckDoor" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>दबाव</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 9.3.2 के अनुसार)
                </p>
              </Label>
              <Checkbox name="pressurization" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  कॉरिडोर की चौड़ाई <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.11.2 & 8.4.8 के अनुसार, मीटर में)
                </p>
              </Label>
              <Input
                type="number"
                name="widthOfCorridor"
                required
                placeholder="कॉरिडोर की चौड़ाई दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  दरवाजे का आकार (चौड़ाई x ऊंचाई){" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.12/7.23 के अनुसार, मीटर में)
                </p>
              </Label>
              <Input
                type="number"
                name="doorSizeWidth"
                required
                placeholder="चौड़ाई दर्ज करें"
                className="w-40"
              />
              x
              <Input
                type="number"
                name="doorSizeHeight"
                required
                placeholder="ऊंचाई दर्ज करें"
                className="w-40"
              />
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              कक्षीकरण (UBBL 2016 के धारा 8.4.6 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  कक्षीकरण का आकार <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(क्षेत्रफल वर्ग मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="compartmentSize"
                required
                placeholder="कक्षीकरण का आकार दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ऊपरी मंजिल पर आग के कक्षों की संख्या{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsUpperFloors"
                required
                placeholder="ऊपरी मंजिलों के लिए आग के कक्षों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  बेसमेंट स्तर पर आग के कक्षों की संख्या{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireCompartmentsBasements"
                required
                placeholder="बेसमेंट स्तर पर आग के कक्षों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  कक्षीकरण का प्रकार
                  <span className="text-red-500">*</span>
                </span>
              </Label>

              <Select name="typeOfCompartmentation" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="कक्षीकरण का प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="By Fire resisting wall of 02 hrs rating">
                    02 घंटे की रेटिंग वाली अग्नि प्रतिरोधी दीवार द्वारा
                  </SelectItem>
                  <SelectItem value="By Fire curtain of 02 hrs rating">
                    02 घंटे की रेटिंग वाली अग्नि परदा द्वारा
                  </SelectItem>
                  <SelectItem value="By water curtain">
                    जल परदा द्वारा
                  </SelectItem>
                  <SelectItem value="Fire Dampers">फायर डैम्पर्स</SelectItem>
                  <SelectItem value="Fire check door">
                    फायर चेक दरवाजा
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">धूम्र प्रबंधन प्रणाली</h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  धूम्र प्रबंधन प्रणाली का प्रकार
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Select name="smokeManagementSystem" required>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="धूम्र प्रबंधन प्रणाली का प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MECHANICAL">मैकेनिकल</SelectItem>
                  <SelectItem value="NATURAL">नेचुरल</SelectItem>
                  <SelectItem value="COMBINED">कॉम्बाइंड</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>बेसमेंट एयर चेंजेस</span>
                <p className="text-gray-500">(12 ACPH)</p>
              </Label>

              <Checkbox name="basementAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>ऊपरी मंजिलों एयर चेंजेस</span>
                <p className="text-gray-500">(12 ACPH)</p>
              </Label>

              <Checkbox name="upperFloorsAirChanges" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                तले स्तर पर ताजा हवा की आपूर्ति
              </Label>
              <Checkbox name="freshAirSupplyAtBottomLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                छत स्तर पर उत्सर्जन हवा डिस्चार्ज
              </Label>
              <Checkbox name="exhaustAirDischargeAtCeilingLevel" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ताजा हवा कटआउट्स का प्रावधान
              </Label>
              <Checkbox name="provisionOfFreshAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                उत्सर्जन हवा कटआउट्स का प्रावधान
              </Label>
              <Checkbox name="provisionOfExhaustAirCutOuts" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                ड्राइंग के साथ वेंटिलेशन गणनाएँ
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="ventilationCalculationsWithDrawing"
                required
                placeholder="वेंटिलेशन गणनाएँ और ड्राइंग दर्ज करें"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">फायर एक्सटिंग्विशर्स</h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  प्रत्येक मंजिल पर कुल संख्या{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="fireExtinguishersTotalNumbersEachFloor"
                required
                placeholder="प्रत्येक मंजिल पर कुल संख्या दर्ज करें"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              फर्स्ट-एड होज़ रील्स (UBBL 2016 के धारा 9.3.9 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>सीढ़ियों के पास स्थान</span>
              </Label>
              <Checkbox
                name="firstAidHoseReelsLocationNearStairs"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  प्रत्येक मंजिल पर कुल संख्या <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="firstAidHoseReelsTotalNumberEachFloor"
                required
                placeholder="प्रत्येक मंजिल पर कुल संख्या दर्ज करें"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ऑटोमैटिक फायर डिटेक्शन एंड अलार्मिंग सिस्टम (UBBL 2016 के धारा 9.3.9 और IS 2189 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  डिटेक्टरों का प्रकार <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="text"
                name="automaticFireDetectionAndAlarmingSystemTypeOfDetectors"
                required
                placeholder="डिटेक्टरों का प्रकार दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                फाल्स सीलिंग के ऊपर डिटेक्टर
              </Label>
              <Checkbox name="detectorAboveFalseCeiling" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                डक्ट, शाफ्ट आदि में डिटेक्टरों का प्रावधान
              </Label>
              <Checkbox name="provisionOfDetectorsInDuctShaft" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>मैन्युअली ऑपरेटेड इलेक्ट्रिक फायर अलार्म (MOEFA)</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 9.3.9 के अनुसार)
                </p>
              </Label>
              <Checkbox name="manuallyOperatedElectricFireAlarm" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>पब्लिक एड्रेस सिस्टम</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 9.3.9 के अनुसार)
                </p>
              </Label>
              <Checkbox name="publicAddressSystem" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ऑटोमैटिक स्प्रिंकलर सिस्टम (UBBL 2016 के धारा 9.3.9 और IS 15105 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  एक स्थापना में स्प्रिंकलर हेड की कुल संख्या (अनुमानित)
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(IS-15105 के अनुसार)</p>
              </Label>
              <Input
                type="number"
                name="automaticSprinklerSystemTotalNumberOfSprinklerHead"
                required
                placeholder="स्प्रिंकलर हेड की कुल संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  बेसमेंट
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="basement"
                required
                placeholder="बेसमेंट में स्प्रिंकलर हेड की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ऊपरी मंजिल
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="upperFloor"
                required
                placeholder="ऊपरी मंजिल में स्प्रिंकलर हेड की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                स्प्रिंकलर फाल्स सीलिंग के ऊपर
              </Label>
              <Checkbox name="sprinklerAboveFalseCeiling" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                IS 15105 के अनुसार गणनाएँ और ड्राइंग
              </Label>
              <Checkbox
                name="calculationsAsPerIS15105WithDrawings"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">फायर सर्विस इनलेट</Label>
              <Checkbox name="fireServicesInlet" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              आंतरिक हाइड्रेंट्स (IS 3844 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  राइज़र/डाउन कोमर का आकार{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मिमी में)</p>
              </Label>
              <Input
                type="number"
                name="internalHydrantsSizeOfRiserDownComer"
                required
                placeholder="राइज़र/डाउन कोमर का आकार दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  प्रत्येक मंजिल पर हाइड्रेंट्स की संख्या{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfHydrantsPerFloor"
                required
                placeholder="प्रत्येक मंजिल पर हाइड्रेंट्स की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                सीढ़ी के पास स्थान
              </Label>
              <Checkbox name="locationNearToStaircase" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                प्रत्येक लैंडिंग वाल्व के पास होज़ बॉक्स
              </Label>
              <Checkbox name="hoseBoxesNearEachLandingValve" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">फायर सर्विस इनलेट</Label>
              <Checkbox name="fireServicesInlet" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              यार्ड हाइड्रेंट्स (IS 13039 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  यार्ड हाइड्रेंट्स की कुल संख्या{" "}
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="yardHydrantsTotalNumber"
                required
                placeholder="यार्ड हाइड्रेंट्स की कुल संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  दो यार्ड हाइड्रेंट्स के बीच की दूरी{" "}
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="distanceBetweenTwoYardHydrants"
                required
                placeholder="दो यार्ड हाइड्रेंट्स के बीच की दूरी दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  होज़ बॉक्स की संख्या <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfHoseBox"
                required
                placeholder="होज़ बॉक्स की संख्या दर्ज करें"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              पम्पिंग व्यवस्था (UBBL 2016 के धारा 9.3.9 के अनुसार)
            </h2>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                ज़मीनी स्तर
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>पंप रूम का स्थान</span>
                </Label>
                <Input
                  type="text"
                  name="pumpingArrangementsGroundLevelLocationOfPumpRoom"
                  placeholder="पंप रूम का स्थान दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    मुख्य पंप का निर्वहन
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(लीटर प्रति मिनट)</p>
                </Label>
                <Input
                  type="number"
                  name="dischargeOfMainPump"
                  required
                  placeholder="मुख्य पंप का निर्वहन दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    मुख्य पंप का हेड
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="headOfMainPump"
                  required
                  placeholder="मुख्य पंप का हेड दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    मुख्य पंपों की संख्या
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfMainPumps"
                  required
                  placeholder="मुख्य पंपों की संख्या दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    जॉकी पंप आउटपुट (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="jockeyPumpOutput"
                  required
                  placeholder="जॉकी पंप आउटपुट दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    जॉकी पंप हेड
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="jockeyPumpHead"
                  required
                  placeholder="जॉकी पंप हेड दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    जॉकी पंपों की संख्या
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="numberOfJockeyPumps"
                  required
                  placeholder="जॉकी पंपों की संख्या दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    स्टैंडबाय पंप आउटपुट (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="standbyPumpOutput"
                  required
                  placeholder="स्टैंडबाय पंप आउटपुट दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    स्टैंडबाय पंप हेड
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="standbyPumpHead"
                  required
                  placeholder="स्टैंडबाय पंप हेड दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>जमीनी स्तर से पंप हाउस तक सीधी पहुंच</span>
                </Label>
                <Checkbox
                  name="directAccessToPumpHouseFromGroundLevel"
                  value="true"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium underline underline-offset-4">
                छत स्तर
              </h3>
              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    पंप का निर्वहन (LPM)
                    <span className="text-red-500">*</span>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="terraceLevelDischargeOfPump"
                  required
                  placeholder="पंप का निर्वहन दर्ज करें"
                  className="w-80"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="space-y-2 w-1/3">
                  <span>
                    पंप का हेड
                    <span className="text-red-500">*</span>
                  </span>
                  <p className="text-gray-500">(मीटर में)</p>
                </Label>
                <Input
                  type="number"
                  name="headOfThePump"
                  required
                  placeholder="पंप का हेड दर्ज करें"
                  className="w-80"
                />
              </div>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              अग्निशमन के लिए कैप्टिव जल भंडारण (UBBL 2016 के धारा 9.3.9 और IS 15105 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  भूमिगत टैंक का स्थान
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="text"
                name="captiveWaterStorageForFirefightingLocationOfUndergroundTank"
                required
                placeholder="भूमिगत टैंक का स्थान दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  भूमिगत टैंक क्षमता
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(लीटर में)</p>
              </Label>
              <Input
                type="number"
                name="undergroundTankCapacity"
                required
                placeholder="भूमिगत टैंक क्षमता दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>कनेक्शन हटाएँ</span>
              </Label>
              <Checkbox name="drawOffConnection" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>अग्नि सेवा इनलेट</span>
              </Label>
              <Checkbox name="fireServiceInlet" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>टैंक तक पहुंच</span>
              </Label>
              <Checkbox name="accessToTank" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  ओवरहेड टैंक क्षमता
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(लीटर में)</p>
              </Label>
              <Input
                type="number"
                name="overheadTankCapacity"
                required
                placeholder="ओवरहेड टैंक क्षमता दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>निरीक्षण के लिए सीढ़ी</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.10.3 के अनुसार)
                </p>
              </Label>
              <Checkbox name="ladderForInspection" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>टैंकों का क्रॉस सेक्शन चित्रण</span>
              </Label>
              <Checkbox name="crossSectionDrawingOfTanks" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>निकास संकेत</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 7.11 (r) के अनुसार)
                </p>
              </Label>
              <Checkbox name="exitSignage" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>स्टैंडबाय बिजली आपूर्ति</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 8.5.3 के अनुसार)
                </p>
              </Label>
              <Checkbox name="standbyPowerSupply" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              लिफ्टों का प्रावधान (UBBL 2016 के धारा 8.4.4/9.3.3 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  यात्री लिफ्टों की संख्या
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfPassengerLifts"
                required
                placeholder="यात्री लिफ्टों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  कार लिफ्टों की संख्या
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfCarLifts"
                required
                placeholder="कार लिफ्टों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  अग्नि लिफ्टों की संख्या
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="numberOfFireLifts"
                required
                placeholder="अग्नि लिफ्टों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>फायरमैन का ग्राउंडिंग स्विच</span>
              </Label>
              <Checkbox name="firemansGroundingSwitch" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                लिफ्ट शाफ्ट का दबाव
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 8.4.4 m के अनुसार)
                </p>
              </Label>
              <Checkbox name="pressurizationOfLiftShaft" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                लिफ्ट लॉबी का दबाव
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 8.4.4 m के अनुसार)
                </p>
              </Label>
              <Checkbox name="pressurizationOfLiftLobby" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              शरण क्षेत्र (UBBL 2016 के धारा 9.3.6/ 9.3.7 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  स्तर / मंजिलें
                  <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                type="number"
                name="refugeAreaLevels"
                required
                placeholder="स्तरों/मंजिलों की संख्या दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>
                  प्रत्येक स्तर पर क्षेत्रफल
                  <span className="text-red-500">*</span>
                </span>
                <p className="text-gray-500">(वर्ग मीटर में)</p>
              </Label>
              <Input
                type="number"
                name="refugeAreaAtEachLevel"
                required
                placeholder="प्रत्येक स्तर पर क्षेत्रफल दर्ज करें"
                className="w-80"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>निकटतम सीढ़ी तक सीधी पहुंच</span>
              </Label>
              <Checkbox name="directAccessToNearestStaircase" value="true" />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>अग्नि जांच मंजिल</span>
                <p className="text-gray-500">
                  (UBBL 2016 के धारा 9.3.8 के अनुसार)
                </p>
              </Label>
              <Checkbox name="fireCheckFloor" value="true" />
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              अग्नि नियंत्रण कक्ष (UBBL 2016 के धारा 9.3.10/ 9.3.14 के अनुसार)
            </h2>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>भूमि तल पर मुख्य प्रवेश द्वार के पास स्थान</span>
              </Label>
              <Checkbox
                name="fireControlRoomNearEntranceGroundFloor"
                value="true"
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="space-y-2 w-1/3">
                <span>अग्नि सुरक्षा अधिकारी का प्रावधान</span>
                <p className="text-gray-500">(UBBL 2016 के धारा 9.3.14 के अनुसार)</p>
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
                  विशेष जोखिमों से बचाव के लिए विशेष अग्नि सुरक्षा प्रणालियाँ
                </span>
                <p className="text-gray-500">(यदि कोई हो)</p>
              </Label>
              <Textarea
                name="specialFireProtectionSystems"
                placeholder="विशेष अग्नि सुरक्षा प्रणालियाँ दर्ज करें"
                className="w-80"
              />
            </div>
          </div>

          <hr />

          <div>
            <Button type="submit">आवेदन जमा करें</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
