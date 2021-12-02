import * as React from "react";
export interface Traveler {
    name: string;
    surname: string;
    email?: string;
    typeCode?: 'ADT' | 'INF' | 'CNN';
}
export interface FieldValidation {
    [fieldId: string]: {
        isValid: boolean;
        status: "error" | "warning" | "success" | null;
        helpMsg?: string;
    };
}
export interface myState {
    stage: number;
    travelers?: Array<Traveler>;
    travelType?: string;
    travelInfo?: Array<string>;
    validation?: FieldValidation;
}
export interface myProps {
    hand: string;
}
export declare class CreatePNR extends React.Component<myProps, myState> {
    constructor(e: any);
    handleChange(e: any): void;
    handleSubmit: (evt: any) => void;
    goBack: (evt: any) => void;
    executeService(): void;
    handleModalClose(): void;
    closeAndRefresh(): void;
    createBooking(): void;
    getValidationState(fldId: any): {
        isValid: boolean;
        status: "error" | "warning" | "success";
        helpMsg?: string;
    };
    fieldGroupV({ id, label, validate, ...props }: {
        [x: string]: any;
        id: any;
        label: any;
        validate: any;
    }): JSX.Element;
    fieldGroup({ id, label, help, ...props }: {
        [x: string]: any;
        id: any;
        label: any;
        help: any;
    }): JSX.Element;
    fieldGroupCol({ id, label, help, ...props }: {
        [x: string]: any;
        id: any;
        label: any;
        help: any;
    }): JSX.Element;
    render(): JSX.Element;
}
