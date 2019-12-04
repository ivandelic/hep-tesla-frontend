import React, { Component } from 'react';
import PowerplantDetail from '../component/powerplant/PowerplantDetail'
import SimpleDataView from '../component/table/SimpleDataView'
import {Service} from '../service/Service'

class Powerplant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            powerplants: [],
            powerplant: {},
            regions: []
        }
        this.service = new Service();
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        this.service.listPowerplants().then(p => {
            this.service.listRegions().then(r => {
                this.setState({ 
                    powerplants: p,
                    powerplant: p[0],
                    regions: r 
                });
            });
        });
    }

    refreshData() {
        this.service.listPowerplants().then(p => {
            this.setState({ 
                powerplants: p,
            });
        });
    }

    onDataItemNewEvent() {
        this.setState({ 
            powerplant: {
                id: null,
                name: '',
                power: 0,
                region: {},
                type: null,
                archived: false,
            }
        });
    }

    onDataItemSaveEvent(item) {
        this.service.savePowerplant(item).then(p => {
            this.setState({ 
                powerplant: p
            });
            this.refreshData();
        });
    }

    onDataItemSelectEvent(item) {
        this.setState({ powerplant: item });
    }

    onDataItemRemoveEvent(item) {
        this.service.deletePowerplant(item.id).then(p => {
            this.setState({ 
                powerplant: {}
            });
            this.refreshData();
        });
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-lg-3">
                    <SimpleDataView 
                        dataItems={this.state.powerplants}
                        selectedItem={this.state.powerplant}
                        onDataItemSelect={this.onDataItemSelectEvent.bind(this)}
                        onDataItemNew={this.onDataItemNewEvent.bind(this)}
                    />
                </div>
                {!(Object.keys(this.state.powerplant).length === 0 && this.state.powerplant.constructor === Object) && 
                    <div className="p-col-12 p-md-6 p-lg-9">
                        <PowerplantDetail 
                            powerplant={this.state.powerplant}
                            powerplantRegions={this.state.regions}
                            onDataItemSave={this.onDataItemSaveEvent.bind(this)}
                            onDataItemRemove={this.onDataItemRemoveEvent.bind(this)}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Powerplant;