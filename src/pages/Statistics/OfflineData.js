import React, { memo } from 'react';
import { Card, Tabs, Row, Col } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Statistics.less';
import { TimelineChart, Pie } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';


const { TabPane } = Tabs;

const OfflineData = memo(
  ({ loading, offlineChartData,}) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
              <a >
                  <FormattedMessage id="app.analysis.each-hour" defaultMessage="Each Hour" />
                </a>
                <a>
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a>
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
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{
                    y1: formatMessage({ id: 'app.analysis.traffic' }),
                    y2: formatMessage({ id: 'app.analysis.payments' }),
                  }}
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
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{
                    y1: formatMessage({ id: 'app.analysis.traffic' }),
                    y2: formatMessage({ id: 'app.analysis.payments' }),
                  }}
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
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{
                    y1: formatMessage({ id: 'app.analysis.traffic' }),
                    y2: formatMessage({ id: 'app.analysis.payments' }),
                  }}
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
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={offlineChartData}
                  titleMap={{
                    y1: formatMessage({ id: 'app.analysis.traffic' }),
                    y2: formatMessage({ id: 'app.analysis.payments' }),
                  }}
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

export default OfflineData;



