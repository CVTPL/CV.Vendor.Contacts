import * as React from 'react';
import { IVendorContactDetailsProps } from './IVendorContactDetailsProps';
import { ActionButton, Dropdown, IDropdownOption, IIconProps, Icon, TooltipHost } from 'office-ui-fabric-react';
import PnpSpCommonServices from '../../services/PnpSpCommonServices';
import { spfi, SPFx } from "@pnp/sp";

const VendorContactDetails: React.FunctionComponent<IVendorContactDetailsProps> = (props) => {

  const sp = spfi().using(SPFx(props.context));

  const vendorCardList: any[] = [
    {
      id: 1,
      vendorimgSrc: require("../../assets/png/vendor_image_01.png"),
      vendorTitle: "Medical Insurance Query",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 2,
      vendorimgSrc: require("../../assets/png/vendor_image_02.png"),
      vendorTitle: "Tax Consultatant",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 3,
      vendorimgSrc: require("../../assets/png/vendor_image_03.png"),
      vendorTitle: "Parking Guidance",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 4,
      vendorimgSrc: require("../../assets/png/vendor_image_04.png"),
      vendorTitle: "Courier Service",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 5,
      vendorimgSrc: require("../../assets/png/vendor_image_05.png"),
      vendorTitle: "Computer Laptop Repair",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 6,
      vendorimgSrc: require("../../assets/png/vendor_image_03.png"),
      vendorTitle: "Parking Guidance",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 7,
      vendorimgSrc: require("../../assets/png/vendor_image_01.png"),
      vendorTitle: "Medical Insurance Query",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
    {
      id: 8,
      vendorimgSrc: require("../../assets/png/vendor_image_02.png"),
      vendorTitle: "Tax Consultatant",
      vendorDetailTitle: "Reliance Health Insurance",
      vendorDescription: "Deepak Rathod",
      vendorPhone: "+91 44523 88673",
      vendorEmail: "deepakrathod@gmail.com",
    },
  ];
  
  // Tooltip Relative Code Start
  const calloutProps = { gapSpace: 0 };
  const onVendorTitleRenderContent = (item: any) => (
    <div className="custom-tooltip-content">
      <span>{item}</span>
    </div>
  );
  const onVendorDetailTitleRenderContent = (item: any) => (
    <div className="custom-tooltip-content">
      <span>{item}</span>
    </div>
  );
  // Tooltip Relative Code End
  const[defaultData, setDefaultData] = React.useState([]);

  React.useEffect(() => {
    _callGetData()
      .then((response) => {
        // Handle successful response here
        console.log(response);
        setDefaultData(response);
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });

      console.log("SharePoint Vendor Card List - Data Store = ", defaultData);
  
    // Clean up function
    return () => {
      console.log("Sorry not working code!");
    };
  }, []);

  return (
    <div className="vendor-card-scroll-content">
      <ul className="vendor-card-list">
        {
          defaultData.map((item: any) => {
            const imgJson = JSON.parse(item.VendorImage);
            return (
              <>
                <li className="vendor-card-list-item" onClick={(e) => parentComponent("parent", e)}>
                  <div className="card-container vendor-card-container">
                    <div className="card">
                      <div className="card-header">
                        <div className="rectangle-shape-box">
                          <img src={imgJson.serverRelativeUrl} alt="Not Available Now" title="Vendor image" />
                        </div>
                      </div>
                      <div className="card-body">
                        <TooltipHost className="tooltip-container" tooltipProps={{ onRenderContent: () => onVendorTitleRenderContent(item.Title) }} calloutProps={calloutProps}>
                          <div className="clamp-text">
                            <h2 onClick={(e) => parentComponent("child", e)}>{item.Title}</h2>
                          </div>
                        </TooltipHost>
                        <div className="detail-card">
                          <div className="detail-card-header">
                            <TooltipHost className="tooltip-container" tooltipProps={{ onRenderContent: () => onVendorDetailTitleRenderContent(item.VendorHeading) }} calloutProps={calloutProps}>
                              <div className="clamp-text">
                                <h3>{item.VendorHeading}</h3>
                              </div>
                            </TooltipHost>
                          </div>
                          <div className="detail-card-body">
                            <p>{item.VendorName}</p>
                            <ul className="icon-with-label-list">
                              <li className="icon-with-label-list-item">
                                <a className="icon-link" href={'tel:' + item.VendorNumber}>
                                  <div className="circle-box">
                                    <img src={require("../../assets/svg/phone.svg")} alt="Not Available Now" title="Phone icon" />
                                  </div>
                                  <span>{item.VendorNumber}</span>
                                </a>
                              </li>
                              <li className="icon-with-label-list-item">
                                <a className="icon-link" href={'mailto:' + item.Email}>
                                  <div className="circle-box">
                                    <img src={require("../../assets/svg/message.svg")} alt="Not Available Now" title="Message icon" />
                                  </div>
                                  <span>{item.Email}</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )
          })
        }
      </ul>
    </div>
  );

  function parentComponent(element: any, event: any){
    if(element === "parent"){
      console.log("My name is Parent");
    } else{
      console.log("My name is Child");
      event.stopPropagation();
    }
  }
  // function childComponent(element: any, event: any){
  //   if(element === "child"){
  //     console.log("My name is Child");
  //   }
  //   event.stopPropagation();
  // }

  async function _callGetData(): Promise<any> {
    return new Promise((resolve, reject) => {
      PnpSpCommonServices._getValue(sp).then(
        (response) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
          console.log(error);
        }
      );
    })
  }

};

export default VendorContactDetails;
/*
variable declaration function level - to use always - ya to set ya to get only 1 use
*/