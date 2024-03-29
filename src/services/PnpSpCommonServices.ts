import "@pnp/sp/webs";
import "@pnp/sp/related-items/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import "@pnp/sp/items/get-all";
import "@pnp/sp/site-scripts";
import "@pnp/sp/site-designs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/batching";
import "@pnp/sp/regional-settings/web";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/presets/all";

const PnpSpCommonServices = {

  /* Get List Name Relative Code Start */
  _getSiteListByName: async (context: any, listName: string) => {
    var myHeaders = new Headers({
      'Accept': 'application/json; odata=verbose'
    });
    var myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    return await fetch(context.pageContext.legacyPageContext.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')", myInit).then((response) => {
      return response;
    });
  },
  /* Get List Name Relative Code End */

  /* Site Design List Get into Object (Call with Return) Relative Code Start */
  _getSiteDesign: async (sp: any) => {
    return await sp.siteDesigns.getSiteDesigns();
  },
  /* Site Design List Get into Object (Call with Return) Relative Code End */

  /* Apply Site Design to Site Relative Code Start */
  _applySiteDesignToSite: async (sp: any, siteDesignId: string, siteUrl: string) => {
    return await sp.siteDesigns.applySiteDesign(siteDesignId, siteUrl);
  },
  /* Apply Site Design to Site Relative Code End */

  /* Site Script List Get into Object (Call with Return) Relative Code Start */
  _getSiteScript: async (sp: any) => {
    return await sp.siteScripts.getSiteScripts();
  },
  /* Site Script List Get into Object (Call with Return) Relative Code Start */

  /* Create Site Design Relative Code Start */
  _createSiteDesign: async (sp: any, siteScriptId: any) => {
    return await sp.siteDesigns.createSiteDesign({
      SiteScriptIds: [siteScriptId],
      Title: "VendorContactsSiteDesign",
      WebTemplate: "64",
    });
  },
  /* Create Site Design Relative Code End */

  /* Create Site Script Relative Code Start */
  _createSiteScript: async (context: any, sp: any) => {
    const vendorContactsSiteScript = {
      "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",
      "actions": [
        {
          "verb": "createSiteColumnXml",
          "schemaXml": "<Field Type=\"Text\" ID=\"{ff8e2811-deed-4bbf-a8ae-19fa68741971}\" Name=\"CV_Vendor_Heading\" DisplayName=\"Vendor Heading\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_Vendor_Heading\" Customization=\"\" />"
        },
        {
          "verb": "createSiteColumnXml",
          "schemaXml": "<Field Type=\"Text\" ID=\"{d5e9fd61-3b7e-430d-b937-36b032a10c24}\" Name=\"CV_Vendor_Name\" DisplayName=\"Vendor Name\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_Vendor_Name\" Customization=\"\" />"
        },
        {
          "verb": "createSiteColumnXml",
          "schemaXml": "<Field Type=\"Text\" ID=\"{774fb12f-8f83-41cc-9c78-e0cd5c57d4af}\" Name=\"CV_Vendor_Number\" DisplayName=\"Vendor Number\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_Vendor_Number\" Customization=\"\" />"
        },
        {
          "verb": "createSiteColumnXml",
          "schemaXml": "<Field Type=\"Text\" ID=\"{95b1f2a8-806c-4d47-8ad3-830ae77c4c3e}\" Name=\"CV_Vendor_Email\" DisplayName=\"Vendor Email\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_Vendor_Email\" Customization=\"\" />"
        },
        {
          "verb": "createSiteColumnXml",
          "schemaXml": "<Field Type=\"Thumbnail\" ID=\"{cd7724d2-8a9e-4da9-ab74-914e97375c2c}\" Name=\"CV_Vendor_Image\" DisplayName=\"Vendor Image\" Required=\"TRUE\" StaticName=\"CV_Vendor_Image\" Group=\"_CV\" Customization=\"\" />"
        },
        {
          "verb": "createContentType",
          "name": "CV_VendorDetails_Template",
          "description": "Vendor Details Content Type",
          "id": "0x01002367B433E9DF4718A9BA061FD1B3C5EF",
          "hidden": false,
          "group": "_CV",
          "subactions":
            [
              {
                "verb": "addSiteColumn",
                "internalName": "CV_Vendor_Heading"
              },
              {
                "verb": "addSiteColumn",
                "internalName": "CV_Vendor_Name"
              },
              {
                "verb": "addSiteColumn",
                "internalName": "CV_Vendor_Number"
              },
              {
                "verb": "addSiteColumn",
                "internalName": "CV_Vendor_Email"
              },
              {
                "verb": "addSiteColumn",
                "internalName": "CV_Vendor_Image"
              }
            ]
        },
        {
          "verb": "createSPList",
          "listName": "CV_VendorDetails",
          "templateType": 100,
          "subactions": [
            {
              "verb": "addContentType",
              "name": "CV_VendorDetails_Template"
            },
            {
              "verb": "setDescription",
              "description": "This list contains vendor details."
            },
            {
              "verb": "setTitle",
              "title": "Vendor Details"
            },
            {
              "verb": "addSPView",
              "name": "All Items",
              "viewFields": [
                "LinkTitle",
                "CV_Vendor_Heading",
                "CV_Vendor_Name",
                "CV_Vendor_Number",
                "CV_Vendor_Email",
                "CV_Vendor_Image"
              ],
              "query": "",
              "rowLimit": 100,
              "isPaged": true,
              "makeDefault": true,
              "replaceViewFields": true
            }
          ]
        }
      ],
      "bindata": {},
      "version": "1"
    }
    return await sp.siteScripts.createSiteScript("VendorContactsSiteScript", "VendorContactsSiteScript", vendorContactsSiteScript);
  },
  /* Create Site Script Relative Code Start */

  _ensureSiteAssetsLibraryexist: async (sp: any) => {
    return await sp.web.lists.ensureSiteAssetsLibrary();
  },
  _getFolderByPath: async (context: any, folderPath: string) => {
    var myHeaders = new Headers({
      'Accept': 'application/json; odata=verbose'
    });
    var myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    return await fetch(context.pageContext.legacyPageContext.webAbsoluteUrl + "/_api/web/getFolderByServerRelativeUrl('" + folderPath + "')", myInit).then((response) => {
      return response;
    });
  },
  _createFolder: async (sp: any, folderUrl: string) => {
    return await sp.web.folders.addUsingPath(folderUrl);
  },
  _getListItemsWithExpandStringWithFiltersAndOrderByWithTop: async (sp: any, listName: string, selectString: string, expandString: string, filterString: string, orderByColumn: string, ascending: boolean, topCount: number) => {
    return await sp.web.lists.getByTitle(listName).items.select(selectString).expand(expandString).filter(filterString).orderBy(orderByColumn, ascending).top(topCount)();
  },
  _getValue: async (sp: any) => {
    const items: any[] = await sp.web.lists.getByTitle("Vendor Details").items();
    return items;
  },
  _checkLoginUserIsOwnerOrNot: async (context: any, groupName: string, userEmail: string) => {
    var myHeaders = new Headers({
      'Accept': 'application/json; odata=verbose'
    });
    var myInit = {
      method: 'GET',
      headers: myHeaders,
    }
    return await fetch(context.pageContext.legacyPageContext.webAbsoluteUrl + "/_api/web/sitegroups/getByName('" + groupName + "')/users/getByEmail('" + userEmail + "')", myInit).then((response) => {
      return response;
    });
  },
  _addImage: async (sp: any, folderPath: string, file: any) => {
    return await sp.web.getFolderByServerRelativePath(folderPath).files.addUsingPath(file.name, file, { Overwrite: true });
  },
  _addDataIntoList: async (sp: any, listName: string, data: any) => {
    return await sp.web.lists.getByTitle(listName).items.add(data);
  },
  _deleteListItem: async (sp: any, listName: string, id: number) => {
    return await sp.web.lists.getByTitle(listName).items.getById(id).recycle();
  },
  _updateListItem: async (sp: any, listName: string, data: any, id: number) => {
    return await sp.web.lists.getByTitle(listName).items.getById(id).update(data);
  },

};

export default PnpSpCommonServices;