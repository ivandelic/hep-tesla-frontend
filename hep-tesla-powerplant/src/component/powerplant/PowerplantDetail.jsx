import React, { Component } from 'react'
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { Binding } from '../../utils/Util'

class PowerplantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            powerplant: this.props.powerplant,
            powerplantTypes: [
                { label: 'BIOMASS', value: 'BIOMASS'},
                { label: 'COAL', value: 'COAL'},
                { label: 'GEOTHERMAL', value: 'GEOTHERMAL'},
                { label: 'HYDRO', value: 'HYDRO'},
                { label: 'NUCLEAR', value: 'NUCLEAR'},
                { label: 'SOLAR', value: 'SOLAR'},
                { label: 'WIND', value: 'WIND'}
            ],
            powerplantRegions: this.props.powerplantRegions
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.powerplant !== state.powerplant) {
            return {
                powerplant: props.powerplant
            };
        }
        return {};
    }

    binding(object, node, e) {
        this.setState({
            powerplant: Binding.updateByString.bind(null, object, node, e.target.value).call()
        });
    }

    render() {
        return (
            <Card title="Identification" className="wc">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6">
                        <h2>Name</h2>
                        <InputText
                            id="powerplantName"
                            type="text"
                            value={this.state.powerplant.name}
                            onChange={this.binding.bind(this, this.state.powerplant, 'name')}
                        />
                    </div>
                    <div className="p-col-12 p-md-6"></div>
                    <div className="p-col-12">
                        <hr></hr>
                    </div>
                    <div className="p-col-12 p-md-6">
                        <h2>Type</h2>
                        <Dropdown 
                            value={this.state.powerplant.type}
                            options={this.state.powerplantTypes}
                            onChange={this.binding.bind(this, this.state.powerplant, 'type')}
                            placeholder="Type" 
                            autoWidth={false}
                        />
                    </div>
                    <div className="p-col-12 p-md-6">
                        <h2>Power</h2>
                        <InputText
                        type="text"
                            id="powerplantPower"
                            type="number"
                            value={this.state.powerplant.power}
                            onChange={this.binding.bind(this, this.state.powerplant, 'power')}
                         />
                    </div>
                    <div className="p-col-12 p-md-6">
                        <h2>Region</h2>
                        <Dropdown 
                            value={this.state.powerplant.region}
                            options={this.state.powerplantRegions}
                            optionLabel="name"
                            onChange={this.binding.bind(this, this.state.powerplant, 'region')}
                            placeholder="Region" 
                            autoWidth={false}
                        />
                    </div>
                    <div className="p-col-12 p-md-6"></div>
                    <div className="p-col-12">
                        <hr></hr>
                    </div>
                    <div className="wc-button-container p-col-12">
                        {!!this.state.powerplant.id && 
                            <Button label="Delete" className="p-button-raised p-button-warning" icon="pi pi-minus" onClick={this.props.onDataItemRemove.bind(null, this.state.powerplant)} />
                        }
                        <Button label="Save" className="p-button-raised" icon="pi pi-check" onClick={this.props.onDataItemSave.bind(null, this.state.powerplant)} />
                    </div>
                </div>
            </Card>
        );
    }
}

PowerplantDetail.propTypes = {
    powerplant: PropTypes.object,
    powerplantTypes: PropTypes.array,
    powerplantRegions: PropTypes.array,
    onDataItemSave: PropTypes.func,
    onDataItemRemove: PropTypes.func
}

PowerplantDetail.defaultProps = {
    powerplant: {},
    powerplantTypes: ['No data'],
    powerplantRegions: ['No data']
}


export default PowerplantDetail;