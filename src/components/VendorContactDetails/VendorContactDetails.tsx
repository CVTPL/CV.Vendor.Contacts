import * as React from 'react';
import { IVendorContactDetailsProps } from './IVendorContactDetailsProps';
import { Panel, PrimaryButton, TextField, TooltipHost } from 'office-ui-fabric-react';
import PnpSpCommonServices from '../../services/PnpSpCommonServices';
import { spfi, SPFx } from "@pnp/sp";
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import { clone } from '@microsoft/sp-lodash-subset';
import { getTheme, ITheme } from 'office-ui-fabric-react';
import { RotatingLines } from 'react-loader-spinner';
import AddNewVendorForm from '../AddNewVendorForm/AddNewVendorForm';
import CommonLoader from '../CommonLoader/CommonLoader';

const theme: ITheme = getTheme();
const themeColor = theme.palette.themePrimary;

const VendorContactDetails: React.FunctionComponent<IVendorContactDetailsProps> = (props) => {

  const sp = spfi().using(SPFx(props.context));

  /* Pagination with Data Relative Code Start */
  const [paginationTotalPage, setPaginationTotalPage]: any = React.useState(null);
  const [paginationTotalcount, setPaginationTotalcount]: any = React.useState(null);
  const [paginationObject, setPaginationObject]: any = React.useState([]);
  const [pageNumber, setpageNumber]: any = React.useState(null);
  const [startEndIndexPagination, setStartEndIndexPagination]: any = React.useState([]);
  /* Pagination with Data Relative Code End */

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

  /* Filter Data Create Object Relative Code Start */
  const [defaultData, setDefaultData] = React.useState([]);
  const [defaultDataCopy, setDefaultDataCopy] = React.useState([]);
  const [filterItem, setFilterItem]: any = React.useState({});
  const [searchString, setSearchString]: any = React.useState("");
  /* Filter Data Create Object Relative Code End */

  const [isAdminPanelFormOpen, setAdminPanelFormOpen] = React.useState(false);

  /* No Data Found Relative Code Start */
  const [dataNotFound, setDataNotFound] = React.useState(false);
  /* No Data Found Relative Code End */

  const [visibleLoader, setVisibleLoader] = React.useState(false);

  /**
   * Hide Section
   * @returns 
   */
  const [hideSection, setHideSection] = React.useState(false);

  const adminFormPanelHeader = () => (
    <div className="panel-header">
      <div className="left-section">
        <h4>Add Vendor Details</h4>
      </div>
    </div>
  )

  React.useEffect(() => {
    sessionStorage.PageNumberData = 1; /* For Pagination */
    _initialFunction();
    // Clean up function
    return () => {
      console.log("Sorry not working code!");
    };
  }, []);

  return (
    <div className="vendor-card-scroll-content">
      {dataNotFound ?
        <>
          <div className="search-with-data">
            <div className={"add-edit-vendor-content-box" + hideSection ? "search-with-button" : ""}>
              {hideSection == true ?
                <TextField placeholder="Search to filter data" onChange={filterData} value={searchString} />
                : ""}
              {props.isAdmin ?
                <div className="btn-container btn-center">
                  <PrimaryButton text="Add" className="ms-primary-2" onClick={() => setAdminPanelFormOpen(true)} />
                </div>
                :
                ""
              }
            </div>
            <ul className="vendor-card-list">
              {
                defaultData.map((item: any) => {
                  const imgJson = JSON.parse(item.CV_Vendor_Image);
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
                                  <TooltipHost className="tooltip-container" tooltipProps={{ onRenderContent: () => onVendorDetailTitleRenderContent(item.CV_Vendor_Heading) }} calloutProps={calloutProps}>
                                    <div className="clamp-text">
                                      <h3>{item.CV_Vendor_Heading}</h3>
                                    </div>
                                  </TooltipHost>
                                </div>
                                <div className="detail-card-body">
                                  <p>{item.CV_Vendor_Name}</p>
                                  <ul className="icon-with-label-list">
                                    <li className="icon-with-label-list-item">
                                      <a className="icon-link" href={'tel:' + item.CV_Vendor_Number}>
                                        <div className="circle-box">
                                          <img src={require("../../assets/svg/phone.svg")} alt="Not Available Now" title="Phone icon" />
                                        </div>
                                        <span>{item.CV_Vendor_Number}</span>
                                      </a>
                                    </li>
                                    <li className="icon-with-label-list-item">
                                      <a className="icon-link" href={'mailto:' + item.CV_Vendor_Email}>
                                        <div className="circle-box">
                                          <img src={require("../../assets/svg/message.svg")} alt="Not Available Now" title="Message icon" />
                                        </div>
                                        <span>{item.CV_Vendor_Email}</span>
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
          <div className="pagination-footer">
            <div className="number-content">
              {startEndIndexPagination[0] ? startEndIndexPagination[0].startIndex : "1"}{" "}-{" "}
              {startEndIndexPagination[0] ? startEndIndexPagination[0].endIndex : "10"}{" "} of {paginationTotalcount} items
            </div>
            <Pagination currentPage={pageNumber > 1 ? pageNumber : 1} totalPages={paginationTotalPage} onChange={(page) => _getPage(page, paginationObject)} limiter={1} />
          </div>
        </>
        :
        <>
          <div className="not-found-message-container">
            <div className="search-with-data">
              <div className="add-edit-vendor-content-box">
                {props.isAdmin ?
                  <div className="btn-container btn-center">
                    <PrimaryButton text="Add" className="ms-primary-2" onClick={() => setAdminPanelFormOpen(true)} />
                  </div>
                  :
                  ""
                }
              </div>
            </div>
            <div className="not-found-message-content-box">
              <div className="content-box">
                <img src={require("../../assets/svg/no-data-found.svg")} alt="Not available now" />
                <p>If you need any information please fill form.</p>
              </div>
            </div>
          </div>
        </>
      }
      <div hidden={!visibleLoader}>
        <div className="fixed-loader-child">
          {/* <CommonLoader visibleLoader={visibleLoader} /> */}
          <RotatingLines strokeColor={themeColor} strokeWidth="5" animationDuration="0.75" width="100" visible={visibleLoader} />
        </div>
      </div>
      <Panel onRenderHeader={adminFormPanelHeader} isOpen={isAdminPanelFormOpen} className="panel-container admin-form-panel-container" onDismiss={() => setAdminPanelFormOpen(false)} closeButtonAriaLabel="Close">
        <AddNewVendorForm _isAdminFormPanelOpen={_isAdminFormPanelOpen} context={props.context} _isDataSubmited={_isDataSubmited} />
      </Panel>
    </div>
  );

  // Close reminder panel
  function _isAdminFormPanelOpen() {
    setAdminPanelFormOpen(false);
    // _initialFunction();
  }

  // Submit Panel
  function _isDataSubmited() {
    setAdminPanelFormOpen(false);
    _initialFunction();
  }

  function filterData(event: any) {
    let filterItems = filterItem;
    if (event.target.value != "") {
      filterItems["Search"] = event.target.value;
    } else {
      delete filterItems["Search"];
    }
    setFilterItem(filterItems); // Filter Data /
    setSearchString(event.target.value); // Search String /
    _getFilterData(); // filter Function /
  }

  function _getPage(page: number, responseItems: any) {
    /* Pagination with Data Relative Code Start */
    sessionStorage.pageNumberData = page;
    let paginationObjects = responseItems;
    let totalPage = Math.ceil(paginationObjects.length / 8);
    let pageCount = paginationObjects.length;
    setPaginationObject(paginationObjects);
    setPaginationTotalPage(totalPage);
    setPaginationTotalcount(pageCount);
    if (page) {
      let filterData = paginationObjects.slice((page - 1) * 8, page * 8);
      setDefaultData(filterData);
      setpageNumber(page);
    }
    /* Pagination with Data Relative Code End */

    /* Pagination Left Part Calculate Relative Code Start */
    const startIndex = (page - 1) * 8 + 1;
    const endIndex = Math.min(page * 8, pageCount);
    setStartEndIndexPagination([{ startIndex, endIndex }]);
    /* Pagination Left Part Calculate Relative Code End */
  }

  function parentComponent(element: any, event: any) {
    if (element === "parent") {
      console.log("My name is Parent");
    } else {
      console.log("My name is Child");
      event.stopPropagation();
    }
  }

  async function _getVendorDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      PnpSpCommonServices._getListItemsWithExpandStringWithFiltersAndOrderByWithTop(sp, "Vendor Details", "", "", "", "Id", false, 4999).then(
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

  // 
  function _getFilterData() {
    let itemdata = filterItem;
    let copyData = clone(defaultDataCopy);
    if (Object.keys(itemdata).length > 0) {
      const searchData = itemdata.Search ? "Title like '%" + itemdata.Search + "%' or CV_Vendor_Number like '%" + itemdata.Search + "%' or CV_Vendor_Name like '%" + itemdata.Search + "%' or CV_Vendor_Email like '%" + itemdata.Search + "%' or CV_Vendor_Heading like '%" + itemdata.Search + "%'" : "Title != 'null'";
      var filteredData = props.alasql("select * from ? where (" + searchData + ")", [copyData]);
      setDefaultData(filteredData);
      _getPage(1, filteredData);
    } else {
      setDefaultData(defaultDataCopy);
      _getPage(1, defaultDataCopy);
    }
  }

  // Function Initial
  function _initialFunction() {
    setVisibleLoader(true);
    setTimeout(() => {
      _getVendorDetails().then((response) => {
        // Handle successful response here
        if (response.length > 0) {
          setDataNotFound(true);
          setHideSection(true);
        } else {
          setDataNotFound(false);
          setHideSection(false);
        }
        var orderByData = props.alasql("SELECT * FROM ? ORDER BY Title ASC", [response]);
        setDefaultData(orderByData);
        setDefaultDataCopy(orderByData);
        _getPage(1, orderByData);
        setVisibleLoader(false);
        // _getpagination(1, response);
      });
    }, 1000);
  }

};

export default VendorContactDetails;