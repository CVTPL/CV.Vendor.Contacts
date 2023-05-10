import * as React from 'react';
import styles from './CvVendorContactsDetails.module.scss';
import { ICvVendorContactsDetailsProps } from './ICvVendorContactsDetailsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import VendorContactDetails from '../../../components/VendorContactDetails/VendorContactDetails';

export default class CvVendorContactsDetails extends React.Component<ICvVendorContactsDetailsProps, {}> {
  public render(): React.ReactElement<ICvVendorContactsDetailsProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section className={`${styles.cvVendorContactsDetails} ${hasTeamsContext ? styles.teams : ''}`}>
        <VendorContactDetails />
      </section>
    );
  }
}
