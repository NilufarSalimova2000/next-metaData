export interface LoincType {
  createdDate?: string;
  updatedDate?: number;
  id: number;
  loincNumber: string;
  component: string;
}

export interface BiomaterialType {
  createdDate?: string;
  updatedDate?: number;
  id?: number;
  nameUz?: string;
  nameRu: string;
  status?: string;
}

export interface ApplicationType {
  id: number;
  nameUz: string;
  nameRu: string;
  status: string;
}

export interface AnalyseCreateT {
  fundingStatus: string;
  organizationId: number;
  initialConclusion: string;
  applicationTypeId: number;
  analyseCodeOfLoinc: string;
  analyseNameOfLoinc: string;
  analyseDetails: {
    comment: string;
    analyseTypeId: number;
    executionPriority: string;
    measurementUnitId: number;
    typeBiomaterialId: number;
  };
  patient: {
    email: string;
    passportSerial: string;
    passportNumber: string;
    address: string;
    pnfl: string;
    dateOfBirth: string;
    districtId: number;
    firstName: string;
    gender: boolean;
    isAnonymous: boolean;
    lastName: string;
    middleName: string;
    nationality: string;
    photo: string;
    regionId: number;
    username: string;
  };
  sendDetails: {
    sendDateOfAnalyse: string;
    sampleArrivedDate: string;
    numberOfSamples: number;
    fullNameOfRecipient: string;
    fullNameOfDeliveryMan: string;
    fullNameOfReferringDoctor: string;
    phoneNumberDeliveryMan: string;
    senderOrganizationInn: string;
    senderOrganizationName: string;
  };
}

export interface AnalyseResponseT {
  analyses: {
    createdDate: string;
    updatedDate: number;
    id: number;
    personalDataIssuedDate: string | null;
    analyseNameOfLoinc: string;
    analyseCodeOfLoinc: string;
    resultAnalyse: string | null;
    status: string;
    fundingStatus: string;
    initialConclusion: string;
    analyseDetails: {
      id: number;
      analyseType: {
        id: number;
        nameUz: string;
        nameRu: string;
        status: string;
        createdDate: string;
        updatedDate: number;
      };
      measurementUnit: {
        id: number;
        nameUz: string;
        nameRu: string;
        status: string;
        createdDate: string;
        updatedDate: number;
      };
      typeBiomaterial: {
        id: number;
        nameUz: string;
        nameRu: string;
        status: string;
        createdDate: string;
        updatedDate: number;
      };
      comment: string;
      executionPriority: string;
      fullNameRegistrar: string;
    };
    analyseSendDetails: {
      id: number;
      senderOrganizationInn: string;
      senderOrganizationName: string;
      fullNameOfReferringDoctor: string;
      sendDateOfAnalyse: string | null;
      sampleArrivedDate: string | null;
      numberOfSamples: number;
      fullNameOfDeliveryMan: string;
      phoneNumberDeliveryMan: string;
      fullNameOfRecipient: string;
      createdDate: string;
      updatedDate: number;
    };
    applicationType: {
      id: number;
      nameUz: string;
      nameRu: string;
      status: string;
    };
  }[];
  notFoundAnalysesByLoincCode: any[];
  alreadyRegisteredAnalyses: any[];
  totalCreated: number;
}
