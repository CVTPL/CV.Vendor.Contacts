import * as React from 'react';
import { ICvVendorContactsDetailsProps } from './ICvVendorContactsDetailsProps';
import VendorContactDetails from '../../../components/VendorContactDetails/VendorContactDetails';
import RequestForm from '../../../components/RequestForm/RequestForm';
require("../assets/stylesheets/base/global.scss");

export default class CvVendorContactsDetails extends React.Component<ICvVendorContactsDetailsProps, any, {}> {
  constructor(props: ICvVendorContactsDetailsProps){
    super(props);
  }
  public render(): React.ReactElement<ICvVendorContactsDetailsProps> {
    return (
      <section className="vendor-contacts-details-container">
        <div className="vendor-contacts-details-content-box">
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                <h1>Vendor Contacts</h1>
              </div>
            </div>
          </div>
          <div className="grid-column-wraping-issue">
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl7 ms-xxl8 ms-xxxl8">
                  <VendorContactDetails context={this.props.context} />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl5 ms-xxl4 ms-xxxl4">
                  <RequestForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}