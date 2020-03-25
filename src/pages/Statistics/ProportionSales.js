import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Statistics.less';
import { Pie } from '@/components/Charts';
import Yuan from '@/utils/Yuan';

const ProportionSales = memo(
  ({ dropdownGroup, salesType, loading, salesPieData, handleChangeSalesType }) => (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={
        <FormattedMessage
          id="app.analysis.the-proportion-of-data"
          defaultMessage="The Proportion of Data"
        />
      }
      bodyStyle={{ padding: 24 }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">
                <FormattedMessage id="app.analysis.total-users" defaultMessage="Total Users" />
              </Radio.Button>
              <Radio.Button value="online">
                <FormattedMessage id="app.analysis.total-orders" defaultMessage="Total Orders" />
              </Radio.Button>
              <Radio.Button value="stores">
                <FormattedMessage id="app.analysis.total-kilometers" defaultMessage="Total Kilometers" />
              </Radio.Button>
              <Radio.Button value="key">
                <FormattedMessage id="app.analysis.average-kilometers" defaultMessage="Average Kilometers" />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
      style={{ marginTop: 0 }}
    >
      <h4 style={{ marginTop: 10, marginBottom: 5 }}>
        <FormattedMessage id="app.analysis.data-proportion" defaultMessage="Sales" />
      </h4>
      <Pie
        hasLegend
        subTitle={<FormattedMessage id="app.analysis.data-pro" defaultMessage="Sales" />}
        total={() => <div>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</div>}
        data={salesPieData}
        valueFormat={value => <div>{value}</div>}
        height={335}
        lineWidth={4}
        style={{ padding: '8px 0' }}
      />
    </Card>
  )
);

export default ProportionSales;
