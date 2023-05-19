import * as React from 'react';
import { IVendorContactDetailsProps } from './IVendorContactDetailsProps';
import { TooltipHost } from 'office-ui-fabric-react';


const VendorContactDetails: React.FunctionComponent<IVendorContactDetailsProps> = (props) => {

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

  return (
    <div className="vendor-card-scroll-content">
      <ul className="vendor-card-list">
        {
          vendorCardList.map((item: any) => {
            return (
              <>
                <li className="vendor-card-list-item">
                  <div className="card-container vendor-card-container">
                    <div className="card">
                      <div className="card-header">
                        <div className="rectangle-shape-box">
                          <img src={item.vendorimgSrc} alt="Not Available Now" title="Vendor image" />
                        </div>
                      </div>
                      <div className="card-body">
                        <TooltipHost className="tooltip-container" tooltipProps={{ onRenderContent: () => onVendorTitleRenderContent(item.vendorTitle) }} calloutProps={calloutProps}>
                          <div className="clamp-text">
                            <h2>{item.vendorTitle}</h2>
                          </div>
                        </TooltipHost>
                        <div className="detail-card">
                          <div className="detail-card-header">
                            <TooltipHost className="tooltip-container" tooltipProps={{ onRenderContent: () => onVendorDetailTitleRenderContent(item.vendorDetailTitle) }} calloutProps={calloutProps}>
                              <div className="clamp-text">
                                <h3>{item.vendorDetailTitle}</h3>
                              </div>
                            </TooltipHost>
                          </div>
                          <div className="detail-card-body">
                            <p>{item.vendorDescription}</p>
                            <ul className="icon-with-label-list">
                              <li className="icon-with-label-list-item">
                                <div className="circle-box">
                                  <img src={require("../../assets/svg/phone.svg")} alt="Not Available Now" title="Phone icon" />
                                </div>
                                <span>{item.vendorPhone}</span>
                              </li>
                              <li className="icon-with-label-list-item">
                                <div className="circle-box">
                                  <img src={require("../../assets/svg/message.svg")} alt="Not Available Now" title="Message icon" />
                                </div>
                                <span>{item.vendorEmail}</span>
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
};

export default VendorContactDetails;