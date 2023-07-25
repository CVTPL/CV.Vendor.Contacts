import { PrimaryButton, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { IAddNewVendorFormProps } from "./IAddNewVendorFormProps";
import { clone } from "@microsoft/sp-lodash-subset";
import PnpSpCommonServices from "../../services/PnpSpCommonServices";
import { spfi, SPFx } from "@pnp/sp";
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/style.css';
import { Label } from '@fluentui/react/lib/Label';

const AddNewVendorForm: React.FunctionComponent<IAddNewVendorFormProps> = (props) => {

  const sp = spfi().using(SPFx(props.context));

  /* Drag & Drop File Relative Code Start */
  function getImageFileObject(imageFile: any) {
    console.log({ imageFile })
  }

  function runAfterImageDelete(file: any) {
    console.log({ file })
  }
  /* Drag & Drop File Relative Code Start */

  const [vendorContactsFormData, setVendorContactsFormData]: any = React.useState({
    Title:"",
    Vendor_Heading: "",
    Vendor_Name: "",
    Vendor_Number: "",
    Vendor_Email: ""
  });

  return (
    <>
      <div className="panel-body">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Title" placeholder="Enter title" title="Title" id="Title" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Title} />
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Heading" placeholder="Enter vendor heading" title="Vendor_Heading" id="Vendor_Heading" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Heading} />
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Name" placeholder="Enter vendor name" title="Vendor_Name" id="Vendor_Name" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Name} />
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Number" placeholder="Enter vendor number" title="Vendor_Number" id="Vendor_Number" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Number} />
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Email" placeholder="Enter vendor email" title="Vendor_Email" id="Vendor_Email" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Email} />
              </div>
            </div>
            {/* <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <label>Vendor Image</label>
                <input type="file" title="Vendor_Image" id="Vendor_Image" onChange={(e: any) => handleImageFieldChange(e)} required />
              </div>
            </div> */}
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <Label>Vendor Image</Label>
                <ImageUploader onFileAdded={(img) => getImageFileObject(img)} onFileRemoved={(img) => runAfterImageDelete(img)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="btn-container btn-end">
          <PrimaryButton className="ms-secondary-10" text="Cancel" onClick={() => { adminFormPanelClose(); }} />
          <PrimaryButton className="ms-primary-2" text="Submit" onClick={() => adminFormSubmittedData()} />
        </div>
      </div>
    </>
  );

  function handleFieldChange(event: any) {
    const adminFormDataCopy = clone(vendorContactsFormData);
    adminFormDataCopy[event.target.id] = event.target.value;
    setVendorContactsFormData(adminFormDataCopy);
  }

  function handleImageFieldChange(event: any){
    const adminFormDataCopy = clone(vendorContactsFormData);
    adminFormDataCopy[event.target.id] = event.target.files[0];
    setVendorContactsFormData(adminFormDataCopy);
  }

  /* Admin Form Submitted - Store Data in SharePoint Site */
  function adminFormSubmittedData(){
    console.log(vendorContactsFormData);
    _addListItems().then((response)=>{
      _addImagesItems();
    }).then((response)=>{
      _onclearFormData();
    }).then((response)=>{
      adminFormPanelClose();
    }); 
  }

  /* Add Data into List Page */
  async function _addListItems(): Promise<any> {
    let siteUrl = props.context.pageContext.legacyPageContext.webAbsoluteUrl;
    let obj = {
      Title: vendorContactsFormData.Title,
      CV_Vendor_Heading: vendorContactsFormData.Vendor_Heading,
      CV_Vendor_Name: vendorContactsFormData.Vendor_Name,
      CV_Vendor_Number: vendorContactsFormData.Vendor_Number,
      CV_Vendor_Email: vendorContactsFormData.Vendor_Email,
      CV_Vendor_Image: JSON.stringify({
        type: vendorContactsFormData.Vendor_Image.type,
        serverRelativeUrl: siteUrl + '/SiteAssets/Lists/4bf10e5c-4e4b-4584-b9fd-27b0b693bb6f/' + vendorContactsFormData.Vendor_Image.name,
      }),
    };
    return new Promise((resolve, reject) => {
      PnpSpCommonServices._addDataIntoList(sp, "Vendor Details", obj).then(
        (response) => {
          resolve(response);
          console.log("Data Here in main => ", response);
        },
        (error: any) => {
          reject(error);
          console.log(error);
        }
      )
    })
  }

  /* Add Image in SharePoint - Site Assets Folder */
  async function _addImagesItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      PnpSpCommonServices._addImage(sp, "SiteAssets/Lists/4bf10e5c-4e4b-4584-b9fd-27b0b693bb6f", vendorContactsFormData.Vendor_Image).then(
        (response) => {
          resolve(response);
          console.log("Data Here in main => ", response);
        },
        (error: any) => {
          reject(error);
          console.log(error);
        }
      )
    })
  }

  /* Submit Button Click - Clear Form Data */
  function _onclearFormData(){
    let vendorContactsFormObject = clone(vendorContactsFormData);
    vendorContactsFormObject.Title = "",
    vendorContactsFormObject.Vendor_Heading = "",
    vendorContactsFormObject.Vendor_Name = "",
    vendorContactsFormObject.Vendor_Number = "",
    vendorContactsFormObject.Vendor_Email = "",
    vendorContactsFormObject.Vendor_Image = "",
    setVendorContactsFormData(vendorContactsFormObject);
    const myInput = document.getElementById("Vendor_Image") as HTMLInputElement;
    myInput.value = "";
  }

  /* Cancel Button Click Close Panel & Submit Button Click Last Call This Function */
  function adminFormPanelClose(){
    props._isAdminFormPanelOpen();
  }

};

export default AddNewVendorForm;