import instance from "./axiosInstance";

const healthCheck = async ()=>{
    try {
        const response = await instance.get("/");
        console.log("Response health check : ", response);
    } catch (error) {
        
    }
}
const getContacts = async({page=1, limit=10, sortBy = 'firstName', sortOrder = 'asc', search = ''})=>{
    try {
        const body = {
            page,
            limit,
            sortBy,
            sortOrder,
            search
        };
        const {data} = await instance.post("/contacts/pagination", body);
        return data;
    } catch (error) {
        throw error;
    }
}


const addContact = async(body)=>{
    try {
        const {data} = await instance.post("/contacts", body);
        return data;
    } catch (error) {
        throw error;
    }
}

const updateContact = async(id, body)=>{
    try {
        const {data} = await instance.put(`/contacts/${id}`, body);
        return data;
    } catch (error) {
        throw error;
    }
}

const deleteContact = async(id)=>{
    try {
        const {data} = await instance.delete(`/contacts/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export {
    healthCheck,
    getContacts,
    addContact,
    updateContact,
    deleteContact
}