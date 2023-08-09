import * as React from "react";
import { IRequestFormProps } from "./IRequestFormProps";
import { TextField, PrimaryButton } from "office-ui-fabric-react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import CommonLoader from "../CommonLoader/CommonLoader";

const RequestForm: React.FunctionComponent<IRequestFormProps> = (props) => {
  /* Request Form Store Data Relative Declaration Variable with Error Message Start */
  const [vendorDetailFormsData, isSetVendorDetailFormsData]: any = React.useState({ Name: "", Number: "", Email: "", Description: "" });
  const [errorMessageObj, isErrorMessageObj]: any = React.useState({ Name: "", Number: "", Email: "", Description: "" });
  /* Request Form Store Data Relative Declaration Variable with Error Message End */

  /* SubmittedForm Hide/Show Thank You Message Box Relative Code Start */
  const [submittedForm, isSubmittedForm] = React.useState(false);
  const [visibleLoader, isVisibleLoader] = React.useState(false);
  /* SubmittedForm Hide/Show Thank You Message Box Relative Code End */

  const sp = spfi().using(SPFx(props.context));
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
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Name" placeholder="Enter name" title="Name" id="Name" onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Name ? (
                        <span className="error-message">{errorMessageObj.Name}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Phone Number" placeholder="Enter number" title="Number" id="Number" value={vendorDetailFormsData.Number} maxLength={10} onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Number ? (
                        <span className="error-message">{errorMessageObj.Number}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="E-mail" placeholder="Enter email" title="Email" id="Email" onChange={(e: any) => handleFieldChange(e)} />
                      {errorMessageObj.Email ? (
                        <span className="error-message">{errorMessageObj.Email}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Description" placeholder="Enter description" title="Description" id="Description" onChange={(e) => handleFieldChange(e)} multiline />
                      {errorMessageObj.Description ? (
                        <span className="error-message">{errorMessageObj.Description}</span>
                      ) : (
                        ""
                      )}
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
            {/* Loader */}
            <div hidden={!visibleLoader}>
              <div className="fixed-loader-child">
                <CommonLoader visibleLoader={visibleLoader} />
              </div>
            </div>
            {/* Loader */}
          </div>
        </>
      )}
    </>
  );

  /* All TextField Data Get in Store into Object Start */
  function handleFieldChange(event: any) {
    const vendorDetailFormsDataCopy = vendorDetailFormsData;
    vendorDetailFormsDataCopy[event.target.id] = event.target.value;
    isErrorMessageObj((prevState: any) => ({
      ...prevState,
      [event.target.id]: event.target.value === "" ? `Please enter your ${event.target.id.toLowerCase()}` : "",
    }));

    /* Phone with Email Validation Start */
    phoneWithEmailValidation(event, vendorDetailFormsDataCopy);
    /* Phone with Email Validation End */

    isSetVendorDetailFormsData(vendorDetailFormsDataCopy);
  }
  /* All TextField Data Get in Store into Object Start */

  /* Phone Number & Email Validation Relative Code Start */
  function phoneWithEmailValidation(
    event: any,
    vendorDetailFormsDataCopy: any
  ) {
    if (event.target.id === "Number") {
      let valuePhoneNumber = vendorDetailFormsDataCopy["Number"].replace(/[^0-9]/g, "");
      vendorDetailFormsDataCopy["Number"] = valuePhoneNumber;
      if (valuePhoneNumber.length !== 10) {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: `Please enter a 10-digit phone number - (${valuePhoneNumber.length})`,
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({ ...prevState, [event.target.id]: "" }));
      }
    } else if (event.target.id === "Email") {
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
  /* Phone Number & Email Validation Relative Code End */

  /* Submit Button Click Check Error Message & Hide/Show Thank You Message Relative Code Start */
  function submittedFormData() {
    const errors: any = {};

    // Check for errors
    Object.keys(vendorDetailFormsData).forEach((key: any) => {
      if (vendorDetailFormsData[key] === "") {
        errors[key] = `Please enter your ${key.toLowerCase()}`;
      }
    });

    // Check for specific phone number and email validation errors
    if (vendorDetailFormsData.Number.length !== 10) {
      errors.Number = `Please enter a 10-digit phone number - (${vendorDetailFormsData.Number.length})`;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(vendorDetailFormsData.Email)) {
      errors.Email = "Please enter a valid email - ('@', '.')";
    }

    // Update error messages state
    isErrorMessageObj(errors);

    if (Object.keys(errors).length === 0) {
      isVisibleLoader(true);
      setEmail().then((response) => {
        isVisibleLoader(false);
        // alert("Message Send !");
        isSubmittedForm(true);
        setTimeout(() => {
          isSubmittedForm(false);
        }, 1500);
        clearForm()
      });
    }
  }
  /* Submit Button Click Check Error Message & Hide/Show Thank You Message Relative Code End */

  // Clear Form
  function clearForm() {
    var vendorDetailFormsObject = vendorDetailFormsData;
    vendorDetailFormsObject.Name = "",
      vendorDetailFormsObject.Number = "",
      vendorDetailFormsObject.Email = "",
      vendorDetailFormsObject.Description = "",
      isSetVendorDetailFormsData(vendorDetailFormsObject);
  }

  /* HR Send Email Request Relative Code Start */
  async function setEmail(): Promise<any> {
    const emailProps: IEmailProperties = {
      To: [props.hrEmail],
      //CC: ["user2@site.com", "user3@site.com"],
      //BCC: ["user4@site.com", "user5@site.com"],
      Subject: "Vendor details requirements.",
      // Body: vendorDetailFormsData && vendorDetailFormsData.Description /n+ "From:" + props.context.pageContext.user.email,
      Body: '<p><b>Name: </b>' + vendorDetailFormsData.Name + '</p><p><b>Mobile: </b>' + vendorDetailFormsData.Number + '</p><p><b>Email: </b>' + vendorDetailFormsData.Email + '</p></p><p><b>Requirement: </b>' + vendorDetailFormsData.Description + '</p><p>To add a vendor details <a href=' + window.location.href + '>Click Here</a></p>',
      From: props.context.pageContext.user.email,
      AdditionalHeaders: {
        "content-type": "text/html",
      },
    };
    return new Promise(async (resolve, reject) => {
      await sp.utility.sendEmail(emailProps).then(
        (response) => {
          resolve(response);
        },
        (error: any): any => {
          reject(error);
        }
      );
    });
  }
  /* HR Send Email Request Relative Code End */
};

export default RequestForm;