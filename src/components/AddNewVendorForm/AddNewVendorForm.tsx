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

    var errorMessageObj1 = errorMessageObj;
    if(errorMessageObj1 && errorMessageObj1.Upload_Image.length > 0){
      errorMessageObj1.Upload_Image = "";
    }
    isErrorMessageObj(errorMessageObj1);
  }

  function runAfterImageDelete(file: any) {
    console.log({ file });
  }
  /* Drag & Drop File Relative Code Start */

  const [vendorContactsFormData, setVendorContactsFormData]: any = React.useState({Title:"", Vendor_Heading: "", Vendor_Name: "", Vendor_Number: "", Vendor_Email: "", Upload_Image: ""});
  const [errorMessageObj, isErrorMessageObj]: any = React.useState({Title: "", Vendor_Heading: "", Vendor_Name: "", Vendor_Number: "", Vendor_Email: "", Upload_Image: ""});

  const [submittedForm, isSubmittedForm] = React.useState(false);

  return (
    <>
      <div className="panel-body">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Title" placeholder="Enter title" title="Title" id="Title" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Title} />
                {errorMessageObj.Title ? (
                  <span className="error-message">{errorMessageObj.Title}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Heading" placeholder="Enter vendor heading" title="Vendor_Heading" id="Vendor_Heading" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Heading} />
                {errorMessageObj.Vendor_Heading ? (
                  <span className="error-message">{errorMessageObj.Vendor_Heading}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Name" placeholder="Enter vendor name" title="Vendor_Name" id="Vendor_Name" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Name} />
                {errorMessageObj.Vendor_Name ? (
                  <span className="error-message">{errorMessageObj.Vendor_Name}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Number" placeholder="Enter vendor number" title="Vendor_Number" id="Vendor_Number" maxLength={10} onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Number} />
                {errorMessageObj.Vendor_Number ? (
                  <span className="error-message">{errorMessageObj.Vendor_Number}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
              <div className="form-group">
                <TextField label="Vendor Email" placeholder="Enter vendor email" title="Vendor_Email" id="Vendor_Email" onChange={(e: any) => handleFieldChange(e)} required value={vendorContactsFormData.Vendor_Email} />
                {errorMessageObj.Vendor_Email ? (
                  <span className="error-message">{errorMessageObj.Vendor_Email}</span>
                ) : (
                  ""
                )}
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
                {errorMessageObj.Upload_Image ? (
                  <span className="error-message">{errorMessageObj.Upload_Image}</span>
                ) : (
                  ""
                )}
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

    /* Phone with Email Validation Start */
    phoneWithEmailValidation(event, adminFormDataCopy);
    /* Phone with Email Validation End */
    
    // isErrorMessageObj((prevState: any) => ({
    //   ...prevState,
    //   [event.target.id]: event.target.value === "" ? `Please enter your ${event.target.id.toLowerCase()}` : "",
    // }));

    // if(event.target.id == "Title"){
    //   isErrorMessageObj((prevState: any) => ({
    //       ...prevState,
    //       [event.target.id]: event.target.value === "" ? `Please enter your title` : "",
    //     }));
    // }else if(event.target.id == "Vendor_Heading"){
    //   isErrorMessageObj((prevState: any) => ({
    //     ...prevState,
    //     [event.target.id]: event.target.value === "" ? `Please enter your vendor heading` : "",
    //   }));
    // }else if(event.target.id == "Vendor_Name"){
    //   isErrorMessageObj((prevState: any) => ({
    //     ...prevState,
    //     [event.target.id]: event.target.value === "" ? `Please enter your vendor name` : "",
    //   }));
    // } else if(event.target.id == "Vendor_Number"){
    //   isErrorMessageObj((prevState: any) => ({
    //     ...prevState,
    //     [event.target.id]: event.target.value === "" ? `Please enter your vendor number` : "",
    //   }));
    // } else if(event.target.id == "Vendor_Email"){
    //   isErrorMessageObj((prevState: any) => ({
    //     ...prevState,
    //     [event.target.id]: event.target.value === "" ? `Please enter your vendor email` : "",
    //   }));
    // }
    
    setVendorContactsFormData(adminFormDataCopy);
  }

  function phoneWithEmailValidation(event: any, vendorDetailFormsDataCopy: any) {
    if(event.target.id == "Title"){
      isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: event.target.value === "" ? `Please enter your title` : "",
        }));
    }
    else if(event.target.id == "Vendor_Heading"){
      isErrorMessageObj((prevState: any) => ({
        ...prevState,
        [event.target.id]: event.target.value === "" ? `Please enter your vendor heading` : "",
      }));
    }
    else if(event.target.id == "Vendor_Name"){
      isErrorMessageObj((prevState: any) => ({
        ...prevState,
        [event.target.id]: event.target.value === "" ? `Please enter your vendor name` : "",
      }));
    }
    else if (event.target.id === "Vendor_Number") {
      var valuePhoneNumber = vendorDetailFormsDataCopy["Vendor_Number"].replace(/[^0-9]/g, "");
      vendorDetailFormsDataCopy["Vendor_Number"] = valuePhoneNumber;

      if (valuePhoneNumber.length !== 10) {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: `Please enter a 10-digit phone number - (${valuePhoneNumber.length})`,
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({...prevState, [event.target.id]: ""}));
      }
    } 
    else if (event.target.id === "Vendor_Email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(event.target.value);

      if (!isValidEmail) {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: "Please enter a valid email - ('@', '.')"
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: "",
        }));
      }
    }
  }

  function handleImageFieldChange(event: any){
    const adminFormDataCopy = clone(vendorContactsFormData);
    adminFormDataCopy[event.target.id] = event.target.files[0];
    setVendorContactsFormData(adminFormDataCopy);
  }

  /* Admin Form Submitted - Store Data in SharePoint Site Start */
  function adminFormSubmittedData(){
    const errors: any = {};

    // Check for errors
    Object.keys(vendorContactsFormData).forEach((key: any) => {
      if (vendorContactsFormData[key] === "") {
        if (key === "Upload_Image") {
          errors[key] = `Please click to rectangle box and select image`;
        } else {
          errors[key] = `Please enter your ${key.replace(/_/g, " ").toLowerCase()}`;
        }
      }
    });

    // Check for specific phone number and email validation errors
    if (vendorContactsFormData.Vendor_Number.length !== 10) {
      errors.Vendor_Number = `Please enter a 10-digit phone number - (${vendorContactsFormData.Vendor_Number.length})`;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(vendorContactsFormData.Vendor_Email)) {
      errors.Vendor_Email = "Please enter a valid email - ('@', '.')";
    }

    // Update error messages state
    isErrorMessageObj(errors);

    if (Object.keys(errors).length === 0) {
      let assetsListsID = "";
      PnpSpCommonServices._getSiteListByName(props.context,"Vendor Details").then(async (response)=>{
        return await response.json();
      }).then((response) => {
        console.log(response.d.Id);
        assetsListsID = response.d.Id;
      }).then((response) => {
        _addListItems(assetsListsID);
      }).then((response) => {
        _addImagesItems(assetsListsID);
      }).then((response) => {
        _onclearFormData();
      }).then((response) => {
        adminFormPanelClose();
      })
    }
    
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