import React, { Component } from 'react';
import InventoryHeaderButton from './InventoryHeaderButton';
import ItemFrom from './itemForm';
import { connect } from 'react-redux';
import  get_unitsOfMeasuring  from '../../actions/unitsOfMeasuring';
import {get_inventories_by_event_id} from '../../actions/inventory-list';

class InventoryList extends Component {

    constructor() {
        super();

        this.state = {
            isOpen: true,
            inventoryList: [],
            disabledEdit: false
        };

        this.handleOnClickCaret = this.handleOnClickCaret.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    
    componentWillMount() {
        this.props.get_unitsOfMeasuring();
        this.props.get_inventories_by_event_id(this.props.eventId);
    }

    componentDidMount() {
        this.setState({
            inventoryList: this.props.inventories.items
        })
    }

    addItemToList() {
        const undateList = [...this.state.inventoryList, {
            id: getRandomId(),
            itemName: '',
            needQuantity: 0,
            unitOfMeasuring: {},
            isEdit: true,
            isNew: true
        }];

        this.setState({
            inventoryList: undateList,
            disabledEdit: true
        });
    }

    deleteItemFromList = inventar => {
        const undateList = this.state.inventoryList.filter(function(item){
            return item.id !== inventar.id;
        });
  
        this.setState({
            inventoryList: undateList
        });
    }

    markItemAsEdit = inventar => {
        let updateList = this.state.inventoryList;
        updateList.map(item => {
            if (inventar.id === item.id)
                item.isEdit = true;
        });

        this.setState({
            inventoryList: updateList,
            disabledEdit: true
        });
    }

    handleOnClickCaret() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    onSubmit(values) {
        let updateList = this.state.inventoryList;
        updateList.map(item => {
            if (item.isEdit) {
                item.isEdit = false;
                item.isNew = false;
                item.itemName = values.itemName;
                item.needQuantity = values.needQuantity;
                const found = this.props.unitOfMeasuringState.units.find(element => element.id === values.unitOfMeasuring);
                item.unitOfMeasuring = found;
            }
        });
 
        this.setState({
            inventoryList: updateList,
            disabledEdit: false
        });
    }

    onCancel = inventar => {
        if (inventar.isNew) {
            this.deleteItemFromList(inventar);
            this.setState({
                disabledEdit: false
            })
            return;
        }
        let updateList = this.state.inventoryList;

        updateList.map(item => {
            if (item.isEdit) {
                item.isEdit = false;
            }
        });

        this.setState({
            inventoryList: updateList,
            disabledEdit: false
        });
    }

    render() {
        const { inventories, eventId } = this.props;
        console.log(this.props);
        return (
            <>
                <div className="d-flex justify-content-start align-items-center">
                    <InventoryHeaderButton isOpen={this.state.isOpen} handleOnClickCaret={this.handleOnClickCaret}/>
                </div>
                
                { this.state.isOpen &&
                <div>
                        <div className="">
                            <button type="button" onClick={this.addItemToList.bind(this)} title="Remove item" class="btn btn-secondary btn-icon p-2" >
                                <span class="icon"><i class="fas fa-plus"></i></span> Add item
                            </button>
                        </div>
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table">
                                    <div className="row p-2">
                                        <div className="col col-md-5"><b>Item name</b></div>
                                        <div className="col"><b>Count</b></div>
                                        <div className="col"><b>Measuring unit</b></div>
                                        <div className="col"><b>Action</b></div>
                                    </div>
                                {inventories.items.map(item => {
                                    return (
                                        item.isEdit 
                                        ? <div className="row p-2">
                                            <ItemFrom 
                                                onSubmit={this.onSubmit} 
                                                onCancel={this.onCancel}
                                                unitOfMeasuringState={this.props.unitOfMeasuringState}
                                                initialValues={item}/>
                                        </div>
                                        : <div className="row p-2">
                                            <div className="col col-md-5">{item.itemName}</div>
                                            <div className="col">{item.needQuantity}</div>
                                            <div className="col">{item.unitOfMeasuring.shortName}</div>
                                            <div className="col">
                                                <button type="button" disabled={this.state.disabledEdit} onClick={this.markItemAsEdit.bind(this, item)} title="Edit item" class="btn clear-backgroud">
                                                    <i class="fas fa-pencil-alt orange"></i>
                                                </button>
                                                <button type="button" onClick={this.deleteItemFromList.bind(this, item)} title="Remove item" class="btn clear-backgroud">
                                                    <i class="fas fa-trash red"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                                                    
                            </div>
                        </div>
                    </div>
                </div>
                }
            </>
        );
    }
}

function getRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

const mapStateToProps = (state) => ({
    unitOfMeasuringState: state.unitsOfMeasuring,
    inventories: state.inventories
});

const mapDispatchToProps = (dispatch) => {
    return {
        get_unitsOfMeasuring: () => dispatch(get_unitsOfMeasuring()),
        get_inventories_by_event_id: (eventId) => dispatch(get_inventories_by_event_id(eventId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryList);