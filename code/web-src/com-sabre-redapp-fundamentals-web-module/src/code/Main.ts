import {Module} from 'sabre-ngv-core/modules/Module';
import { getService, registerService } from './Context';
import { ExtensionPointService } from "sabre-ngv-xp/services/ExtensionPointService";
import { RedAppSidePanelConfig } from "sabre-ngv-xp/configs/RedAppSidePanelConfig";
import { RedAppSidePanelButton } from "sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton";
import { LayerService } from "sabre-ngv-core/services/LayerService";
import { CreatePNR } from './CreatePNR';

export class Main extends Module {

    /**
     * Web module initializaition, configure menu contributions and register helper service
     */
    init(): void {
        super.init();
        // get reference to ExtensionPointService, which is used to add a new actionable item to the Custom Workflow panel (sidebar)
        const xp = getService(ExtensionPointService);
        //create a new sidebar contribution configuration
        const sidepanelMenu = new RedAppSidePanelConfig(
            [new RedAppSidePanelButton(
                "Create PNR",
                "btn-secondary side-panel-button",
                ()=>{this.showForm()},
                false)
            ]);
        //pass configuration to service handler
        xp.addConfig("redAppSidePanel",sidepanelMenu);
    }

    /**
     * Use Layerservice to display a data entry dialog to the user (react-boostrap based UI)
     */
    showForm(): void {
        //get reference to LayerService handler
        const ls = getService(LayerService);
        //display a new modal layer with react component 
        ls.showOnLayer(CreatePNR,{display:"areaView",position:42});
    }
}
