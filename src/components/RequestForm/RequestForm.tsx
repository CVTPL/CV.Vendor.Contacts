import * as React from "react";
import { IRequestFormProps } from "./IRequestFormProps";
import { TextField, PrimaryButton } from "office-ui-fabric-react";

const RequestForm: React.FunctionComponent<IRequestFormProps> = (props) => {
  const [submittedForm, isSubmittedForm] = React.useState(false);
  return (
    <>
      {submittedForm == true ? 
        <>
          <div className="form-border-box">
            <div className="thank-you-message-box">
              <img src={require("../../assets/svg/round-check.svg")} alt="Not Available Now" />
              <h3>Thank you for submitting the form!</h3>
              <p>Sit back and relax while our HR will work diligently to assist you with your request.</p>
            </div>
          </div>
        </>
        :
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
                      <TextField label="Name" placeholder="Enter Name" />
                      <span className="error-message">Please enter your name</span>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Phone Number" placeholder="Enter Number" />
                      <span className="error-message">Please enter your number</span>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="E-mail" placeholder="Enter Number" />
                      <span className="error-message">Please enter your E-mail</span>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="form-group">
                      <TextField label="Description" placeholder="Enter Description" multiline />
                      <span className="error-message">Please enter description</span>
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                    <div className="btn-container btn-center">
                      <PrimaryButton text="Submit" className="ms-primary-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default RequestForm;
