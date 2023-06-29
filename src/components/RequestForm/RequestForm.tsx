import * as React from "react";
import { IRequestFormProps } from "./IRequestFormProps";
import { TextField, PrimaryButton } from "office-ui-fabric-react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";

const RequestForm: React.FunctionComponent<IRequestFormProps> = (props) => {
  const [vendorDetailFormsData, isSetVendorDetailFormsData]: any =
    React.useState({ Name: "", Number: "", Email: "", Description: "" });
  const [errorMessageObj, isErrorMessageObj]: any = React.useState({
    Name: "",
    Number: "",
    Email: "",
    Description: "",
  });
  const [submittedForm, isSubmittedForm] = React.useState(false);
  const sp = spfi().using(SPFx(props.context));
  return (
    <>
      {submittedForm == true ? (
        <>
          <div className="form-border-box">
            <div className="thank-you-message-box">
              <img
                src={require("../../assets/svg/round-check.svg")}
                alt="Not Available Now"
              />
              <h3>Thank you for submitting the form!</h3>
              <p>
                Sit back and relax while our HR will work diligently to assist
                you with your request.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vendor-forms-container">
            <div className="vendor-forms-header">
              <h4>
                “Can’t find your query? Fill out the form below and let’s solve
                it together!”
              </h4>
            </div>
            <div className="vendor-forms-body">
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField
                        label="Name"
                        placeholder="Enter name"
                        title="Name"
                        id="Name"
                        onChange={(e: any) => handleFieldChange(e)}
                      />
                      {errorMessageObj.Name ? (
                        <span className="error-message">
                          {errorMessageObj.Name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField
                        label="Phone Number"
                        placeholder="Enter number"
                        title="Number"
                        id="Number"
                        value={vendorDetailFormsData.Number}
                        maxLength={10}
                        onChange={(e: any) => handleFieldChange(e)}
                      />
                      {errorMessageObj.Number ? (
                        <span className="error-message">
                          {errorMessageObj.Number}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField
                        label="E-mail"
                        placeholder="Enter email"
                        title="Email"
                        id="Email"
                        onChange={(e: any) => handleFieldChange(e)}
                      />
                      {errorMessageObj.Email ? (
                        <span className="error-message">
                          {errorMessageObj.Email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField
                        label="Description"
                        placeholder="Enter description"
                        title="Description"
                        id="Description"
                        onChange={(e) => handleFieldChange(e)}
                        multiline
                      />
                      {errorMessageObj.Description ? (
                        <span className="error-message">
                          {errorMessageObj.Description}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="btn-container btn-center">
                      <PrimaryButton
                        text="Submit"
                        className="ms-primary-2"
                        onClick={submittedFormData}
                      />
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

    isErrorMessageObj((prevState: any) => ({
      ...prevState,
      [event.target.id]:
        event.target.value === ""
          ? `Please enter your ${event.target.id.toLowerCase()}`
          : "",
    }));

    /* Phone with Email Validation Start */
    phoneWithEmailValidation(event, vendorDetailFormsDataCopy);
    /* Phone with Email Validation End */

    isSetVendorDetailFormsData(vendorDetailFormsDataCopy);
  }

  function phoneWithEmailValidation(
    event: any,
    vendorDetailFormsDataCopy: any
  ) {
    if (event.target.id === "Number") {
      let valuePhoneNumber = vendorDetailFormsDataCopy["Number"].replace(
        /[^0-9]/g,
        ""
      );
      vendorDetailFormsDataCopy["Number"] = valuePhoneNumber;

      if (valuePhoneNumber.length !== 10) {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target
            .id]: `Please enter a 10-digit phone number - (${valuePhoneNumber.length})`,
        }));
      } else {
        isErrorMessageObj((prevState: any) => ({
          ...prevState,
          [event.target.id]: "",
        }));
      }
    } else if (event.target.id === "Email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(event.target.value);

      if (!isValidEmail) {
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
      setEmail().then((response) => {
        alert("Message Send !");
        isSubmittedForm(true);
      });
    }
  }

  async function setEmail(): Promise<any> {
    const emailProps: IEmailProperties = {
      To: [props.hrEmail],
      //CC: ["user2@site.com", "user3@site.com"],
      //BCC: ["user4@site.com", "user5@site.com"],
      Subject: "This email is about...",
      Body: "Hi, HR <b>I need to Plumber</b>",
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
};

export default RequestForm;
