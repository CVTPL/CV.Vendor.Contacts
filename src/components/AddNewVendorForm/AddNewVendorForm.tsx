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
    const adminFormDataCopy = clone(vendorContactsFormData);
    adminFormDataCopy["Upload_Image"] = imageFile.file;
    setVendorContactsFormData(adminFormDataCopy);
  }

  function runAfterImageDelete(file: any) {
    console.log({ file });
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

  /* Admin Form Submitted - Store Data in SharePoint Site Start */
  function adminFormSubmittedData(){
    let assetsListsID = "";
    PnpSpCommonServices._getSiteListByName(props.context,"Vendor Details").then(async (response)=>{
      return await response.json();
    }).then((response)=>{
      console.log(response.d.Id);
      assetsListsID = response.d.Id;
    }).then((response) => {
      _addListItems(assetsListsID);
    }).then((response)=>{
      _addImagesItems(assetsListsID);
    }).then((response)=>{
      _onclearFormData();
    }).then((response)=>{
      adminFormPanelClose();
    })
  }
  /* Admin Form Submitted - Store Data in SharePoint Site End */

  /* Add Data into List Page Start */
  async function _addListItems(assetsListsID: any): Promise<any> {
    let siteUrl = props.context.pageContext.legacyPageContext.webAbsoluteUrl;
    let obj = {
      Title: vendorContactsFormData.Title,
      CV_Vendor_Heading: vendorContactsFormData.Vendor_Heading,
      CV_Vendor_Name: vendorContactsFormData.Vendor_Name,
      CV_Vendor_Number: vendorContactsFormData.Vendor_Number,
      CV_Vendor_Email: vendorContactsFormData.Vendor_Email,
      CV_Vendor_Image: JSON.stringify({
        type: vendorContactsFormData.Upload_Image.type,
        serverRelativeUrl: siteUrl + '/SiteAssets/Lists/' + assetsListsID + '/' + vendorContactsFormData.Upload_Image.name,
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
  /* Add Data into List Page End */
  
  /* Add Image in SharePoint - Site Assets Folder Start */
  async function _addImagesItems(assetsListsID: any): Promise<any> {
    return new Promise((resolve, reject) => {
      PnpSpCommonServices._addImage(sp, "SiteAssets/Lists/" + assetsListsID, vendorContactsFormData.Upload_Image).then(
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
  /* Add Image in SharePoint - Site Assets Folder End */

  /* Submit Button Click - Clear Form Data Start */
  function _onclearFormData(){
    let vendorContactsFormObject = clone(vendorContactsFormData);
    vendorContactsFormObject.Title = "",
    vendorContactsFormObject.Vendor_Heading = "",
    vendorContactsFormObject.Vendor_Name = "",
    vendorContactsFormObject.Vendor_Number = "",
    vendorContactsFormObject.Vendor_Email = "",
    vendorContactsFormObject.Upload_Image = "",
    setVendorContactsFormData(vendorContactsFormObject);
    const myInput = document.getElementById("file_uploader") as HTMLInputElement;
    myInput.value = "";
  }
  /* Submit Button Click - Clear Form Data End */

  /* Cancel Button Click Close Panel & Submit Button Click Last Call This Function Start */
  function adminFormPanelClose(){
    props._isAdminFormPanelOpen();
  }
  /* Cancel Button Click Close Panel & Submit Button Click Last Call This Function End */

};

export default AddNewVendorForm;