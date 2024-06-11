import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const [visible, setVisible] = useState(false)

  const [currentForm, setCurrentForm] = useState(1)

  const [formData1, setFormData1] = useState({
    schedulerName: '',
    numCycles: '',
    startTime: '',
    endTime: '',
    flow1: '',
    isActive: true,
    flow2: '',
    flow3: '',
  })
  const [formData2, setFormData2] = useState({
    schedulerName: '',
    numCycles: '',
    startTime: '',
    endTime: '',
    flow1: '',
    isActive: true,
    flow2: '',
    flow3: '',
  })
  const [formData3, setFormData3] = useState({
    schedulerName: '',
    numCycles: '',
    startTime: '',
    endTime: '',
    flow1: '',
    isActive: true,
    flow2: '',
    flow3: '',
  })

  const handleInputChange = (e) => {
    if (currentForm === 1) setFormData1({ ...formData1, [e.target.name]: e.target.value })
    if (currentForm === 2) setFormData2({ ...formData2, [e.target.name]: e.target.value })
    if (currentForm === 3) setFormData3({ ...formData3, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://0.0.0.0:8000/scheduler', [
        formData1,
        formData2,
        formData3,
      ])
      console.log(response.data)
      setVisible(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Add a new schedule</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CCol xs={12}>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem active={currentForm === 1} onClick={() => setCurrentForm(1)}>
                1
              </CPaginationItem>
              <CPaginationItem active={currentForm === 2} onClick={() => setCurrentForm(2)}>
                2
              </CPaginationItem>
              <CPaginationItem active={currentForm === 3} onClick={() => setCurrentForm(3)}>
                3
              </CPaginationItem>
            </CPagination>
          </CCol>
          {currentForm === 1 && (
            <CForm onSubmit={handleSubmit} className="row g-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Scheduler Name"
                  name="schedulerName"
                  value={formData1.schedulerName}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Number of Cycles"
                  name="numCycles"
                  value={formData1.numCycles}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="Start Time"
                  name="startTime"
                  value={formData1.startTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="End Time"
                  name="endTime"
                  value={formData1.endTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 1"
                  name="flow1"
                  value={formData1.flow1}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 2"
                  name="flow2"
                  value={formData1.flow2}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 3"
                  name="flow3"
                  value={formData1.flow3}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </CCol>
            </CForm>
          )}
          {currentForm === 2 && (
            <CForm onSubmit={handleSubmit} className="row g-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Scheduler Name"
                  name="schedulerName"
                  value={formData2.schedulerName}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Number of Cycles"
                  name="numCycles"
                  value={formData2.numCycles}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="Start Time"
                  name="startTime"
                  value={formData2.startTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="End Time"
                  name="endTime"
                  value={formData2.endTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 1"
                  name="flow1"
                  value={formData2.flow1}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 2"
                  name="flow2"
                  value={formData2.flow2}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 3"
                  name="flow3"
                  value={formData2.flow3}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </CCol>
            </CForm>
          )}
          {currentForm === 3 && (
            <CForm onSubmit={handleSubmit} className="row g-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Scheduler Name"
                  name="schedulerName"
                  value={formData3.schedulerName}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Number of Cycles"
                  name="numCycles"
                  value={formData3.numCycles}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="Start Time"
                  name="startTime"
                  value={formData3.startTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  label="End Time"
                  name="endTime"
                  value={formData3.endTime}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 1"
                  name="flow1"
                  value={formData3.flow1}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 2"
                  name="flow2"
                  value={formData3.flow2}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Flow 3"
                  name="flow3"
                  value={formData3.flow3}
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>
                      {i * 5}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </CCol>
            </CForm>
          )}
        </CModalBody>
      </CModal>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Statistic
              </h4>
              <div className="small text-body-secondary">Temperature - Humidity Statistic</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end" onClick={() => setVisible(true)}>
                <CIcon icon={cilPlus} style={{ marginRight: '10px' }} />
                Event
              </CButton>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
