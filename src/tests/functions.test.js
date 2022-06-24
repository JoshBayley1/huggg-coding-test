import {getClientData, getMapData} from "../js/utils.js"

const clientList = [
    "a9ebeb9a-8d0b-41f6-9123-cf12dc1c8fae", 
    "a5b5876e-ad65-4260-8c3d-64fe6cb57bb3", 
    "9fd7ed19-1dbf-11ea-b97e-02c6bf374af0", 
    "700557f9-b39a-415c-ac8b-be66e825ef8d"
];

const clientListBad = [
    "1234", 
    "abcdefg"
];

const tiles = "61.091,-11.042:49.655,2.104";
const badTiles = "10,10:10.1,10.1"

const pinId = "13b736bd-b98b-11eb-ac2a-02c96425ec89";

//Clients
test("Get client data API test", () => {
    return (getClientData(clientList)).then(response => {
        expect(response).toHaveProperty('data');
        expect(response.data.find(x => x.id === "a9ebeb9a-8d0b-41f6-9123-cf12dc1c8fae").name).toBe('Caffè Nero');
        expect(response.total).toBe(2);
        expect(response.data.find(x => x.id === "a5b5876e-ad65-4260-8c3d-64fe6cb57bb3")).toBe(undefined);
    })
});

test("Get client data bad data", () => {
    return (getClientData(clientListBad)).then(response => {
        expect(response).toHaveProperty('data');
        expect(response.data.length).toBe(0);
    })
});

test("Get client data invalid data", () => {
    return (getClientData(badTiles)).catch(error => {
        expect(error).toBe('Invalid data input');
    })
});

//Maps
test("Get map data API test", () => {
    return (getMapData(tiles)).then(response => {
        expect(response).toHaveProperty('data');
        expect(response.data[0].pins.find(x => x.id === pinId).name).toBe('Caffè Nero (Frith St)');
    })
});

test("Get map data bad data", () => {
    return (getMapData(badTiles)).then(response => {
        expect(response).toHaveProperty('data');
        expect(response.data[0].pins.length).toBe(0);
    })
});

test("Get client data invalid data", () => {
    return (getMapData(clientListBad)).catch(error => {
        expect(error).toBe('Invalid data input');
    })
});
