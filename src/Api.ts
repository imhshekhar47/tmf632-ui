import {
    // Models
    Individual,
    
    // Service
    IndividualService,
    OpenAPI,
    OrganizationService,
} from './gen/tmf632/index';


OpenAPI.BASE = `${process.env.REACT_APP_TMF632API_URL}`

export const listIndividuals = async():Promise<Individual[]> => {
    try {
        const individuals: Individual[] = await IndividualService.listIndividual()
        return individuals;
    } catch(error: any) {
        throw new Error(error);
    }
}

export const API = {
    individualService: IndividualService,
    organizationService: OrganizationService,
}