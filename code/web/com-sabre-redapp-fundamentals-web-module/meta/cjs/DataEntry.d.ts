import * as React from "react";
export interface Traveler {
    name: string;
    surname: string;
    birthYear?: number;
    birthMonth?: number;
    typeCode: 'ADT' | 'CHD' | 'INF';
}
export interface myState {
    stage: number;
    travelers: Array<Traveler>;
}
export interface myProps {
    hand: string;
}
export declare class DataEntry extends React.Component<myProps, myState> {
    constructor(e: any);
    getReservation(): void;
    handleChange(e: any): void;
    handleSubmit: (evt: any) => void;
    executeService(): void;
    getValidationState(): "error" | "warning" | "success";
    fieldGroupV({ id, label, help, validate, ...props }: {
        [x: string]: any;
        id: any;
        label: any;
        help: any;
        validate: any;
    }): JSX.Element;
    fieldGroup({ id, label, help, ...props }: {
        [x: string]: any;
        id: any;
        label: any;
        help: any;
    }): JSX.Element;
    render(): JSX.Element;
}
