import React, { useEffect, useRef, useState } from 'react'
import PropTypes, { number } from 'prop-types'

import {
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import axios from 'axios'

const SchedulerItem = {
  schedulerName: 'string',
  numCycles: 'string',
  startTime: 'string',
  endTime: 'string',
  flow1: 'string',
  flow2: 'string',
  flow3: 'string',
}

const SchedulerTable = ({ schedulers }) => {
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'schedulerName',
      _props: { scope: 'col' },
    },
    {
      key: 'cycles',
      label: 'Cycles',
      _props: { scope: 'col' },
    },
    {
      key: 'startTime',
      label: 'Start Time',
      _props: { scope: 'col' },
    },
    {
      key: 'stopTime',
      label: 'Stop Time',
      _props: { scope: 'col' },
    },
    {
      key: 'flow1',
      label: 'Flow 1',
      _props: { scope: 'col' },
    },
    {
      key: 'flow2',
      label: 'Flow 2',
      _props: { scope: 'col' },
    },
    {
      key: 'flow3',
      label: 'Flow 3',
      _props: { scope: 'col' },
    },
  ]
  const items = schedulers.map((item, index) => ({
    id: index + 1,
    schedulerName: item.schedulerName ?? '',
    cycles: item.numCycles ?? '',
    startTime: item.startTime ?? '',
    stopTime: item.endTime ?? '',
    flow1: item.flow1 ?? '',
    flow2: item.flow2 ?? '',
    flow3: item.flow3 ?? '',
    _cellProps: { id: { scope: 'row' } },
  }))

  return <CTable striped columns={columns} items={items} />
}

SchedulerTable.propTypes = {
  schedulers: PropTypes.arrayOf(PropTypes.shape(SchedulerItem)).isRequired,
}

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const [humidity, setHumidity] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [scheduler, setScheduler] = useState(null)
  const [latestData, setLatestData] = useState({
    temperature: number,
    humidity: number,
    schedules: {},
  })
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/latest-data')
        setLatestData(response.data)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchLatestData()
  }, [])

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:8000/ws')

    client.onopen = () => {
      console.log('WebSocket connection opened')
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data)
      const type = Object.keys(data)
      console.log('Received data:', data)

      if (type[0] === 'humidity') {
        setHumidity(data['humidity'])
      } else if (type[0] === 'temperature') {
        setTemperature(data['temperature'])
      } else setScheduler(data['schedules'])
    }

    client.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      client.close()
    }
  }, [])
  const [visible, setVisible] = useState(false)

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CModal
        visible={visible}
        size="lg"
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Current Scheduler</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <SchedulerTable schedulers={scheduler ? scheduler : latestData.schedules} />
        </CModalBody>
      </CModal>
      <CCol sm={6} xl={4} style={{ flex: '1 1 auto' }} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {temperature ? temperature : latestData.temperature}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Temperature"
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} style={{ flex: '1 1 auto' }} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {humidity ? humidity : latestData.humidity}
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Humidity"
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} style={{ flex: '1 1 auto' }} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => setVisible(true)}
              >
                Is Active
              </span>
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Scheduler"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
