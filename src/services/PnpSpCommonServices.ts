import "@pnp/sp/webs";
import "@pnp/sp/related-items/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

const PnpSpCommonServices = {
  _getValue: async (sp: any) => {
    const items: any[] = await sp.web.lists.getByTitle("VendorContacts").items();
    return items;
  },
};

export default PnpSpCommonServices;