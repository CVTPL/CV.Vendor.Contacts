import * as React from 'react';
import { ICvVendorContactsDetailsProps } from './ICvVendorContactsDetailsProps';
import VendorContactDetails from '../../../components/VendorContactDetails/VendorContactDetails';
import RequestForm from '../../../components/RequestForm/RequestForm';
require("../assets/stylesheets/base/global.scss");
import * as alasql from 'alasql';
import PnpSpCommonServices from '../../../services/PnpSpCommonServices';
import { spfi } from '@pnp/sp';
import { SPFx } from '@pnp/graph';

export default class CvVendorContactsDetails extends React.Component<ICvVendorContactsDetailsProps, any, {}> {
  constructor(props: ICvVendorContactsDetailsProps){
    super(props);
    this.state = {
      alasql: alasql,
    }
  }
  public sp = spfi().using(SPFx(this.props.context));
  componentDidMount(): void {
    if(Object.keys(this.props.context).length > 0){
      let siteUrl = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;
      PnpSpCommonServices._getSiteListByName(this.props.context, "VendorContacts").then((response) => {
        if(response.status == 404){
          PnpSpCommonServices._getSiteDesign(this.sp).then((allSiteDesign) => {
            let checkSiteDesign = allSiteDesign.filter((ele: any) => ele.Title == "CvVendorContactsDetails");
            console.log(checkSiteDesign);
          })
        } else{
          console.log("List is available");
        }
      })
    }
  }
  public render(): React.ReactElement<ICvVendorContactsDetailsProps> {
    return (
      <section className="vendor-contacts-details-container">
        <div className="vendor-contacts-details-content-box">
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                <h1>{this.props.webpartTitle}</h1>
              </div>
            </div>
          </div>
          <div className="grid-column-wraping-issue">
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl7 ms-xxl8 ms-xxxl8">
                  <VendorContactDetails alasql={this.state.alasql} context={this.props.context} />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl5 ms-xxl4 ms-xxxl4">
                  <RequestForm context={this.props.context} hrEmail={this.props.hrEmail}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}