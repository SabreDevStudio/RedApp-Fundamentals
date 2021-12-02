import * as React from "react";
import {Button, Form, FormGroup, Modal, InputGroup, ControlLabel, FormControl, HelpBlock, Panel, Alert} from "react-bootstrap";
import { getService, t } from "./Context";
import { LayerService } from "sabre-ngv-core/services/LayerService";
import {ISoapApiService} from "sabre-ngv-communication/interfaces/ISoapApiService";
import { PnrPublicService } from "sabre-ngv-app/app/services/impl/PnrPublicService";

/*
Define interface for handling Traveler details on the React component state
*/
export interface Traveler {
    name:string,
    surname:string,
    email?:string,
    typeCode?:'ADT' | 'INF' | 'CNN',    
}

/*
Define interface for handling field validation on the React component state
*/
export interface FieldValidation {
    [fieldId:string]:{
        isValid:boolean,
        status:"error"|"warning"|"success"|null,
        helpMsg?:string  
    }
}

/*
React component state interface, holds all data handled by the Form
*/
export interface myState {
    stage:number,
    traveler?:Traveler,
    travelType?:string,
    travelInfo?:Array<string>,
    validation?:FieldValidation
}

/*
CreatePNR Component, multi-stage data entry form based on react-bootstrap component library
*/
export class CreatePNR extends React.Component<{},myState>{

    constructor(e){
        super(e);

        //bind event handlers to the component instance
        this.handleChange = this.handleChange.bind(this);
        this.executeService = this.executeService.bind(this);
        this.closeAndRefresh = this.closeAndRefresh.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);

        //fill default state values during component initialization
        this.state = {
            stage:1,
            traveler:{
                name:"",
                surname:"",
                typeCode:"ADT"
                
            },
            validation:{
                txtName:{isValid:false,status:null,helpMsg:null},
                txtSurname:{isValid:false,status:null,helpMsg:null},
                txtEmail:{isValid:false,status:null,helpMsg:null}
            }
        }
    }

    /*
    Method to handle field changes, perform validation and update state
    */
    handleChange(e){

        const ctlId = e.target.id;
        const fldValue = e.target.value;
        const validationState = this.state.validation;

        const tmpTraveler = this.state.traveler;
        let tmpTravelType = this.state.travelType;

        console.log("handleChange",ctlId,fldValue);

        if(ctlId==="txtName" || ctlId==="txtSurname"){
            const tmpValidation = validationState[ctlId]

            const length = fldValue.length;
            if(ctlId==="txtName")
                tmpTraveler.name = fldValue;
            if(ctlId==="txtSurname")
                tmpTraveler.surname = fldValue;
            
            if(length<=0){
                tmpValidation.isValid = false;
                tmpValidation.status = 'error';
                tmpValidation.helpMsg = "required field";
            }else if(length<=1){
                tmpValidation.isValid = false;
                tmpValidation.status = 'warning';
                tmpValidation.helpMsg = "must be more than one character long";
            }else if(length>1){
                tmpValidation.isValid = true;
                tmpValidation.status = 'success';
                tmpValidation.helpMsg = null;

            }
        }

        if(ctlId==="selAgeCode"){
            tmpTraveler.typeCode = fldValue;
        }

        if(ctlId==="selTravelType"){
            tmpTravelType = fldValue;
        }

        this.setState(
            {
                traveler:tmpTraveler,
                travelType:tmpTravelType,
                validation:validationState
            }
        );
    }

    //moves to the next stage
    goNext(evt){
        const currStage = this.state.stage;
        this.setState({stage:currStage+1})
    }

    //rewind stage
    goBack(evt){
        this.setState({stage:1})
    }

    /*
    Creates a UpdateReservationRQ request payload merging state data, then utilizes 
    SOAP API service handler to send the request and parse results
    */
    executeService(){
        const soapApiService = getService(ISoapApiService);
        const pl1 = `
        <UpdateReservationRQ Version="1.19.8" xmlns="http://webservices.sabre.com/pnrbuilder/v1_19">
        <RequestType commitTransaction="false" initialIgnore="true">Stateful</RequestType>
        <ReturnOptions IncludeUpdateDetails="true" RetrievePNR="false"/>
            <ReservationUpdateList>
                <ReservationUpdateItem>
                    <PassengerNameUpdate op="C">
                        <TravelerName type="${this.state.traveler.typeCode}">
                            <Given>${this.state.traveler.name}</Given>
                            <Surname>${this.state.traveler.surname}</Surname>
                        </TravelerName>
                    </PassengerNameUpdate>
                </ReservationUpdateItem>
                <ReservationUpdateItem>
                    <RemarkUpdate op="C">
                        <RemarkText>THIS IS ${this.state.travelType} TRAVEL TYPE REMARK</RemarkText>
                    </RemarkUpdate>
                </ReservationUpdateItem>
            </ReservationUpdateList>
        </UpdateReservationRQ>
        `;

        soapApiService.callSws({action:"UpdateReservationRQ",payload:pl1,authTokenType:"SESSION"})
        .then(
            (res)=>{
                //validate API response
                console.log("Soap API call result",JSON.stringify(res));
                if(res.errorCode || (res.value && res.value.indexOf("<stl19:Error")>=0) ){
                    this.setState({stage:4})
                }else{
                    this.setState({stage:3})
                }
            }
        )
        .catch(
            (err)=>{
                //exception calling soap API
                console.log("Soap API call error",err);
                this.setState({stage:4})

            }
        )
    }

    handleModalClose(): void {
        getService(LayerService).clearLayer(42);
    }
    /*
    Refreshes the Trip Summary panel after sucessfull UpdateReservationRQ response, 
    this makes the changes written on the PNR to appear on the UI
    */
    closeAndRefresh(){
        getService(PnrPublicService).refreshData();
        this.handleModalClose();
    }

    /*
    Render parts of multi-stage form using react-bootstrap components
    The data entry form is wrapped by a Modal Dialog component
    */
    render(): JSX.Element {

        switch(this.state.stage){
        case 1:
            const validateName = this.state.validation["txtName"];
            const validateSurname = this.state.validation["txtSurname"];
            return (
            <Modal.Dialog className="react-modal">
            <Modal.Header closeButton onHide={()=>{this.handleModalClose();}}>
                <Modal.Title>Data Entry Form (1 of 2)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form autoComplete="off">
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>About Traveler</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <FormGroup controlId="txtName" validationState={validateName.status}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl 
                                type="text" 
                                placeholder="Enter traveler Name" 
                                value={this.state.traveler.name} 
                                onChange={this.handleChange} />
                            {validateName.helpMsg && <FormControl.Feedback />}
                            {(validateName.helpMsg) && <HelpBlock>{validateName.helpMsg}</HelpBlock>}
                        </FormGroup>

                        <FormGroup controlId="txtSurname" validationState={validateSurname.status}>
                            <ControlLabel>Surname</ControlLabel>
                            <FormControl 
                                type="text" 
                                placeholder="Enter traveler Surame" 
                                value={this.state.traveler.surname} 
                                onChange={this.handleChange} />
                            {validateSurname.isValid && <FormControl.Feedback />}
                            {(validateSurname.isValid && validateSurname.helpMsg) && <HelpBlock>{validateName.helpMsg}</HelpBlock>}
                        </FormGroup>

                        <FormGroup controlId="selAgeCode">
                            <ControlLabel>Passenger Type (Code)</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" value={this.state.traveler.typeCode} onChange={this.handleChange}>
                                <option value="select">select</option>
                                <option value="ADT">Adult</option>
                                <option value="CNN">Child</option>
                                <option value="INF">Infant</option>

                            </FormControl>
                        </FormGroup>
                    </Panel.Body>
                </Panel>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleModalClose} className="btn btn-secondary">Cancel</Button>
                <Button className="btn btn-primary" onClick={this.goNext}>Next</Button>
            </Modal.Footer>
            </Modal.Dialog>
            );
        case 2:
            return (
            <Modal.Dialog className="react-modal">
            <Modal.Header closeButton onHide={()=>{this.handleModalClose();}}>
                <Modal.Title>Data Entry Form (2 of 2)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Panel>
                    <Panel.Heading><Panel.Title>About Travel</Panel.Title></Panel.Heading>
                    <Panel.Body>
                <FormGroup controlId="selTravelType">
                    <ControlLabel>Travel Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.travelType}>
                        <option value="select">select</option>
                        <option value="business">business</option>
                        <option value="leisure">leisure</option>
                    </FormControl>
                    </FormGroup>
                        { this.state.travelType==="business" &&
                        <FormGroup>
                            <ControlLabel>Add Corporate ID ?</ControlLabel>
                            <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." />
                            </InputGroup.Addon>
                            <FormControl type="text" />
                            </InputGroup>
                        </FormGroup>
                        }
                        { this.state.travelType==="leisure" &&
                        <FormGroup>
                            <ControlLabel>Add Special Service Request ?</ControlLabel>
                            <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." />
                            </InputGroup.Addon>
                            <FormControl type="text" />
                            </InputGroup>
                        </FormGroup>
                        }
                    </Panel.Body>
                </Panel>

            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleModalClose} className="btn btn-secondary">Cancel</Button>
                <Button className="btn btn-primary" onClick={this.goBack}>Back</Button>
                <Button className="btn btn-primary btn-success" onClick={this.executeService}>Create PNR</Button>

            </Modal.Footer>
            </Modal.Dialog>
            );
        case 3:
           return(
            <Alert bsStyle="success" onDismiss={this.closeAndRefresh}>
                <h4>Success</h4>
                <hr/>
                <p>Operation completed sucessfully, data was written to the PNR, session status will be refreshed...</p>
                <hr/>
                <p>
                    <Button bsStyle="success" onClick={this.closeAndRefresh}>Close</Button>
                </p>
            </Alert>
           );
        case 4:
            return(
            <Alert bsStyle="danger" onDismiss={this.handleModalClose}>
                <h4>Error</h4>
                <hr/>
                <p>
                    The operation could not be completed, validate records and try again...
                </p>
                <hr/>
                <p>
                    <Button bsStyle="danger" onClick={this.goBack}>Retry</Button>
                    <Button onClick={this.handleModalClose}>Cancel</Button>
                </p>
            </Alert>
            );
        }


    }

}