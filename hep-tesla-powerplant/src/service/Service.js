export class Service {

    constructor() {
        this.baseUrl = "http://localhost:8080/";
    }

    listPowerplants() {
        return fetch(this.baseUrl + "powerplant-registry/powerplants").then(promise => promise.json())
    }

    listRegions() {
        return fetch(this.baseUrl + "powerplant-registry/regions").then(promise => promise.json())
    }

    getPowerplant(id) {
        return fetch(this.baseUrl + "powerplant-registry/powerplant/" + id).then(promise => promise.json())
    }

    savePowerplant(item) {
        if (!item.id) {
            console.log('Creating powerplant!');
            return this.createPowerplant(item);
        }
        else {
            console.log('Updating powerplant!');
            return this.updatePowerplant(item);
        }
    }

    updatePowerplant(item) {
        return fetch(this.baseUrl + "powerplant-registry/powerplant", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json());
    }

    createPowerplant(item) {
        return fetch(this.baseUrl + "powerplant-registry/powerplant", {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json());
    }

    deletePowerplant(id) {
        return fetch(this.baseUrl + "powerplant-registry/powerplant/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json());
    }

}