/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IInputs, IOutputs } from './generated/ManifestTypes'
import MyReactComponent, { IMyReactComponentProps } from './MyReactComponent'

// Define IInputs and IOutputs Type. They should match with ControlManifest.
// export interface IInputs {
//   sampleProperty: ComponentFramework.PropertyTypes.LookupProperty;
// }
// export interface IOutputs {
//   sampleProperty?: ComponentFramework.LookupValue[];
// }

export class PDFViewerControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Vale of the field is stored and used inside the control
    private _value: string;

    private _notifyOutputChanged: () => void;

    // Reference to ComponentFramework Context Objct
    private _context: ComponentFramework.Context<IInputs>;

    // Reference to the control container HTMLDivElement
    // This element contains all elements of our custom control example
    private _container: HTMLDivElement;
    private _url: string
    private _props: IMyReactComponentProps = {
        url: ''
    }

    /**
     * Empty constructor.
     */
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        this._context = context
        this._container = container
        this._props.url = context.parameters.fileurl.raw || ''
        this._notifyOutputChanged = notifyOutputChanged

        ReactDOM.render(
            React.createElement(MyReactComponent, {}),
            this._container
        )
    }

    notifyChange(value: string) {
        this._url = value
        console.log('value -----------', value)
        this._notifyOutputChanged()
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        console.log('updateView Start...')
        console.log('this._gender... ', this._url)
        console.log('context.parameters.fileurl.raw... ', context.parameters.fileurl.raw)

        this._url = context.parameters.fileurl.raw || ''
        this._props.url = context.parameters.fileurl.raw || ''

        // Add code to update control view
        ReactDOM.render(
            React.createElement(MyReactComponent, this._props),
            this._container
        )
        console.log('updateView End...')
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        console.log('getOutputs Start...')
        return { fileurl: this._url }
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
        ReactDOM.unmountComponentAtNode(this._container)
    }
}
