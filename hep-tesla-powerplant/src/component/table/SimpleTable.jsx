import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Util } from '../../utils/Util'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: props.tableSettings.pageSize,
            pages: props.tableSettings.pages,
            page: props.tableSettings.page,
            orderer: props.tableSettings.orderer,
            selectedIndex: props.selectedIndex,
        }
    }

    down() {
        var index = this.state.selectedIndex + 1;
        if (index < this.props.dataItem.length) {
            this.select(index);
        }
    }

    up() {
        var index = this.state.selectedIndex - 1;
        if (index >= 0) {
            this.select(index);
        }
    }

    select(index) {
        this.setState({ selectedIndex: index });
    }

    next() {
        var page = this.state.page + 1;
        if (page < this.state.pages) {
            this.exact(page);
        }
    }

    prev() {
        var page = this.state.page - 1;
        if (page >= 0) {
            this.exact(page);
        }
    }

    exact(page) {
        this.props.onActionReload.bind(null, undefined, this.state.pageSize, page, this.state.orderer).call();
    }

    sort(field) {
        var orderer = Util.createSortQuery(this.props.dataItemFields, field, this.state.orderer);
        this.setState({ orderer: orderer }, () => {
            this.props.onActionReload.bind(null, undefined, this.state.pageSize, this.state.page, this.state.orderer).call();
        });
    }

    keyPress(e) {
        switch (e.key) {
            case "ArrowUp":
                this.up();
                e.preventDefault();
                break;
            case "ArrowDown":
                this.down();
                e.preventDefault();
                break;
            case "ArrowLeft":
                this.prev();
                e.preventDefault();
                break;
            case "ArrowRight":
                this.next();
                e.preventDefault();
                break;
        }
    }

    render() {
        var navigation = [];
        for (var i = 0; i < this.props.pages; i++) {
            navigation.push(
                <li key={i}>
                    <a href="#" onClick={this.exact.bind(this, i)}>{i + 1}</a>
                </li>
            );
        }

        return (
            <Card title="Powerplants" className="wc">
                




                <div className="panel panel-default" tabIndex="0" onKeyDown={this.keyPress.bind(this)}>
                    <div className="panel-body">
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    {
                                        this.props.dataItemHeaders.map(
                                            (header, i) =>
                                                <th key={header} onClick={this.sort.bind(this, this.props.dataItemFields[i])}>
                                                    {header}
                                                </th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.dataItem.map(
                                        (dataItem, index) => (
                                            <tr onClick={this.select.bind(this)} className={this.state.selectedIndex === index ? "active" : ""}>
                                                {
                                                    this.props.dataItemFields.map(
                                                        field =>
                                                            <td key={field}>
                                                                {field}
                                                                
                                                            </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                        <nav>
                            <ul className="pagination">
                                <li>
                                    <a href="#" onClick={this.prev}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {navigation}
                                <li>
                                    <a href="#" onClick={this.next}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div>{JSON.stringify(this.state.orderer)}</div>
                    </div>
                </div>
            </Card>
        );
    }
}

SimpleTable.propTypes = {
    dataItem: PropTypes.array.isRequired,
    dataItemHeaders: PropTypes.array.isRequired,
    dataItemFields: PropTypes.array.isRequired,
    tableSettings: PropTypes.object.isRequired,
    selectedIndex: PropTypes.number,
    onActionSelect: PropTypes.func.isRequired,
    onActionReload: PropTypes.func.isRequired,
}

SimpleTable.defaultProps = {
    dataItem: [],
    dataItemHeaders: [],
    dataItemFields: [],
    tableSettings: { page: 0, pageSize: 10, totalPages: 1 },
    selectedIndex: 0,
}

export default SimpleTable;