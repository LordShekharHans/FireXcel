"use server";

import axios, { AxiosError } from "axios";
const cookies = require("next/headers").cookies;

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
  application: {
    applicationId: number;
    userId: number;
    applicationStatusId: number;
    updatedAt: string;
    createdAt: string;
    inspectionId: number | null;
  };
};

export default async function submitApplicationForm(
  applicationForm: ApplicationForm
) {
  try {
    const token = cookies().get("fdmtoken")?.value;

    const { data }: { data: ApplicationResponse } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/apply`,
      {
        applicationForm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: AxiosError | any) {
    console.error(error?.message);
    return { message: "An error occurred while submitting the form." };
  }
}
