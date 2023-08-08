import * as React from 'react';
import { ICvVendorContactsDetailsProps } from './ICvVendorContactsDetailsProps';
import VendorContactDetails from '../../../components/VendorContactDetails/VendorContactDetails';
import RequestForm from '../../../components/RequestForm/RequestForm';
require("../assets/stylesheets/base/global.scss");
import * as alasql from 'alasql';
import PnpSpCommonServices from '../../../services/PnpSpCommonServices';
import { spfi, SPFx } from "@pnp/sp";
import CommonLoader from '../../../components/CommonLoader/CommonLoader';
import { Placeholder } from '@pnp/spfx-controls-react';
import { getTheme } from 'office-ui-fabric-react';

export default class CvVendorContactsDetails extends React.Component<ICvVendorContactsDetailsProps, any, {}> {
  constructor(props: ICvVendorContactsDetailsProps) {
    super(props);
    this.state = {
      alasql: alasql,
      isCurrentUserSiteAdminOrOwner: false,
      visibleLoader: false,
      visibleItem: false,
    }
  }
  // CVVendorContactsSiteDesign
  public sp = spfi().using(SPFx(this.props.context));

  /* By Default Call this Function On Refresh Web Page */
  componentDidMount(): void {
    if (Object.keys(this.props.context).length > 0) {
      // Start Loader Here
      this.setState({ visibleLoader: true });
      let siteUrl = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;
      PnpSpCommonServices._getSiteListByName(this.props.context, "Vendor Details").then((response) => {//check list is available or not
        // CVVendorContactsSiteDesgin
        if (response.status === 404) {//list is not available
          PnpSpCommonServices._getSiteDesign(this.sp).then((allSiteDesign) => { //check site design available or not
            let checkSiteDesign = allSiteDesign.filter((ele: any) => ele.Title == "VendorContactsSiteDesign");
            if (checkSiteDesign.length > 0) { //Site design is available
              //site design is available so apply that site design to site.
              return PnpSpCommonServices._applySiteDesignToSite(this.sp, checkSiteDesign[0].Id, siteUrl).then((response) => {
                return this._commonFlowAfterSideDesignApply();
              });
            }
            else {//site design is not available
              return PnpSpCommonServices._getSiteScript(this.sp).then((allSiteScripts) => {
                let checkSiteScript = allSiteScripts.filter((ele: any) => ele.Title == "VendorContactsSiteScript");
                if (checkSiteScript.length > 0) {//Site Script is available
                  return PnpSpCommonServices._createSiteDesign(this.sp, checkSiteScript[0].Id).then((response) => {
                    return PnpSpCommonServices._applySiteDesignToSite(this.sp, response.Id, siteUrl);
                  }).then((response) => {
                    return this._commonFlowAfterSideDesignApply();
                  });
                }
                else {// Site Script is not available
                  PnpSpCommonServices._createSiteScript(this.props.context, this.sp).then((response: any) => {
                    return PnpSpCommonServices._createSiteDesign(this.sp, response.Id);
                  }).then((response) => {
                    return PnpSpCommonServices._applySiteDesignToSite(this.sp, response.Id, siteUrl);
                  }).then((response) => {
                    return this._commonFlowAfterSideDesignApply();
                  });
                }
              });
            }
          }).then((response) => {
            this.setState({ visibleLoader: false, visibleItem: true });
          });
        } else {
          //end loader here
          this.setState({ visibleLoader: false, visibleItem: true });
        }
      })
    }
    // props.context.pageContext.legacyPageContext.isSiteAdmin
    if (this.props.context.pageContext.legacyPageContext.isSiteAdmin) {//check current login user is admin or not
      this.setState({ isCurrentUserSiteAdminOrOwner: true });
    }
    else {//current user not admin then check is site owner or not?
      PnpSpCommonServices._checkLoginUserIsOwnerOrNot(this.props.context, this.props.context.pageContext.web.title + " Owners", this.props.context.pageContext.user.email).then((response) => {
        if (response.status == 404) {//current user is not available in owner group
          this.setState({ isCurrentUserSiteAdminOrOwner: false });
        }
        else {// current user is available in owner group
          this.setState({ isCurrentUserSiteAdminOrOwner: true });
        }
      });
    }
  }
  public render(): React.ReactElement<ICvVendorContactsDetailsProps> {
    return (
      <>
        <section className="vendor-contacts-details-container">
          {this.props.hrEmail.length == 0 ?
            <>
              <div className="placeholder-configure-container">
                <Placeholder iconName='Edit'
                iconText='Configure your web part'
                description='Please complete the mandatory fields in the web part properties.'
                buttonLabel='Configure'
                onConfigure={this._onConfigure}
                  theme={getTheme()} />
              </div>
            </>
            :
            <>
              <div className="vendor-contacts-details-content-box">
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                      <h1>{this.props.webpartTitle}</h1>
                    </div>
                  </div>
                </div>
                <div className="grid-column-wraping-issue">
                  {this.state.isCurrentUserSiteAdminOrOwner ?
                    <>
                      {this.state.visibleItem ?
                        <div className="admin-flow-container">
                          <div className="ms-Grid">
                            <div className="ms-Grid-row">
                              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 ms-xxxl12">
                                <VendorContactDetails alasql={this.state.alasql} context={this.props.context} isAdmin={this.state.isCurrentUserSiteAdminOrOwner} />
                              </div>
                            </div>
                          </div>
                        </div>
                        : ""}
                    </>
                    :
                    <>
                      {this.state.visibleItem ?
                        <>
                          <div className="visitor-flow-container">
                            <div className="ms-Grid">
                              <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 ms-xxl8 ms-xxxl8">
                                  <VendorContactDetails alasql={this.state.alasql} context={this.props.context} isAdmin={this.state.isCurrentUserSiteAdminOrOwner} />
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 ms-xxl4 ms-xxxl4">
                                  <RequestForm context={this.props.context} hrEmail={this.props.hrEmail} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </> : ""}
                    </>
                  }
                </div>
              </div>
              <div hidden={!this.state.visibleLoader}>
                <div className="fixed-loader-child">
                  <CommonLoader visibleLoader={this.state.visibleLoader} />
                </div>
              </div>
            </>
          }
        </section>
      </>
    );
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  private _commonFlowAfterSideDesignApply = async () => {
    let siteUrl = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;
    let listId = "";

    PnpSpCommonServices._ensureSiteAssetsLibraryexist(this.sp).then((response) => {
      return PnpSpCommonServices._getFolderByPath(this.props.context, "SiteAssets/Lists");
    }).then((response) => {
      //check Lists folder in Site Assets already exists if no then create.
      if (response.status == 200) {
        return;
      }
      else {
        return PnpSpCommonServices._createFolder(this.sp, "SiteAssets/Lists");
      }
    }).then((response) => {
      return PnpSpCommonServices._getSiteListByName(this.props.context, "Vendor Details");
    }).then(async (response) => {
      return await response.json();
    }).then((response) => {
      listId = response.d.Id;
      return PnpSpCommonServices._createFolder(this.sp, "SiteAssets/Lists/" + listId + "");
    }).then((response) => {
      //end loader here
      this.setState({ visibleLoader: false });
    });
  }
}