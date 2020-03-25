import React, { memo } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Statistics.less';
import { Bar } from '@/components/Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const SalesCard = memo(
  ({ salesData, isActive, loading, selectDate }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
              <a className={isActive('hour')} onClick={() => selectDate('hour')}>
                  <FormattedMessage id="app.analysis.each-hour" defaultMessage="Each Hour" />
                </a>
                <a className={isActive('today')} onClick={() => selectDate('today')}>
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                </a>
              </div>

            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab={<FormattedMessage id="app.analysis.total-users" defaultMessage="Users" />}
            key="users"
          >
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={360}
                    title={
                      <FormattedMessage
                        id="app.analysis.users-trend"
                        defaultMessage="Users Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={<FormattedMessage id="app.analysis.total-orders" defaultMessage="Orders" />}
            key="orders"
          >
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={360}
                    title={
                      <FormattedMessage
                        id="app.analysis.orders-trend"
                        defaultMessage="Orders Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={<FormattedMessage id="app.analysis.total-kilometers" defaultMessage="Total Kilometers" />}
            key="total-kilometers"
          >
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={360}
                    title={
                      <FormattedMessage
                        id="app.analysis.total-kilometers-trend"
                        defaultMessage="Total Kilometers Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
            </Row>
          </TabPane>


          <TabPane
            tab={<FormattedMessage id="app.analysis.average-kilometers" defaultMessage="Average Kilometers" />}
            key="average-kilometers"
          >
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={360}
                    title={
                      <FormattedMessage
                        id="app.analysis.average-kilometers-trend"
                        defaultMessage="Average Kilometers Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  )
);

export default SalesCard;
