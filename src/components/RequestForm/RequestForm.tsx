import * as React from "react";
import { IRequestFormProps } from "./IRequestFormProps";
import { TextField, PrimaryButton } from "office-ui-fabric-react";

const RequestForm: React.FunctionComponent<IRequestFormProps> = (props) => {
  const [vendorDetailFormsData, isSetVendorDetailFormsData]: any = React.useState({Name: "", Number: "", Email: "", Description: ""});
  const [errorMessageObj, isErrorMessageObj]: any = React.useState({Name: "", Number: "", Email: "", Description: ""});
  const [submittedForm, isSubmittedForm] = React.useState(false);
  
  return (
    <>
      {submittedForm == true ? (
        <>
          <div className="form-border-box">
            <div className="thank-you-message-box">
              <img src={require("../../assets/svg/round-check.svg")} alt="Not Available Now" />
              <h3>Thank you for submitting the form!</h3>
              <p>Sit back and relax while our HR will work diligently to assist you with your request.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vendor-forms-container">
            <div className="vendor-forms-header">
              <h4>“Can’t find your query? Fill out the form below and let’s solve it together!”</h4>
            </div>
            <div className="vendor-forms-body">
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Name" placeholder="Enter name" title="Name" id="Name" onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Name ? <span className="error-message">{errorMessageObj.Name}</span> : ""}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Phone Number" placeholder="Enter number" title="Number" id="Number" value={vendorDetailFormsData.Number} maxLength={10} onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Number ? <span className="error-message">{errorMessageObj.Number}</span> : ""}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="E-mail" placeholder="Enter email" title="Email" id="Email" onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Email ? <span className="error-message">{errorMessageObj.Email}</span> : ""}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Description" placeholder="Enter description" title="Description" id="Description" onChange={(e) => handleFieldChange(e)} multiline />
                      {errorMessageObj.Description ? <span className="error-message">{errorMessageObj.Description}</span> : ""}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="btn-container btn-center">
                      <PrimaryButton text="Submit" className="ms-primary-2" onClick={submittedFormData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  function handleFieldChange(event: any) {
    const vendorDetailFormsDataCopy = vendorDetailFormsData;
    vendorDetailFormsDataCopy[event.target.id] = event.target.value;
    
    isErrorMessageObj((prevState: any) => (
      {...prevState, [event.target.id]: event.target.value === "" ? `Please enter your ${event.target.id.toLowerCase()}` : ""}
    ));

    /* Phone with Email Validation Start */
    phoneWithEmailValidation(event, vendorDetailFormsDataCopy);
    /* Phone with Email Validation End */

    isSetVendorDetailFormsData(vendorDetailFormsDataCopy);
  }

  function phoneWithEmailValidation(event: any, vendorDetailFormsDataCopy: any){
    if(event.target.id === "Number"){
      let valuePhoneNumber = vendorDetailFormsDataCopy["Number"].replace(/[^0-9]/g, "");
      vendorDetailFormsDataCopy["Number"] = valuePhoneNumber;

      if (valuePhoneNumber.length !== 10) {
        isErrorMessageObj((prevState: any) => ({...prevState,
          [event.target.id]: "Please enter a 10-digit phone number - " + " " + "(" + valuePhoneNumber.length + ")",
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({...prevState,
          [event.target.id]: "",
        }));
      }

    } else if(event.target.id === "Email"){
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(event.target.value);
      
      if(!isValidEmail){
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: "Please enter a valid email - ('@', '.')",
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: "",
        }));
      }
    }
  }


  function submittedFormData(){
    const errors: any = {};

    // Check for errors
    Object.keys(vendorDetailFormsData).forEach((key: any) => {
      if (vendorDetailFormsData[key] === "") {
        errors[key] = `Please enter your ${key.toLowerCase()}`;
      }
    });

    if (Object.keys(errors).length > 0) {
      isErrorMessageObj(errors);
    } else {
      isSubmittedForm(true);
    }
  }
};

export default RequestForm;

/*
Task For Maharshi :
#1 - CV Vendor Contacts - Phone Number & Email Fuctionality & how to next step discuss with ankit

Task For Maharshi : Status
#1 - CV Vendor Contacts - Phone Number & Email Fuctionality & how to next step discuss ankit

- I forgot login, after lunch break
*/