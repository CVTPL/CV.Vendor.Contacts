import * as React from 'react';
import { ICommonDialogProps } from './ICommonDialogProps';
import { DialogFooter, PrimaryButton } from 'office-ui-fabric-react';

const CommonDialog: React.FunctionComponent<ICommonDialogProps> = (props) => {
    return (
        <>
            <div className="modal-custom-content">
                <div className="modal-header">
                    <div className="minus-circle-box bg-secondary-23">
                        {/* <img src={require("../../assets/svg/red-info.svg")} alt="Not Available Now" title="Info Icon" /> */}
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-content-box">
                        <h3>Delete</h3>
                        <p>Are you sure you want to delete this item?</p>
                    </div>
                </div>
                <DialogFooter>
                    <div className="btn-container btn-center">
                        <PrimaryButton className="btn-primary-10" text="Yes" onClick={() => { _actionCommonDialog("yes") }} />
                        <PrimaryButton className="btn-secondary-24" text="No" onClick={() => { _actionCommonDialog("no") }} />
                    </div>
                </DialogFooter>
            </div>
        </>
    );

    function _actionCommonDialog(action: any){
        if(action == "yes") {
            console.log("yes");
            props.closeDialogBox();
        } else{
            console.log("no");
            props.closeDialogBox();
        }
    }
};

export default CommonDialog;
