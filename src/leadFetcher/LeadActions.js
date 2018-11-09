export const CREATE_LEAD_COMPLETED = "CREATE_LEAD_COMPLETED";
export const createLeadCompleted = (entityAuthToken, payload) => ({type: CREATE_LEAD_COMPLETED, entityAuthToken, payload});