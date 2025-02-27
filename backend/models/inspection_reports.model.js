const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "inspection_reports",
    {
      inspectionReportId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: "applications",
          key: "applicationId",
        },
      },
      inspectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "inspections",
          key: "inspectionId",
        },
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      typeOfOccupancy: {
        type: DataTypes.ENUM,
        values: [
          "Residential Buildings",
          "Educational Buildings",
          "Institutional Buildings",
          "Assembly Buildings",
          "Business Buildings",
          "Mercantile Buildings",
          "Industrial Buildings",
          "Storage Buildings",
          "Hazardous Building",
        ],
        allowNull: false,
      },
      nameOfBuilding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressOfBuilding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfCase: {
        type: DataTypes.ENUM,
        values: ["New Case", "Renewal"],
        allowNull: false,
      },
      detailOfPreviousFSC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfInspection: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nameOfInspectingOfficers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearOfConstruction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      heightOfBuilding: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      numberOfFloors: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coveredAreaGroundFloor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      typicalFloorArea: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      numberOfBasements: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      basementFloorArea: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalCoveredArea: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      roadWidth: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      gateWidth: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      internalRoadWidth: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      distanceFromBuildingLine: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      travelDistance: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      deadEndTravelDistance: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      numberOfStaircasesUpperFloors: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfStaircasesBasements: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      widthOfStaircaseUpperFloors: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      widthOfStaircaseBasements: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      provisionOfStaircase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireTower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      numberOfContinuousStaircasesToTerrace: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rampWidth: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      fireCheckDoor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pressurization: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      widthOfCorridor: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      doorSizeWidth: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      doorSizeHeight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      compartmentSize: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      numberOfFireCompartmentsUpperFloors: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfFireCompartmentsBasements: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeOfCompartmentation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smokeManagementSystem: {
        type: DataTypes.ENUM,
        values: ["MECHANICAL", "NATURAL", "COMBINED"],
        allowNull: false,
      },
      basementAirChanges: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      upperFloorsAirChanges: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      freshAirSupplyAtBottomLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      exhaustAirDischargeAtCeilingLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      provisionOfFreshAirCutOuts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      provisionOfExhaustAirCutOuts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ventilationCalculationsWithDrawing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fireExtinguishersTotalNumbersEachFloor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstAidHoseReelsLocationNearStairs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstAidHoseReelsTotalNumberEachFloor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      automaticFireDetectionAndAlarmingSystemTypeOfDetectors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detectorAboveFalseCeiling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      provisionOfDetectorsInDuctShaft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      manuallyOperatedElectricFireAlarm: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      publicAddressSystem: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      automaticSprinklerSystemTotalNumberOfSprinklerHead: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sprinklerAboveFalseCeiling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      internalHydrantsSizeOfRiserDownComer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfHydrantsPerFloor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      locationNearToStaircase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      hoseBoxesNearEachLandingValve: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireServicesInlet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      yardHydrantsTotalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      distanceBetweenTwoYardHydrants: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      numberOfHoseBox: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pumpingArrangementsGroundLevelLocationOfPumpRoom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dischargeOfMainPump: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      headOfMainPump: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      numberOfMainPumps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jockeyPumpOutput: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      jockeyPumpHead: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      numberOfJockeyPumps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      standbyPumpOutput: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      standbyPumpHead: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      directAccessToPumpHouseFromGroundLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      terraceLevelDischargeOfPump: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      headOfThePump: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      captiveWaterStorageForFirefightingLocationOfUndergroundTank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      undergroundTankCapacity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      drawOffConnection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireServiceInlet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accessToTank: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      overheadTankCapacity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ladderForInspection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crossSectionDrawingOfTanks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      exitSignage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      numberOfPassengerLifts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfCarLifts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfFireLifts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firemansGroundingSwitch: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pressurizationOfLiftShaft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pressurizationOfLiftLobby: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      standbyPowerSupply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      refugeAreaLevels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refugeAreaAtEachLevel: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      directAccessToNearestStaircase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireCheckFloor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireControlRoomNearEntranceGroundFloor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      provisionOfFireSafetyOfficer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      specialFireProtectionSystems: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      doc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["inspectionReportId"],
        },
      ],
    }
  );
};
