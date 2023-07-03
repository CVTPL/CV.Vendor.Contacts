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

const PnpSpCommonServices = {
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
  _getSiteDesign: async (sp: any) => {
    // console.log("service siteDesign Function Call = ", sp.siteDesigns.getSiteDesigns());
    return await sp.siteDesigns.getSiteDesigns();
  },
  _getValue: async (sp: any) => {
    const items: any[] = await sp.web.lists.getByTitle("CVVendorContacts").items();
    return items;
  },
};

export default PnpSpCommonServices;